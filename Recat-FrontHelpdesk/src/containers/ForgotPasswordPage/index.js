import React,{useState} from "react"
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup';
import { useHistory } from "react-router-dom"
import {useSelector,useDispatch} from "react-redux"
import BaseLayout from "../BaseLayout" 
import {forgotPasswordSendCodeRequest,setverifyPasswordPage} from "../BaseLayout/actions"


const Index = () => {
    const [email, setEmail] = useState('')


    const dispatch = useDispatch()
    const history = useHistory()
    const baseData = useSelector(state => state.baseReducer)

    if (baseData.loadVerifyPasswordPage) {
        history.push(`/confirm-password/${btoa(email)}`)
        dispatch(setverifyPasswordPage(false));
    }

    return (
        <BaseLayout>
        <Formik
            initialValues={{
                email: '',
            }}
            validationSchema={Yup.object().shape({
                email: Yup.string()
                    .email('Email is invalid')
                    .required('Email is required'),
            })}
            onSubmit={async fields => {
                setEmail(fields.email)
                dispatch(forgotPasswordSendCodeRequest({email: fields.email, org_id: baseData.settings.usersettings.userId,portalName:baseData.settings.usersettings.portalname,url:`https://${window.location.hostname.split('.')[0]}.appypiedesk.com`}))
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
                                            <h4>Forgot your password don't worry!!!</h4>
                                            <p>Reset your password in easy steps.</p>
                                        </div>
                                        <div className="feilds-new">
                                            <div className="user-feilds">
                                                <div className="md-form md-form-custom">
                                                    <Field name="email" id="input-char-counter1" type="text" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                                                    <ErrorMessage name="email" component="div" className="invalid-feedback" />
                                                    <label htmlFor="input-char-counter1">Email ID*</label>
                                                </div>
                                            </div>
                                            <div className="user-feilds">
                                                <div className="login-signup-btn k-flex align-items-center">
                                                    <button type="submit">Continue</button>
                                                </div>
                                            </div>
                                            {baseData.forgotPasswordSendCodeError ?
                                                <p className="errorText">{baseData.forgotPasswordSendCodeError}</p>
                                                : null
                                            }
                                        </div>
                                    </div>
                                    <div className="loginFooterReview registrationImgFilter">
                                        <div className="review-section">
                                            <div className="review-companies">
                                                <div className="reviewcompanieswrapper">
                                                    <div className="reviewcompaniesimg"><a href="https://privacy.truste.com/privacy-seal/validation?rid=aaa1a089-4a08-4066-867e-29f8b4ebce47" target="_blank" rel="noopener noreferrer"><img src='/images/login1.png' alt="login1"/></a></div>
                                                </div>
                                                <div className="reviewcompanieswrapper">
                                                    <div className="reviewcompaniesimg"><a rel="noopener noreferrer"><img src='/images/login2.png' alt="login2" /></a></div>
                                                </div>
                                                <div className="reviewcompanieswrapper">
                                                    <div className="reviewcompaniesimg"><a rel="noopener noreferrer"><img src='/images/login3.png' alt="login3" /></a></div>
                                                </div>
                                                <div className="reviewcompanieswrapper">
                                                    <div className="reviewcompaniesimg"><a rel="noopener noreferrer"><img src='/images/login4.png' alt="login4" /></a></div>
                                                </div>
                                                <div className="reviewcompanieswrapper">
                                                    <div className="reviewcompaniesimg"><a rel="noopener noreferrer"><img src='/images/login5.png' alt="login5" /></a></div>
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
        </BaseLayout>
    );
}

export default Index;