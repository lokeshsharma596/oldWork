import React from 'react';
import { connect } from 'react-redux';
import { history } from '../_helpers';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import config from 'config';
import * as Yup from 'yup';
import { alertActions } from '../_actions/alert.actions';
import { userService } from '../_services';
import { Auth,Hub } from 'aws-amplify'

class ConfirmPassword extends React.Component {
    constructor(props) {
        super(props);


        this.state = {
            username: '',
            password: '',
            confirmpassword:'',
            term:'',
            showgif: false,
            showPassw: false,
            submitted: false
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
          //  dispatch(userActions.confirmpassword(atob(this.props.match.params.id),fields.verify,fields.password));
            Auth.forgotPasswordSubmit(atob(this.props.match.params.id), fields.verify, fields.password)
            .then(data => {
                userService.confirmpassword((this.props.match.params.id))
            .then(
                user => { 
                    this.setState({showgif:!this.state.showgif})
                    dispatch(alertActions.success(user));
                    history.replace('/resetsucess');
                },
                error => {
                    this.setState({showgif:!this.state.showgif})
                    dispatch(alertActions.error(error));
                }
            );
               // history.replace('/resetsucess');
            })
            .catch(err => {
                this.setState({showgif:!this.state.showgif}) 
                dispatch(alertActions.error(err.message))});
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
                    confirmPassword: '',
                    verify:'',
                }}
                validationSchema={Yup.object().shape({
                    verify: Yup.string()
                        .required('Verification code is required'),
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
                        <div className="mainUpLogin">
                            <div className="row alignItemsSectionForm k-flex align-items-center designCenterLogin">
                                <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                                    <div className="left-side">
                                        <div className="headingLeft mb-5">
                                            <p className="stepLoginpage">STEP 2</p>
                                            <h4>Forgot your Password? 
Don't worry!</h4>
                                        </div>
                                        <div className="ParaLeft">
                                            <p>Reset your password in three easy steps. Enter your email address in the box on the right.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                                    <div className="right-side">
                                    <div className="form-login-signup">
                                            <div className="congrates-login">
                                                <div className="md-form md-outline verification-para">
                                                    <p>Enter your new password.</p>
                                                </div>
                                                <div className="md-form md-outline">
                                                 <Field name="verify" id="input-char-counter1" type="text" className={'form-control' + (errors.verify && touched.verify ? ' is-invalid' : '')} />
                                                <label for="input-char-counter1">Enter Verification Code*</label>
                                                <ErrorMessage name="verify" component="div" className="invalid-feedback" />
                                                </div>
                                                <div className="md-form md-outline">
                                                <Field name="password" id="input-char-counter11" type="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                                                  <ErrorMessage name="password" component="div" className="invalid-feedback" />
                                                <label for="input-char-counter11">Password</label>  
                                                </div>
                                                <div className="md-form md-outline">
                                                <Field name="confirmPassword" id="input-char-counter12" type={this.state.showPassw ? "text" : "password"} className={'form-control' + (errors.confirmPassword && touched.confirmPassword ? ' is-invalid' : '')} />
                                                <div className="password-show-hide" onClick={this.showPass}>{this.state.showPassw ? <span><img src={`${config.path}/images/icon/hide-eye.svg`} /></span>:<span><img src={`${config.path}/images/icon/show-eye.svg`} /></span>}</div>
                                                 <ErrorMessage name="confirmPassword" component="div" className="invalid-feedback" />
                              
                                                <label for="input-char-counter12">Confirm Password*</label>
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

const connectedConfirmPassword = connect(mapStateToProps)(ConfirmPassword);
export { connectedConfirmPassword as ConfirmPassword }; 