import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup';
import { Link, useHistory } from "react-router-dom"
import React, { useEffect, useState } from "react"
import BaseLayout from "../BaseLayout"
import { useSelector, useDispatch } from "react-redux"
import { loginRequest, loadLastPage, resendOtpRequest,resetErrors } from "../BaseLayout/actions"
import queryString from 'query-string'
import { postApiCall } from "../../utils/services"
import Loader from "../../components/Shared/Loader"


const Index = (props) => {
    const [loading, setLoading] = useState(false)

    const dispatch = useDispatch()
    const history = useHistory();

    const baseData = useSelector(state => state.baseReducer)
    const params = queryString.parse(props.location.search)
    let load = false

    if (Object.keys(baseData.settings).length > 0 && baseData.settings.usersettings.userId !== undefined) {
        load = true
    }

    if (baseData.loadLastPage) {
        const hist = baseData.browserHistory.filter(value => value.path != 'login' && value.path != 'signup' && value.path != 'forgot-password-success' && value.path != 'signup-success' && value.path != 'forgot-password' && value.path != 'confirm-password' && value.path != 'verify' && value.path != '404')


        if (hist.length === 0) {
            history.push('/')
        } else {
            history.push(hist[hist.length - 1].pathname)
        }

        dispatch(loadLastPage(false))
    }


    const checkUserVerification = async () => {
        const params = queryString.parse(props.location.search)

        let res = await postApiCall({ org_id: atob(params.org_id), email: atob(params.email_id) }, 'checkChildUserExist')

        console.log(res, "checkchildusereist")
        if (res.message === "User Not Exist,Send to Signup Page") {
            history.push('/signup')
        }
        else if (res.message === "User Exist,Verify Otp") {
            dispatch(resendOtpRequest({ email: atob(params.email_id), org_id: baseData.settings.usersettings.userId, portalName: baseData.settings.usersettings.portalname, url: `https://${window.location.hostname.split('.')[0]}.appypiedesk.com` }))
            history.push(`/verify/${params.email_id}`)
        }
        else if (res.message === "User Exist,Verify Otp and take password") {
            dispatch(resendOtpRequest({ email: atob(params.email_id), org_id: baseData.settings.usersettings.userId, portalName: baseData.settings.usersettings.portalname, url: `https://${window.location.hostname.split('.')[0]}.appypiedesk.com` }))
            history.push(`/confirm-password/${params.email_id}`)
        }
        else if (res.message === "User Exist,Please Login") {
            setLoading(true)
        }
    }


    useEffect(() => {
        const params = queryString.parse(props.location.search)
        if (Object.keys(params).length > 0) {
            if (load) {
                checkUserVerification()
            }
        } else {
            dispatch(resetErrors())
            setLoading(true)
        }
    }, [load])

    return (
        <BaseLayout>
            {(loading) ?
                <Formik
                    initialValues={{
                        email: params.email_id ? atob(params.email_id) : '',
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
                        dispatch(loginRequest({ email: fields.email, org_id: baseData.settings.usersettings.userId, password: fields.password }))

                    }}
                >

                    {({ errors, status, touched }) => (
                        <Form>
                            <div className="mainFullWidth loginSignup_footer">
                                <div className="signup sign-login">
                                    <div className="signup-login-loges">
                                        <div className="container ps-relative">
                                            <div className="signupFeilds">
                                                <div className="lock-secure">
                                                    <p><svg xmlns="http://www.w3.org/2000/svg" width="16.797" height="22.396" viewBox="0 0 16.797 22.396">
                                                        <path id="lock" d="M14.7,8.4H14V5.6a5.6,5.6,0,0,0-11.2,0V8.4H2.1A2.1,2.1,0,0,0,0,10.5v9.8a2.1,2.1,0,0,0,2.1,2.1H14.7a2.1,2.1,0,0,0,2.1-2.1V10.5A2.1,2.1,0,0,0,14.7,8.4ZM4.666,5.6a3.733,3.733,0,0,1,7.465,0V8.4H4.666Zm0,0" />
                                                    </svg>
                                                        <span>Secure Area</span></p>
                                                </div>
                                                <div className="headings-login-signup">
                                                    <h4>Log In To Your Account</h4>
                                                </div>
                                                <div className="feilds-new">
                                                    <div className="user-feilds">
                                                        <div className="md-form md-form-custom">
                                                            <Field name="email" id="inputMDEx7" readOnly={params.email_id ? true : false} type="text" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                                                            <ErrorMessage name="email" component="div" className="invalid-feedback" />
                                                            <label htmlFor="inputMDEx7" className={params.email_id ? "active" : ""}>Email Address </label>
                                                        </div>
                                                    </div>
                                                    <div className="user-feilds">
                                                        <div className="md-form md-form-custom">
                                                            <Field name="password" id="inputMDEx71" type="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                                                            <ErrorMessage name="password" component="div" className="invalid-feedback" />
                                                            <label htmlFor="inputMDEx71">Password</label>
                                                        </div>

                                                    </div>
                                                    {(baseData.loginError) ?
                                                        <p className="text-danger">{baseData.loginError}</p>
                                                        : null
                                                    }

                                                    <div className="user-feilds">
                                                        <div className="login-signup-btn k-flex align-items-center">
                                                            <button type="submit">Login</button>

                                                        </div>
                                                    </div>
                                                    <div className="user-feilds">
                                                        <p className="paralogin-signup">Forgot your password?  <Link to="/forgot-password">Click here</Link> </p>

                                                        <p className="paralogin-signup">Don’t have an account? <Link to="/signup">Sign Up</Link></p>
                                                    </div>
                                                </div>

                                            </div>
                                            <div className="loginFooterReview registrationImgFilter">
                                                <div className="review-section">
                                                    <div className="review-companies">
                                                        <div className="reviewcompanieswrapper">
                                                            <div className="reviewcompaniesimg"><a href="https://privacy.truste.com/privacy-seal/validation?rid=aaa1a089-4a08-4066-867e-29f8b4ebce47" target="_blank" rel="nofollow noopener"><img src='/images/login1.png' /></a></div>
                                                        </div>
                                                        <div className="reviewcompanieswrapper">
                                                            <div className="reviewcompaniesimg"><a rel="nofollow noopener"><img src='/images/login2.png' /></a></div>
                                                        </div>
                                                        <div className="reviewcompanieswrapper">
                                                            <div className="reviewcompaniesimg"><a rel="nofollow noopener"><img src='/images/login3.png' /></a></div>
                                                        </div>
                                                        <div className="reviewcompanieswrapper">
                                                            <div className="reviewcompaniesimg"><a rel="nofollow noopener"><img src='/images/login4.png' /></a></div>
                                                        </div>
                                                        <div className="reviewcompanieswrapper">
                                                            <div className="reviewcompaniesimg"><a rel="nofollow noopener"><img src='/images/login5.png' /></a></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div> </div>
                            </div>


                        </Form>
                    )}
                </Formik>
                : <Loader />}
        </BaseLayout>

    )

}

export default Index;

