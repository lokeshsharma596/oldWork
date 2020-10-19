import { all, fork, takeEvery, put, call } from 'redux-saga/effects'
import * as Services from "../../utils/services"
import * as Actions from "./actions"
import * as Constants from "./constants"
import { isContentExist, setCategoryId, loginSuccess, setAuthenticationStatus, loginFailure,setAuthUser } from "../BaseLayout/actions"
import { getIpAddress } from "../../utils/functions"
import jwt_decode from "jwt-decode";

//fetchers
function* fetchArticle(action) {
    try {
        const article = yield call(Services.getApiCall, { ...action.payload }, 'getArticle');
        if (article.status == "200") {
            yield put(Actions.fetchArticleSuccess(article.data.article));
            yield put(Actions.setArticleSeo({ seo_data: article.data.seo_data, category_info: article.data.category_info, folder_info: article.data.folder_info }))
            yield put(setCategoryId(article.data.category_info.id))
            const ip = yield call(getIpAddress)
            yield call(Services.postApiCall, { articleId: action.payload.ArticleId, ipAddress: ip.ip, userid: action.payload.UserId, name: "viewCount" }, 'increaseCount')
        }
        else {
            yield put(isContentExist(false))
        }
    } catch (e) {
        yield put(Actions.fetchArticleFailure(e.message));
    }
}

function* loginAndPerformTask(action) {
    try {
        const res1 = yield call(Services.postApiCall, { email: action.payload.email, org_id: action.payload.org_id, password: action.payload.password }, 'login');
        if (res1.status == 200) {
            yield put(setAuthenticationStatus(true));
            yield put(loginSuccess(res1.token));
            const decode = jwt_decode(res1.token)
            yield put(setAuthUser(decode.user))

            localStorage.setItem('user', JSON.stringify({
                token: res1.token
            }))

            if (action.payload.type != "comment") {
                const res = yield call(Services.postApiCallwithHeaderAuth, { type: action.payload.type, userid: action.payload.org_id, articleId: action.payload.articleId, email: action.payload.email, articlename: action.payload.articlename },res1.token, 'submitEmail')
                if (res.message === "IncrUp" || res.message === "IncrDown" || res.message === "IncrUpDecrDown" || res.message === "IncrDownDecrUp") {
                    yield call(Services.postApiCall, { articleId: action.payload.articleId, name: action.payload.type, msg: res.message }, 'increaseCount')
                }
                if(action.payload.type === 'upvote'){
                     yield put(Actions.updateVoteColor({upvote:true,downvote:false}))
                }else{
                    yield put(Actions.updateVoteColor({upvote:false,downvote:true}))
                }

            } else {
                const res = yield call(Services.postApiCallwithHeaderAuth, { type: action.payload.type, comment: action.payload.comment, email: action.payload.email, userid: action.payload.org_id, articleId: action.payload.articleId, articlename: action.payload.articlename, ownerEmail: action.payload.ownerEmail, article_url: action.payload.article_url, firstname: action.payload.firstname, lastname: action.payload.lastname },res1.token, 'submitEmail')
                if (res.message === "IncrComment") {
                    yield call(Services.postApiCall, { articleId: action.payload.articleId, name: action.payload.type }, 'increaseCount')
                }
                
            }
            yield put(Actions.setComment(''))
            yield put(Actions.hideLoginPopUp())
            yield put(Actions.loginAndPerformTaskSuccess())
        }
        else if (res1.status == 400) {
            yield put(loginFailure(res1.message));
            yield put(Actions.loginAndPerformTaskFailure())
        }
    } catch (e) {
        yield put(loginFailure());
        yield put(Actions.loginAndPerformTaskFailure())

    }
}

function* performTaskk(action) {
    try {
        console.log(action.payload.tokenVerification,typeof action.payload.tokenVerification,"status")
        if(action.payload.tokenVerification){
            const token=JSON.parse(localStorage.getItem('user')).token
        if (action.payload.type !== "comment") {
            const res = yield call(Services.postApiCallwithHeaderAuth, { userid: action.payload.userid, articleId: action.payload.articleId, type: action.payload.type, articlename: action.payload.articlename, email: action.payload.email },token,'submitEmail')
            if (res.message != "Already Exist") {
                yield call(Services.postApiCall, { articleId: action.payload.articleId, name: action.payload.type, msg: res.message }, 'increaseCount')
            }
        } else {
            const res = yield call(Services.postApiCallwithHeaderAuth, { ...action.payload },token,'submitEmail')
            if (res.message === "IncrComment") {
                yield call(Services.postApiCall, { articleId: action.payload.articleId, name: action.payload.type, userid: action.payload.userid, email: action.payload.email, msg: res.message }, 'increaseCount')
            }
        }
        }else{
            if (action.payload.type !== "comment") {
                const res = yield call(Services.postApiCall, { userid: action.payload.userid, articleId: action.payload.articleId, type: action.payload.type, articlename: action.payload.articlename, email: action.payload.email },'submitEmail')
                if (res.message != "Already Exist") {
                    yield call(Services.postApiCall, { articleId: action.payload.articleId, name: action.payload.type, msg: res.message }, 'increaseCount')
                }
            } else {
                const res = yield call(Services.postApiCall, { ...action.payload },'submitEmail')
                if (res.message === "IncrComment") {
                    yield call(Services.postApiCall, { articleId: action.payload.articleId, name: action.payload.type, userid: action.payload.userid, email: action.payload.email, msg: res.message }, 'increaseCount')
                }
            }
        }
        
    } catch (e) {
        console.log(e)
    }
}

function* checkVoteStatus(action) {
    try {
        const res = yield call(Services.postApiCall, action.payload, 'checkVoteStatus')
        if (res.status == 200) {
            yield put(Actions.checkVoteStatusSuccess(res.data))
        }
    } catch (e) {
        console.log(e)
    }
}

//watchers
function* fetchArticleSaga() {
    yield takeEvery(Constants.FETCH_ARTICLE_REQUEST, fetchArticle)
}

function* performTaskSaga() {
    yield takeEvery(Constants.PERFORM_TASK, performTaskk)
}

function* loginAndPerformTaskSaga() {
    yield takeEvery(Constants.LOGIN_AND_PERFORM_TASK_REQUEST, loginAndPerformTask)
}

function* checkVoteStatusSaga() {
    yield takeEvery(Constants.CHECK_VOTE_STATUS_REQUEST, checkVoteStatus)
}

//export sagas
export default function* rootSaga() {
    yield all([
        fork(fetchArticleSaga),
        fork(performTaskSaga),
        fork(loginAndPerformTaskSaga),
        fork(checkVoteStatusSaga)
    ])
};