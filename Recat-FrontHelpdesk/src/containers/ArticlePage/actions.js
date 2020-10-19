import * as Constants from "./constants"

export const fetchArticleRequest = data =>  ({
    type: Constants.FETCH_ARTICLE_REQUEST,
    payload:data
  })

export const fetchArticleSuccess = articles => ({
    type: Constants.FETCH_ARTICLE_SUCCESS,
    payload: articles
})

export const fetchArticleFailure = error => ({
    type: Constants.FETCH_ARTICLE_FAILURE,
    payload: error
})


export const clearArticleRequest = () => ({
  type: Constants.CLEAR_ARTICLE
})

export const showLoginPopUp = () => ({
  type: Constants.SHOW_LOGIN_POPUP
})

export const hideLoginPopUp = () => ({
  type: Constants.HIDE_LOGIN_POPUP
})

export const showRecaptchaPopUp = () => ({
  type: Constants.SHOW_RECAPTCHA_POPUP
})

export const hideRecaptchaPopUp = () => ({
  type: Constants.HIDE_RECAPTCHA_POPUP
})

export const setTypeOfTask = (data) => ({
  type: Constants.SET_TYPE_OF_TASK,
  payload:data
})

export const setComment = (data) =>({
  type: Constants.SET_COMMENT,
  payload:data
})
export const setArticleSeo = (data) =>({
  type: Constants.SET_ARTICLE_SEO,
  payload:data
})

export const performTask = data => ({
  type: Constants.PERFORM_TASK,
  payload: data
})

export const loginAndPerformTaskRequest = data =>  ({
  type: Constants.LOGIN_AND_PERFORM_TASK_REQUEST,
  payload:data
})

export const loginAndPerformTaskSuccess = data => ({
  type: Constants.LOGIN_AND_PERFORM_TASK_SUCCESS,
  payload: data
})

export const loginAndPerformTaskFailure = error => ({
  type: Constants.LOGIN_AND_PERFORM_TASK_FAILURE,
  payload: error
})

export const checkVoteStatusRequest = (data) => ({
  type: Constants.CHECK_VOTE_STATUS_REQUEST,
  payload:data
})

export const checkVoteStatusSuccess = (data) => ({
  type: Constants.CHECK_VOTE_STATUS_SUCCESS,
  payload:data
})

export const updateVoteColor = (data) => ({
  type: Constants.UPDATE_VOTE_COLOR,
  payload:data
})