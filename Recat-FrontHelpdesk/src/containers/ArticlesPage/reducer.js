import * as Constants from "./constants"


export const initialState = {
  articles: [],
  articlesLoading: false,
  articlesError: '',
  moreArticlesAvailable: true,
  isZeroArticles: false,
  lastVisibleArticleId: "init",
  availableArticleType: "init",
  // categoryId: '',
  seoData: {},
  seoError:''
}


const articlesReducer = (state = initialState, action) => {
  switch (action.type) {
    case Constants.FETCH_ARTICLES_REQUEST:
      return {
        ...state,
        moreArticlesAvailable: false,
        articlesLoading: true
      }

    case Constants.FETCH_ARTICLES_SUCCESS:
      return {
        ...state,
        articlesLoading: false,
        articles: [...state.articles, ...action.payload],
        articlesError: ''
      }

    case Constants.FETCH_ARTICLES_FAILURE:
      return {
        ...state,
        articlesLoading: false,
        articles: [],
        articlesError: action.payload
      }


    case Constants.MORE_ARTICLES_AVAILABLE:
      return {
        ...state,
        moreArticlesAvailable: action.payload.status,
        availableArticleType: action.payload.type
      }

    case Constants.ZERO_ARTICLES:
      return {
        ...state,
        isZeroArticles: action.payload,
        articles:[]
      }

    case Constants.LAST_VISIBLE_ARTICLE_ID:
      return {
        ...state,
        lastVisibleArticleId: action.payload
      }

    case Constants.CLEAR_ARTICLES:
      return {
        ...state,
        articles: [],
        isZeroArticles: false,
        lastVisibleArticleId: "init",
        availableArticleType: "init",
        moreArticlesAvailable: true
      }
    
    // case Constants.SET_CATEGORY_ID:
    //   return {
    //     ...state,
    //     categoryId: action.payload
    //   }
    case Constants.FETCH_ARTICLES_PAGE_SEO_REQUEST:
      return {
        ...state,
        seoData: {}
      }

    case Constants.FETCH_ARTICLES_PAGE_SEO_SUCCESS:
      return {
        ...state,
        seoData: action.payload,
        seoError: ''
      }

    case Constants.FETCH_ARTICLES_PAGE_SEO_FAILURE:
      return {
        ...state,
        seoData: {},
        seoError: action.payload
      }
    default: return state
  }
}

export default articlesReducer;