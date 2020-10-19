import { all, fork, takeEvery, put, call,delay } from 'redux-saga/effects'
import * as Services from "../../utils/services"
import * as Constants from "./constants"
import * as Actions from "./actions"

//fetchers
// function* fetchRoles(action) {
//     try {
//         const data = yield call(Services.getApiCall,{userId:action.payload},'getRoles');
//         yield put(Actions.fetchRolesSuccess(data.roles));
//     } catch (e) {
//         yield put(Actions.fetchRolesFailure(e.message));
//     }
// }

// function* createRole(action){
//     try {
//         yield call(Services.postApiCall,{...action.payload},'createRole');        
//         yield delay(1000)
//         yield put(Actions.createRoleSuccess());
//         yield put(Actions.hideCreateRoleSideBar());
//         yield put(Actions.showRoleSuccessToast('Role added'));
//         yield put(Actions.fetchRolesRequest(localStorage.getItem('userId')))
//     } catch (e) {
//         yield put(Actions.createRoleFailure(e.message));
//     }
// }

// function* deleteRole(action) {
//     try {
//         yield call(Services.postApiCall,{...action.payload},'deleteRoles');
//         yield delay(1000)
//         yield put(Actions.deleteRolesFailure());
//         yield put(Actions.hideDeleteRoleScreen())
//         yield put(Actions.showRoleSuccessToast('Role deleted'));
//         yield put(Actions.fetchRolesRequest(localStorage.getItem('userId')))      
//     } catch (e) {
//         yield put(Actions.deleteRolesFailure(e.message));
//     }
// }
 
// function* fetchRole(action) {
//     try {
//         const data = yield call(Services.getApiCall,{...action.payload},'getRole');
//         yield put(Actions.fetchRoleSuccess(data.role));
//     } catch (e) {
//         yield put(Actions.fetchRoleFailure(e.message));
//     }
// }

function* updateRole(action) {
    try {
        yield call(Services.putApiCall,{...action.payload},'updateRole');
        yield delay(500)
        yield put(Actions.updateRoleSuccess());
        yield put(Actions.hideEditRoleSideBar())
        yield put(Actions.showRoleSuccessToast('Role updated'));
        yield put(Actions.fetchRolesRequest(localStorage.getItem('userId')))
    } catch (e) {
        yield put(Actions.updateRoleFailure(e.message));
    }
}

// function* checkRoleName(action) {
//     try {
//         console.log("dssdsfj");
//         const data = yield call(Services.getApiCall,{...action.payload,collection:'roles'},'checkNameAvailable');
//         yield delay(500)
//         if(data){
//             yield put(Actions.checkRoleNameSuccess({"status":true,"message":""}));
//         }else if(data === false){
//             yield put(Actions.checkRoleNameSuccess({"status":false,"message":"That Name is taken. Try another"}));
//         }
//     } catch (e) {
//         yield put(Actions.checkRoleNameFailure(e.message));
//     }
// }

//watchers
function* fetchRolesSaga() {
    yield takeEvery(Constants.FETCH_ROLES_REQUEST, fetchRoles)
}

function* createRoleSaga() {
    yield takeEvery(Constants.CREATE_ROLE_REQUEST, createRole)
}

function* deleteRolesSaga() {
    yield takeEvery(Constants.DELETE_ROLES_REQUEST, deleteRole)
}

function* fetchRoleSaga() {
    yield takeEvery(Constants.FETCH_ROLE_REQUEST,fetchRole)
}

function* updateRoleSaga() {
    yield takeEvery(Constants.UPDATE_ROLE_REQUEST, updateRole)
}

function* checkRoleNameSaga() {
    yield takeEvery(Constants.CHECK_ROLE_NAME_REQUEST, checkRoleName)
}

//export sagas
export default function* rootSaga() {
    yield all([
        fork(fetchRolesSaga),
        fork(createRoleSaga),
        fork(deleteRolesSaga),
        fork(fetchRoleSaga),
        fork(updateRoleSaga),
        fork(checkRoleNameSaga)
    ])
};