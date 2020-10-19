import React from 'react';
import { connect } from 'react-redux';

import { userActions } from '../_actions';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import config from 'config';

class succespage extends React.Component {
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
                                        <p>Step 3</p>
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
                                                <div className="congrates-login text-center">
                                                    <div className="congratulation-image">
                                                        <img src={(`${config.path}/images/congratulation.svg`)} />
                                                    </div>
                                                    <div className="congratulation-para">
                                                        <h4 className="mt-4 mb-4">Hurray !!!</h4>
                                                        <p className="card-body-text">The password for your account has been successfully reset. Please Log In using the button below to access it.</p>
                                                    </div>
                                                    <div className="button-login-signin mt-4">
                                                        <a className="btnBlue mr-2" href={`${config.path}/login`}>Login</a>
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

const connectedsuccespage = connect(mapStateToProps)(succespage);
export { connectedsuccespage as succespage }; 