import React from 'react';
import { connect } from 'react-redux';

import { userActions } from '../_actions';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import config from 'config';
import * as Yup from 'yup';

class CompanyDetail extends React.Component {
    constructor(props) {
        super(props);


        this.state = {
            username: '',
            password: '',
            confirmpassword:'',
            term:'',
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
            dispatch(userActions.signup(fields.email, fields.password));
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
                    acceptTerms: false
                }}
                validationSchema={Yup.object().shape({
                    email: Yup.string()
                        .email('Email is invalid')
                        .required('Email is required'),
                    password: Yup.string()
                        .required('Password is required')
                        .matches(
                        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
                        ),
                    confirmPassword: Yup.string()
                        .oneOf([Yup.ref('password'), null], 'Passwords must match')
                        .required('Confirm Password is required'),
                    acceptTerms: Yup.bool()
                        .oneOf([true], 'Accept Ts & Cs is required')
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
                                            <p className="stepLoginpage">STEP 3</p>
                                            <h4>Let’s get you<br />
                                                Signed up!!!</h4>
                                        </div>
                                        <div className="ParaLeft">
                                            <p>Sign up in three easy steps using your email address and create a strong password or sign up via Google or LinkedIn in just a click!</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                                    <div className="right-side">
                                    <div className="form-login-signup">
                                                <div className="md-form md-outline">
                                                    <input id="input-char-counter1" type="text" length="10" className="form-control" />
                                                    <label for="input-char-counter1">Company Name*</label>
                                                </div>
                                                <div className="md-form md-outline select-signup">
                                                    <select className="mdb-select colorful-select dropdown-primary" id="input-char-counter2">
                                                        <option value="" disabled selected> </option>
                                                        <option value="50-100">50 - 100</option>
                                                        <option value="100-200">100 - 200</option>
                                                        <option value="200-300">200 - 300</option>
                                                        <option value="300-400">300 - 400</option>
                                                        <option value="400-500">400 - 500</option>
                                                    </select>
                                                    <label for="input-char-counter2" className="">No. Of Employees*</label>
                                                </div>
                                                <div className="md-form md-outline appypieDomainFeilds">
                                                    <input id="input-char-counter3" type="text" length="10" className="form-control" />
                                                    <label for="input-char-counter3">Your Appy Pie Sub Domain</label>
                                                    <span className="doamin-fixed">.appypie.com</span>
                                                    <p className="domain-setup-para" style={{fontSize: "12px"}}>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.</p>
                                                </div>
                                                
                                                <div className="md-form md-outline select-signup">
                                                    <select className="mdb-select colorful-select dropdown-primary" id="input-char-counter4">
                                                        <option value="" selected> </option>
                                                        <option value="1">English (United State)</option>
                                                        <option value="2">Hindi</option>
                                                        <option value="3">Urdu</option>
                                                        <option value="3">Arabic</option>
                                                    </select>
                                                    <label for="input-char-counter4" className="">Select Language*</label>
                                                </div>
                                                
                                                <div className="button-login-signin mt-4">
                                                    <a className="btnOrange mr-2" href={`${config.path}/login`}>Sign Up <div className="loader-btn"></div></a>
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

const connectedCompanyDetail = connect(mapStateToProps)(CompanyDetail);
export { connectedCompanyDetail as CompanyDetail }; 