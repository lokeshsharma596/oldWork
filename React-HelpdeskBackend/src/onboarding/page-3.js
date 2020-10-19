import React from 'react';

class SignupOnboarding extends React.Component{
    render(){
        return(
<div classname="main-wrapper" id="main-wrapper">
    <div className="onbording-main">
      <div className="signIn mainFormSign-login">
        <div className="container ps-relative onbording-main-container">
          <div className="getstarted-header k-flex align-items-center">
              <div className="logo-section">
                <img src={('../../public/images/logos/logo.svg')} />
              </div>
            </div>
          <div className="mainUpLogin">
            <div className="getstarted-section organisation organisation-name onboarding-organisation">
              <div className="getstarted-content step-two-organisation">
                <div className="onboarding-para pb-4">
                  <p>Setup your Desk</p>
                  <h4 className="card-title pt-2">A powerful helpdesk software supported by in-built self service knowledge base and community</h4>
                </div>
               <div className="right-side onboarding-signUp">
                    <p className="text-right mb-2"><span className="mr-1" style={{position: 'relative', top: '-3px'}}><img src={('../../public/images/lock.svg')} /></span>Secure Area</p>
                    <div className="form-login-signup">
                        <div className="md-form md-outline mt-0">Login to continue..</div>
                        <div className="md-form md-outline"><input name="email" id="input-char-counter1" type="text" className="form-control" defaultValue /><label htmlFor="input-char-counter1">Email ID*</label></div>
                        <div className="md-form md-outline">
                        <input name="password" id="input-char-counter11" type="password" className="form-control" defaultValue />
                        <div className="password-show-hide"><span><img src={('../../public/images/icon/show-eye.svg')} /></span></div>
                        <span toggle="#password-field" className="fa fa-lg fa-eye field-icon toggle-password" /><label htmlFor="input-char-counter11">Password*</label>
                        </div>

                        <div className="form-check dont-have-an-account text-left">
                            <input name="acceptTerms" type="checkbox" id="materialUnchecked" className="form-check-input " defaultValue defaultChecked />
                            <label className="form-check-label" htmlFor="materialUnchecked">By signing in you agree to our <a href="https://www.appypie.com/terms-of-use" target="_blank" style={{color: 'rgb(39, 176, 209)'}}>Terms &amp; Conditions</a> &amp; <a href="https://www.appypie.com/privacy-policy" target="_blank" style={{color: 'rgb(39, 176, 209)'}}>Privacy Policy</a>.</label>
                        </div>


                        <div className="button-login-signin mt-4 onboarding-signup-box-footer">
                        <button className="btnOrange py-2">Sign Up </button>
                        <p className="card-body-text position-relative text-center py-2 or-log-sig"><span><strong>Or</strong></span></p>
                        <a className="btnBlue py-0 px-0 k-flex align-items-center google-pls-icon"><span className="gp-icon"><img src={('../../public/images/google.png')} /></span><span className="gp-text ml-auto mr-auto color-white">Sign Up with Google</span></a>
                        </div>
                        <div className="md-form md-outline mb-0">
                        <p className="card-body-text text-center">Already have an account? <a href="/knowledge/signup" style={{color: 'rgb(39, 176, 209)'}}>Log In</a></p>
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
                        <div className="reviewcompaniesimg"><a href="https://privacy.truste.com/privacy-seal/validation?rid=aaa1a089-4a08-4066-867e-29f8b4ebce47" target="_blank" rel="nofollow noopener"><img src={('../../public/images/logos/login1.png')} /></a></div>
                    </div>
                    <div className="reviewcompanieswrapper">
                        <div className="reviewcompaniesimg"><a href="javascript:void(0)" rel="nofollow noopener"><img src={('../../public/images/logos/login2.png')} /></a></div>
                    </div>
                    <div className="reviewcompanieswrapper">
                        <div className="reviewcompaniesimg"><a href="javascript:void(0)" rel="nofollow noopener"><img src={('../../public/images/logos/login3.png')} /></a></div>
                    </div>
                    <div className="reviewcompanieswrapper">
                        <div className="reviewcompaniesimg"><a href="javascript:void(0)" rel="nofollow noopener"><img src={('../../public/images/logos/login4.png')} /></a></div>
                    </div>
                    <div className="reviewcompanieswrapper">
                        <div className="reviewcompaniesimg"><a href="javascript:void(0)" rel="nofollow noopener"><img src={('../../public/images/logos/login5.png')} /></a></div>
                    </div>
                    </div>
                </div>
                </div>
        </div>
      </div>
    </div>
  
</div>

        );
    }
}

export default SignupOnboarding;