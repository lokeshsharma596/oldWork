import React, { useEffect, useState } from "react";
import { db } from "../../utils/db"
import { useSelector, useDispatch } from "react-redux"
import { setTypeOfTask, showLoginPopUp, showRecaptchaPopUp, performTask,updateVoteColor } from "./actions"

const UpvoteBar = (props) => {
    const [count, setCount] = useState({
        upvoteCount: 0,
        downvoteCount: 0,
        commentCount: 0
    })
    const dispatch = useDispatch()

    const baseData = useSelector(state => state.baseReducer)
    const articleData = useSelector(state => state.articleReducer)


    useEffect(() => {

        db.collection('article').doc(props.articleId).onSnapshot(doc => {
            let count = []
            count.push({
                upvoteCount: doc.data().upvoteCount,
                downvoteCount: doc.data().downvoteCount,
                commentCount: doc.data().commentCount
            })
            setCount(count[0])
        })
    }, [props.articleId])

    const handleSubmit = async (type) => {
        if (baseData.settings.frontendsettings.allowsignup === true) {
            if (baseData.isAuthenticated === true) {

                

                dispatch(performTask({
                    userid: baseData.settings.usersettings.userId,
                    articleId: props.articleId,
                    type: type,
                    articlename: articleData.article.name,
                    email: baseData.authUser.email,
                }))

                if(type==='upvote'){
                    dispatch(updateVoteColor({upvote:true,downvote:false}))
                }else{
                    dispatch(updateVoteColor({upvote:false,downvote:true}))
                }
              
            } else {
                dispatch(setTypeOfTask(type))
                dispatch(showLoginPopUp())
            }
        }
        else if (baseData.settings.frontendsettings.allowcaptcha === true) {
            dispatch(setTypeOfTask(type))
            dispatch(showRecaptchaPopUp())
        }
    }



    return (
        <div className="comment-header k-flex align-items-center">

            {(baseData.settings.usersettings.allowcomment) ?


                (articleData.article.permission.includes('1')) ?
                    <div className="comment-number">
                        {(count.commentCount === undefined) ?
                            <p>0 Comment</p>
                            : (count.commentCount === 1) ?
                                <p>1 Comment</p>
                                : <p>{count.commentCount} Comments</p>}

                    </div>
                    : null
                : null}

            {(baseData.settings.usersettings.allowrating) ?

                (articleData.article.permission.includes('2')) ?

                    <div className="like-dislike">
                        <ul>
                            <li>Was this Article useful :</li>
                            <li>
                                <div className="handinincomment like-comment"
                                    onClick={() => { handleSubmit('upvote') }}>


                                    <svg height="20" viewBox="0 0 16 16" width="20" xmlns="http://www.w3.org/2000/svg">
                                        <path d="m0 1v8c0 .552246.447693 1 1 1h3v-10h-3c-.552307 0-1 .447693-1 1z" transform="translate(0 5)" fill={articleData.voteStatus.upvote?'#64B5F6':''} />
                                        <path d="m9.15332 5.02979h-2.9541c-.258301 0-.387695-.172363-.431152-.246582-.043457-.0737305-.131348-.270508-.0063477-.496094l1.0415-1.87549c.228516-.410645.251953-.893555.0649414-1.32471-.187012-.43164-.556152-.744629-1.0127-.858398l-.734375-.183594c-.178711-.0449219-.368164.0122071-.492676.150391l-3.9873 4.42969c-.413574.460449-.641113 1.0542-.641113 1.67236v5.23242c0 1.37842 1.12158 2.5 2.5 2.5l4.97412-.0004883c1.12305 0 2.11475-.756348 2.41113-1.83887l1.06738-4.89844c.03125-.13623.0473633-.275879.0473633-.415527 0-1.01807-.828613-1.84668-1.84668-1.84668z" transform="translate(5 .97)" fill={articleData.voteStatus.upvote?'#64B5F6':''} />
                                    </svg>

                                </div>

                            </li>
                            <li>
                                {(count.upvoteCount === undefined) ?
                                    <p>0</p>
                                    : <p>{count.upvoteCount}</p>
                                }
                            </li>

                            <li>
                                <div className="handinincomment dislike-comment" onClick={() => { handleSubmit('downvote') }}>

                                    <svg version="1.1" id="Layer_1" height="20" width="20" xmlns="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                        viewBox="0 0 512 512" style={{ enableBackground: 'new 0 0 512 512' }}>
                                        <g>
                                            <g>
                                                <g>
                                                    <path d="M234.667,42.667H118.833c-17.875,0-34.458,8.875-44.375,23.75l-63.792,95.688C3.688,172.552,0,184.74,0,197.333
				s3.688,24.781,10.667,35.229l10.667,16v28.771C21.333,300.865,40.469,320,64,320h93.479c5.375,0,8.135,3.542,9.073,5.063
				c0.948,1.521,2.875,5.573,0.469,10.375l-34.25,68.5c-3.125,6.24-4.771,13.229-4.771,20.208c0,24.917,20.271,45.188,45.188,45.188
				h8.146c2.958,0,5.781-1.229,7.802-3.385l114.906-123.115c24.042-25.771,37.292-59.375,37.292-94.615v-98.885
				C341.333,90.521,293.479,42.667,234.667,42.667z" fill={articleData.voteStatus.downvote?'#64B5F6':''} />
                                                    <path d="M469.333,42.667h-64c-23.531,0-42.667,19.135-42.667,42.667v192c0,23.531,19.135,42.667,42.667,42.667h64
				C492.865,320,512,300.865,512,277.333v-192C512,61.802,492.865,42.667,469.333,42.667z" fill={articleData.voteStatus.downvote?'#64B5F6':''} />
                                                </g>
                                            </g>
                                        </g>
                                    </svg>

                                </div>

                            </li>
                            <li>
                                {(count.downvoteCount === undefined) ?
                                    <p>0</p>
                                    : <p>{count.downvoteCount}</p>
                                }
                            </li>
                        </ul>
                    </div>
                    : null

                : null}
        </div>
    )
}

export default UpvoteBar;