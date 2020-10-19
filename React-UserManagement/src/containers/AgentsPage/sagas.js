import { all, fork, takeEvery, put, call, delay } from 'redux-saga/effects'
import * as Services from "../../utils/services"
import * as Actions from "./actions"
import * as Constants from "./constants"


//fetchers
// function* fetchAgents(action) {
//     try {
//         yield put(Actions.hideSearchBackButton())
//         const data = yield call(Services.getApiCall, { userId: action.payload }, 'getAgents');
//         yield put(Actions.fetchAgentsSuccess(data.agents));
//     } catch (e) {
//         yield put(Actions.fetchAgentsFailure(e.message));
//     }
// }

// function* fetchAgentSidebarData(action) {
//     try {
//         const data = yield call(Services.getApiCall, { userId: action.payload }, 'getAgentSidebarData');
//         yield put(Actions.fetchAgentSidebarDataSuccess(data));
//     } catch (e) {
//         yield put(Actions.fetchAgentSidebarDataFailure(e.message));
//     }
// }

// function* createAgent(action) {
//     try {
//         yield call(Services.postApiCall, { ...action.payload }, 'createAgent');
//         yield delay(1000)
//         yield put(Actions.createAgentSuccess());
//         yield put(Actions.hideCreateAgentSideBar());
//         yield put(Actions.showAgentSuccessToast('Agent added'));
//         yield put(Actions.fetchAgentsRequest(localStorage.getItem('userId')))
//     } catch (e) {
//         yield put(Actions.createAgentFailure(e.message));
//     }
// }

// function* searchAgentss(action) {
//     try {
//         const data = yield call(Services.getApiCall, { ...action.payload }, 'searchAgents');
//         if(data.agents.length === 0){
//             yield put(Actions.setEmptyAgentSearch())
//         }
//         yield put(Actions.searchAgentSuccess(data.agents));
//         yield put(Actions.showSearchBackButton())
//     } catch (e) {
//         yield put(Actions.searchAgentFailure(e.message));
//     }
// }

// function* fetchRole(action) {
//     try {
//         const data = yield call(Services.getApiCall, { ...action.payload }, 'getRole');
//         yield put(Actions.fetchRoleSuccess(data.role));
//     } catch (e) {
//         yield put(Actions.fetchRoleFailure(e.message));
//     }
// }

function* fetchAgent(action) {
    try {
        const data = yield call(Services.getApiCall, { agentId: action.payload }, 'getAgent');
        if (data.agent.roleId !== 'custom') {
            yield put(Actions.fetchRoleRequest({ userId: localStorage.getItem('userId'), roleId: data.agent.roleId }))
        }
        yield put(Actions.fetchAgentSuccess(data.agent));

    } catch (e) {
        yield put(Actions.fetchAgentFailure(e.message));
    }
}


function* updateAgent(action) {
    try {
        yield call(Services.putApiCall, { ...action.payload }, 'updateAgent');
        yield delay(1000)
        yield put(Actions.updateAgentSuccess());
        yield put(Actions.hideEditAgentSideBar());
        yield put(Actions.showAgentSuccessToast('Agent updated'));
        yield put(Actions.fetchAgentsRequest(localStorage.getItem('userId')))

    } catch (e) {
        yield put(Actions.updateAgentFailure(e.message));
    }
}

function* deleteAgent(action) {
    try {
        yield call(Services.postApiCall, { ...action.payload }, 'deleteAgents');
        yield delay(2000)
        yield put(Actions.deleteAgentsSuccess());
        yield put(Actions.hideDeleteAgentScreen());
        yield put(Actions.showAgentSuccessToast('Agent deleted'));
        yield put(Actions.fetchAgentsRequest(localStorage.getItem('userId')))

    } catch (e) {
        yield put(Actions.deleteAgentsFailure(e.message));
    }
}

function* createfeedbackform(action){
    try {
        yield call(Services.feedbackSubmit, { ...action.payload }, 'feedback');
        yield delay(2000)
        yield put(Actions.createFeedbackSuccess());
        yield put(Actions.hideFeedbackform());
        yield put(Actions.showAgentSuccessToast('Feedback Submit'));

    } catch (e) {
        yield put(Actions.createFeedbackFailure(e.message));
    }
}

// function* checkAgentEmail(action) {
//     try {
//         const data = yield call(Services.getApiCall, { ...action.payload }, 'checkEmailExist');
//         yield delay(500)
//         if (data) {
//             yield put(Actions.checkAgentEmailSuccess({ "status": true, "message": "" }));
//         } else if (data === false) {
//             yield put(Actions.checkAgentEmailSuccess({ "status": false, "message": "Email Already Exist" }));
//         }
//     } catch (e) {
//         yield put(Actions.checkAgentEmailFailure(e.message));
//     }
// }

//watchers
function* fetchAgentsSaga() {
    yield takeEvery(Constants.FETCH_AGENTS_REQUEST, fetchAgents)
}

function* fetchAgentSidebarDataSaga() {
    yield takeEvery(Constants.FETCH_AGENT_SIDEBAR_DATA_REQUEST, fetchAgentSidebarData)
}

function* createAgentSaga() {
    yield takeEvery(Constants.CREATE_AGENT_REQUEST, createAgent)
}

function* searchAgentsSaga() {
    yield takeEvery(Constants.SEARCH_AGENT_REQUEST, searchAgentss)
}

function* fetchRoleSaga() {
    yield takeEvery(Constants.FETCH_ROLE_REQUEST, fetchRole)
}

function* fetchAgentSaga() {
    yield takeEvery(Constants.FETCH_AGENT_REQUEST, fetchAgent)
}

function* updateAgentSaga() {
    yield takeEvery(Constants.UPDATE_AGENT_REQUEST, updateAgent)
}

function* deleteAgentsSaga() {
    yield takeEvery(Constants.DELETE_AGENTS_REQUEST, deleteAgent)
}

function* checkAgentEmailSaga() {
    yield takeEvery(Constants.CHECK_AGENT_EMAIL_REQUEST, checkAgentEmail)
}



function* createFeedbackSaga() {
    yield takeEvery(Constants.CREATE_FEEDBACK_REQUEST, createfeedbackform)
}

//export sagas
export default function* rootSaga() {
    yield all([
        fork(fetchAgentsSaga),
        fork(fetchAgentSidebarDataSaga),
        fork(createAgentSaga),
        fork(searchAgentsSaga),
        fork(fetchRoleSaga),
        fork(fetchAgentSaga),
        fork(updateAgentSaga),
        fork(deleteAgentsSaga),
        fork(checkAgentEmailSaga),
        fork(createFeedbackSaga),
    ])
};