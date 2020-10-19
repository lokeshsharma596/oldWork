import { Link } from "react-router-dom"
import InfiniteScroll from 'react-infinite-scroller';
import React, { useEffect } from "react"
import ReactTooltip from 'react-tooltip'
import { validateUrl } from "../../utils/functions"
import NoData from "../../components/NoData/NoData"
import Loader from "../../components/Shared/Loader"
import { useSelector, useDispatch } from "react-redux"
import { fetchFoldersRequest, clearFolderRequest, fetchFolderPageSeoRequest } from "./actions"
import BaseLayout from "../BaseLayout"
import LoadMoreSpinner from "../../components/Shared/LoadMoreSpinner"

const Index = (props) => {

    const dispatch = useDispatch()
    const folderData = useSelector(state => state.folderReducer)
    const baseData = useSelector(state => state.baseReducer)

    useEffect(() => {
        dispatch(clearFolderRequest())
        dispatch(fetchFolderPageSeoRequest({ CategoryId: props.match.params.id.split('-').pop() }))
    }, [props.match.params.id.split('-').pop()])


    return (
        <BaseLayout>
            {(Object.keys(baseData.settings).length > 0 && baseData.settings.usersettings.userId.length > 0) ?
                <div className="mainFullWidth">
                    <div className="tilesSection">
                        <div className="container">

                            <InfiniteScroll
                                hasMore={folderData.moreFoldersAvailable}
                                pageStart={0}
                                loadMore={() => dispatch(fetchFoldersRequest({ UserId: baseData.settings.usersettings.userId, lastVisibleFolderId: folderData.lastVisibleFolderId, categoryId: props.match.params.id.split('-').pop() }))}
                            >

                                {(Object.keys(folderData.folders).length > 0) ?

                                    <div className="row">
                                        {Object.keys(folderData.folders).map((data, i) => (

                                            <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4" key={i}>
                                                <div className="tiles-box atica-help-desk">
                                                    <div className="tiles-icon">

                                                        <span className="cat-icon-wraper">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="30.655" height="26.956" viewBox="0 0 30.655 26.956">
                                                                <g id="Group_1902" data-name="Group 1902" transform="translate(0 -3.5)">
                                                                    <path id="Path_1754" data-name="Path 1754" d="M13.214,7.2,10.571,3.5H0V30.456H30.655V10.9h-14.8Z" fill={baseData.settings.frontendsettings.themescolor} />
                                                                    <path id="Path_1755" data-name="Path 1755" d="M27.643,14.2h14.8V10.5H25Z" transform="translate(-11.786 -3.3)" fill={baseData.settings.frontendsettings.themescolor} />
                                                                </g>
                                                            </svg>
                                                        </span>

                                                    </div>
                                                    <div className="tiles-details pt-2">
                                                        {(folderData.folders[data].folder_data.name.length > 20) ?

                                                            <Link to={`/folder/${validateUrl(folderData.folders[data].folder_data.name)}-${data}`} >
                                                                <>
                                                                    <h5 className="card-title mb-0" data-tip={folderData.folders[data].folder_data.name}>{folderData.folders[data].folder_data.name.substring(0, 20) + " ..."}</h5>
                                                                    <ReactTooltip />
                                                                </>
                                                            </Link>
                                                            :
                                                            <Link to={`/folder/${validateUrl(folderData.folders[data].folder_data.name)}-${data}`}>

                                                                <h5 className="card-title mb-0" >{folderData.folders[data].folder_data.name}</h5>
                                                            </Link>
                                                        }
                                                        {(folderData.folders[data].folder_data.description.length > 30) ?
                                                            <>
                                                                <p data-tip={folderData.folders[data].folder_data.description}>{folderData.folders[data].folder_data.description.substring(0, 30) + " ..."}</p>
                                                                <ReactTooltip />
                                                            </>

                                                            :
                                                            <p>{folderData.folders[data].folder_data.description}</p>
                                                        }



                                                    </div>


                                                    <div className="help-desk-list">
                                                        <ul>
                                                            {folderData.folders[data].article ? Object.keys(folderData.folders[data].article).map((dat, j) => (



                                                                <li >
                                                                    <Link to={`/article/${validateUrl(folderData.folders[data].article[dat].name)}-${dat}`} key={j}>

                                                                        {(folderData.folders[data].article[dat].name.length > 35) ?
                                                                            <>
                                                                                <span data-tip={folderData.folders[data].article[dat].name}>{folderData.folders[data].article[dat].name.substring(0, 35) + " ..."}</span>
                                                                                <ReactTooltip />
                                                                            </>

                                                                            :
                                                                            <span>{folderData.folders[data].article[dat].name}</span>
                                                                        }
                                                                    </Link>
                                                                    <span className="pin-article ml-auto">
                                                                        {(folderData.folders[data].article[dat].pinStatus) ?
                                                                            <svg xmlns="http://www.w3.org/2000/svg" width={26} height={26} viewBox="0 0 26 26">
                                                                                <g id="Group_1835" data-name="Group 1835" transform="translate(-1121 -874)">
                                                                                    <circle id="Ellipse_80" data-name="Ellipse 80" cx={13} cy={13} r={13} transform="translate(1121 874)" fill="#a2abd1" />
                                                                                    <path id="Path_1723" data-name="Path 1723" d="M.032,5.069A.238.238,0,0,1,.177,4.9,5.55,5.55,0,0,1,2.242,4.5a5.971,5.971,0,0,1,2.306.462L8.09,1.952A2.661,2.661,0,0,1,8.578.088.239.239,0,0,1,8.751,0a.247.247,0,0,1,.181.07L12.563,3.7a.238.238,0,0,1-.02.355,2.564,2.564,0,0,1-1.593.5c-.1,0-.182,0-.246-.01L7.676,8.1a6.24,6.24,0,0,1,.073,4.365.238.238,0,0,1-.389.08L3.891,9.081l-3.23,3.23a.238.238,0,0,1-.337-.337l3.23-3.23L.1,5.286A.238.238,0,0,1,.032,5.069Z" transform="translate(1127.973 881)" fill="#fff" />
                                                                                    <rect id="Rectangle_983" data-name="Rectangle 983" width={1} height={8} transform="matrix(0.719, 0.695, -0.695, 0.719, 1132.919, 887.775)" fill="#fff" />
                                                                                </g>
                                                                            </svg>
                                                                            : null}
                                                                    </span>
                                                                    <figure>
                                                                        <svg xmlns="http:www.w3.org/2000/svg" width="7.41" height={12} viewBox="0 0 7.41 12">
                                                                            <path id="ic_chevron_right_24px" d="M10,6,8.59,7.41,13.17,12,8.59,16.59,10,18l6-6Z" transform="translate(-8.59 -6)" fill="#d1d1d1" />
                                                                        </svg>
                                                                    </figure>

                                                                </li>

                                                            )) : null}

                                                        </ul>
                                                    </div>




                                                    {(folderData.folders[data].count > 5) ?
                                                        <div className="viewAllArticle">
                                                            <Link to={`/folder/${validateUrl(folderData.folders[data].folder_data.name)}-${data}`}>
                                                                <a> View All {folderData.folders[data].count} Articles </a>
                                                            </Link>
                                                        </div>
                                                        : null}


                                                </div>
                                            </div>

                                        ))}
                                    </div>

                                    : (folderData.isZeroFolders == true) ? <NoData />
                                        : <Loader />

                                }

                            </InfiniteScroll>
                            {(folderData.foldersLoading && Object.keys(folderData.folders).length > 0) ? <LoadMoreSpinner type='loadmore'/>  : null}

                        </div>
                    </div>
                </div>
                : null}
        </BaseLayout >

    )
}

export default Index;