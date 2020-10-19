import * as Constants from "./constants"


export const initialState = {
  article: [],
  articleLoading: false,
  articleError: '',
  loginPopupVisibility: false,
  recaptchaPopupVisibility: false,
  comment: '',
  articleSeo: {},
  type: '',
  loginAndPerformTaskLoading: false,
  loginAndPerformTaskError: '',
  voteStatus: {}
}


const articleReducer = (state = initialState, action) => {
  switch (action.type) {
    case Constants.FETCH_ARTICLE_REQUEST:
      return {
        ...state,
        articleLoading: true
      }

    case Constants.FETCH_ARTICLE_SUCCESS:
      return {
        ...state,
        articleLoading: false,
        article: action.payload,
        articleError: ''
      }

    case Constants.FETCH_ARTICLE_FAILURE:
      return {
        ...state,
        articleLoading: false,
        article: [],
        articleError: action.payload
      }

    case Constants.CLEAR_ARTICLE:
      return {
        ...state,
        article: [],
        articleLoading: false,
        articleError: '',
        loginPopupVisibility: false,
        recaptchaPopupVisibility: false
      }
    case Constants.SET_COMMENT:
      return {
        ...state,
        comment: action.payload
      }
    case Constants.SHOW_LOGIN_POPUP:
      return {
        ...state,
        loginPopupVisibility: true
      }
    case Constants.HIDE_LOGIN_POPUP:
      return {
        ...state,
        loginPopupVisibility: false
      }
    case Constants.SHOW_RECAPTCHA_POPUP:
      return {
        ...state,
        recaptchaPopupVisibility: true
      }
    case Constants.HIDE_RECAPTCHA_POPUP:
      return {
        ...state,
        recaptchaPopupVisibility: false
      }
    case Constants.SET_ARTICLE_SEO:
      return {
        ...state,
        articleSeo: action.payload
      }
    case Constants.SET_TYPE_OF_TASK:
      return {
        ...state,
        type: action.payload
      }
    case Constants.LOGIN_AND_PERFORM_TASK_REQUEST:
      return {
        ...state,
        loginAndPerformTaskLoading: true,
        loginAndPerformTaskError: ''
      }

    case Constants.LOGIN_AND_PERFORM_TASK_SUCCESS:
      return {
        ...state,
        loginAndPerformTaskLoading: false,
        loginAndPerformTaskError: ''
      }

    case Constants.LOGIN_AND_PERFORM_TASK_FAILURE:
      return {
        ...state,
        loginAndPerformTaskLoading: false,
        loginAndPerformTaskError: action.payload
      }
    case Constants.CHECK_VOTE_STATUS_REQUEST:
      return {
        ...state,
        voteStatus: {}
      }
    case Constants.CHECK_VOTE_STATUS_SUCCESS:
      return {
        ...state,
        voteStatus: action.payload
      }
    case Constants.UPDATE_VOTE_COLOR:
      return {
        ...state,
        voteStatus: action.payload
      }


    default: return state
  }
}

export default articleReducer;