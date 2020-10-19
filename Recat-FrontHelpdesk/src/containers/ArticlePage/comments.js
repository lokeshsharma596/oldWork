import React,{ Fragment,useEffect, useState } from "react";
import ReactHtmlParser from "react-html-parser"
import { Dateformate } from "../../utils/functions"
import { db } from "../../utils/db"
import { useSelector } from "react-redux"

const Comments = (props) => {
    const [state, setstate] = useState({
        Comments: []
    })

    const baseData = useSelector(state => state.baseReducer)
    const articleData = useSelector(state => state.articleReducer)

    useEffect(() => {

       const unsubscribe= db.collection('users').doc(baseData.settings.usersettings.userId).collection('comments').where("articleId", "==", props.articleId)
            .orderBy('createdON').onSnapshot((documentSet => {
                if (documentSet.empty) {
                    setstate({ ...state, Comments: [] })                   
                }
                else {
                    var comments = []
                    documentSet.forEach(doc => {
                        comments.push({
                            id: doc.id,
                            ...doc.data()
                        });
                    })
                    setstate({ ...state, Comments: comments.reverse() })
                }       
            }))

            return () =>unsubscribe()
            
    }, [props.articleId])

    
    return (
        <Fragment>


            <div className="mainFullWidth">
                <div className="tilesSection">
                    <div className="container">
                        <div className="article-main-body">
                            <div className="row">
                                <div className="col-xs-12 col-sm-8 col-md-8 col-lg-8">
                                    <div className="left-atica-articlehelp">
                                        {(baseData.settings.usersettings.allowcomment) ?

                                            (articleData.article.permission.includes('1')) ?

                                                <div className="comment-section">

                                                    {state.Comments.length > 0 ?

                                                        state.Comments.map((data, i) => (


                                                            <div className="comment-writeArea comment-replay-main-section py-4 border-bottom" key={data.id}>


                                                                <div className="comment-user">
                                                                    <img src='../images/user.png' alt="" />
                                                                </div>
                                                                <div className="comment-write-area-aside">
                                                                    <div className="comment-user-replay">
                                                                        <h4>{data.commenterEmail}</h4>
                                                                        <span>{Dateformate(data.createdON)}</span>
                                                                        {ReactHtmlParser(data.comment)}
                                                                    </div>
                                                                </div>


                                                            </div>


                                                        ))

                                                        : null}
                                                </div>
                                                : null

                                            : null}
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </Fragment>
    )
}

export default Comments;











