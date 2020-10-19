import * as Constants from "./constants"


export const initialState = {
  settings: [],
  settingsLoading: false,
  isExist: true,
  isAuthenticated: false,
  categorySidebarVisibility: false,
  folderSidebarVisibility: false,
  IsAuthenticated: false,
  categoryId: '',
  authUser: {},
  loginLoading: false,
  loginError: '',

  signupLoading: false,
  signupError: '',

  loadverifyPage: false,
  loadSignupSuccessPage: false,
  loadVerifyPasswordPage: false,
  loadForgotPasswordSuccessPage: false,

  loadLastPage: false,

  verifyOtpLoading: false,
  otpError: '',

  resendOtpLoading: false,

  forgotPasswordSendCodeLoading: false,
  forgotPasswordSendCodeError: '',

  forgotPasswordVerifyOtpLoading: false,
  forgotPasswordVerifyOtpError: '',
  browserHistory: [],
  successToastVisibility: false,
  successToastMessage: ''

}


const baseReducer = (state = initialState, action) => {
  switch (action.type) {

    case Constants.FETCH_SETTINGS_REQUEST:
      return {
        ...state,
        settingsLoading: true
      }

    case Constants.FETCH_SETTINGS_SUCCESS:
      return {
        ...state,
        settingsLoading: false,
        settings: action.payload,
      }

    case Constants.FETCH_SETTINGS_FAILURE:
      return {
        ...state,
        settingsLoading: false,
        settings: [],
        isExist: false
      }

    case Constants.SIGNOUT_USER:
      return {
        ...state,
        isAuthenticated: false,
        authUser: {}
      }
    case Constants.IS_CONTENT_EXIST:
      return {
        ...state,
        isExist: false
      }
    case Constants.SHOW_CATEGORY_SIDEBAR:
      return {
        ...state,
        categorySidebarVisibility: true
      }
    case Constants.HIDE_CATEGORY_SIDEBAR:
      return {
        ...state,
        categorySidebarVisibility: false
      }
    case Constants.SHOW_FOLDER_SIDEBAR:
      return {
        ...state,
        folderSidebarVisibility: true
      }
    case Constants.HIDE_FOLDER_SIDEBAR:
      return {
        ...state,
        folderSidebarVisibility: false
      }
    case Constants.SET_AUTHENTICATION_STATUS:
      return {
        ...state,
        isAuthenticated: action.payload
      }
    case Constants.SET_CATEGORY_ID:
      return {
        ...state,
        categoryId: action.payload
      }
    case Constants.LOGIN_REQUEST:
      return {
        ...state,
        loginLoading: true,
        loginError: ''
      }
    case Constants.LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        loadIndexPage: true
      }
    case Constants.LOGIN_FAILURE:
      return {
        ...state,
        isAuthenticated: false,
        loginError: action.payload
      }
    case Constants.SIGNUP_REQUEST:
      return {
        ...state,
        signupLoading: true,
        signupError: ''
      }
    case Constants.SIGNUP_SUCCESS:
      return {
        ...state,
        signupLoading: false,
        loadverifyPage: true,
      }
    case Constants.SIGNUP_FAILURE:
      return {
        ...state,
        signupLoading: false,
        signupError: action.payload
      }
    case Constants.SET_LOAD_VERIFY_PAGE:
      return {
        ...state,
        loadverifyPage: action.payload
      }
    case Constants.SET_SIGNUP_SUCCESS_PAGE:
      return {
        ...state,
        loadSignupSuccessPage: action.payload
      }
    case Constants.SET_VERIFY_PASSWORD_PAGE:
      return {
        ...state,
        loadVerifyPasswordPage: action.payload
      }
    case Constants.SET_FORGOT_PASSWORD_SUCCESS_PAGE:
      return {
        ...state,
        loadForgotPasswordSuccessPage: action.payload
      }
    case Constants.LOAD_LAST_PAGE:
      return {
        ...state,
        loadLastPage: action.payload
      }
    case Constants.VERIFY_OTP_REQUEST:
      return {
        ...state,
        verifyOtpLoading: true,
        otpError: ''
      }
    case Constants.VERIFY_OTP_SUCCESS:
      return {
        ...state,
        verifyOtpLoading: false,
        otpError: action.payload,
        loadSignupSuccessPage: true,
      }
    case Constants.VERIFY_OTP_FAILURE:
      return {
        ...state,
        verifyOtpLoading: false,
        otpError: action.payload
      }
    case Constants.RESEND_OTP_REQUEST:
      return {
        ...state,
        resendOtpLoading: true,
        otpError: ''
      }
    case Constants.RESEND_OTP_SUCCESS:
      return {
        ...state,
        resendOtpLoading: false,
        otpError: action.payload
      }
    case Constants.RESEND_OTP_FAILURE:
      return {
        ...state,
        resendOtpLoading: false,
        otpError: action.payload
      }
    case Constants.FORGOT_PASSWORD_SEND_CODE_REQUEST:
      return {
        ...state,
        forgotPasswordSendCodeLoading: true,
        forgotPasswordSendCodeError: ''
      }
    case Constants.FORGOT_PASSWORD_SEND_CODE_SUCCESS:
      return {
        ...state,
        loadVerifyPasswordPage: true,
        forgotPasswordSendCodeLoading: false,
        forgotPasswordSendCodeError: action.payload
      }
    case Constants.FORGOT_PASSWORD_SEND_CODE_FAILURE:
      return {
        ...state,
        forgotPasswordSendCodeLoading: false,
        forgotPasswordSendCodeError: action.payload
      }
    case Constants.FORGOT_PASSWORD_VERIFY_OTP_REQUEST:
      return {
        ...state,
        forgotPasswordVerifyOtpLoading: true,
        forgotPasswordVerifyOtpError: ''
      }
    case Constants.FORGOT_PASSWORD_VERIFY_OTP_SUCCESS:
      return {
        ...state,
        loadForgotPasswordSuccessPage: true,
        forgotPasswordVerifyOtpLoading: false,
        forgotPasswordVerifyOtpError: action.payload
      }
    case Constants.FORGOT_PASSWORD_VERIFY_OTP_FAILURE:
      return {
        ...state,
        forgotPasswordVerifyOtpLoading: false,
        forgotPasswordVerifyOtpError: action.payload
      }
    case Constants.SET_AUTH_USER:
      return {
        ...state,
        authUser: action.payload
      }
    case Constants.SET_BROWSER_HISTORY:
      return {
        ...state,
        browserHistory: [...state.browserHistory, action.payload]
      }
    case Constants.SHOW_SUCCESS_TOAST:
      return {
        ...state,
        successToastVisibility: true,
        successToastMessage: action.payload
      }
    case Constants.HIDE_SUCCESS_TOAST:
      return {
        ...state,
        successToastVisibility: false,
        successToastMessage: ''
      }

      case Constants.RESET_ERRORS:
      return {
        ...state,
        successToastMessage: '',
        forgotPasswordVerifyOtpError:'',
        forgotPasswordSendCodeError:'',
        loginError:'',
        signupError:'',
        otpError:''
      }
    default: return state
  }
}

export default baseReducer;