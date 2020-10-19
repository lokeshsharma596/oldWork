import { all, fork, takeEvery, put, call, delay } from 'redux-saga/effects'
import * as Services from "../../utils/services"
import * as Actions from "./actions"
import * as Constants from "./constants"


//fetchers
function* fetchCategories(action) {
    try {
        const category = yield call(Services.getApiCall, { UserId: action.payload.UserId, lastVisible: action.payload.lastVisibleCategoryId }, 'listCategories');
        if (category.message == "No Categories Exist") {
            yield put(Actions.zeroCategories(true));
        }
        else if (category.message == "Categories Received More Available") {
            yield put(Actions.fetchCategoriesSuccess(category.data.category));
            yield put(Actions.lastVisibleCategoryId(category.data.lastVisible));
            yield put(Actions.moreCategoriesAvailable(true));
        }
        else if (category.message == "All Categories Received") {
            yield put(Actions.fetchCategoriesSuccess(category.data.category));
            yield put(Actions.lastVisibleCategoryId(category.data.lastVisible));
            yield put(Actions.moreCategoriesAvailable(false));
        }
    } catch (e) {
        yield put(Actions.fetchCategoriesFailure(e.message));
    }
}


//watchers
function* fetchCategoriesSaga() {
    yield takeEvery(Constants.FETCH_CATEGORIES_REQUEST, fetchCategories)
}

//export sagas
export default function* rootSaga() {
    yield all([
        fork(fetchCategoriesSaga)
    ])
};