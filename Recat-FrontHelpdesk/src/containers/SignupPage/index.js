import React, { useState ,useEffect} from "react";
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup';
import { Link } from "react-router-dom"
import BaseLayout from "../BaseLayout"
import { useHistory } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { signupRequest, setLoadVerifyPage,resetErrors } from "../BaseLayout/actions"

const Index = () => {
    const [email, setEmail] = useState('')


    const dispatch = useDispatch();
    const history = useHistory();
    const baseData = useSelector(state => state.baseReducer)

    if (baseData.loadverifyPage) {
        history.push(`/verify/${btoa(email)}`)
        dispatch(setLoadVerifyPage(false));
    }

    useEffect(() => {
        dispatch(resetErrors())
    },[])

    return (
        <BaseLayout>
            <Formik
                initialValues={{
                    email: '',
                    password: '',
                    confirmPassword: '',
                    acceptTerms: true
                }}
                validationSchema={Yup.object().shape({
                    email: Yup.string()
                        .email('Email is invalid')
                        .required('Email is required'),

                    password: Yup.string().required('Password is required')
                        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/, { message: "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character" }),

                    confirmPassword: Yup.string()
                        .oneOf([Yup.ref('password'), null], 'Passwords must match')
                        .required('Confirm Password is required'),

                    acceptTerms: Yup.bool()
                        .oneOf([true], 'Accept Ts & Cs is required')
                })}

                onSubmit={async fields => {
                    setEmail(fields.email)
                    dispatch(signupRequest({ email: fields.email, password: fields.password, org_id: baseData.settings.usersettings.userId,portalName:baseData.settings.usersettings.portalname,url:`https://${window.location.hostname.split('.')[0]}.appypiedesk.com`}))
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
                                                <h4>Let’s Get You Signed Up</h4>
                                            </div>
                                            <div className="feilds-new">

                                                <div className="user-feilds">
                                                    <div className="md-form md-form-custom">
                                                        <Field name="email" id="input-char-counter1" type="text" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                                                        <ErrorMessage name="email" component="div" className="invalid-feedback" />
                                                        <label htmlFor="input-char-counter1">Email ID</label>
                                                    </div>
                                                </div>


                                                <div className="user-feilds">
                                                    <div className="md-form md-form-custom">
                                                        <Field name="password" id="input-char-counter11" type="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                                                        <ErrorMessage name="password" component="div" className="invalid-feedback" />
                                                        <label htmlFor="input-char-counter11">Password</label>
                                                    </div>
                                                </div>


                                                <div className="user-feilds">
                                                    <div className="md-form md-form-custom">
                                                        <Field name="confirmPassword" id="input-char-counter12" type="password" className={'form-control' + (errors.confirmPassword && touched.confirmPassword ? ' is-invalid' : '')} />
                                                        <ErrorMessage name="confirmPassword" component="div" className="invalid-feedback" />
                                                        <label htmlFor="input-char-counter12">Confirm Password</label>
                                                    </div>
                                                </div>



                                                <div className="form-check dont-have-an-account">
                                                    <Field type="checkbox" id="materialUnchecked" name="acceptTerms" className={'form-check-input ' + (errors.acceptTerms && touched.acceptTerms ? ' is-invalid' : '')} />
                                                    <label className="form-check-label" htmlFor="materialUnchecked">By signing in you agree to our Terms &amp; Conditions, Privacy Policy</label>
                                                    <ErrorMessage name="acceptTerms" component="div" className="invalid-feedback" />
                                                </div>



                                                <div className="user-feilds">
                                                    <div className="login-signup-btn k-flex align-items-center">
                                                        <button type="submit">Sign Up</button>
                                                    </div>
                                                </div>
                                                
                                                <p className="paralogin-signup mt-2">Already have an account? <Link to="/login"><a>Login</a></Link></p>

                                                {(baseData.signupError.length) ?
                                                    <p className="errorText">{baseData.signupError}</p>
                                                    : null
                                                }

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
                                </div>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </BaseLayout>
    )

}

export default Index;