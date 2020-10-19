import * as Constants from "./constants"


export const fetchAgentsRequest = data =>  ({
    type: Constants.FETCH_AGENTS_REQUEST,
    payload:data
  })


export const fetchAgentsSuccess = agents => ({
    type: Constants.FETCH_AGENTS_SUCCESS,
    payload: agents
})

export const fetchAgentsFailure = error => ({
    type: Constants.FETCH_AGENTS_FAILURE,
    payload: error
})

export const fetchAgentRequest = data =>  ({
  type: Constants.FETCH_AGENT_REQUEST,
  payload:data
})


export const fetchAgentSuccess = agents => ({
  type: Constants.FETCH_AGENT_SUCCESS,
  payload: agents
})

export const fetchAgentFailure = error => ({
  type: Constants.FETCH_AGENT_FAILURE,
  payload: error
})

export const showCreateAgentSideBar = () => ({
  type: Constants.SHOW_CREATE_AGENT_SIDEBAR
})

export const hideCreateAgentSideBar = () => ({
  type: Constants.HIDE_CREATE_AGENT_SIDEBAR
})

export const showDeleteAgentScreen = () => ({
  type: Constants.SHOW_AGENT_DELETE_SCREEN
})

export const hideDeleteAgentScreen = () => ({
  type: Constants.HIDE_AGENT_DELETE_SCREEN
})

export const showAgentSuccessToast = data => ({
  type: Constants.SHOW_AGENT_SUCCESS_TOAST,
  payload:data
})

export const hideAgentSuccessToast = () => ({
  type: Constants.HIDE_AGENT_SUCCESS_TOAST
})

export const showEditAgentSideBar = data => ({
  type: Constants.SHOW_EDIT_AGENT_SIDEBAR,
  payload: data
})

export const hideEditAgentSideBar = () => ({
  type: Constants.HIDE_EDIT_AGENT_SIDEBAR
})


export const showMiniSideBar = () => ({
  type: Constants.SHOW_MINI_SIDEBAR
})

export const hideMiniSideBar = () => ({
  type: Constants.HIDE_MINI_SIDEBAR
})

export const showFeedbackform = () => ({
  type: Constants.SHOW_FEEDBACK_FORM
})

export const hideFeedbackform = () => ({
  type: Constants.HIDE_FEEDBACK_FORM
})


export const fetchAgentSidebarDataRequest = data =>  ({
  type: Constants.FETCH_AGENT_SIDEBAR_DATA_REQUEST,
  payload: data
})

export const fetchAgentSidebarDataSuccess = data => ({
  type: Constants.FETCH_AGENT_SIDEBAR_DATA_SUCCESS,
  payload: data
})

export const fetchAgentSidebarDataFailure = error => ({
  type: Constants.FETCH_AGENT_SIDEBAR_DATA_FAILURE,
  payload: error
})

export const createAgentRequest = data =>  ({
  type: Constants.CREATE_AGENT_REQUEST,
  payload: data
})

export const createAgentSuccess = data => ({
  type: Constants.CREATE_AGENT_SUCCESS,
  payload: data
})

export const createAgentFailure = error => ({
  type: Constants.CREATE_AGENT_FAILURE,
  payload: error
})

export const searchAgentRequest = data =>  ({
  type: Constants.SEARCH_AGENT_REQUEST,
  payload: data
})

export const searchAgentSuccess = agents => ({
  type: Constants.SEARCH_AGENT_SUCCESS,
  payload: agents
})

export const searchAgentFailure = error => ({
  type: Constants.SEARCH_AGENT_FAILURE,
  payload: error
})

export const fetchRoleRequest = () =>  ({
  type: Constants.FETCH_ROLE_REQUEST
})

export const fetchRoleSuccess = data => ({
  type: Constants.FETCH_ROLE_SUCCESS,
  payload: data
})

export const fetchRoleFailure = error => ({
  type: Constants.FETCH_ROLE_FAILURE,
  payload: error
})


export const updateAgentRequest = data =>  ({
  type: Constants.UPDATE_AGENT_REQUEST, 
  payload:data
})

export const updateAgentSuccess = data => ({
  type: Constants.UPDATE_AGENT_SUCCESS,
  payload: data
})

export const updateAgentFailure = error => ({
  type: Constants.UPDATE_AGENT_FAILURE,
  payload: error
})

export const deleteAgentsRequest = data =>  ({
  type: Constants.DELETE_AGENTS_REQUEST,
  payload:data
})

export const deleteAgentsSuccess = () => ({
  type: Constants.DELETE_AGENTS_SUCCESS
})

export const deleteAgentsFailure = error => ({
  type: Constants.DELETE_AGENTS_FAILURE,
  payload: error
})

export const checkAgentEmailRequest = () =>  ({
  type: Constants.CHECK_AGENT_EMAIL_REQUEST
})

export const checkAgentEmailSuccess = data => ({
  type: Constants.CHECK_AGENT_EMAIL_SUCCESS,
  payload: data
})

export const checkAgentEmailFailure = error => ({
  type: Constants.CHECK_AGENT_EMAIL_FAILURE,
  payload: error
})

export const resetAgentEmail = () => ({
  type: Constants.RESET_AGENT_EMAIL
})

export const setEmptyAgentSearch = () => ({
  type: Constants.SET_EMPTY_AGENT_SEARCH
})
export const resetEmptyAgentSearch = () => ({
  type: Constants.RESET_EMPTY_AGENT_SEARCH
})

export const showSearchBackButton = () => ({
  type: Constants.SHOW_SEARCH_BACK_BUTTON
})

export const hideSearchBackButton = () => ({
  type: Constants.HIDE_SEARCH_BACK_BUTTON
})

export const createFeedbackRequest = data =>  ({
  type: Constants.CREATE_FEEDBACK_REQUEST,
  payload: data
})

export const createFeedbackSuccess = data => ({
  type: Constants.CREATE_FEEDBACK_SUCCESS,
  payload: data
})

export const createFeedbackFailure = error => ({
  type: Constants.CREATE_FEEDBACK_FAILURE,
  payload: error
})

export const showFeedbackSuccessToast = data => ({
  type: Constants.SHOW_FEEDBACK_SUCCESS_TOAST,
  payload:data
})

export const hideFeedbackSuccessToast = () => ({
  type: Constants.HIDE_FEEDBACK_SUCCESS_TOAST
})