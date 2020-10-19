import { all, fork, takeEvery, put, call, takeLatest } from 'redux-saga/effects'
import * as Services from "../../utils/services"
import * as Actions from "./actions"
import * as Constants from "./constants"
import {setCategoryId} from "../BaseLayout/actions"

//fetchers
function* fetchArticles(action) {
    try {
        const articles = yield call(Services.getApiCall, {...action.payload}, 'listArticles');
        if (articles.message === "No Articles Exist") {
            yield put(Actions.zeroArticles(true));
        }
        else if (articles.message === "Articles Received More Pinned Available") {
            yield put(Actions.fetchArticlesSuccess(articles.data.articles));
            yield put(Actions.lastVisibleArticleId(articles.data.lastVisible));
            yield put(Actions.moreArticlesAvailable({status:true,type:articles.data.more}));
        }
        else if (articles.message == "Articles Received More Unpinned Available") {
            yield put(Actions.fetchArticlesSuccess(articles.data.articles));
            yield put(Actions.lastVisibleArticleId(articles.data.lastVisible));
            yield put(Actions.moreArticlesAvailable({status:true,type:articles.data.more}));
        }   
        else if(articles.message === "All Articles Received"){  
            yield put(Actions.fetchArticlesSuccess(articles.data.articles));
            yield put(Actions.lastVisibleArticleId(articles.data.lastVisible));
            yield put(Actions.moreArticlesAvailable({status:false,type:""}));

       
        }
    } catch (e) {
        yield put(Actions.fetchArticlesFailure(e.message));
    }
}

function* fetchArticlesSeo(action){
    try{
        const seo = yield call(Services.getApiCall,{...action.payload},'getAllArticlesSeo')
        yield put(Actions.fetchArticlesPageSeoSuccess(seo.data))
        yield put(setCategoryId(seo.data.category_info.id))
    }catch(e){
        yield put(Actions.fetchArticlesPageSeoFailure(e))
    }
}
//watchers
function* fetchArticlesSaga() {
    yield takeLatest(Constants.FETCH_ARTICLES_REQUEST, fetchArticles)
}

function* fetchArticlesSeoSaga() {
    yield takeEvery(Constants.FETCH_ARTICLES_PAGE_SEO_REQUEST, fetchArticlesSeo)
}

//export sagas
export default function* rootSaga() {
    yield all([
        fork(fetchArticlesSaga),
        fork(fetchArticlesSeoSaga)
    ])
};