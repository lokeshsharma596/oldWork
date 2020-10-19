import * as Constants from "./constants"

export const fetchCategoriesRequest = data =>  ({
    type: Constants.FETCH_CATEGORIES_REQUEST,
    payload:data
  })

export const fetchCategoriesSuccess = categories => ({
    type: Constants.FETCH_CATEGORIES_SUCCESS,
    payload: categories
})

export const fetchCategoriesFailure = error => ({
    type: Constants.FETCH_CATEGORIES_FAILURE,
    payload: error
})

export const moreCategoriesAvailable = data =>  ({
  type: Constants.MORE_CATEGORIES_AVAILABLE,
  payload:data
})

export const zeroCategories = data => ({
  type: Constants.ZERO_CATEGORIES,
  payload: data
})

export const lastVisibleCategoryId = data => ({
  type: Constants.LAST_VISIBLE_CATEGORY_ID,
  payload: data
})
