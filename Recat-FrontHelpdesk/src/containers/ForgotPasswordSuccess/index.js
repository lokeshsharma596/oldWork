import React,{useEffect} from "react";
import { Link } from "react-router-dom"
import BaseLayout from "../BaseLayout"
import {useDispatch} from "react-redux"
import {resetErrors} from "../BaseLayout/actions"

const Index = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(resetErrors())
    },[])

    return (
        <BaseLayout>
        <div className="mainFullWidth loginSignup_footer">
            <div className="signup sign-login">
                <div className="signup-login-loges">
                    <div className="container ps-relative">


                        <div className="signupFeilds">
                            <div className="headings-login-signup">
                                <img src='/images/congrates.svg' />
                                <br /><br />
                                <h2>Hurray!!!</h2>
                                <p>The password for your account has been successfully reset.Please Log In using the button below to access it.</p>
                            </div>
                            <div className="feilds-new">
                                <div className="user-feilds">
                                    <div className="login-signup-btn k-flex align-items-center">
                                        <Link to="/login" className="login-signup-btn"><button type="submit">Login</button></Link>
                                    </div>
                                </div>
                            </div>
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
                </div> </div>
        </div>
        </BaseLayout>
    )
}


export default Index;
