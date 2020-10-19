import React, { Fragment, useEffect } from "react";
import Recent from "../../components/Shared/Recent"
import ArticleL from "../../components/skeleton/ArticleL"
import Avatar from "./Avatar"
import SocialSharing from "./SocialShare"
import ArticleContent from "./ArticleContent"
import UpvoteBar from "./UpvoteBar"
import WriteComment from "./WriteComment"
import LoginPopup from "./LoginPopup"
import RecaptchaPopup from "./RecaptchaPopup"
import { useSelector, useDispatch } from "react-redux"
import { fetchArticleRequest,checkVoteStatusRequest } from "./actions"
import BaseLayout from "../BaseLayout"
import Comments from "./comments"
import {Helmet} from "react-helmet";
 

const Index = (props) => {
    const dispatch = useDispatch()
    const articleData = useSelector(state => state.articleReducer)
    const baseData = useSelector(state => state.baseReducer)
    const articleId=props.match.params.id.split('-').pop()
    let load = false

    if (Object.keys(baseData.settings).length > 0 && baseData.settings.usersettings.userId !== undefined) {
        load = true
    }
    useEffect(() => {
        if (Object.keys(baseData.settings).length > 0 && baseData.settings.usersettings.userId !== undefined && load) {
            dispatch(fetchArticleRequest({ ArticleId: articleId, UserId: baseData.settings.usersettings.userId }))
            if(Object.keys(baseData.authUser).length){
                dispatch(checkVoteStatusRequest({articleId: articleId, userId: baseData.settings.usersettings.userId,userEmail:baseData.authUser.email}))
            }
        }
    }, [articleId, load])

    return (

        <BaseLayout>

            {(articleData.loginPopupVisibility || articleData.recaptchaPopupVisibility) ? <div className="shadow"></div> : null}



            <Helmet>
                <script src={`https://cdn.tiny.cloud/1/${process.env.REACT_APP_TINY_API_KEY}/tinymce/5/tinymce.min.js`} referrerpolicy="origin"></script>
            </Helmet>

            <div className="mainFullWidth">
                <div className="tilesSection">
                    <div className="container">
                        <div className="article-main-body">
                            <div className="row">
                                <div className="col-xs-12 col-sm-8 col-md-8 col-lg-8">


                                    {(Object.keys(articleData.article).length > 0) ?
                                        <Fragment>
                                            <div className="left-atica-articlehelp">

                                                <div className="article-header k-flex align-items-center">

                                                    <Avatar />


                                                    {(baseData.settings.usersettings.allowsharing === true && articleData.article.permission.includes('3')) ?
                                                        <SocialSharing name={articleData.article.name} />
                                                        : null}

                                                </div>


                                                <ArticleContent />


                                                <div className="comment-section">

                                                    <UpvoteBar articleId={articleId} />

                                                    {(articleData.article.permission.includes('1')) ?
                                                        <WriteComment articleId={articleId} url={window.location.href} />
                                                        : null}



                                                    <LoginPopup articleId={articleId} url={window.location.href} />

                                                    <RecaptchaPopup
                                                        articleId={articleId} url={window.location.href}
                                                    /> 

                                                </div>
                                            </div>
                                            <Comments articleId={articleId}/>
                                        </Fragment>

                                        : <ArticleL />}
                                </div>


                                <Recent />









                            </div>
                        </div>
                    </div>
                </div>
            </div>



        </BaseLayout >
    )
}

export default Index;
