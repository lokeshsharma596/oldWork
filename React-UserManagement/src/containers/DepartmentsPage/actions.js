import * as Constants  from './constants'


export const fetchDepartmentsRequest = () =>  ({
    type: Constants.FETCH_DEPARTMENTS_REQUEST
  })

export const fetchDepartmentsSuccess = departments => ({
    type: Constants.FETCH_DEPARTMENTS_SUCCESS,
    payload: departments
})

export const fetchDepartmentsFailure = error => ({
    type: Constants.FETCH_DEPARTMENTS_FAILURE,
    payload: error
})

export const showCreateDepartmentSideBar = () => ({
  type: Constants.SHOW_CREATE_DEPARTMENT_SIDEBAR
})

export const hideCreateDepartmentSideBar = () => ({
  type: Constants.HIDE_CREATE_DEPARTMENT_SIDEBAR
})


export const showDeleteDepartmentScreen = () => ({
  type: Constants.SHOW_DEPARTMENT_DELETE_SCREEN
})

export const hideDeleteDepartmentScreen = () => ({
  type: Constants.HIDE_DEPARTMENT_DELETE_SCREEN
})

export const showDepartmentSuccessToast = data => ({
  type: Constants.SHOW_DEPARTMENT_SUCCESS_TOAST,
  payload:data
})

export const hideDepartmentSuccessToast = () => ({
  type: Constants.HIDE_DEPARTMENT_SUCCESS_TOAST
})

export const showEditDepartmentSideBar = data => ({
  type: Constants.SHOW_EDIT_DEPARTMENT_SIDEBAR,
  payload:data
})

export const hideEditDepartmentSideBar = () => ({
  type: Constants.HIDE_EDIT_DEPARTMENT_SIDEBAR
})

export const fetchAgentSubstringsRequest = () =>  ({
  type: Constants.FETCH_AGENT_SUBSTRING_REQUEST
})

export const fetchAgentSubstringsSuccess = data => ({
  type: Constants.FETCH_AGENT_SUBSTRING_SUCCESS,
  payload: data
})

export const fetchAgentSubstringsFailure = error => ({
  type: Constants.FETCH_AGENT_SUBSTRING_FAILURE,
  payload: error
})

export const createDepartmentRequest = () =>  ({
  type: Constants.CREATE_DEPARTMENT_REQUEST
})

export const createDepartmentSuccess = data => ({
  type: Constants.CREATE_DEPARTMENT_SUCCESS,
  payload: data
})

export const createDepartmentFailure = error => ({
  type: Constants.CREATE_DEPARTMENT_FAILURE,
  payload: error
})

export const deleteDepartmentsRequest = () =>  ({
  type: Constants.DELETE_DEPARTMENTS_REQUEST
})

export const deleteDepartmentsSuccess = () => ({
  type: Constants.DELETE_DEPARTMENTS_SUCCESS
})

export const deleteDepartmentsFailure = error => ({
  type: Constants.DELETE_DEPARTMENTS_FAILURE,
  payload: error
})

export const fetchDepartmentRequest =() =>  ({
  type: Constants.FETCH_DEPARTMENT_REQUEST,
})

export const fetchDepartmentSuccess = department => ({
  type: Constants.FETCH_DEPARTMENT_SUCCESS,
  payload: department
})

export const fetchDepartmentFailure = error => ({
  type: Constants.FETCH_DEPARTMENT_FAILURE,
  payload: error
})

export const updateDepartmentRequest = () =>  ({
  type: Constants.UPDATE_DEPARTMENT_REQUEST,
})

export const updateDepartmentSuccess = () => ({
  type: Constants.UPDATE_DEPARTMENT_SUCCESS
})

export const updateDepartmentFailure = error => ({
  type: Constants.UPDATE_DEPARTMENT_FAILURE,
  payload: error
})

export const checkDepartmentNameRequest = () =>  ({
  type: Constants.CHECK_DEPARTMENT_NAME_REQUEST
})

export const checkDepartmentNameSuccess = data => ({
  type: Constants.CHECK_DEPARTMENT_NAME_SUCCESS,
  payload: data
})

export const checkDepartmentNameFailure = error => ({
  type: Constants.CHECK_DEPARTMENT_NAME_FAILURE,
  payload: error
})

export const resetDepartmentName = () => ({
  type: Constants.RESET_DEPARTMENT_NAME
})