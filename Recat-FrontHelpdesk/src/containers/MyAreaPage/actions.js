import * as Constants from "./constants"



export const fetchTicketsRequest = data => ({
    type: Constants.FETCH_TICKETS_REQUEST,
    payload: data
})

export const fetchTicketsSuccess = data => ({
    type: Constants.FETCH_TICKETS_SUCCESS,
    payload: data
})

export const fetchTicketsFailure = error => ({
    type: Constants.FETCH_TICKETS_FAILURE,
    payload: error
})