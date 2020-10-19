import * as Constants from "./constants"



export const fetchSettingsRequest = data => ({
    type: Constants.FETCH_SETTINGS_REQUEST,
    payload: data
})

export const fetchSettingsSuccess = settings => ({
    type: Constants.FETCH_SETTINGS_SUCCESS,
    payload: settings
})

export const fetchSettingsFailure = error => ({
    type: Constants.FETCH_SETTINGS_FAILURE,
    payload: error
})

export const signoutUser = () => ({
    type: Constants.SIGNOUT_USER
})

export const isContentExist = data => ({
    type: Constants.IS_CONTENT_EXIST,
    payload: data
})

export const showFolderSideBar = () => ({
    type: Constants.SHOW_FOLDER_SIDEBAR
})

export const hideFolderSideBar = () => ({
    type: Constants.HIDE_FOLDER_SIDEBAR
})

export const showCategorySideBar = () => ({
    type: Constants.SHOW_CATEGORY_SIDEBAR
})

export const hideCategorySideBar = () => ({
    type: Constants.HIDE_CATEGORY_SIDEBAR
})

export const setAuthenticationStatus = status =>({
    type: Constants.SET_AUTHENTICATION_STATUS,
    payload:status
})

export const setCategoryId = data =>({
    type: Constants.SET_CATEGORY_ID,
    payload:data
})

export const loginRequest = data => ({
    type: Constants.LOGIN_REQUEST,
    payload: data
})

export const loginSuccess = token => ({
    type: Constants.LOGIN_SUCCESS,
    payload: token
})

export const loginFailure = error => ({
    type: Constants.LOGIN_FAILURE,
    payload: error
})

export const signupRequest = data => ({
    type: Constants.SIGNUP_REQUEST,
    payload: data
})

export const signupSuccess = token => ({
    type: Constants.SIGNUP_SUCCESS,
    payload: token
})

export const signupFailure = error => ({
    type: Constants.SIGNUP_FAILURE,
    payload: error
})

export const setLoadVerifyPage = status =>({
    type: Constants.SET_LOAD_VERIFY_PAGE,
    payload:status
})

export const setSignupSuccessPage = status =>({
    type: Constants.SET_SIGNUP_SUCCESS_PAGE,
    payload:status
})

export const setverifyPasswordPage = status =>({
    type: Constants.SET_VERIFY_PASSWORD_PAGE,
    payload:status
})

export const setForgotPasswordSuccessPage = status =>({
    type: Constants.SET_FORGOT_PASSWORD_SUCCESS_PAGE,
    payload:status
})

export const loadLastPage = status =>({
    type: Constants.LOAD_LAST_PAGE,
    payload:status
})

export const verifyOtpRequest = data => ({
    type: Constants.VERIFY_OTP_REQUEST,
    payload: data
})

export const verifyOtpSuccess = () => ({
    type: Constants.VERIFY_OTP_SUCCESS
})

export const verifyOtpFailure = error => ({
    type: Constants.VERIFY_OTP_FAILURE,
    payload: error
})

export const resendOtpRequest = data => ({
    type: Constants.RESEND_OTP_REQUEST,
    payload: data
})

export const resendOtpSuccess = data => ({
    type: Constants.RESEND_OTP_SUCCESS,
    payload: data
})

export const resendOtpFailure = error => ({
    type: Constants.RESEND_OTP_FAILURE,
    payload: error
})


export const forgotPasswordSendCodeRequest = data => ({
    type: Constants.FORGOT_PASSWORD_SEND_CODE_REQUEST,
    payload: data
})

export const forgotPasswordSendCodeSuccess = data => ({
    type: Constants.FORGOT_PASSWORD_SEND_CODE_SUCCESS,
    payload: data
})

export const forgotPasswordSendCodeFailure = error => ({
    type: Constants.FORGOT_PASSWORD_SEND_CODE_FAILURE,
    payload: error
})

export const forgotPasswordVerifyCodeRequest = data => ({
    type: Constants.FORGOT_PASSWORD_VERIFY_OTP_REQUEST,
    payload: data
})

export const forgotPasswordVerifyCodeSuccess = data => ({
    type: Constants.FORGOT_PASSWORD_VERIFY_OTP_SUCCESS,
    payload: data
})

export const forgotPasswordVerifyCodeFailure = error => ({
    type: Constants.FORGOT_PASSWORD_VERIFY_OTP_FAILURE,
    payload: error
})

export const setAuthUser = data =>({
    type: Constants.SET_AUTH_USER,
    payload: data
})

export const setBrowserHistory = data =>({
    type: Constants.SET_BROWSER_HISTORY,
    payload: data
})

export const showSuccessToast = data => ({
    type: Constants.SHOW_SUCCESS_TOAST,
    payload: data
})

export const hideSuccessToast = () => ({
    type: Constants.HIDE_SUCCESS_TOAST
})

export const resetErrors = () => ({
    type: Constants.RESET_ERRORS
})