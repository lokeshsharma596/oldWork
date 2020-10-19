import InfiniteScroll from 'react-infinite-scroller';
import React, { useEffect, Fragment } from "react"
import { Link } from "react-router-dom"
import { validateUrl } from "../../utils/functions"
import NoData from "../../components/NoData/NoData"
import Loader from "../../components/Shared/Loader"
import BaseLayout from "../BaseLayout"
import { useSelector, useDispatch } from "react-redux"
import { fetchArticlesRequest, fetchArticlesPageSeoRequest,clearArticlesRequest } from "./actions"
import LoadMoreSpinner from "../../components/Shared/LoadMoreSpinner"

const Index = (props) => {

    const dispatch = useDispatch()
    const articlesData = useSelector(state => state.articlesReducer)
    const baseData = useSelector(state => state.baseReducer)

    useEffect(() => {
    
        dispatch(clearArticlesRequest())
        dispatch(fetchArticlesPageSeoRequest({ FolderId: props.match.params.id.split('-').pop() }))
    }, [props.match.params.id.split('-').pop()])


    return (
        <BaseLayout>
            {(Object.keys(baseData.settings).length > 0 && baseData.settings.usersettings.userId.length > 0) ?

                <div className="mainFullWidth">
                    <div className="tilesSection aticaHelpDesk">
                        <div className="container">
                 
                            <InfiniteScroll
                                hasMore={articlesData.moreArticlesAvailable}
                                pageStart={0}
                                loadMore={() => dispatch(fetchArticlesRequest({ UserId: baseData.settings.usersettings.userId, lastVisible: articlesData.lastVisibleArticleId, FolderId: props.match.params.id.split('-').pop(), more: articlesData.availableArticleType }))}
                            >
                                <div className="row">

                                    {(articlesData.articles.length > 0) ?

                                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 panel-group aticaAcoordian mb-5" id="accordion1">


                                            <div className="panel panel-default help-desk-list">

                                                <ul>
                                                    {articlesData.articles.map((data, i) => (
                                                        <Fragment key={i}>


                                                            <li>
                                                                <Link to={`/article/${validateUrl(data.name)}-${data.id}`}>{data.name} </Link>
                                                                <span className="pin-article  ml-auto">
                                                                    {(data.pinStatus) ?
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width={26} height={26} viewBox="0 0 26 26">
                                                                            <g id="Group_1835" data-name="Group 1835" transform="translate(-1121 -874)">
                                                                                <circle id="Ellipse_80" data-name="Ellipse 80" cx={13} cy={13} r={13} transform="translate(1121 874)" fill="#a2abd1" />
                                                                                <path id="Path_1723" data-name="Path 1723" d="M.032,5.069A.238.238,0,0,1,.177,4.9,5.55,5.55,0,0,1,2.242,4.5a5.971,5.971,0,0,1,2.306.462L8.09,1.952A2.661,2.661,0,0,1,8.578.088.239.239,0,0,1,8.751,0a.247.247,0,0,1,.181.07L12.563,3.7a.238.238,0,0,1-.02.355,2.564,2.564,0,0,1-1.593.5c-.1,0-.182,0-.246-.01L7.676,8.1a6.24,6.24,0,0,1,.073,4.365.238.238,0,0,1-.389.08L3.891,9.081l-3.23,3.23a.238.238,0,0,1-.337-.337l3.23-3.23L.1,5.286A.238.238,0,0,1,.032,5.069Z" transform="translate(1127.973 881)" fill="#fff" />
                                                                                <rect id="Rectangle_983" data-name="Rectangle 983" width={1} height={8} transform="matrix(0.719, 0.695, -0.695, 0.719, 1132.919, 887.775)" fill="#fff" />
                                                                            </g>
                                                                        </svg>
                                                                        : null}

                                                                </span>
                                                                <figure><svg xmlns="http:www.w3.org/2000/svg" width="7.41" height="12" viewBox="0 0 7.41 12"><path id="ic_chevron_right_24px" d="M10,6,8.59,7.41,13.17,12,8.59,16.59,10,18l6-6Z" transform="translate(-8.59 -6)" fill="#d1d1d1"></path></svg></figure>

                                                            </li>


                                                        </Fragment>
                                                    ))}
                                                </ul>

                                            </div>


                                        </div>

                                        : (articlesData.isZeroArticles) ? <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12"><NoData /></div>

                                            : <Loader />

                                    }

                                </div>

                            </InfiniteScroll>

                           
                            {(articlesData.articlesLoading && articlesData.articles.length > 0) ? <LoadMoreSpinner type='loadmore' /> : null}

                        </div>
                    </div>
                </div>
                : null}
        </BaseLayout>
    )
}

export default Index; 
