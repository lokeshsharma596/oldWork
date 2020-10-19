import { all, fork, takeEvery, put, call } from 'redux-saga/effects'
import * as Services from "../../utils/services"
import * as Actions from "./actions"
import * as Constants from "./constants"


//fetchers
function* fetchPreviewArticle(action) {
    try {
        const article = yield call(Services.getApiCall, { ...action.payload }, 'getPreviewArticle');
        if (article.message === "Not Available") {
            // Router.push(`/`)
        } else {
            yield put(Actions.fetchPreviewArticleSuccess(article.data.article));
        }
    } catch (e) {
        yield put(Actions.fetchPreviewArticleFailure(e.message));
    }
}


//watchers
function* fetchPreviewArticleSaga() {
    yield takeEvery(Constants.FETCH_PREVIEW_ARTICLE_REQUEST, fetchPreviewArticle)
}


//export sagas
export default function* rootSaga() {
    yield all([
        fork(fetchPreviewArticleSaga)
    ])
};