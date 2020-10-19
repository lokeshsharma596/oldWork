import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';
import { GoogleLogin } from '../_helpers/googlelogin';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import config from 'config';
import { Auth,Hub } from 'aws-amplify'
import { history } from '../_helpers';
import { alertActions } from '../_actions/alert.actions';
import { userService } from '../_services';
import { userConstants } from '../_constants';

class VerifyPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showgif: false,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    
    handleSubmit(fields) {
        const { dispatch } = this.props;
        this.setState({showgif:!this.state.showgif})
            // dispatch(userActions.confirmation(this.props.match.params.id,fields.verify+fields.verify1+fields.verify2));
            // setTimeout(() => {
            //     this.setState({showgif:!this.state.showgif})
            // }, 5000)
            Auth.confirmSignUp(this.props.match.params.id, fields.verify, {
                // Optional. Force user confirmation irrespective of existing alias. By default set to True.
                forceAliasCreation: true    
            }).then(data => {
                 userService.confirmation()
                .then(
                    user => { 
                       // dispatch(success(user));
                       // dispatch(alertActions.success(user));
                        var email = atob(localStorage.getItem('tempdata').split('@')[0]);
                        var password = atob(localStorage.getItem('tempdata').split('@')[1]);  
                        userService.login(this.props.match.params.id, email )
                        .then(
                            user => { 
                                dispatch(success(user.data));
                                dispatch(alertActions.success(user.message));
                                localStorage.removeItem('tempdata');
                                if(parseInt(localStorage.getItem('articlecount')) > 0){
                                history.replace(user.data[0].data.screentype?user.data[0].data.screentype:'/categorylisting');
                                } else {
                                history.replace("/dashboard");
                                }
                            },
                            error => {
                                this.setState({showgif:!this.state.showgif})
                                dispatch(alertActions.error(error));
                                setTimeout(() => {
                                    dispatch(alertActions.clear());
                                }, 3000)
                            }
                        );
                    },
                    error => {
                        
                        this.setState({showgif:!this.state.showgif})
                        dispatch(alertActions.error(error));
                        setTimeout(() => {
                            dispatch(alertActions.clear());
                        }, 3000)
                    }
                );
                function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
            //             dispatch(alertActions.success(user));
                        
                
            })
              .catch(err =>{
                  if(err.message == "User cannot be confirmed. Current status is CONFIRMED")
                    history.replace("/login");
                this.setState({showgif:!this.state.showgif})
                   dispatch(alertActions.error(err.message))
                   setTimeout(() => {
                    dispatch(alertActions.clear());
                }, 3000)
            });
    }
    
    resendcode=()=>{
        const { dispatch } = this.props;
        //console.log(location')
        this.setState({showgif:!this.state.showgif})
            dispatch(userActions.sendcode(this.props.match.params.id));
            setTimeout(() => {
                this.setState({showgif:!this.state.showgif})
            }, 3000)
    }

    render() {
        const { loggingIn } = this.props;
        return (
            <Formik
                initialValues={{
                    verify: '',
                }}
                validationSchema={Yup.object().shape({
                    verify: Yup.string()
                        .required('Verification code is required'),
                })}
                validateOnChange={false}
                validateOnBlur={false}
                onSubmit={fields => {
                    //dispatch(userActions.signup(fields.email, fields.password));
                    this.handleSubmit(fields);
                }}
            >
                {({ errors, status, touched }) => (
                    <Form>
            <div className="login-signup main-bg">
                <section className="signIn mainFormSign-login">
                    <div className="container ps-relative">
                        <div className="logo-section">
                            <img src={`${config.path}/images/logo.svg`} />
                        </div>
                        <div className="mainUpLogin">
                            <div className="row alignItemsSectionForm k-flex align-items-center designCenterLogin">
                                <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                                    <div className="left-side">
                                        <div className="headingLeft mb-5">
                                            <p className="stepLoginpage pb-4">STEP 2</p>
                                            <h4>Let’s get you<br />
                                                Signed up!!!</h4>
                                        </div>
                                        <div className="ParaLeft">
                                            <p>Sign up in three easy steps using your email address and create a strong password or sign up via Google in just a click!</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                                <div className="right-side">
                                <p className="text-right mb-2">
                                        <span className="mr-1" style={{'position': 'relative', 'top': '-3px'}}> 
                                            <img src={`${config.path}/images/lock.svg`} />
                                        </span>
                                        Secure Area
                                    </p>
                                    <div className="form-login-signup verification-feilds">
                                            <div className="md-form md-outline verification-para">
                                                <p>Please enter the verification code that we sent you on your provided mail to to continue signing up.</p>
                                            </div>
                                            <div className="errormessage-veryfy md-form md-outline k-flex align-items-center text-center">
                                                <Field name="verify" id="input-char-counter1" placeholder="- - - - - -" maxLength="6" type="text" className={'form-control text-center mr-2' + (errors.verify && touched.verify ? ' is-invalid' : '')} />
                                                <ErrorMessage name="verify"  component="div" className="invalid-feedback" />
                                                {/* <Field name="verify1" id="input-char-counter1" placeholder="- -" maxLength="2" type="text" className={'form-control text-center' + (errors.verify1 && touched.verify1 ? ' is-invalid' : '')}  onInput={e => this.focusChange(e)} />
                                                <ErrorMessage name="verify1" component="div" className="invalid-feedback" />
                                                <Field name="verify2" id="input-char-counter1" placeholder="- -" maxLength="2" type="text" className={'form-control text-center ml-2' + (errors.verify2 && touched.verify2 ? ' is-invalid' : '')} />
                                                <ErrorMessage name="verify2" component="div" className="invalid-feedback" /> */}
                                            </div>
                                            <div className="button-login-signin mt-4">
                                            <button className="btnOrange mr-2">Submit {this.state.showgif && <div className="loader-btn"></div>}</button>
                                                <a onClick={this.resendcode} href="Javascript:void(0)" style={{color:'rgb(104, 155, 239)',float:'right'}}>Resend</a>
                                               
                                            </div>
                                        </div> 
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="loginFooterReview registrationImgFilter">
                            <div className="review-section">
                                <div className="review-companies">
                                <div className="reviewcompanieswrapper">
                                    <div className="reviewcompaniesimg"><a href="https://privacy.truste.com/privacy-seal/validation?rid=aaa1a089-4a08-4066-867e-29f8b4ebce47" target="_blank" rel="nofollow noopener"><img src={`${config.path}/images/logos/login1.png`} /></a></div>
                                </div>
                                <div className="reviewcompanieswrapper">
                                    <div className="reviewcompaniesimg"><a href="javascript:void(0)" rel="nofollow noopener"><img src={`${config.path}/images/logos/login2.png`} /></a></div>
                                </div>
                                <div className="reviewcompanieswrapper">
                                    <div className="reviewcompaniesimg"><a href="javascript:void(0)" rel="nofollow noopener"><img src={`${config.path}/images/logos/login3.png`} /></a></div>
                                </div>
                                <div className="reviewcompanieswrapper">
                                    <div className="reviewcompaniesimg"><a href="javascript:void(0)" rel="nofollow noopener"><img src={`${config.path}/images/logos/login4.png`} /></a></div>
                                </div>
                                <div className="reviewcompanieswrapper">
                                    <div className="reviewcompaniesimg"><a href="javascript:void(0)" rel="nofollow noopener"><img src={`${config.path}/images/logos/login5.png`} /></a></div>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>   
            </div>
            </Form>
            )}
            </Formik>
 
        );
    }
}

function mapStateToProps(state) {
    const { loggingIn } = state.authentication;
    return {
        loggingIn
    };
}

const connectedVerifyPage = connect(mapStateToProps)(VerifyPage);
export { connectedVerifyPage as VerifyPage }; 