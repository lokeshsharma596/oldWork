import { all, fork, takeEvery, put, call,delay } from 'redux-saga/effects'
import * as Services from "../../utils/services"
import * as Actions from "./actions"
import * as Constants from "./constants"
import jwt_decode from "jwt-decode";


//fetchers
function* fetchSettings(action) {
    try {
        const settings = yield call(Services.getApiCall, { subdomain: action.payload }, 'getSettings');
        if (settings.status === '200') {
            yield put(Actions.fetchSettingsSuccess(settings.data));
        }
        else if (settings.status === '404') {
            yield put(Actions.fetchSettingsFailure());
        }
    } catch (e) {
        yield put(Actions.fetchSettingsFailure());
    }
}

function* loginRequestt(action) {
    try {
        const res = yield call(Services.postApiCall,action.payload, 'login');
        console.log(typeof res.status,"login")
        if (res.status === 200) {
            yield put(Actions.showSuccessToast('Logged in successfully'));
            yield put(Actions.loadLastPage(true));
            yield put(Actions.setAuthenticationStatus(true));
            yield put(Actions.loginSuccess(res.token));
            const decode = jwt_decode(res.token)
            yield put(Actions.setAuthUser(decode.user))
            localStorage.setItem('user',JSON.stringify({
                token:res.token
            }))
        }
        else if (res.status === 400) {
            yield put(Actions.loginFailure(res.message));
        }
    } catch (e) {
        yield put(Actions.loginFailure());
    }
}




function* signupRequestt(action) {
    try {
        const res = yield call(Services.postApiCall,action.payload, 'signup');
        if (res.status === 200) {
            yield put(Actions.signupSuccess());
        }
        else{
            yield put(Actions.signupFailure(res.message));
        }
    } catch (e) {
        yield put(Actions.signupFailure());
    }
}

function* verifyOtp(action) {
    try {
        const res = yield call(Services.postApiCall,action.payload, 'verifyOtpAndCreateUser');
        if (res.status === 200) {
            yield put(Actions.verifyOtpSuccess(res.message));
            localStorage.removeItem('user')
        }
        else{
            yield put(Actions.verifyOtpFailure(res.message));
        }
    } catch (e) {
        yield put(Actions.verifyOtpFailure());
    }
}

function* resendOtp(action) {
    try {
        const res = yield call(Services.postApiCall,action.payload, 'resendVerificationCode');
        if (res.status === 200) {
            yield put(Actions.resendOtpSuccess(res.message));
        }
        else{
            yield put(Actions.resendOtpFailure(res.message));
        }
    } catch (e) {
        yield put(Actions.resendOtpFailure());
    }
}

function* forgotPasswordSendCodee(action) {
    try {
        const res = yield call(Services.postApiCall,action.payload, 'forgotPasswordSendCode');
        if (res.status === 200) {
            yield put(Actions.forgotPasswordSendCodeSuccess(res.message));
        }
        else{
            yield put(Actions.forgotPasswordSendCodeFailure(res.message));
        }
    } catch (e) {
        yield put(Actions.forgotPasswordSendCodeFailure());
    }
}

function* forgotPasswordVerifyCodee(action) {
    try {
        const res = yield call(Services.postApiCall,action.payload, 'verifyOtpAndUpdatePassword');
        if (res.status === '200') {
            yield put(Actions.forgotPasswordVerifyCodeSuccess(res.message));
        }
        else{
            yield put(Actions.forgotPasswordVerifyCodeFailure(res.message));
        }
    } catch (e) {
        yield put(Actions.forgotPasswordVerifyCodeFailure());
    }
}



//watchers
function* fetchSettingsSaga() {
    yield takeEvery(Constants.FETCH_SETTINGS_REQUEST, fetchSettings)
}

function* loginSaga() {
    yield takeEvery(Constants.LOGIN_REQUEST,loginRequestt)
}

function* signupSaga() {
    yield takeEvery(Constants.SIGNUP_REQUEST,signupRequestt)
}


function* resendOtpSaga() {
    yield takeEvery(Constants.RESEND_OTP_REQUEST, resendOtp)
}

function* verifyOtpSaga() {
    yield takeEvery(Constants.VERIFY_OTP_REQUEST, verifyOtp)
}

function* forgotPasswordSendCodeSaga() {
    yield takeEvery(Constants.FORGOT_PASSWORD_SEND_CODE_REQUEST, forgotPasswordSendCodee)
}

function* forgotPasswordVerifyCodeSaga() {
    yield takeEvery(Constants.FORGOT_PASSWORD_VERIFY_OTP_REQUEST, forgotPasswordVerifyCodee)
}

//export sagas
export default function* rootSaga() {
    yield all([
        fork(fetchSettingsSaga),
        fork(loginSaga),
        fork(signupSaga),
        fork(resendOtpSaga),
        fork(verifyOtpSaga),
        fork(forgotPasswordSendCodeSaga),
        fork(forgotPasswordVerifyCodeSaga)
    ])
};