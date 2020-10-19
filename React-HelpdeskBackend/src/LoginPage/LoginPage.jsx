import React from 'react';
import config from 'config';
import { connect } from 'react-redux';

import { userActions } from '../_actions';
import {firebaseAuth,googleProvider} from "../config/config";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Auth,Hub } from 'aws-amplify'
import { userService } from '../_services';
import { alertActions } from '../_actions/alert.actions';
import { userConstants } from '../_constants';
import { history } from '../_helpers';

export function loginWithGoogle() {
     return firebaseAuth().signInWithPopup(googleProvider);
    //return authenticate(loginWithFirebase(googleProvider));
}

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showgif: false,
            showPassw: false,
            responsesend:false,
            loader:false
        };
        
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleGoogleLogin = this.handleGoogleLogin.bind(this);
        console.log(window.location.hostname);
       
        // Hub.listen('auth', ({ payload: { event, data } }) => {
        //     this.setState({showgif:!this.state.showgif})
        //             const { dispatch } = this.props;
        //             if(event == "signIn"){
        //                 Auth.currentSession().then(function(session) {
        //                     let data = ((session));
        //                     // console.log(data.idToken.payload.email)
        //                     dispatch(userActions.Sociallogin(data.idToken.payload.sub, data.idToken.payload.email),function(){
        //                         this.setState({showgif:!this.state.showgif})
        //                     });
        //                 }, function(err) {
        //                     console.log(err)
        //                 })
        //             }
                 
        // });
    }
    
    handleGoogleLogin() {
        
    this.setState({loader:true})
        loginWithGoogle()
            .catch(function (error) {
                alert(error); // or show toast
            });
    }
  

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }
   
   componentWillMount(){
    const { dispatch } = this.props;
    const sid = localStorage.getItem('session_id');
    const semail = localStorage.getItem('session_mail');
                if(sid && semail){
                localStorage.removeItem('session_id');
                localStorage.removeItem('session_mail');
                this.setState({loader:true})
                dispatch(userActions.Sociallogin(sid, semail),function(){
                                            this.setState({showgif:!this.state.showgif})
                                        });
                }
            
   }
     

    handleSubmit(user,username) {
        console.log(this.state.responsesend);
        const { dispatch } = this.props;
                userService.login(user, username)
                .then(
                    user => { 
                        dispatch(success(user.data));
                        dispatch(alertActions.success(user.message)); 
                        localStorage.removeItem('tempdata'); 
                        let users = JSON.parse(localStorage.getItem('user'));
                        window.dataLayer.push({
                            'account': {
                            'id':users[0].id,
                            'email':users[0].data.email,
                            'createdAt':users[0].data.createdON, //UNIX Timestamp for account creation date
                            'publishedArticles':users[0].publisharticle,
                            'draftArticles':users[0].draftarticle
                            }
                            });
                        if(parseInt(localStorage.getItem('articlecount')) > 0){
                        history.replace(user.data[0].data.screentype?user.data[0].data.screentype:'/categorylisting');
                        } else {
                        history.replace("/dashboard");
                        }
                    },
                    error => {
                        this.setState({responsesend:!this.state.responsesend})
                        this.setState({showgif:false})
                        dispatch(alertActions.error(error));
                        setTimeout(() => {
                            dispatch(alertActions.clear());
                        }, 3000)
                    }
                );
               
                    // this.closecomponent();  
                    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
           // this.setState({showgif:!this.state.showgif})
    }
    // handleAlternate(event) {
    //     event.preventDefault();
    //     this.setState({ resendsubmit: true });
    //     this.setState({ submitted: true });
    //     const { username } = this.state;
    //     const { dispatch } = this.props;
    //     if (username) {
    //         dispatch(userActions.resendpassword(username));
    //     }
    //   }
 
    submit=()=>{
        if(window.location.hostname == "localhost")
           var host = 'http://localhost:8082';
        else if(window.location.hostname == "desk.appypie.com")
           var host = 'https://desk.appypie.com/knowledge';
        else
           var host = 'https://www.appypiedesk.com/knowledge';
        window.open('https://gauth.appypiedesk.com/oauth2/authorize?identity_provider=Google&redirect_uri='+host+'/gsignin&response_type=code&client_id=6nkq3rphk4gae0dchcnfvtpmdj&scope=aws.cognito.signin.user.admin email openid','popup','width=600,height=600'); 
        return false;
        Auth.federatedSignIn({provider: 'Google'}).then(data =>{ 
            console.log(data);    
            
        })
        .catch(err => console.log(err));
    }


    showPass = () => {
        this.setState({showPassw: !this.state.showPassw});
    }

    render() {
        const { loggingIn } = this.props;
        return (
             <Formik
                initialValues={{
                    email: '',
                    password: '',
                    acceptTerms: false
                }}
                validationSchema={Yup.object().shape({
                    email: Yup.string()
                        .email('Email is invalid')
                        .required('Email is required'),
                    password: Yup.string()
                        .required('Password is required')
                })}
                validateOnChange={false}
                validateOnBlur={false}
                onSubmit={fields => {
                    //dispatch(userActions.signup(fields.email, fields.password));
                    this.setState({showgif:!this.state.showgif})
                    let username = fields.email;
                    let password = fields.password;
                    const { dispatch } = this.props;
                        Auth.signIn({
                            username, // Required, the username
                            password, // Optional, the password
                        }).then(user =>{
                            this.setState({responsesend:!this.state.responsesend});
                            this.handleSubmit(user.username, username)
                        
                        }).catch(err => {
                            dispatch(alertActions.error("Incorrect username or password."));
                            this.setState({showgif:!this.state.showgif})
                            setTimeout(() => {
                            dispatch(alertActions.clear());
                             }, 3000)
                            
                                                  
                                                  
                        });
                } }
             >
                {({ errors, status, touched }) => (
                    <Form>
                   {this.state.loader && <div className="loading" style={{display: this.state.loader ? 'block' : 'block' }}>Loading&#8230;</div>}
            <div className="login-signup main-bg">
                <section className="signIn mainFormSign-login">
                    <div className="container ps-relative">
                        <div className="getstarted-header k-flex align-items-center">
                            <div className="logo-section">
                                <img src={`${config.path}/images/logo.svg`} />
                            </div>
                            {/* <div className="menu-section">
                                <ul>
                                    <li>
                                        Log in
                                    </li>
                                    <li>
                                        Sign Up
                                    </li>
                                </ul>
                            </div> */}
                        </div>
                        <div className="mainUpLogin">
                            <div className="row alignItemsSectionForm k-flex align-items-center designCenterLogin">
                                <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                                    <div className="left-side">
                                        <div className="headingLeft mb-5">
                                            {/* <p className="stepLoginpage">STEP 1</p> */}
                                            <h4>To add articles, <br />
                                                Login now!</h4>
                                        </div>
                                        <div className="ParaLeft">
                                            <p>If your account already exists, enter your email address and password or log in via Google to access it. Else, Sign Up now!</p>
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
                                    <div className="form-login-signup">
                                    <div className="md-form md-outline mt-0">
                                       Login to continue..
                                    </div>
                                            <div className="md-form md-outline">
                                            <Field name="email" id="input-char-counter1" type="text" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                                            <ErrorMessage name="email" component="div" className="invalid-feedback" />
                                                <label for="input-char-counter1">Email ID*</label>
                                            </div>
                                            <div className="md-form md-outline">
                                            <Field name="password" id="input-char-counter11" type={this.state.showPassw ? "text" : "password"} className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                                                  <div className="password-show-hide" onClick={this.showPass}>{this.state.showPassw ? <span><img src={`${config.path}/images/icon/hide-eye.svg`} /></span>:<span><img src={`${config.path}/images/icon/show-eye.svg`} /></span>}</div>
                                                  <ErrorMessage name="password" component="div" className="invalid-feedback" />
                                                  <span toggle="#password-field" className="fa fa-lg fa-eye field-icon toggle-password"></span>
                                                <label for="input-char-counter11">Password*</label>  
                                            </div>
                                            {/*<div className="form-check">
                                                <Field type="checkbox" id="materialUnchecked" name="acceptTerms" className={'form-check-input ' + (errors.acceptTerms && touched.acceptTerms ? ' is-invalid' : '')} />
                                                    <label className="form-check-label" for="materialUnchecked">By signing in you agree to our <span style={{color: "#27B0D1"}}>Terms & Conditions</span>, Privacy Policy, GDPR & NDA</label>
                                                    <ErrorMessage name="acceptTerms" component="div" className="invalid-feedback" /></div> */}
                                            <div className="button-login-signin mt-4">
                                                 <button className="btnOrange width100p py-3" >Login {this.state.showgif && <div className="loader-btn"></div>}</button>{/*<Spinner thickness={4} size="34px"/> */}
                                                <p className="card-body-text position-relative text-center py-2 or-log-sig"><span><strong>Or</strong></span></p>
                                                <a className="btnBlue width100p py-0 px-0 k-flex align-items-center" onClick={this.submit}>
                                                    <span className="gp-icon">
                                                        <img src={(`${config.path}/images/google.png`)} />
                                                    </span>
                                                    <span className="gp-text ml-auto mr-auto color-white">
                                                        Login with Google 
                                                    </span>
                                                </a>
                                                {/* <ul className="social-icon-login-signup">
                                                    <li onClick={this.submit}>
                                                        <span>
                                                            <img src={(`${config.path}/images/google.png`)} />
                                                        </span>
                                                    </li>
                                                     <li onClick={this.handleGoogleLogin}>
                                                        <span>
                                                            <img src={(`${config.path}/images/google.png`)} />
                                                        </span>
                                                    </li>
                                                </ul> */}
                                                {/* <button className="btn btn-primary" style={{float: "right"}} onClick={this.handleAlternate.bind(this)}>Resend Code</button> */}
                                            </div>
                                            <div className="md-form md-outline mb-0">
                                                <p className="card-body-text">Don’t have an account? <a style={{color: "#27B0D1"}} href={`${config.path}/signup`}>Sign Up</a> <a href={`${config.path}/forgetpass`} style={{float: "right", color: "rgb(39, 176, 209)"}}>Forget Password</a></p>
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

const connectedLoginPage = connect(mapStateToProps)(LoginPage);
export { connectedLoginPage as LoginPage }; 