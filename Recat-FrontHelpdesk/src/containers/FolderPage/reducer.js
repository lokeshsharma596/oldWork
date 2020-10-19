import * as Constants from "./constants"


export const initialState = {
  folders: {},
  foldersLoading: false,
  foldersError: '',
  moreFoldersAvailable: true,
  isZeroFolders: false,
  lastVisibleFolderId: 'init',
  seoData: {},
  seoError: '',
  sidebarFolders:[],
  sideBarFoldersLoading: false,
  sideBarFoldersError:'',
  moreSidebarFoldersAvailable:true,
  isZeroSideBarFolders:false,
  lastVisibleSideBarFolderId:'init'
}


const folderReducer = (state = initialState, action) => {
  switch (action.type) {
    case Constants.FETCH_FOLDERS_REQUEST:
      return {
        ...state,
        moreFoldersAvailable: false,
        foldersLoading: true
      }

    case Constants.FETCH_FOLDERS_SUCCESS:
      return {
        ...state,
        foldersLoading: false,
        folders: { ...state.folders, ...action.payload },
        foldersError: ''
      }

    case Constants.FETCH_FOLDERS_FAILURE:
      return {
        ...state,
        foldersLoading: false,
        folders: [],
        foldersError: action.payload
      }


    case Constants.MORE_FOLDERS_AVAILABLE:
      return {
        ...state,
        moreFoldersAvailable: action.payload
      }

    case Constants.ZERO_FOLDERS:
      return {
        ...state,
        isZeroFolders: action.payload,
      }

    case Constants.LAST_VISIBLE_FOLDER_ID:
      return {
        ...state,
        lastVisibleFolderId: action.payload
      }

    case Constants.CLEAR_FOLDERS:
      return {
        ...state,
        folders: {},
        foldersLoading: false,
        foldersError: '',
        moreFoldersAvailable: true,
        isZeroFolders: false,
        lastVisibleFolderId: 'init'
      }
    case Constants.FETCH_FOLDER_PAGE_SEO_REQUEST:
      return {
        ...state,
        seoData:{}
      }

    case Constants.FETCH_FOLDER_PAGE_SEO_SUCCESS:
      return {
        ...state,
        seoData:action.payload,
        seoError: ''
      }

    case Constants.FETCH_FOLDER_PAGE_SEO_FAILURE:
      return {
        ...state,
        seoData:{},
        seoError:action.payload
      }
      case Constants.FETCH_FOLDER_NAMES_REQUEST:
      return {
        ...state,
        moreSidebarFoldersAvailable: false,
        sideBarFoldersLoading: true
      }

    case Constants.FETCH_FOLDER_NAMES_SUCCESS:
      return {
        ...state,
        sideBarFoldersLoading: false,
        sidebarFolders: [...state.sidebarFolders, ...action.payload ],
        sideBarFoldersError: ''
      }

    case Constants.FETCH_FOLDER_NAMES_FAILURE:
      return {
        ...state,
        sideBarFoldersLoading: false,
        sidebarFolders: [],
        sideBarFoldersError: action.payload
      }


    case Constants.MORE_SIDEBAR_FOLDERS_AVAILABLE:
      return {
        ...state,
        moreSidebarFoldersAvailable: action.payload
      }

    case Constants.ZERO_SIDEBAR_FOLDERS:
      return {
        ...state,
        isZeroSideBarFolders: action.payload,
        moreSidebarFoldersAvailable:false
      }

    case Constants.LAST_VISIBLE_SIDEBAR_FOLDER_ID:
      return {
        ...state,
        lastVisibleSideBarFolderId: action.payload
      }

    case Constants.CLEAR_SIDEBAR_FOLDERS:
      return {
        ...state,
        sidebarFolders:[],
        sideBarFoldersLoading: false,
        sideBarFoldersError:'',
        moreSidebarFoldersAvailable:true,
        isZeroSideBarFolders:false,
        lastVisibleSideBarFolderId:'init'
      }

    default: return state
  }
}

export default folderReducer;