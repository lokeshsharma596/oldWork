import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';
import { GoogleLogin } from '../_helpers/googlelogin';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { history } from '../_helpers';
import config from 'config';
class SignupSuccessPage extends React.Component {
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
    login=()=>{
        // localStorage.setItem('user',localStorage.getItem('temp'))
        var email = atob(localStorage.getItem('tempdata').split('@')[0]);
        var password = atob(localStorage.getItem('tempdata').split('@')[1]);  
        const { dispatch } = this.props;
        dispatch(userActions.login(email,password));
        // localStorage.removeItem('temp');
        // history.replace('/dashboard');
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
                    <div className="container">
                        <div className="mainUpLogin">
                            <div className="row alignItemsSectionForm k-flex align-items-center designCenterLogin">
                                <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                                    <div className="left-side">
                                        <div className="headingLeft mb-5">
                                            <p>Step 4</p>
                                            <h4>Your Knowledge Base<br />
                                            is ready!!!</h4>
                                        </div>
                                        <div className="ParaLeft">
                                        <p>You are just one step away from adding articles to your Knowledge Base!</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                                    <div className="right-side">
                                    <div className="form-login-signup">
                                                <div className="congrates-login text-center">
                                                    <div className="congratulation-image">
                                                        <img src={(`${config.path}/images/congratulation.svg`)} />
                                                    </div>
                                                    <div className="congratulation-para">
                                                        <h4 className="mt-4 mb-4">Congratulations!!!</h4>
                                                        <p className="card-body-text">To Add Article,Proceed.</p>
                                                    </div>
                                                    <div className="button-login-signin mt-4">
                                                        <button className="btnOrange mr-2" onClick={this.login}>Add Articles <div className="loader-btn"></div></button>
                                                    </div>
                                                </div>
                                            </div>
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

const connectedSignupSuccessPage = connect(mapStateToProps)(SignupSuccessPage);
export { connectedSignupSuccessPage as SignupSuccessPage }; 