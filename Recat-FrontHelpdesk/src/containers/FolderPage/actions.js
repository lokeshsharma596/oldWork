import * as Constants from "./constants"

export const fetchFoldersRequest = data =>  ({
    type: Constants.FETCH_FOLDERS_REQUEST,
    payload:data
  })

export const fetchFoldersSuccess = folders => ({
    type: Constants.FETCH_FOLDERS_SUCCESS,
    payload: folders
})

export const fetchFoldersFailure = error => ({
    type: Constants.FETCH_FOLDERS_FAILURE,
    payload: error
})

export const moreFoldersAvailable = data =>  ({
  type: Constants.MORE_FOLDERS_AVAILABLE,
  payload:data
})

export const zeroFolders = data => ({
  type: Constants.ZERO_FOLDERS,
  payload: data
})

export const lastVisibleFolderId = data => ({
  type: Constants.LAST_VISIBLE_FOLDER_ID,
  payload: data
})

export const clearFolderRequest = () => ({
  type: Constants.CLEAR_FOLDERS
})

export const fetchFolderPageSeoRequest = data =>  ({
  type: Constants.FETCH_FOLDER_PAGE_SEO_REQUEST,
  payload:data
})

export const fetchFolderPageSeoSuccess = data => ({
  type: Constants.FETCH_FOLDER_PAGE_SEO_SUCCESS,
  payload: data
})

export const fetchFolderPageSeoFailure = error => ({
  type: Constants.FETCH_FOLDER_PAGE_SEO_FAILURE,
  payload: error
})

export const fetchSideBarFoldersRequest = data =>  ({
  type: Constants.FETCH_FOLDER_NAMES_REQUEST,
  payload:data
})

export const fetchSideBarFoldersSuccess = folders => ({
  type: Constants.FETCH_FOLDER_NAMES_SUCCESS,
  payload: folders
})

export const fetchSideBarFoldersFailure = error => ({
  type: Constants.FETCH_FOLDER_NAMES_FAILURE,
  payload: error
})

export const moreSideBarFoldersAvailable = data =>  ({
type: Constants.MORE_SIDEBAR_FOLDERS_AVAILABLE,
payload:data
})

export const zeroSideBarFolders = data => ({
type: Constants.ZERO_SIDEBAR_FOLDERS,
payload: data
})

export const lastVisibleSideBarFolderId = data => ({
type: Constants.LAST_VISIBLE_SIDEBAR_FOLDER_ID,
payload: data
})

export const clearSideBarFolderRequest = () => ({
type: Constants.CLEAR_SIDEBAR_FOLDERS
})