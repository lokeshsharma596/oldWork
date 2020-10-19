import {all,fork} from "redux-saga/effects"
import * as categorySaga from "../containers/CategoryPage/sagas"
import * as baseSaga from "../containers/BaseLayout/sagas"
import * as folderSaga from "../containers/FolderPage/sagas"
import * as articlesSaga from "../containers/ArticlesPage/sagas"
import * as articleSaga from "../containers/ArticlePage/sagas"
import * as previewArticleSaga from "../containers/PreviewPage/sagas"
import * as ticketsSaga from "../containers/MyAreaPage/sagas"


export default function* rootSaga(){
    yield all([
        ...Object.values(baseSaga),
        ...Object.values(categorySaga),
        ...Object.values(folderSaga),
        ...Object.values(articlesSaga),
        ...Object.values(articleSaga),
        ...Object.values(previewArticleSaga),
        ...Object.values(ticketsSaga)
    ].map(fork))
}