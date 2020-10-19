import * as Constants from "./constants"


export const initialState = {
  article: [],
  articleLoading: false,
  articleError: ''
}


const previewArticleReducer = (state = initialState, action) => {
  switch (action.type) {
    case Constants.FETCH_PREVIEW_ARTICLE_REQUEST:
      return {
        ...state,
        articleLoading: true
      }

    case Constants.FETCH_PREVIEW_ARTICLE_SUCCESS:
      return {
        ...state,
        articleLoading: false,
        article: action.payload,
        articleError: ''
      }

    case Constants.FETCH_PREVIEW_ARTICLE_FAILURE:
      return {
        ...state,
        articleLoading: false,
        article: [],
        articleError: action.payload
      }
        
    default: return state
  }
}

export default previewArticleReducer;