import * as Constants from "./constants"


export const initialState = {
  agentsLoading: false,
  agents: [],
  agentsError: '',

  showCreateAgentSideBar: false,
  showEditAgentSideBar: false,

  agentSidebarDataloading: false,
  agentSidebarData: {},
  agentSidebarDataError: '',

  newAgentloading: false,
  newAgent: {},
  newAgentError: '',

  roleLoading: false,
  role: [],
  roleError: '',

  agentloading: false,
  agent: [],
  agentError: '',

  editAgentId: '',

  deleteAgentLoading: false,
  deleteAgentError: '',

  showAgentSuccessToast: false,
  agentToastMessage: '',

  showDeleteScreen: false,
  showMiniSideBar: false,

  agentEmailCheckLoading: false,
  agentEmailAvailable: '',
  agentEmailCheckError: '',
  agentEmailCheckMessage: '',

  emptyAgentSearch: false,
  showSearchBackButton: false,
  
  showFeedbackForm:false,
  
  showFeedbackSuccessToast: false,
}


const agentsReducer = (state = initialState, action) => {
  switch (action.type) {

    case Constants.FETCH_AGENTS_REQUEST:
      return {
        ...state,
        agentsLoading: true
      }
    case Constants.FETCH_AGENTS_SUCCESS:
      return {
        ...state,
        agentsLoading: false,
        agents: action.payload,
        agentsError: ''
      }
    case Constants.FETCH_AGENTS_FAILURE:
      return {
        ...state,
        agentsLoading: false,
        agents: [],
        agentsError: action.payload
      }


    case Constants.FETCH_AGENT_REQUEST:
      return {
        ...state,
        agentloading: true,
        agent: []
      }
    case Constants.FETCH_AGENT_SUCCESS:
      return {
        ...state,
        agentloading: false,
        agent: action.payload,
        agentError: ''
      }
    case Constants.FETCH_AGENT_FAILURE:
      return {
        ...state,
        agentloading: false,
        agent: [],
        agentError: action.payload
      }

    case Constants.SHOW_CREATE_AGENT_SIDEBAR:
      return {
        ...state,
        showCreateAgentSideBar: true
      }
    case Constants.HIDE_CREATE_AGENT_SIDEBAR:
      return {
        ...state,
        showCreateAgentSideBar: false
      }
    
    case Constants.SHOW_FEEDBACK_FORM:
      return {
        ...state,
        showFeedbackForm: true
      }
    case Constants.HIDE_FEEDBACK_FORM:
      return {
        ...state,
        showFeedbackForm: false
      }

    case Constants.SHOW_AGENT_DELETE_SCREEN:
      return {
        ...state,
        showDeleteScreen: true
      }

    case Constants.HIDE_AGENT_DELETE_SCREEN:
      return {
        ...state,
        showDeleteScreen: false
      }

    case Constants.SHOW_AGENT_SUCCESS_TOAST:
      return {
        ...state,
        showAgentSuccessToast: true,
        agentToastMessage: action.payload
      }
    case Constants.HIDE_AGENT_SUCCESS_TOAST:
      return {
        ...state,
        showAgentSuccessToast: false,
        agentToastMessage: ''
      }
    
      case Constants.SHOW_FEEDBACK_SUCCESS_TOAST:
        return {
          ...state,
          showFeedbackSuccessToast: true,
          agentToastMessage: action.payload
        }
      case Constants.HIDE_FEEDBACK_SUCCESS_TOAST:
        return {
          ...state,
          showFeedbackSuccessToast: false,
          agentToastMessage: ''
        }

    case Constants.SHOW_EDIT_AGENT_SIDEBAR:
      return {
        ...state,
        showEditAgentSideBar: true,
        editAgentId: action.payload
      }
    case Constants.HIDE_EDIT_AGENT_SIDEBAR:
      return {
        ...state,
        showEditAgentSideBar: false,
        editAgentId: ''
      }
    case Constants.SHOW_MINI_SIDEBAR:
      return {
        ...state,
        showMiniSideBar: true
      }
    case Constants.HIDE_MINI_SIDEBAR:
      return {
        ...state,
        showMiniSideBar: false
      }
    case Constants.FETCH_AGENT_SIDEBAR_DATA_REQUEST:
      return {
        ...state,
        agentSidebarDataloading: true
      }

    case Constants.FETCH_AGENT_SIDEBAR_DATA_SUCCESS:
      return {
        ...state,
        agentSidebarDataloading: false,
        agentSidebarData: action.payload,
        agentSidebarDataError: ''
      }

    case Constants.FETCH_AGENT_SIDEBAR_DATA_FAILURE:
      return {
        ...state,
        agentSidebarDataloading: false,
        agentSidebarData: [],
        agentSidebarDataError: action.payload
      }



    case Constants.CREATE_AGENT_REQUEST:
      return {
        ...state,
        newAgentloading: true
    }
    case Constants.CREATE_AGENT_SUCCESS:
      return {
        ...state,
        newAgentloading: false,
        newAgentError: ''
      }
    case Constants.CREATE_AGENT_FAILURE:
      return {
        ...state,
        newAgentloading: false,
        newAgentError: action.payload
      }
      
      case Constants.CREATE_FEEDBACK_REQUEST:
        return {
          ...state,
          newfeedbackloading: true
      }
      case Constants.CREATE_FEEDBACK_SUCCESS:
        return {
          ...state,
          newfeedbackloading: false,
          newfeedbackError: ''
        }
      case Constants.CREATE_FEEDBACK_FAILURE:
        return {
          ...state,
          newfeedbackloading: false,
          newfeedbackError: action.payload
        }


    case Constants.SEARCH_AGENT_REQUEST:
      return {
        ...state,
        loading: true
      }
    case Constants.SEARCH_AGENT_SUCCESS:
      return {
        ...state,
        loading: false,
        agents: action.payload,
        error: ''
      }
    case Constants.SEARCH_AGENT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      }


    case Constants.FETCH_ROLE_REQUEST:
      return {
        ...state,
        roleLoading: true,
        role:[]
      }
    case Constants.FETCH_ROLE_SUCCESS:
      return {
        ...state,
        roleLoading: false,
        role: action.payload,
        error: ''
      }
    case Constants.FETCH_ROLE_FAILURE:
      return {
        ...state,
        roleLoading: false,
        role: [],
        error: action.payload
      }

    case Constants.DELETE_AGENTS_REQUEST:
      return {
        ...state,
        deleteAgentLoading: true
      }

    case Constants.DELETE_AGENTS_SUCCESS:
      return {
        ...state,
        deleteAgentLoading: false,
        deleteAgentError: ''
      }

    case Constants.DELETE_AGENTS_FAILURE:
      return {
        ...state,
        deleteAgentLoading: false,
        deleteAgentError: action.payload
      }
    case Constants.CHECK_AGENT_EMAIL_REQUEST:
      return {
        ...state,
        agentEmailCheckLoading: true
      }
    case Constants.CHECK_AGENT_EMAIL_SUCCESS:
      return {
        ...state,
        agentEmailCheckLoading: false,
        agentEmailAvailable: action.payload.status,
        agentEmailCheckMessage: action.payload.message,
        agentEmailCheckError: ''
      }
    case Constants.CHECK_AGENT_EMAIL_FAILURE:
      return {
        ...state,
        agentEmailCheckLoading: false,
        agentEmailCheckError: action.payload,
      }

    case Constants.RESET_AGENT_EMAIL:
      return {
        ...state,
        agentEmailCheckError: '',
        agentEmailAvailable: true
      }

    case Constants.SET_EMPTY_AGENT_SEARCH:
      return {
        ...state,
        emptyAgentSearch: true
      }

    case Constants.RESET_EMPTY_AGENT_SEARCH:
      return {
        ...state,
        emptyAgentSearch: false
      }
    case Constants.SHOW_SEARCH_BACK_BUTTON:
      return {
        ...state,
        showSearchBackButton: true
      }
    case Constants.HIDE_SEARCH_BACK_BUTTON:
      return {
        ...state,
        showSearchBackButton: false
      }

    default: return state
  }
}

export default agentsReducer;