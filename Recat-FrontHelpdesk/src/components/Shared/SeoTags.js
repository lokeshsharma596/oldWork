import { Helmet } from "react-helmet";
import { useSelector } from "react-redux"
import { useLocation } from 'react-router-dom';
import React, { Fragment } from 'react'

const SeoTags = () => {

    const pathname = useLocation().pathname.split("/")[1]
    const folderData = useSelector(state => state.folderReducer)
    const articlesData = useSelector(state => state.articlesReducer)
    const articleData = useSelector(state => state.articleReducer)

    return (
        <Fragment>
            {(pathname === "category") ?
                (Object.keys(folderData.seoData).length > 0) ?
                    <Helmet>
                        <meta name="description" content={folderData.seoData.seo_data.description} />
                        <meta name="title" content={folderData.seoData.seo_data.title} />
                        <meta name="keywords" content={folderData.seoData.seo_data.keyword} />
                    </Helmet> : null

                : (pathname == "folder") ?
                    (Object.keys(articlesData.seoData).length > 0) ?
                        <Helmet>
                            <meta name="description" content={articlesData.seoData.seo_data.description} />
                            <meta name="title" content={articlesData.seoData.seo_data.title} />
                            <meta name="keywords" content={articlesData.seoData.seo_data.keyword} />
                        </Helmet> : null

                    : (pathname == "article") ?
                        (Object.keys(articleData.articleSeo).length > 0) ?
                            <Helmet>
                                <meta name="description" content={articleData.articleSeo.seo_data.description} />
                                <meta name="title" content={articleData.articleSeo.seo_data.title} />
                                <meta name="keywords" content={articleData.articleSeo.seo_data.keyword} />
                            </Helmet> : null
                        : null}
        </Fragment>
    )
}
export default SeoTags;