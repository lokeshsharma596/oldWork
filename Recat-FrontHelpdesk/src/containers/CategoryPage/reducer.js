import * as Constants from "./constants"


export const initialState = {
 categories:[],
 categoriesLoading:false,
 categoriesError:'',
 moreCategoriesAvailable:true,
 isZeroCategories:false,
 lastVisibleCategoryId:"init"
}


const categoryReducer = (state = initialState, action) => {
  switch (action.type) {

    case Constants.FETCH_CATEGORIES_REQUEST:
      return {
        ...state,
        moreCategoriesAvailable:false,
        categoriesLoading: true
      }

    case Constants.FETCH_CATEGORIES_SUCCESS:
      return {
        ...state,
        categoriesLoading: false,
        categories: [...state.categories,...action.payload],
        categoriesError: ''
      }

    case Constants.FETCH_CATEGORIES_FAILURE:
      return {
        ...state,
        categoriesLoading: false,
        categories: [],
        categoriesError: action.payload
      }


    case Constants.MORE_CATEGORIES_AVAILABLE:
      return {
        ...state,
        moreCategoriesAvailable: action.payload
      }

    case Constants.ZERO_CATEGORIES:
      return {
        ...state,
        isZeroCategories:action.payload,
      }

    case Constants.LAST_VISIBLE_CATEGORY_ID:
      return {
        ...state,
        lastVisibleCategoryId:action.payload
      }

    default: return state
  }
}

export default categoryReducer;