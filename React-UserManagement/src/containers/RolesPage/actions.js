import * as Constants from "./constants"

export const fetchRolesRequest = () =>  ({
    type: Constants.FETCH_ROLES_REQUEST
  })

export const fetchRolesSuccess = roles => ({
    type: Constants.FETCH_ROLES_SUCCESS,
    payload: roles
})

export const fetchRolesFailure = error => ({
    type: Constants.FETCH_ROLES_FAILURE,
    payload: error
})

export const showCreateRoleSideBar = () => ({
  type: Constants.SHOW_CREATE_ROLE_SIDEBAR
})

export const hideCreateRoleSideBar = () => ({
  type: Constants.HIDE_CREATE_ROLE_SIDEBAR
})

export const showEditRoleSideBar = data => ({
  type: Constants.SHOW_EDIT_ROLE_SIDEBAR,
  payload:data
})

export const hideEditRoleSideBar = () => ({
  type: Constants.HIDE_EDIT_ROLE_SIDEBAR
})


export const showDeleteRoleScreen = () => ({
  type: Constants.SHOW_ROLE_DELETE_SCREEN
})

export const hideDeleteRoleScreen = () => ({
  type: Constants.HIDE_ROLE_DELETE_SCREEN
})

export const showRoleSuccessToast = data => ({
  type: Constants.SHOW_ROLE_SUCCESS_TOAST,
  payload:data
})

export const hideRoleSuccessToast = () => ({
  type: Constants.HIDE_ROLE_SUCCESS_TOAST
})


export const createRoleRequest = () =>  ({
  type: Constants.CREATE_ROLE_REQUEST
})

export const createRoleSuccess = data => ({
  type: Constants.CREATE_ROLE_SUCCESS,
  payload: data
})

export const createRoleFailure = error => ({
  type: Constants.CREATE_ROLE_FAILURE,
  payload: error
})



export const deleteRolesRequest = () =>  ({
  type: Constants.DELETE_ROLES_REQUEST
})

export const deleteRolesSuccess = () => ({
  type: Constants.DELETE_ROLES_SUCCESS
})

export const deleteRolesFailure = error => ({
  type: Constants.DELETE_ROLES_FAILURE,
  payload: error
})

export const fetchRoleRequest = () =>  ({
  type: Constants.FETCH_ROLE_REQUEST
})

export const fetchRoleSuccess = role => ({
  type: Constants.FETCH_ROLE_SUCCESS,
  payload: role
})

export const fetchRoleFailure = error => ({
  type: Constants.FETCH_ROLE_FAILURE,
  payload: error
})

export const updateRoleRequest = () =>  ({
  type: Constants.UPDATE_ROLE_REQUEST
})

export const updateRoleSuccess = () => ({
  type: Constants.UPDATE_ROLE_SUCCESS
})

export const updateRoleFailure = error => ({
  type: Constants.UPDATE_ROLE_FAILURE,
  payload: error
})

export const checkRoleNameRequest = () =>  ({
  type: Constants.CHECK_ROLE_NAME_REQUEST
})

export const checkRoleNameSuccess = data => ({
  type: Constants.CHECK_ROLE_NAME_SUCCESS,
  payload: data
})

export const checkRoleNameFailure = error => ({
  type: Constants.CHECK_ROLE_NAME_FAILURE,
  payload: error
})

export const resetRoleName = () => ({
  type: Constants.RESET_ROLE_NAME
})

export const createGeneralData = () => ({
  type: Constants.CREATE_GENERAL_DATA
})