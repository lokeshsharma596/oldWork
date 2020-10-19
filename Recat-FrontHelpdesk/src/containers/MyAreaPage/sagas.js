import { all, fork, takeEvery, put, call } from 'redux-saga/effects'
import * as Services from "../../utils/services"
import * as Actions from "./actions"
import * as Constants from "./constants"



//fetchers
function* fetchTickets(action) {
    try {
        const tickets = yield call(Services.getApiCall,action.payload, 'getTickets');
        if (tickets.status === '200') {
            yield put(Actions.fetchTicketsSuccess(tickets.data.tickets));
        }
        else{
            yield put(Actions.fetchTicketsFailure());
        }
    } catch (e) {
        yield put(Actions.fetchTicketsFailure());
    }
}


//watchers
function* fetchTicketsSaga() {
    yield takeEvery(Constants.FETCH_TICKETS_REQUEST, fetchTickets)
}


//export sagas
export default function* rootSaga() {
    yield all([
        fork(fetchTicketsSaga)
    ])
};