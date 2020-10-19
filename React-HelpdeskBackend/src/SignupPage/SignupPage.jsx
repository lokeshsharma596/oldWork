import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';
import { GoogleLogin } from '../_helpers/googlelogin';
import {firebaseAuth,googleProvider} from "../config/config";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { history } from '../_helpers';
import config from 'config';
import { Auth,Hub } from 'aws-amplify'
import { alertActions } from '../_actions/alert.actions';
import { userService } from '../_services'; 
export function loginWithGoogle() {
    return firebaseAuth().signInWithPopup(googleProvider);
   //return authenticate(loginWithFirebase(googleProvider));
}

class SignupPage extends React.Component {
    constructor(props) {
        super(props);


        this.state = {
            username: '',
            password: '',
            term:'',
            showgif: false,
            showgooglegif: false,
            submitted: false,
            showPassw: false,
            loader:false
        };
        // if((!localStorage.getItem('color') && !localStorage.getItem('domainname')) ){
        //     history.replace('/step1');
        // }
        // if(!localStorage.getItem('color'))
        //     history.replace('/step2');

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        const query = new URLSearchParams(this.props.location.search);
        if(query.get('code')){
        this.setState({showgooglegif:true});
        }
        var host = window.location.host; 
        let parts = host.split("."); 
        console.log(parts);
        console.log(parts.length);
        if(parts.length == 3 && parts[0] != 'www' && parts[0] != 'desk')
        history.replace("/login");
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
                    dispatch(userActions.googlelogin(sid, semail),function(){
                                                this.setState({showgif:!this.state.showgif})
                                            });
                    }
                
       }

    handleSubmit(fields) {
        const { dispatch } = this.props;
        this.setState({showgif:!this.state.showgif})
        let username = fields.email;
        let password = fields.password;
        let email =fields.email;
        Auth.signUp({
            username,
            password,
            attributes: {
                email 
            },
            validationData: []  //optional
            })
            .then(data =>{   
            userService.signup(data.userSub, username)
            .then( 
                user => { 
                    // console.log(user.message);
                    // console.log(user.data);
                    // console.log(user.data.id);
                    
                    this.setState({showgif:false})
                    localStorage.setItem("tempdata",btoa(username)+'@'+btoa(password))
                    localStorage.removeItem('color');
                    localStorage.removeItem('domainname');
                    localStorage.removeItem('orgname');
                   //  dispatch(success(user.message));
                   // dispatch(alertActions.success(user.message));
                    history.replace('/verify/'+user.data.client_id);
                    
                },
                error => {
                    this.setState({showgif:false})
                    dispatch(alertActions.error(error));
                }
            );     
                          
            })
            .catch(err =>{
                this.setState({showgif:false})
                 dispatch(alertActions.error(err.message))});
    }
    submit=()=>{
        // this.setState({loader:true})
        // loginWithGoogle()
        // .catch(function (error) {
        //     alert(error); // or show toast
        // }); 
        if(window.location.hostname == "localhost")
        var host = 'http://localhost:8082';
        else if(window.location.hostname == "desk.appypie.com")
            var host = 'https://desk.appypie.com/knowledge';
        else
            var host = 'https://www.appypiedesk.com/knowledge';
        window.open('https://gauth.appypiedesk.com/oauth2/authorize?identity_provider=Google&redirect_uri='+host+'/gsignup&response_type=code&client_id=6nkq3rphk4gae0dchcnfvtpmdj&scope=aws.cognito.signin.user.admin email openid','popup','width=600,height=600'); 
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
        const { username, password,confirmpassword, submitted } = this.state;
        return (
            <Formik
                initialValues={{
                    email: '',
                    password: '',
                    confirmPassword: ''
                }}
                validationSchema={Yup.object().shape({
                    email: Yup.string()
                        .email('Email is invalid')
                        .required('Email is required'),
                    password: Yup.string()
                        .required('Password is required')
                        .matches(
                            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
                            "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
                            ),
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
                    {this.state.loader && <div className="loading" style={{display: this.state.loader ? 'block' : 'block' }}>Loading&#8230;</div>}
            <div className="login-signup main-bg">
                <section className="signIn mainFormSign-login">
                    <div className="container ps-relative">
                    <div className="getstarted-header k-flex align-items-center">
                        <div className="logo-section">
                            <img src={`${config.path}/images/logo.svg`} />
                        </div>
                    </div>
                        <div className="mainUpLogin">
                            <div className="row alignItemsSectionForm k-flex align-items-center designCenterLogin">
                                <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                                    <div className="left-side">
                                        <div className="headingLeft mb-5">
                                            <p className="stepLoginpage pb-4">STEP 1</p>
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
                                 
                                    <div className="form-login-signup">
                                    <div className="md-form md-outline mt-0">
                                        To create an account, Sign Up
                                    </div>
                                            <div className="md-form md-outline">
                                            <Field name="email" id="input-char-counter1" type="text" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                                            <ErrorMessage name="email" component="div" className="invalid-feedback" />
                                                <label for="input-char-counter1">Email ID*</label>
                                            </div>
                                            <div className="md-form md-outline">
                                                <Field name="password" id="input-char-counter11" type={this.state.showPassw ? "text" : "password"} className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                                                <div className="password-show-hide" onClick={this.showPass}>{this.state.showPassw ? <span><img src={`${config.path}/images/icon/hide-eye.svg`} /></span>:<span><img src={`${config.path}/images/icon/show-eye.svg`} /></span>}</div>
                                                {!errors.email && <p className="pass-cond light-pass-cond">Must Contain 8 Characters, 1 Uppercase, 1 Lowercase, 1 Number and 1 special case Character</p>}
                                                  <ErrorMessage name="password" component="div" className="invalid-feedback" />
                                                <label for="input-char-counter11">Password*</label>    
                                            </div>
                                            <div className="form-check dont-have-an-account">
                                                <Field type="checkbox" id="materialUnchecked" checked="checked" name="acceptTerms" className={'form-check-input ' + (errors.acceptTerms && touched.acceptTerms ? ' is-invalid' : '')} />
                                                    <label className="form-check-label" for="materialUnchecked">By signing in you agree to our <a style={{color: "#27B0D1"}} href="https://www.appypie.com/terms-of-use" target="_blank">Terms & Conditions</a> & <a href="https://www.appypie.com/privacy-policy" target="_blank" style={{color: "#27B0D1"}}>Privacy Policy</a>.</label>
                
                                                    <ErrorMessage name="acceptTerms" component="div" className="invalid-feedback" />
                                            </div>
                                            <div className="button-login-signin mt-2">
                                                <button className="btnOrange width100p py-3">Sign Up {this.state.showgif && <div className="loader-btn"></div>}</button>
                                                <p className="card-body-text position-relative text-center py-2 or-log-sig"><span><strong>Or</strong></span></p>
                                                <a className="btnBlue width100p py-0 px-0 k-flex align-items-center" onClick={this.submit}>
                                                    <span className="gp-icon">
                                                        <img src={(`${config.path}/images/google.png`)} />
                                                    </span>
                                                    <span className="gp-text ml-auto mr-auto color-white">
                                                    {this.state.showgooglegif && <div className="loader-btn"></div>}Sign Up with Google
                                                    </span>
                                                </a>
                                                {/* <ul className="social-icon-login-signup">
                                                    <li>
                                                        <span>
                                                            <img src={(`${config.path}/images/linkedin.png`)} />
                                                        </span>
                                                    </li>
                                                    <li onClick={this.submit}>
                                                        <span>
                                                            <img src={(`${config.path}/images/google.png`)} />
                                                        </span>
                                                    </li>
                                                </ul> */}
                                                <p className="card-body-text text-left pt-2"> Already have an account? <a style={{color: "#27B0D1"}} href={`${config.path}/login`}>Login</a></p>
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

const connectedSignupPage = connect(mapStateToProps)(SignupPage);
export { connectedSignupPage as SignupPage }; 