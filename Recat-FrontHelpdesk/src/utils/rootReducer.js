import {combineReducers} from 'redux'
import categoryReducer from "../containers/CategoryPage/reducer"
import baseReducer from "../containers/BaseLayout/reducer"
import folderReducer from "../containers/FolderPage/reducer"
import articlesReducer from "../containers/ArticlesPage/reducer"
import articleReducer from "../containers/ArticlePage/reducer"
import previewArticleReducer from "../containers/PreviewPage/reducer"
import ticketReducer from "../containers/MyAreaPage/reducer"

export default combineReducers({
    baseReducer,
    categoryReducer,
    folderReducer,
    articlesReducer,
    articleReducer,
    previewArticleReducer,
    ticketReducer
})

