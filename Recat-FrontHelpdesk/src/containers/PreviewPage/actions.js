import * as Constants from "./constants"

export const fetchPreviewArticleRequest = data =>  ({
    type: Constants.FETCH_PREVIEW_ARTICLE_REQUEST,
    payload:data
  })

export const fetchPreviewArticleSuccess = article => ({
    type: Constants.FETCH_PREVIEW_ARTICLE_SUCCESS,
    payload: article
})

export const fetchPreviewArticleFailure = error => ({
    type: Constants.FETCH_PREVIEW_ARTICLE_FAILURE,
    payload: error
})
