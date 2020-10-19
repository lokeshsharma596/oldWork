import React from 'react';

class SelectTheme extends React.Component{
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
                <div className="organisation-para pb-2">
                  {/* <p>Stup Your Desk</p> */}
                  <h3 className="card-title mb-0">Select a Theme for your Help Portal</h3>
                </div>
                <div className="lapy-screen color-thems-lapy">
                  <div className="color-thems-select">
                    <ul>
                      <li className="selected"><span style={{background: 'rgb(27, 34, 60)'}}>&nbsp;</span></li>
                      <li className><span style={{background: 'rgb(172, 172, 172)'}}>&nbsp;</span></li>
                      <li className><span style={{background: 'rgb(191, 101, 156)'}}>&nbsp;</span></li>
                      <li className><span style={{background: 'rgb(58, 122, 196)'}}>&nbsp;</span></li>
                      <li className><span style={{background: 'rgb(129, 190, 185)'}}>&nbsp;</span></li>
                      <li>
                        <span>
                          <svg xmlns="http://www.w3.org/2000/svg" width="19.799" height="19.799" viewBox="0 0 19.799 19.799">
                            <path id="ic_clear_24px" d="M19,6.41,17.59,5,12,10.59,6.41,5,5,6.41,10.59,12,5,17.59,6.41,19,12,13.41,17.59,19,19,17.59,13.41,12Z" transform="translate(9.899 -7.071) rotate(45)" fill="#cecece" />
                          </svg>
                        </span>
                        <div className="property-panel-control ColorPickr">
                          <span className="title" />
                          <div className="content">
                            <input className="input" title="Shift + Click to change color format" defaultValue="#36c" />
                            <span>
                              <div className="rc-color-picker-wrap "><span className="rc-color-picker-trigger" unselectable="unselectable" style={{backgroundColor: 'rgb(51, 102, 204)'}} /></div>
                            </span>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div className="lapy-screens-designs pt-3">
                    <div className="lapy-img-data">
                      <img src={('../../public/images/lapy.svg')} />
                      <div className="website-in-lapy">
                        <div className="lapy-html-view">
                          <div className="bgSpace" style={{background: 'rgb(27, 34, 60)'}}>
                            <div className="container-lapy">
                              <p>Knowledge Base / Categories</p>
                              <div className="brandLogo"><img src={('../../public/images/nira.svg')} /></div>
                            </div>
                          </div>
                          <div className="headingTitleSearch mt-4 mb-2">
                            <div className="container-lapy">
                              <div className="headingTitleSearch-details">
                                <h2 className="card-title">atica Analytics</h2>
                                <p className="text-mutede">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa</p>
                              </div>
                            </div>
                          </div>
                          <div className="tilesection">
                            <div className="container-lapy">
                              <div className="tile-sec-new k-flex justify-content-center align-items-center ">
                                <div className="tiles-box atica-help-desk mr-2">
                                  <div className="tiles-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14.383" height="14.672" viewBox="0 0 14.383 14.672">
                                      <g id="Group_1876" data-name="Group 1876" transform="translate(0 0)">
                                        <path id="Path_1738" data-name="Path 1738" d="M276.087,75.43a1.044,1.044,0,0,1,.532.108q3.137,1.466,6.275,2.932c.15.07.368.1.364.328,0,.214-.211.243-.355.311q-3.167,1.484-6.337,2.96a1.116,1.116,0,0,1-.977.005q-3.222-1.5-6.442-3.008c-.122-.057-.268-.1-.267-.278s.149-.218.271-.275q3.2-1.5,6.4-2.989A1.07,1.07,0,0,1,276.087,75.43Z" transform="translate(-268.88 -75.427)" fill="#1b223c" />
                                        <path id="Path_1739" data-name="Path 1739" d="M270.779,106.722a1.117,1.117,0,0,1,.51.122q2.108.987,4.218,1.971a1.26,1.26,0,0,0,1.126,0c1.405-.659,2.813-1.312,4.218-1.971a1.2,1.2,0,0,1,1.042-.015c.384.171.762.355,1.143.534.113.053.226.114.225.26s-.113.207-.226.26q-3.242,1.513-6.485,3.025a1.122,1.122,0,0,1-.978-.008q-3.223-1.5-6.443-3.007c-.12-.056-.247-.11-.248-.268s.124-.215.244-.271q.55-.257,1.1-.517A1.226,1.226,0,0,1,270.779,106.722Z" transform="translate(-268.881 -100.289)" fill="#1b223c" />
                                        <path id="Path_1740" data-name="Path 1740" d="M276.045,130.3a1.112,1.112,0,0,1-.627-.157q-3.085-1.443-6.171-2.884c-.15-.07-.368-.1-.361-.331.006-.213.213-.239.357-.31.322-.16.65-.307.975-.46a1.217,1.217,0,0,1,1.084,0c1.371.641,2.747,1.272,4.114,1.924a1.426,1.426,0,0,0,1.316,0c1.373-.655,2.756-1.29,4.135-1.933a1.187,1.187,0,0,1,1.042-.007c.375.173.748.35,1.121.527.118.056.245.11.238.273s-.126.2-.237.251l-4.4,2.059c-.679.317-1.359.632-2.036.952A1.076,1.076,0,0,1,276.045,130.3Z" transform="translate(-268.884 -115.632)" fill="#1b223c" />
                                      </g>
                                    </svg>
                                  </div>
                                  <div className="tiles-details">
                                    <h5 className="card-title mb10">atica Help Desk</h5>
                                    <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque</p>
                                  </div>
                                </div>
                                <div className="tiles-box atica-help-desk">
                                  <div className="tiles-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14.383" height="14.672" viewBox="0 0 14.383 14.672">
                                      <g id="Group_1876" data-name="Group 1876" transform="translate(0 0)">
                                        <path id="Path_1738" data-name="Path 1738" d="M276.087,75.43a1.044,1.044,0,0,1,.532.108q3.137,1.466,6.275,2.932c.15.07.368.1.364.328,0,.214-.211.243-.355.311q-3.167,1.484-6.337,2.96a1.116,1.116,0,0,1-.977.005q-3.222-1.5-6.442-3.008c-.122-.057-.268-.1-.267-.278s.149-.218.271-.275q3.2-1.5,6.4-2.989A1.07,1.07,0,0,1,276.087,75.43Z" transform="translate(-268.88 -75.427)" fill="#1b223c" />
                                        <path id="Path_1739" data-name="Path 1739" d="M270.779,106.722a1.117,1.117,0,0,1,.51.122q2.108.987,4.218,1.971a1.26,1.26,0,0,0,1.126,0c1.405-.659,2.813-1.312,4.218-1.971a1.2,1.2,0,0,1,1.042-.015c.384.171.762.355,1.143.534.113.053.226.114.225.26s-.113.207-.226.26q-3.242,1.513-6.485,3.025a1.122,1.122,0,0,1-.978-.008q-3.223-1.5-6.443-3.007c-.12-.056-.247-.11-.248-.268s.124-.215.244-.271q.55-.257,1.1-.517A1.226,1.226,0,0,1,270.779,106.722Z" transform="translate(-268.881 -100.289)" fill="#1b223c" />
                                        <path id="Path_1740" data-name="Path 1740" d="M276.045,130.3a1.112,1.112,0,0,1-.627-.157q-3.085-1.443-6.171-2.884c-.15-.07-.368-.1-.361-.331.006-.213.213-.239.357-.31.322-.16.65-.307.975-.46a1.217,1.217,0,0,1,1.084,0c1.371.641,2.747,1.272,4.114,1.924a1.426,1.426,0,0,0,1.316,0c1.373-.655,2.756-1.29,4.135-1.933a1.187,1.187,0,0,1,1.042-.007c.375.173.748.35,1.121.527.118.056.245.11.238.273s-.126.2-.237.251l-4.4,2.059c-.679.317-1.359.632-2.036.952A1.076,1.076,0,0,1,276.045,130.3Z" transform="translate(-268.884 -115.632)" fill="#1b223c" />
                                      </g>
                                    </svg>
                                  </div>
                                  <div className="tiles-details">
                                    <h5 className="card-title mb10">atica Help Desk</h5>
                                    <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
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

export default SelectTheme;