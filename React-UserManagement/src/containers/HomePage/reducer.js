import * as Constants from "./constants"


export const initialState = {
  permissionsLoading: false,
  permissions: {},
  permissionsError: '',
  shownotification: false,
  showprofilepage: false,
  showcommontoast:false,
  userToastMessage: '',
  agentsLoading: false,
  loader:false,
  users: [],
  usersError: '',
  showpopup:false,
  otpsend:false
}


const homeReducer = (state = initialState, action) => {
  switch (action.type) {

    case Constants.FETCH_PERMISSIONS_REQUEST:
      return {
        ...state,
        permissionsLoading: true,
      }
      case Constants.SEND_OTP:
        return {
          ...state,
          otpsend: true,
          loader:true
        }
    case Constants.FETCH_PERMISSIONS_SUCCESS:
      return {
        ...state,
        permissionsLoading: false,
        permissions: action.payload,
        permissionsError: ''
      }
    case Constants.FETCH_PERMISSIONS_FAILURE:
      return {
        ...state,
        permissionsLoading: false,
        permissions: [],
        permissionsError: action.payload
      }
    case Constants.SHOW_NOTIFICATION_LIST:
      return {
        ...state,
        shownotification: true,
      }
    case Constants.HIDE_NOTIFICATION_LIST:
      return {
        ...state,
        shownotification: false,
      }
    case Constants.SHOW_PROFILE_PAGE:
      return {
        ...state,
        showprofilepage: true,
      }
    case Constants.HIDE_PROFILE_PAGE:
      return {
        ...state,
        showprofilepage: false,
      }
      case Constants.SHOW_COMMON_SUCCESS_TOAST:
        return {
          ...state,
          showcommontoast: true,
          userToastMessage: action.payload
        }
      case Constants.HIDE_COMMON_SUCCESS_TOAST:
        return {
          ...state,
          showcommontoast: false,
          userToastMessage: ''
        }
        
        case Constants.FETCH_USER_REQUEST:
          return {
            ...state,
            usersLoading: true
          }
        case Constants.FETCH_USER_SUCCESS:
          return {
            ...state,
            usersLoading: false,
            users: action.payload,
            usersError: ''
          }
        case Constants.FETCH_USER_FAILURE:
          return {
            ...state,
            usersLoading: false,
            users: [],
            usersError: action.payload
          }
          case Constants.SHOW_POPUP:
            return {
              ...state,
              showpopup: true,
              loader:false
            }
          case Constants.HIDE_POPUP:
            return {
              ...state,
              showpopup: false,
              loader:false,
            }

    default: return state
  }
}

export default homeReducer;