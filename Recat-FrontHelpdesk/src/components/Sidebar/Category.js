
import React, { Fragment } from "react";
import { Link } from "react-router-dom"
import { validateUrl } from "../../utils/functions"
import InfiniteScroll from 'react-infinite-scroller';
import Loader from "../Shared/Loader"
import { useSelector, useDispatch } from "react-redux"
import { fetchCategoriesRequest } from "../../containers/CategoryPage/actions"
import { hideCategorySideBar } from "../../containers/BaseLayout/actions"
import LoadMoreSpinner from "../Shared/LoadMoreSpinner"

const SideCategories = (props) => {

    const dispatch = useDispatch()
    const categoryData = useSelector(state => state.categoryReducer)
    const baseData = useSelector(state => state.baseReducer)


    return (
        <Fragment>
            {(Object.keys(baseData.settings).length > 0 && baseData.settings.usersettings.userId.length > 0) ?
                <div className="rightPanelCategroyDescriptionFeilds" >
                    <InfiniteScroll
                        hasMore={categoryData.moreCategoriesAvailable}
                        pageStart={0}
                        loadMore={() => dispatch(fetchCategoriesRequest({ UserId: baseData.settings.usersettings.userId, lastVisibleCategoryId: categoryData.lastVisibleCategoryId }))}
                        useWindow={false}
                    >


                        {(categoryData.categories.length > 0) ?
                            categoryData.categories.map((data, i) => (
                                <Link to={`/category/${validateUrl(data.name)}-${data.id}`} key={i}>
                                    <div className="chose-Ctagory-list k-flex align-items-center"
                                        onClick={() => { dispatch(hideCategorySideBar()) }}
                                    >

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
                    {(categoryData.categoriesLoading && categoryData.categories.length > 0) ? <LoadMoreSpinner type='sidebar'/> : null}

                </div>


                : null}
        </Fragment>
    )
}

export default SideCategories;
