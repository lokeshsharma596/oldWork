import React,{ useState } from "react";
import TinyMce from "./Tinymce"
import {useSelector,useDispatch} from "react-redux"
import {setTypeOfTask,setComment,showLoginPopUp,showRecaptchaPopUp,performTask} from "./actions"

const WriteComment = (props) => {
    const [state, setstate] = useState({
        emptyComment: false,
        error: false,
        message: ''
    })
    const dispatch=useDispatch()
    const articleData = useSelector(state => state.articleReducer)
    const baseData = useSelector(state => state.baseReducer)
    const scroll = () => {
        window.scrollTo(0, 0);
    }

    const handleSubmit = async () => {

        dispatch(setTypeOfTask("comment"))
      

        if (articleData.comment.length > 0) {
            if (baseData.settings.frontendsettings.allowsignup === true) {
                if (baseData.isAuthenticated === true) {
                    window.tinyMCE.activeEditor.setContent('');
                    dispatch(setComment(''))
                    dispatch(performTask({
                        ownerEmail: baseData.settings.personal_info.email,
                        userid: baseData.settings.usersettings.userId,
                        articleId: props.articleId,
                        comment: articleData.comment,
                        type: "comment",
                        articlename: articleData.article.name,
                        email: baseData.authUser.email,
                        first_name: baseData.settings.personal_info.firstname,
                        last_name: baseData.settings.personal_info.lastname,
                        article_url:props.url
                    })) 
                    scroll()
           
                } else {
                    dispatch(showLoginPopUp())
                }
            }
            else if (baseData.settings.frontendsettings.allowcaptcha === true) {
                dispatch(showRecaptchaPopUp())
            }
        }
        else {
            setstate({ ...state, emptyComment: true })
        }

    }

    return (
        <div className="comment-writeArea">

            {(baseData.settings.usersettings.allowcomment) ?
                <>
                    <div className="comment-user">
                        <img src='/images/user.png' alt="user-img" />
                    </div>


                    <TinyMce />

                    <div className="text-right mt-2  editor-sb-btn" >
                        <button value="Submit"
                            onClick={handleSubmit}

                            onBlur={() => {
                                setTimeout(() => {
                                    setstate({ ...state, emptyComment: false })
                                }, 200)
                            }}
                            className="btn" style={{ backgroundColor: baseData.settings.frontendsettings.themescolor, color: 'black' }}>Submit</button>
                        {(state.emptyComment) ?
                            <p className="errorText">Comment is Blank</p>
                            : null}
                    </div>
                </>
                : null}
        </div>
    )
}

export default WriteComment;