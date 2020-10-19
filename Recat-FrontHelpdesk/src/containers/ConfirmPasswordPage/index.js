import React,{useEffect} from "react";
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup';
import BaseLayout from "../BaseLayout"
import { useHistory } from "react-router-dom"
import {useSelector,useDispatch} from "react-redux"
import {setForgotPasswordSuccessPage,forgotPasswordVerifyCodeRequest,resetErrors} from "../BaseLayout/actions"

const Index = (props) => {

    const dispatch = useDispatch()
    const history = useHistory();
    const baseData = useSelector(state => state.baseReducer)

    if (baseData.loadForgotPasswordSuccessPage) {
        history.push(`/forgot-password-success`)
        dispatch(setForgotPasswordSuccessPage(false));
    }

    useEffect(() => {
        dispatch(resetErrors())
    },[])

    return (
        <BaseLayout>
        <Formik
            initialValues={{
                password: '',
                confirmPassword: '',
                verify: '',
            }}
            validationSchema={Yup.object().shape({
                verify: Yup.string()
                    .required('Verification Code is required')
                    .matches(/^[0-9]{6,}$/, { message: "Must Contain 6 Numeric Characters" }),
                password: Yup.string()
                    .required('Password is required')
                    .matches(
                        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
                    ),
                confirmPassword: Yup.string()
                    .oneOf([Yup.ref('password'), null], 'Passwords must match')
                    .required('Confirm Password is required'),
            })}
            onSubmit={async fields => {
                dispatch(forgotPasswordVerifyCodeRequest({ email: atob(props.match.params.id),otp: fields.verify, org_id: baseData.settings.usersettings.userId,password: fields.password,portalName:baseData.settings.usersettings.portalname,url:`https://${window.location.hostname.split('.')[0]}.appypiedesk.com` }))
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
                                            <h4>Create your new password don't Worry !!!</h4>
                                            <p>Please enter the verification code that we sent you on your provided mail to continue.</p>
                                        </div>
                                        <div className="feilds-new">

                                            <div className="user-feilds">
                                            <div className="md-form md-form-custom">
                                                <Field name="verify" id="input-char-counter1"  maxLength="6" type="text" className={'form-control' + (errors.verify && touched.verify ? ' is-invalid' : '')} />
                                                <label htmlFor="input-char-counter1">Enter Verification Code*</label>
                                                <ErrorMessage name="verify" component="div" className="invalid-feedback" />
                                            </div>
                                            </div>


                                            <div className="user-feilds">
                                                <div className="md-form md-form-custom">
                                                    <Field name="password" id="input-char-counter11" type="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                                                    <ErrorMessage name="password" component="div" className="invalid-feedback" />
                                                    <label htmlFor="input-char-counter11">Password*</label>
                                                </div>
                                            </div>

                                            <div className="user-feilds">
                                                <div className="md-form md-form-custom">
                                                    <Field name="confirmPassword" id="input-char-counter12" type="password" className={'form-control' + (errors.confirmPassword && touched.confirmPassword ? ' is-invalid' : '')} />
                                                    <ErrorMessage name="confirmPassword" component="div" className="invalid-feedback" />
                                                    <label htmlFor="input-char-counter12">Confirm Password*</label>
                                                </div>
                                            </div>

                                            <div className="user-feilds">
                                                <div className="login-signup-btn k-flex align-items-center">
                                                    <button type="submit">Continue</button>
                                                </div>

                                            </div>

                                        </div>
                                        {baseData.forgotPasswordVerifyOtpError?
                                            <p className="errorText">{baseData.forgotPasswordVerifyOtpError}</p>
                                            : null
                                        }
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
    );
}

export default Index;