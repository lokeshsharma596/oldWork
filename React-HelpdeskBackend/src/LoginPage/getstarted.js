import React from 'react';

class Getstarted extends React.Component{
    render(){
        return(
            <div className="organisation-bg main-bg">
                <div className="header-getstarted">
                    <div className="container">
                        <div className="getstarted-header k-flex align-items-center">
                            <div className="logo-section">
                                <img src={'../../images/logo.svg'} />
                            </div>
                            <div className="menu-section">
                                <ul>
                                    <li>
                                        <a href="/login">Log in</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                    <div className="main-getstarted">
                        <div className="container">
                            <div className="getstarted-section">
                                <div className="getstarted-content">
                                    <img src={'../../images/get-started.svg'} />
                                    <h3 className="card-title mt-5 mb-5">Build a Knowledge Base for your organisation</h3>
                                    <a className="btn-getstarted" href="/step1">Get started <div className="loader-btn"></div></a>
                                </div>
                            </div>
                        </div>
                    </div>
                        {/* <div className="loginFooterReview registrationImgFilter">
                            <div className="container review-section">
                                <div className="review-companies">
                                    <div className="reviewcompanieswrapper">
                                        <div className="reviewcompaniesimg"><a href="https://privacy.truste.com/privacy-seal/validation?rid=aaa1a089-4a08-4066-867e-29f8b4ebce47" target="_blank" rel="nofollow noopener"><img src={'../../public/images/logos/login1.png'} /></a></div>
                                    </div>
                                    <div className="reviewcompanieswrapper">
                                        <div className="reviewcompaniesimg"><a href="javascript:void(0)" rel="nofollow noopener"><img src={'../../public/images/logos/login2.png'} /></a></div>
                                    </div>
                                    <div className="reviewcompanieswrapper">
                                        <div className="reviewcompaniesimg"><a href="javascript:void(0)" rel="nofollow noopener"><img src={'../../public/images/logos/login3.png'} /></a></div>
                                    </div>
                                    <div className="reviewcompanieswrapper">
                                        <div className="reviewcompaniesimg"><a href="javascript:void(0)" rel="nofollow noopener"><img src={'../../public/images/logos/login4.png'} /></a></div>
                                    </div>
                                    <div className="reviewcompanieswrapper">
                                        <div className="reviewcompaniesimg"><a href="javascript:void(0)" rel="nofollow noopener"><img src={'../../public/images/logos/login5.png'} /></a></div>
                                    </div>
                                    <div className="reviewcompanieswrapper">
                                        <div className="reviewcompaniesimg"><a href="javascript:void(0)" rel="nofollow noopener"><img src={'../../public/images/logos/login5.png'} /></a></div>
                                    </div>
                                </div>
                            </div>
                        </div> */}

                    <div className="loginFooterReview registrationImgFilter review-getstartes">
                        <div className="container review-companies">
                            <div className="reviewcompanieswrapper">
                                <div className="reviewcompaniesimg"><a href="https://www.capterra.com/p/140928/Appy-Pie/" target="_blank" rel="nofollow noopener"><img src={'../../public/images/logos/capterra.svg'} /></a></div>
                                <div className="reviewratingstar" title="4.5/5">
                                    <div className="star-rating"><span style={{width: '90%'}} /></div>
                                </div>
                            </div>
                            <div className="reviewcompanieswrapper">
                                <div className="reviewcompaniesimg"><a href="https://www.g2.com/products/appypie/reviews" target="_blank" rel="nofollow noopener"><img src={'../../public/images/logos/g2-crowd-white1.svg'} /></a></div>
                                <div className="reviewratingstar" title="4.5/5">
                                    <div className="star-rating"><span style={{width: '90%'}} /></div>
                                </div>
                            </div>
                            <div className="reviewcompanieswrapper">
                                <div className="reviewcompaniesimg"><a href="https://gsuite.google.com/marketplace/app/appy_pie/161113010631" target="_blank" rel="nofollow noopener"><img src={'../../public/images/logos/getapp.svg'} /></a></div>
                                <div className="reviewratingstar" title="4.9/5">
                                    <div className="star-rating"><span style={{width: '98%'}} /></div>
                                </div>
                            </div>
                            <div className="reviewcompanieswrapper">
                                <div className="reviewcompaniesimg"><a href="https://www.trustpilot.com/review/www.appypie.com" target="_blank" rel="nofollow noopener"><img src={'../../public/images/logos/gsuite-marketplace-logo.svg'} /></a></div>
                                <div className="reviewratingstar" title="5.0/5">
                                    <div className="star-rating"><span style={{width: '100%'}} /></div>
                                </div>
                            </div>
                            <div className="reviewcompanieswrapper">
                                <div className="reviewcompaniesimg"><a href="https://www.getapp.com/development-tools-software/a/appy-pie/" target="_blank" rel="nofollow noopener"><img src={'../../public/images/logos/trustpilot.svg'} /></a></div>
                                <div className="reviewratingstar" title="4.6/5">
                                <div className="star-rating"><span style={{width: '92%'}} /></div>
                                </div>
                            </div>
                            <div className="reviewcompanieswrapper">
                                <div className="reviewcompaniesimg"><a href="https://www.softwareadvice.com/app-development/appy-pie-profile/" target="_blank" rel="nofollow noopener"><img src={'../../public/images/logos/soff-advice.svg'} /></a></div>
                                <div className="reviewratingstar" title="4.6/5">
                                    <div className="star-rating"><span style={{width: '92%'}} /></div>
                                </div>
                            </div>
                        </div>
                        <p className="heily-review-related">Highly rated by thousands of customers all over the world</p>
                    </div>






























                    </div>
                    
        );
    }
}

export default Getstarted;