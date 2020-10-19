import { all, fork, takeEvery, put, call, delay } from 'redux-saga/effects'
import * as Services from "../../utils/services"
import * as Actions from "./actions"
import * as Constants from "./constants"


//fetchers
function* fetchPermissions(action) {
    try {
        const data = yield call(Services.getApiCall, { userId: action.payload },'getPermissions');
        yield put(Actions.fetchPermissionsSuccess(data));
    } catch (e) {
        yield put(Actions.fetchPermissionsFailure(e.message));
    }
}

function* updateUser(action) {
    try {
        yield call(Services.updateProfile, { ...action.payload }, 'updateProfile');
        yield delay(1000)
        yield put(Actions.updateUserSuccess());
        yield put(Actions.hideeditprofilepage());
        yield put(Actions.showCommonSuccessToast('User updated'));
      //  yield put(Actions.fetchAgentsRequest(localStorage.getItem('userId')))

    } catch (e) {
        yield put(Actions.updateUserFailure(e.message));
    }
}

function* otpsend(action) {
    try {
        yield call(Services.sendotp, {...action.payload}, 'sendOtp');
        // yield delay(1000)
         yield put(Actions.showPopup());
         yield put(Actions.hideeditprofilepage());
        // yield put(Actions.hideeditprofilepage());
        // yield put(Actions.showCommonSuccessToast('User updated'));
      //  yield put(Actions.fetchAgentsRequest(localStorage.getItem('userId')))

    } catch (e) {
        yield put(Actions.updateUserFailure(e.message));
    }
}

//fetchers
function* fetchusers(action) {
    try {
        const data = yield call(Services.getuser, { userId: action.payload }, 'profileDeatail');
        yield put(Actions.fetchuserSuccess(data));
    } catch (e) {
        yield put(Actions.fetchuserFailure(e.message));
    }
}


//watchers
function* fetchPermissionsSaga() {
    yield takeEvery(Constants.FETCH_PERMISSIONS_REQUEST, fetchPermissions)
}

function* fetchUserSaga() {
    yield takeEvery(Constants.FETCH_USER_REQUEST, fetchusers)
}

function* updateProfileSaga() {
    yield takeEvery(Constants.UPDATE_USER_REQUEST, updateUser)
}

function* sendotp() {
    yield takeEvery(Constants.SEND_OTP, otpsend)
}

//export sagas
export default function* rootSaga() {
    yield all([
        fork(fetchPermissionsSaga),
        fork(updateProfileSaga),
        fork(fetchUserSaga),
        fork(sendotp)
    ])
};