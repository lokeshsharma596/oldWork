import * as Constants from './constants';


export const initialState = {
  loading: false,
  roles: [],
  error: '',
  showCreateRoleSideBar: false,
  createRoleLoading: false,
  createRoleError: '',
  deleteRoleLoading: false,
  deleteRoleError: '',
  showEditRoleSideBar: false,
  editRoleId: '',
  roleLoading: false,
  role: [],
  roleError: '',
  showRoleSuccessToast: false,
  roleToastMessage: '',
  showDeleteScreen: false,
  updateRoleLoading: false,
  roleNameCheckLoading: false,
  roleNameAvailable: '',
  roleNameCheckError:'',
  roleNameCheckMessage:''
}


const rolesReducer = (state = initialState, action) => {
  switch (action.type) {


    case Constants.FETCH_ROLES_REQUEST:
      return {
        ...state,
        loading: true,
        role:[],
        error:''
      }

    case Constants.FETCH_ROLES_SUCCESS:
      return {
        ...state,
        loading: false,
        roles: action.payload,
        error: ''
      }

    case Constants.FETCH_ROLES_FAILURE:
      return {
        ...state,
        loading: false,
        roles: [],
        error: action.payload
      }

    case Constants.SHOW_CREATE_ROLE_SIDEBAR:
      return {
        ...state,
        showCreateRoleSideBar: true
      }

    case Constants.HIDE_CREATE_ROLE_SIDEBAR:
      return {
        ...state,
        showCreateRoleSideBar: false
      }

    case Constants.SHOW_EDIT_ROLE_SIDEBAR:
      return {
        ...state,
        showEditRoleSideBar: true,
        editRoleId: action.payload
      }
    case Constants.HIDE_EDIT_ROLE_SIDEBAR:
      return {
        ...state,
        showEditRoleSideBar: false,
        editRoleId: ''
      }

    case Constants.SHOW_ROLE_DELETE_SCREEN:
      return {
        ...state,
        showDeleteScreen: true
      }

    case Constants.HIDE_ROLE_DELETE_SCREEN:
      return {
        ...state,
        showDeleteScreen: false
      }

    case Constants.SHOW_ROLE_SUCCESS_TOAST:
      return {
        ...state,
        showRoleSuccessToast: true,
        roleToastMessage: action.payload
      }
    case Constants.HIDE_ROLE_SUCCESS_TOAST:
      return {
        ...state,
        showRoleSuccessToast: false,
        roleToastMessage: ''
      }

    case Constants.CREATE_ROLE_REQUEST:
      return {
        ...state,
        createRoleLoading: true
      }

    case Constants.CREATE_ROLE_SUCCESS:
      return {
        ...state,
        createRoleLoading: false,
        createRoleError: ''
      }

    case Constants.CREATE_ROLE_FAILURE:
      return {
        ...state,
        createRoleLoading: false,
        createRoleError: action.payload
      }

    case Constants.DELETE_ROLES_REQUEST:
      return {
        ...state,
        deleteRoleLoading: true
      }

    case Constants.DELETE_ROLES_SUCCESS:
      return {
        ...state,
        deleteRoleLoading: false,
        deleteRoleError: ''
      }

    case Constants.DELETE_ROLES_FAILURE:
      return {
        ...state,
        deleteRoleLoading: false,
        deleteRoleError: action.payload
      }

    case Constants.FETCH_ROLE_REQUEST:
      return {
        ...state,
        roleLoading: true
      }

    case Constants.FETCH_ROLE_SUCCESS:
      return {
        ...state,
        roleLoading: false,
        role: action.payload,
        roleError: ''
      }
    case Constants.FETCH_ROLE_FAILURE:
      return {
        ...state,
        roleLoading: false,
        role: [],
        roleError: action.payload
      }

    case Constants.UPDATE_ROLE_REQUEST:
      return {
        ...state,
        updateRoleLoading: true
      }
    case Constants.UPDATE_ROLE_SUCCESS:
      return {
        ...state,
        updateRoleLoading: false,
        error: ''
      }
    case Constants.UPDATE_ROLE_FAILURE:
      return {
        ...state,
        updateRoleLoading: false,
        error: action.payload
      }

    case Constants.CHECK_ROLE_NAME_REQUEST:
      return {
        ...state,
        roleNameCheckLoading: true
      }
    case Constants.CHECK_ROLE_NAME_SUCCESS:
      return {
        ...state,
        roleNameCheckLoading: false,
        roleNameAvailable:action.payload.status,
        roleNameCheckMessage:action.payload.message,
        roleNameCheckError:''
      }
    case Constants.CHECK_ROLE_NAME_FAILURE:
      return {
        ...state,
        roleNameCheckLoading: false,
        roleNameCheckError: action.payload,

      }
      case Constants.RESET_ROLE_NAME:
      return {
        ...state,
        roleNameCheckError:'',
        roleNameAvailable:true
      }
      

    default: return state
  }
}

export default rolesReducer;