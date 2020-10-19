import * as Constants from "./constants"

export const fetchArticlesRequest = data =>  ({
    type: Constants.FETCH_ARTICLES_REQUEST,
    payload:data
  })

export const fetchArticlesSuccess = articles => ({
    type: Constants.FETCH_ARTICLES_SUCCESS,
    payload: articles
})

export const fetchArticlesFailure = error => ({
    type: Constants.FETCH_ARTICLES_FAILURE,
    payload: error
})

export const moreArticlesAvailable = data =>  ({
  type: Constants.MORE_ARTICLES_AVAILABLE,
  payload:data
})

export const zeroArticles = data => ({
  type: Constants.ZERO_ARTICLES,
  payload: data
})

export const lastVisibleArticleId = data => ({
  type: Constants.LAST_VISIBLE_ARTICLE_ID,
  payload: data
})

export const clearArticlesRequest = () => ({
  type: Constants.CLEAR_ARTICLES
})

export const setCategoryId = data =>({
  type:Constants.SET_CATEGORY_ID,
  payload: data
})

export const fetchArticlesPageSeoRequest = data =>  ({
  type: Constants.FETCH_ARTICLES_PAGE_SEO_REQUEST,
  payload:data
})

export const fetchArticlesPageSeoSuccess = data => ({
  type: Constants.FETCH_ARTICLES_PAGE_SEO_SUCCESS,
  payload: data
})

export const fetchArticlesPageSeoFailure = error => ({
  type: Constants.FETCH_ARTICLES_PAGE_SEO_FAILURE,
  payload: error
})
