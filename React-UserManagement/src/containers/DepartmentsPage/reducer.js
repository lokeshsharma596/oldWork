import * as Constants from "./constants"


export const initialState = {
  loading: false,
  departments: [],
  error: '',
  showCreateDepartmentSideBar: false,
  showEditDepartmentSideBar: false,
  editDepartmentId: '',
  subStringsLoading: false,
  createDepartmentLoading: false,
  deleteDepartmentLoading: false,
  deleteDepartmentError: '',
  department: [],
  departmentLoading: false,
  updateDepartmentLoading: false,

  showDepartmentSuccessToast: false,
  departmentToastMessage: '',

  showDeleteScreen: false,

  departmentNameCheckLoading: false,
  departmentNameAvailable: '',
  departmentNameCheckError: '',
  departmentNameCheckMessage: ''

}


const departmentsReducer = (state = initialState, action) => {
  switch (action.type) {

    case Constants.FETCH_DEPARTMENTS_REQUEST:
      return {
        ...state,
        loading: true,
        error:''
      }
    case Constants.FETCH_DEPARTMENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        departments: action.payload,
        error: ''
      }
    case Constants.FETCH_DEPARTMENTS_FAILURE:
      return {
        ...state,
        loading: false,
        departments: [],
        error: action.payload
      }


    case Constants.SHOW_CREATE_DEPARTMENT_SIDEBAR:
      return {
        ...state,
        showCreateDepartmentSideBar: true
      }
    case Constants.HIDE_CREATE_DEPARTMENT_SIDEBAR:
      return {
        ...state,
        showCreateDepartmentSideBar: false
      }



    case Constants.SHOW_DEPARTMENT_DELETE_SCREEN:
      return {
        ...state,
        showDeleteScreen: true
      }

    case Constants.HIDE_DEPARTMENT_DELETE_SCREEN:
      return {
        ...state,
        showDeleteScreen: false
      }

    case Constants.SHOW_DEPARTMENT_SUCCESS_TOAST:
      return {
        ...state,
        showDepartmentSuccessToast: true,
        departmentToastMessage: action.payload
      }
    case Constants.HIDE_DEPARTMENT_SUCCESS_TOAST:
      return {
        ...state,
        showDepartmentSuccessToast: false,
        departmentToastMessage: ''
      }
    case Constants.SHOW_EDIT_DEPARTMENT_SIDEBAR:
      return {
        ...state,
        showEditDepartmentSideBar: true,
        editDepartmentId: action.payload
      }
    case Constants.HIDE_EDIT_DEPARTMENT_SIDEBAR:
      return {
        ...state,
        showEditDepartmentSideBar: false,
        editDepartmentId: ''
      }


    case Constants.FETCH_AGENT_SUBSTRING_REQUEST:
      return {
        ...state,
        subStringsLoading: true
      }
    case Constants.FETCH_AGENT_SUBSTRING_SUCCESS:
      return {
        ...state,
        subStringsLoading: false,
        subStrings: action.payload,
        error: ''
      }
    case Constants.FETCH_AGENT_SUBSTRING_FAILURE:
      return {
        ...state,
        subStringsLoading: false,
        subStrings: [],
        error: action.payload
      }


    case Constants.CREATE_DEPARTMENT_REQUEST:
      return {
        ...state,
        createDepartmentLoading: true
      }
    case Constants.CREATE_DEPARTMENT_SUCCESS:
      return {
        ...state,
        createDepartmentLoading: false,
        error: ''
      }
    case Constants.CREATE_DEPARTMENT_FAILURE:
      return {
        ...state,
        createDepartmentLoading: false,
        error: action.payload
      }



    case Constants.DELETE_DEPARTMENTS_REQUEST:
      return {
        ...state,
        deleteDepartmentLoading: true
      }
    case Constants.DELETE_DEPARTMENTS_SUCCESS:
      return {
        ...state,
        deleteDepartmentLoading: false,
        deleteDepartmentError: ''
      }
    case Constants.DELETE_DEPARTMENTS_FAILURE:
      return {
        ...state,
        deleteDepartmentLoading: false,
        deleteDepartmentError: action.payload
      }

    case Constants.FETCH_DEPARTMENT_REQUEST:
      return {
        ...state,
        departmentLoading: true
      }

    case Constants.FETCH_DEPARTMENT_SUCCESS:
      return {
        ...state,
        departmentLoading: false,
        department: action.payload,
        error: ''
      }
    case Constants.FETCH_DEPARTMENT_FAILURE:
      return {
        ...state,
        departmentLoading: false,
        department: [],
        error: action.payload
      }

    case Constants.UPDATE_DEPARTMENT_REQUEST:
      return {
        ...state,
        updateDepartmentLoading: true
      }
    case Constants.UPDATE_DEPARTMENT_SUCCESS:
      return {
        ...state,
        updateDepartmentLoading: false,
        error: ''
      }
    case Constants.UPDATE_DEPARTMENT_FAILURE:
      return {
        ...state,
        updateDepartmentLoading: false,
        error: action.payload
      }
    case Constants.CHECK_DEPARTMENT_NAME_REQUEST:
      return {
        ...state,
        departmentNameCheckLoading: true
      }
    case Constants.CHECK_DEPARTMENT_NAME_SUCCESS:
      return {
        ...state,
        departmentNameCheckLoading: false,
        departmentNameAvailable: action.payload.status,
        departmentNameCheckMessage: action.payload.message,
        departmentNameCheckError: ''
      }
    case Constants.CHECK_DEPARTMENT_NAME_FAILURE:
      return {
        ...state,
        departmentNameCheckLoading: false,
        departmentNameCheckError: action.payload,

      }
    case Constants.RESET_DEPARTMENT_NAME:
      return {
        ...state,
        departmentNameCheckError: '',
        departmentNameAvailable: true
      }

    default: return state
  }
}

export default departmentsReducer;