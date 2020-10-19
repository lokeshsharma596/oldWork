import React,{ Fragment,useEffect } from "react";
import ArticleL from "../../components/skeleton/ArticleL"
import Avatar from "../ArticlePage/Avatar"
import SocialSharing from "../ArticlePage/SocialShare"
import ReactHtmlParser from "react-html-parser"
import { useSelector, useDispatch } from "react-redux"
import {fetchPreviewArticleRequest} from "./actions"
import BaseLayout from "../BaseLayout"
const Index = (props) => {
    const dispatch = useDispatch()
    const baseData = useSelector(state => state.baseReducer)
    const previewData=useSelector(state=> state.previewArticleReducer)
    let load = false

    if (Object.keys(baseData.settings).length > 0 && baseData.settings.usersettings.userId !== undefined) {
        load = true
    }
    useEffect(() => {
        if (Object.keys(baseData.settings).length > 0 && baseData.settings.usersettings.userId !== undefined && load) {
            dispatch(fetchPreviewArticleRequest({ ArticleId: props.match.params.id, UserId: baseData.settings.usersettings.userId }))
        }
    }, [props.match.params.id, load])
    return (

        <BaseLayout>

            <div className="mainFullWidth">
                <div className="tilesSection">
                    <div className="container">
                        <div className="article-main-body">
                            <div className="row">
                                <div className="col-xs-12 col-sm-8 col-md-8 col-lg-8">


                                    {(Object.keys(previewData.article).length > 0) ?
                                        <Fragment>
                                            <div className="left-atica-articlehelp">

                                                <div className="article-header k-flex align-items-center">

                                                    <Avatar previewArticle={previewData.article} />

                                                    {(baseData.settings.usersettings.allowsharing == true) ?

                                                        (Object.keys(previewData.article).length > 0) ?
                                                            <SocialSharing />
                                                            : null
                                                        : null}

                                                </div>


                                                <div className="article-body">
                                                    <div className="article-headingds">

                                                        <h3 className="card-title mb-0">{previewData.article.name}</h3>
                                                    </div>
                                                    <div className="artcle-details-new">

                                                        {ReactHtmlParser(previewData.article.description)}
                                                    </div>
                                                </div>


                                            </div>




                                        </Fragment>

                                        : <ArticleL />}
                                </div>

                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>



        </BaseLayout >
    )
}

export default Index;



