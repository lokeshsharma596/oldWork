import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup';
import React, { useState } from "react"
import { postApiCall } from "../../utils/services"
import { useSelector, useDispatch } from "react-redux"
import { hideRecaptchaPopUp, setComment, setTypeOfTask, performTask,updateVoteColor } from "./actions"
import { Helmet } from "react-helmet";

const RecaptchaPopUp = (props) => {
    const [state, setstate] = useState({
        message: '',
        show: false,
        showsubmit: false
    })

    const scroll = () => {
        window.scrollTo(0, 0);
    }
    const dispatch = useDispatch()
    const articleData = useSelector(state => state.articleReducer)
    const baseData = useSelector(state => state.baseReducer)


    const Recaptcha = () => {
        window.grecaptcha.ready(() => {
            window.grecaptcha.execute(process.env.REACT_APP_RECAPTCHA_SITE_KEY, { action: 'articlepage' }).then(async (token) => {
                let res = await postApiCall({ token: token }, 'sendRecaptcha')
                if (res.status === '200') {
                    setstate({ ...state, message: "Verified", show: true, showsubmit: true })
                } else {
                    setstate({ ...state, message: "Not verified", show: true })
                }
            }).catch(err => {
                console.log(err);
            });
        })
    }

    return (
        <div className="comment-writeArea">

            {(articleData.recaptchaPopupVisibility) ?
                <>
                    <Helmet>
                        <script src={`https://www.google.com/recaptcha/api.js?render=${process.env.REACT_APP_RECAPTCHA_SITE_KEY}`} />
                    </Helmet>

                    <Formik
                        initialValues={{
                            email: '',
                            acceptTerms: false
                        }}
                        validationSchema={Yup.object().shape({
                            email: Yup.string()
                                .email('Email is invalid')
                                .required('Email is required'),
                            acceptTerms: Yup.bool()
                                .oneOf([true], 'Accept Recaptcha required')
                        })}

                        onSubmit={async fields => {

                            setstate({ ...state, showsubmit: false })
                            window.tinyMCE.activeEditor.setContent('')
                            dispatch(performTask({
                                ownerEmail: baseData.settings.personal_info.email,
                                userid: baseData.settings.usersettings.userId,
                                articleId: props.articleId,
                                comment: articleData.comment,
                                type: articleData.type,
                                articlename: articleData.article.name,
                                email: fields.email,
                                first_name: baseData.settings.personal_info.firstname,
                                last_name: baseData.settings.personal_info.lastname,
                                article_url: props.url,
                                tokenVerification:baseData.settings.frontendsettings.allowsignup
                            }))

                            if(articleData.type === 'upvote'){
                                dispatch(updateVoteColor({upvote:true,downvote:false}))
                            }else if (articleData.type === 'downvote'){
                                dispatch(updateVoteColor({upvote:false,downvote:true}))
                            }
                            
                            dispatch(hideRecaptchaPopUp())
                            scroll()
                            dispatch(setTypeOfTask(''))
                            dispatch(setComment(''))
                            setstate({message: "", show: false})
                        }}

                    >
                        {({ errors, status, touched }) => (


                            <Form>

                                <div className="captch-popup-design">
                                    <div className="captcha-section">
                                        <p className="text-right close-icon"><img src="/images/close.png" alt="close" className="closing"
                                            onClick={() => {
                                                dispatch(hideRecaptchaPopUp())
                                                dispatch(setTypeOfTask(''))
                                                setstate({ message: '', show: false })
                                            }} />
                                        </p>
                                        <p>To perform the action, Provide your Email Address</p>
                                        <div className="user-feilds captcha-feilds">
                                            <div className="md-form md-form-custom">

                                                <Field name="email" id="inputMDEx7" type="text" placeholder="Enter Email ID" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                                                <ErrorMessage name="email" component="div" className="invalid-feedback" />

                                            </div>
                                        </div>
                                        <div className="captch-accessible k-flex align-items-center mb-4">
                                            <div className="captcha-checkbox">
                                                <div className="spinners">
                                                    <label>
                                                        <Field type="checkbox" onClick={Recaptcha} id="materialUnchecked" name="acceptTerms" className={'form-check-input ' + (errors.acceptTerms && touched.acceptTerms ? ' is-invalid' : '')} />
                                                        <span className="checkmark"><span>&nbsp;</span></span>
                                                    </label>
                                                </div>

                                            </div>
                                            <div className="captcha-ropara">
                                                <p>I'm not a robot</p>
                                                <ErrorMessage name="acceptTerms" component="div" className="invalid-feedback" />
                                            </div>



                                            <div className="captch-no-repeat">
                                                <img src="/images/logo_48.png" alt="recaptcha-logo" />
                                                <p>reCAPTCHA</p>
                                            </div>
                                        </div>

                                        {(state.show) ?
                                            <p>{state.message}</p>
                                            : null}

                                        {(state.showsubmit) ?
                                            <div className="captcha-button text-right">
                                                <button className="btn-captcha" type="submit" >Continue</button>
                                            </div>
                                            : null}

                                    </div>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </>
                : null}

        </div>
    )
}

export default RecaptchaPopUp;