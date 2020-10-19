import * as Constants from "./constants"


export const initialState = {
  tickets: [],
  ticketsLoading: false

}

const ticketReducer = (state = initialState, action) => {
  switch (action.type) {

    case Constants.FETCH_TICKETS_REQUEST:
      return {
        ...state,
        ticketsLoading: true
      }

    case Constants.FETCH_TICKETS_SUCCESS:
      return {
        ...state,
        ticketsLoading: false,
        tickets: action.payload,
      }

    case Constants.FETCH_TICKETS_FAILURE:
      return {
        ...state,
        ticketsLoading: false,
        tickets: []
      }

    default: return state
  }
}

export default ticketReducer;