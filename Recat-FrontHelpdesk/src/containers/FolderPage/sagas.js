import { all, fork, takeEvery, put, call,takeLatest } from 'redux-saga/effects'
import * as Services from "../../utils/services"
import * as Actions from "./actions"
import * as Constants from "./constants"
import {isContentExist} from "../BaseLayout/actions"

//fetchers
function* fetchFolders(action) {
    try {
        const folder = yield call(Services.getApiCall, { UserId: action.payload.UserId, lastVisible: action.payload.lastVisibleFolderId,CategoryId:action.payload.categoryId }, 'listFolders');
        if (folder.message === "No Folders Exist") {
            yield put(Actions.zeroFolders(true));
        }
        else if (folder.message === "Folders Received More Available") {
            yield put(Actions.fetchFoldersSuccess(folder.data.Folders));
            yield put(Actions.lastVisibleFolderId(folder.data.lastVisible));
            yield put(Actions.moreFoldersAvailable(true));
        }
        else if (folder.message == "All Folders Received") {
            yield put(Actions.fetchFoldersSuccess(folder.data.Folders));
            yield put(Actions.lastVisibleFolderId(folder.data.lastVisible));
            yield put(Actions.moreFoldersAvailable(false));
        }   
        else if(folder.message === "Incorrect Catgeory ID"){
            yield put(isContentExist()); 
        }
    } catch (e) {
        yield put(Actions.fetchFoldersFailure(e.message));
    }
}

function* fetchSideBarFolderNames(action) {
    try {
        const folderNames = yield call(Services.getApiCall, {...action.payload}, 'listFolderNames');
        if (folderNames.message == "No Folders Exist") {
            yield put(Actions.zeroSideBarFolders(true));
        }
        else if (folderNames.message == "Folders Received More Available") {
            yield put(Actions.fetchSideBarFoldersSuccess(folderNames.data.Folders));
            yield put(Actions.lastVisibleSideBarFolderId(folderNames.data.lastVisible));
            yield put(Actions.moreSideBarFoldersAvailable(true));
        }
        else if (folderNames.message == "All Folders Received") {
            yield put(Actions.fetchSideBarFoldersSuccess(folderNames.data.Folders));
            yield put(Actions.lastVisibleSideBarFolderId(folderNames.data.lastVisible));
            yield put(Actions.moreSideBarFoldersAvailable(false));
        }
    } catch (e) {
        yield put(Actions.fetchSideBarFoldersFailure(e.message));
    }
}

function* fetchFolderSeo(action){
    try{
        const seo = yield call(Services.getApiCall,{...action.payload},'getFolderPageSeo')
        yield put(Actions.fetchFolderPageSeoSuccess(seo.data))
    }catch(e){
        yield put(Actions.fetchFolderPageSeoFailure(e))
    }
}


//watchers
function* fetchFoldersSaga() {
    yield takeEvery(Constants.FETCH_FOLDERS_REQUEST, fetchFolders)
}

function* fetchFolderSeoSaga() {
    yield takeEvery(Constants.FETCH_FOLDER_PAGE_SEO_REQUEST, fetchFolderSeo)
}

function* fetchSideBarFolderNamesSaga() {
    yield takeLatest(Constants.FETCH_FOLDER_NAMES_REQUEST, fetchSideBarFolderNames)
}

//export sagas
export default function* rootSaga() {
    yield all([
        fork(fetchFoldersSaga),
        fork(fetchFolderSeoSaga),
        fork(fetchSideBarFolderNamesSaga)
    ])
};