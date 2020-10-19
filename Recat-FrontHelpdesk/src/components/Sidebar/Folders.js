import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom"
import { validateUrl } from "../../utils/functions"
import Loader from "../Shared/Loader"
import InfiniteScroll from 'react-infinite-scroller';
import { fetchSideBarFoldersRequest,clearSideBarFolderRequest } from "../../containers/FolderPage/actions"
import {hideFolderSideBar} from "../../containers/BaseLayout/actions"
import { useSelector, useDispatch } from "react-redux"
import {clearArticlesRequest} from "../../containers/ArticlesPage/actions"
import LoadMoreSpinner from "../Shared/LoadMoreSpinner"


const SideFolders = (props) => {

    const dispatch = useDispatch()
    const folderData = useSelector(state => state.folderReducer)
    const baseData = useSelector(state => state.baseReducer)
    

    useEffect(() => {
        dispatch(clearSideBarFolderRequest())
    }, [baseData.categoryId])

    return (
        <Fragment>
            {(Object.keys(baseData.settings).length > 0 && baseData.settings.usersettings.userId.length > 0) ?

                <div className="rightPanelCategroyDescriptionFeilds">
                    <InfiniteScroll
                        hasMore={folderData.moreSidebarFoldersAvailable}
                        pageStart={0}
                        loadMore={() => dispatch(fetchSideBarFoldersRequest({ UserId: baseData.settings.usersettings.userId, lastVisible: folderData.lastVisibleSideBarFolderId, CategoryId: baseData.categoryId }))}
                        useWindow={false}
                    >

                        {(folderData.sidebarFolders.length > 0) ?

                            folderData.sidebarFolders.map((data, i) => (
                                <Link to={`/folder/${validateUrl(data.name)}-${data.id}`} key={i}>
                                    <div className="chose-Ctagory-list k-flex align-items-center" 
                                    onClick={() => {
                                        dispatch(clearArticlesRequest())
                                        dispatch(hideFolderSideBar())
                                         }}>

                                        <a><span>{data.name}</span></a>

                                        <figure>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="7.41" height={12} viewBox="0 0 7.41 12">
                                                <path id="ic_chevron_right_24px" d="M10,6,8.59,7.41,13.17,12,8.59,16.59,10,18l6-6Z" transform="translate(-8.59 -6)" fill="#d1d1d1" />
                                            </svg>
                                        </figure>
                                    </div>
                                </Link>
                            ))

                            : <Loader />
                        }
                    </InfiniteScroll>
                    {(folderData.sideBarFoldersLoading && folderData.sidebarFolders.length > 0) ? <LoadMoreSpinner type='sidebar'/> : null}

                </div>
                : null}
        </Fragment>
    )
}

export default SideFolders;