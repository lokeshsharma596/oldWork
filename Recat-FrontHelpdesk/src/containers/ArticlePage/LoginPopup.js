import { Formik, Field, Form, ErrorMessage } from 'formik'
import React from "react";
import { Link } from "react-router-dom"
import * as Yup from 'yup';
import { useSelector, useDispatch } from "react-redux"
import { hideLoginPopUp, setTypeOfTask, loginAndPerformTaskRequest,setComment } from "./actions"

const LoginPopUp = (props) => {

    const dispatch = useDispatch()
    const articleData = useSelector(state => state.articleReducer)
    const baseData = useSelector(state => state.baseReducer)

    const scroll = () => {
        window.scrollTo(0, 0);
    }

    return (
        <div className="comment-writeArea">

            {(articleData.loginPopupVisibility) ?

                <Formik
                    initialValues={{
                        email: '',
                        password: ''
                    }}
                    validationSchema={Yup.object().shape({
                        email: Yup.string()
                            .email('Email is invalid')
                            .required('Email is required'),
                        password: Yup.string()
                            .required('Password is required')
                    })}
                    onSubmit={async fields => {
                        window.tinyMCE.activeEditor.setContent('');
                        dispatch(setComment(''))
                        dispatch(loginAndPerformTaskRequest({
                            email: fields.email,
                            org_id: baseData.settings.usersettings.userId,
                            password: fields.password,
                            ownerEmail: baseData.settings.personal_info.email,
                            articleId: props.articleId,
                            comment: articleData.comment,
                            type: articleData.type,
                            articlename: articleData.article.name,
                            first_name: baseData.settings.personal_info.firstname,
                            last_name: baseData.settings.personal_info.lastname,
                            article_url: props.url
                        }))          
                        scroll()

                    }}
                >

                    {({ errors, status, touched }) => (
                        <Form>

                            <div className="captch-popup-design">
                                <div className="captcha-section">
                                    <p className="text-right close-icon"><img src="/images/close.png" className="closing"
                                        onClick={(e) => {
                                            dispatch(setTypeOfTask(''))
                                            dispatch(hideLoginPopUp())
                                        }} />
                                    </p>
                                    <p>To Perform the action, Please Sign in</p>
                                    <div className="user-feilds">
                                        <div className="md-form md-form-custom">
                                            <Field name="email" id="inputMDEx7" type="text" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                                            <ErrorMessage name="email" component="div" className="invalid-feedback" />
                                            <label htmlFor="inputMDEx7">Email Address </label>
                                        </div>
                                    </div>
                                    <div className="user-feilds">
                                        <div className="md-form md-form-custom">
                                            <Field name="password" id="inputMDEx71" type="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                                            <ErrorMessage name="password" component="div" className="invalid-feedback" />
                                            <label htmlFor="inputMDEx71">Password</label>
                                        </div>
                                    </div>
                                    <p className="paralogin-signup">Forgot your password?  <Link to="/forgot-password"><a>Click here</a></Link> </p>
                                    <div className="user-feilds">
                                        <div className="login-signup-btn k-flex align-items-center">
                                            <button type="submit">Login</button>

                                        </div>
                                    </div>
                                    <div className="user-feilds">
                                        <p className="paralogin-signup">Don’t have an account? <Link to="/signup"><a>Sign Up</a></Link></p>
                                    </div>

                                    {(baseData.loginError) ?
                                        <p className="errorText">{baseData.loginError}</p>
                                        : null
                                    }
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>

                : null}

        </div>
    )
}

export default LoginPopUp;