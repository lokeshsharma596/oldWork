import React from 'react';
import { connect } from 'react-redux';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import config from 'config';
import { userActions } from '../_actions';

class ForgetPasswordPage extends React.Component {
    constructor(props) {
        super(props);
        // reset login status 

        this.state = {
            username: (localStorage.getItem('sendcode'))?localStorage.getItem('sendcode'):'',
            password: '',
            code:'',
            submitted: false,
            resendsubmit:false,
            showgif: false,
            hide:(localStorage.getItem('sendcode'))?true:false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }  
    handleSubmit(fields) {
        const { dispatch } = this.props;
        this.setState({showgif:!this.state.showgif})
          dispatch(userActions.forgetsendcode(fields.email));
          setTimeout(() => {
            this.setState({showgif:!this.state.showgif})
        }, 3000)
    }
    handleAlternate(event) {
        event.preventDefault();
        this.setState({ resendsubmit: true });
        this.setState({ submitted: true });
        const { username,code,password } = this.state;
        const { dispatch } = this.props;
        if (username && code && password) {
            this.setState({showgif:!this.state.showgif})
            dispatch(userActions.confirmpassword(username,code,password));
            setTimeout(() => {
                this.setState({showgif:!this.state.showgif})
            }, 3000)
        }
      }

    render() {
        const { loggingIn } = this.props;
        return (
             <Formik
                initialValues={{
                    email: '',
                }}
                validationSchema={Yup.object().shape({
                    email: Yup.string()
                        .email('Email is invalid')
                        .required('Email is required'),
                })}
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
                                            <p className="stepLoginpage">STEP 1</p>
                                            <h4>Forgot your Password? <br />
                                                Don't worry!!!</h4>
                                        </div>
                                        <div className="ParaLeft">
                                            <p>Reset your password in three easy steps. Enter your email address in the box on the right.</p>
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
                                            <div className="congrates-login">
                                                <div className="md-form md-outline">
                                                <Field name="email" id="input-char-counter1" type="text" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                                            <ErrorMessage name="email" component="div" className="invalid-feedback" />
                                                <label for="input-char-counter1">Email ID*</label>
                                                </div>
                                                <div className="button-login-signin mt-4">
                                                    <button className="btnOrange mr-2">Submit {this.state.showgif && <div className="loader-btn"></div>}</button>
                                                </div>
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
                                    <div className="reviewcompaniesimg"><a href="javascript:void(0)" rel="nofollow noopener"> <img src={`${config.path}/images/logos/login2.png`} /></a></div>
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

/* class mapStateToProps extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const state = this.props;
        const { loggingIn } = state.authentication;
        return {
            loggingIn
        };
    }
} */
function mapStateToProps(state) {
    const { loggingIn } = state.authentication;
    return {
        loggingIn
    };
}

const connectedForgetPasswordPage = connect(mapStateToProps)(ForgetPasswordPage);
export { connectedForgetPasswordPage as ForgetPasswordPage }; 