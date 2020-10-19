import React, { Fragment } from "react"
import { Link } from "react-router-dom"
import InfiniteScroll from 'react-infinite-scroller';
import ReactTooltip from 'react-tooltip'
import { validateUrl } from "../../utils/functions"
import NoData from "../../components/NoData/NoData"
import Loader from "../../components/Shared/Loader"
import { useSelector, useDispatch } from "react-redux"
import { fetchCategoriesRequest } from "./actions"
import BaseLayout from "../BaseLayout"
import LoadMoreSpinner from "../../components/Shared/LoadMoreSpinner"

const Index = () => {

    const dispatch = useDispatch()
    const categoryData = useSelector(state => state.categoryReducer)
    const baseData = useSelector(state => state.baseReducer)

    return (
        <BaseLayout>
            {(Object.keys(baseData.settings).length > 0 && baseData.settings.usersettings.userId.length > 0) ?
                <div className="mainFullWidth">
                    <div className="tilesSection">
                        <div className="container">

                            <InfiniteScroll
                                hasMore={categoryData.moreCategoriesAvailable}
                                pageStart={0}
                                loadMore={() => dispatch(fetchCategoriesRequest({ UserId: baseData.settings.usersettings.userId, lastVisibleCategoryId: categoryData.lastVisibleCategoryId }))}

                            >

                                {(categoryData.categories.length > 0) ?

                                    <div className="row">

                                        {categoryData.categories.map((category) => (

                                            <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4" key={category.id}>
                                                <Link to={`/category/${validateUrl(category.name)}-${category.id}`} >
                                                   
                                                        <div className="tiles-box atica-analytics">
                                                            <div className="tiles-icon">

                                                                <span className="cat-icon-wraper">
                                                                    <svg version="1.1" id="Capa_1" height="30" width="30" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                                                        viewBox="0 0 219.998 219.998" style={{ enableBackground: "new 0 0 219.998 219.998" }}>
                                                                        <path style={{ fill: baseData.settings.frontendsettings.themescolor }} d="M110,5.666l109.998,55l-109.998,55l-110-55L110,5.666z M110,135.666L30.666,95.999L0,111.332l110,55
l109.998-55l-30.666-15.333L110,135.666z M110,183.666l-79.334-39.667L0,159.332l110,55l109.998-55l-30.666-15.333L110,183.666z"/>
                                                                    </svg>
                                                                </span>




                                                            </div>
                                                            <div className="tiles-details">

                                                                {(category.name.length > 20) ?
                                                                    <>
                                                                        <h5 className="card-title mb10" data-tip={category.name}>{category.name.substring(0, 20) + " ..."}</h5>
                                                                        <ReactTooltip />
                                                                    </>
                                                                    :
                                                                    <h5 className="card-title mb10">{category.name}</h5>
                                                                }

                                                                {(category.description.length > 100) ?
                                                                    <>
                                                                        <p>{category.description.substring(0, 100) + " ..."}</p>
                                                                    </>
                                                                    :
                                                                    <p>{category.description}</p>
                                                                }

                                                            </div>
                                                        </div>
                                                 
                                                </Link>
                                            </div>
                                        ))}



                                    </div>

                                    : (categoryData.isZeroCategories) ?
                                        <NoData />
                                        : <Loader />
                                }
                            </InfiniteScroll>
                            {(categoryData.categoriesLoading && categoryData.categories.length > 0) ? <LoadMoreSpinner type='loadmore'/> : null}


                        </div>

                    </div>
                </div>
                : null}
        </BaseLayout>


    )
}

export default Index;