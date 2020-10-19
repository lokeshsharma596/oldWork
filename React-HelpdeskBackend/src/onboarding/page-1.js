import React from 'react';




class SetupOnboardingDesk extends React.Component{ 
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
              <div className="getstarted-content step-one-organisation">
                <div className="onboarding-para pb-5">
                  <p>Setup your Desk</p>
                  <h4 className="card-title pt-2">A powerful helpdesk software supported by in-built self service knowledge base and community</h4>
                </div>
                <div className="organisation-para pb-2">
                  <h3 className="card-title">Enter The Name of your organisation</h3>
                </div>
                <div className="create-categroy-feilds create-knowledgeFeilds mt-4 mb-2">
                  <div className="md-form md-outline"><input type="text" id="inputMDEx71" className="form-control" name="domainname" defaultValue /><label htmlFor="inputMDEx71">Enter Organisation Name *</label></div>
                </div>
                {/* <p className="note-organisation"><strong>Note : </strong>This will serve as the name of your Knowledge Base. Don’t worry, you can change this later in the settings section.</p> */}
                <div className="button-oraganition mt-4 pt-2"><button className="btn-organition">Save & Continue</button></div>
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



export default SetupOnboardingDesk;