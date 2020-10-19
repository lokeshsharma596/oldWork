import React, { Fragment } from "react"
import { Link } from "react-router-dom"
import Header from "../../components/Header"
import Footer from "../../components/Footer"
import LeftSideBar from "../../components/LeftSidebar"
import BreadCrumbs from "../../components/Breadcrumbs"
import { useSelector } from "react-redux"
import Notification from "../../components/Notification"
import SuccessToast from "./../AgentsPage/SuccessToast"


const HomePage = () => {
  const homeData = useSelector(state => state.homeReducer)
  const agentData = useSelector(state => state.agentsReducer)
  return (
    <Fragment>

      <div className="main-wrapper" id="main-wrapper">


        <Header />

        <LeftSideBar />
        {(homeData.shownotification) ?
        <div class="shadow">&nbsp;</div>
        : null }
        
        {(homeData.shownotification) ?
        <Notification/>
        : null }
        
        {(agentData.showAgentSuccessToast)?
        <SuccessToast />
      :null}

        <div className={'page-wrapper '+(agentData.showMiniSideBar?'sidebar-collapse':'')}>
          <div className="container-fluid main-container">
            <div className="centerMainContainer">
             

                  <BreadCrumbs />
                 
                
              

              <div className="row mt-4">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                  <div className="white-bg">
                    <div className="container user-management-category">
                      <div className="UM-card-alltitle text-center py-5">
                        <h2 className="card-title fw-bold">User Management</h2>
                        <p className="text-mutede fw-normal light-gray-text">This module allows you to manage agents, departments, roles and associated permissions defined in the default system.</p>
                      </div>
                      <div className="UM-row pb-5">
                        <div className="row">


                          <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4">
                            <Link to="/agents" className="inherit-text a-hover-decoration-none">
                              <div className="UM-box k-flex align-items-center justify-content-center px-5 py-5 mb-4">
                                <span>
                                  <svg id="Group_4525" data-name="Group 4525" xmlns="http://www.w3.org/2000/svg" width="76.281" height="76.281" viewBox="0 0 76.281 76.281">
                                    <path id="Path_2434" data-name="Path 2434" d="M89.4,0A29.2,29.2,0,0,0,60.234,29.167V56.089a6.731,6.731,0,1,0,13.462,0V33.654a6.738,6.738,0,0,0-6.731-6.731,6.657,6.657,0,0,0-2.149.384,24.654,24.654,0,0,1,49.169-.018,6.61,6.61,0,0,0-2.148-.365,6.738,6.738,0,0,0-6.731,6.731V56.089a6.738,6.738,0,0,0,6.731,6.731,6.653,6.653,0,0,0,2.244-.413v2.657a2.247,2.247,0,0,1-2.244,2.244H95.718a6.731,6.731,0,1,0,0,4.487h16.118a6.738,6.738,0,0,0,6.731-6.731v-35.9A29.2,29.2,0,0,0,89.4,0Zm0,0" transform="translate(-51.26)" fill="#a2abd1" />
                                    <path id="Path_2435" data-name="Path 2435" d="M481.883,213.6v26.1a6.719,6.719,0,0,0,4.487-6.317V219.915A6.721,6.721,0,0,0,481.883,213.6Zm0,0" transform="translate(-410.089 -181.774)" fill="#a2abd1" />
                                    <path id="Path_2436" data-name="Path 2436" d="M0,219.915v13.461a6.719,6.719,0,0,0,4.487,6.317V213.6A6.721,6.721,0,0,0,0,219.915Zm0,0" transform="translate(0 -181.774)" fill="#a2abd1" />
                                  </svg>
                                </span>
                                <h5 className="card-title fw-normal mb-0 mt-auto">Agents</h5>
                              </div>
                            </Link>
                          </div>



                          <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4">
                            <Link to="/departments" className="inherit-text a-hover-decoration-none">
                              <div className="UM-box k-flex align-items-center justify-content-center px-5 py-5 mb-4">
                                <span>
                                  <svg id="Group_4524" data-name="Group 4524" xmlns="http://www.w3.org/2000/svg" width="82.576" height="82.575" viewBox="0 0 82.576 82.575">
                                    <g id="Group_4526" data-name="Group 4526" transform="translate(12.389 26.15)">
                                      <g id="Group_4525" data-name="Group 4525">
                                        <ellipse id="Ellipse_166" data-name="Ellipse 166" cx="2.753" cy="2.753" rx="2.753" ry="2.753" fill="#a2abd1" />
                                      </g>
                                    </g>
                                    <g id="Group_4528" data-name="Group 4528" transform="translate(9.636 39.912)">
                                      <g id="Group_4527" data-name="Group 4527">
                                        <path id="Path_2429" data-name="Path 2429" d="M69.248,247.479H61.263a1.461,1.461,0,0,0-1.512,1.4v5.808a14.937,14.937,0,0,0,11.01,0v-5.808A1.461,1.461,0,0,0,69.248,247.479Z" transform="translate(-59.751 -247.479)" fill="#a2abd1" />
                                      </g>
                                    </g>
                                    <g id="Group_4530" data-name="Group 4530" transform="translate(45.418 8.259)">
                                      <g id="Group_4529" data-name="Group 4529">
                                        <ellipse id="Ellipse_167" data-name="Ellipse 167" cx="2.753" cy="2.753" rx="2.753" ry="2.753" fill="#a2abd1" />
                                      </g>
                                    </g>
                                    <g id="Group_4532" data-name="Group 4532" transform="translate(42.666 22.021)">
                                      <g id="Group_4531" data-name="Group 4531">
                                        <path id="Path_2430" data-name="Path 2430" d="M274.048,136.546h-7.985a1.461,1.461,0,0,0-1.512,1.4v5.808a14.937,14.937,0,0,0,11.01,0v-5.808A1.461,1.461,0,0,0,274.048,136.546Z" transform="translate(-264.551 -136.546)" fill="#a2abd1" />
                                      </g>
                                    </g>
                                    <g id="Group_4534" data-name="Group 4534" transform="translate(63.309 44.041)">
                                      <g id="Group_4533" data-name="Group 4533">
                                        <ellipse id="Ellipse_168" data-name="Ellipse 168" cx="2.753" cy="2.753" rx="2.753" ry="2.753" fill="#a2abd1" />
                                      </g>
                                    </g>
                                    <g id="Group_4536" data-name="Group 4536" transform="translate(60.557 57.803)">
                                      <g id="Group_4535" data-name="Group 4535">
                                        <path id="Path_2431" data-name="Path 2431" d="M384.981,358.413H377a1.461,1.461,0,0,0-1.512,1.4v5.808a14.937,14.937,0,0,0,11.01,0v-5.808A1.462,1.462,0,0,0,384.981,358.413Z" transform="translate(-375.484 -358.413)" fill="#a2abd1" />
                                      </g>
                                    </g>
                                    <g id="Group_4538" data-name="Group 4538" transform="translate(0 0)">
                                      <g id="Group_4537" data-name="Group 4537" transform="translate(0 0)">
                                        <path id="Path_2432" data-name="Path 2432" d="M66.062,35.787c-.184,0-.363.021-.545.028L59.68,24.945a15.03,15.03,0,0,0,3.588-9l8.658,4.18a5.446,5.446,0,0,0-.359,1.9,5.5,5.5,0,1,0,5.5-5.5,5.452,5.452,0,0,0-3.536,1.321L63.107,12.806a15.13,15.13,0,0,0-29.8-.6,15.835,15.835,0,0,0-.26,2.284l-8.157,6.979a15.061,15.061,0,0,0-8.376-3.508V10.818a5.5,5.5,0,1,0-2.752,0v7.147A15.123,15.123,0,0,0,6.884,45.706V41.313a4.215,4.215,0,0,1,4.265-4.151h7.985A4.214,4.214,0,0,1,23.4,41.313v4.393a15.155,15.155,0,0,0,6.625-10.053l6.211,4.842a5.62,5.62,0,1,0,1.7-2.163l-7.695-6a15.051,15.051,0,0,0-3.408-8.9l6.454-5.524a15.173,15.173,0,0,0,6.622,9.9V23.421a4.215,4.215,0,0,1,4.265-4.151h7.985a4.214,4.214,0,0,1,4.265,4.151v1.442a1.4,1.4,0,0,0,.772,1.251L62.612,36.2a15.155,15.155,0,0,0-11.69,14.727,14.984,14.984,0,0,0,.838,4.876l-5.572,4.18a15.123,15.123,0,0,0-28.226,6.083H10.814a5.5,5.5,0,1,0,0,2.752H17.98a15.135,15.135,0,0,0,6.793,11.3V75.719a4.215,4.215,0,0,1,4.265-4.151h7.985a4.214,4.214,0,0,1,4.265,4.151v4.393a15.172,15.172,0,0,0,6.478-9.3l9.02,4.356a5.446,5.446,0,0,0-.359,1.9,5.5,5.5,0,1,0,5.5-5.5A5.452,5.452,0,0,0,58.4,72.891L48.138,67.938c.005-.168.032-.329.032-.5a15.052,15.052,0,0,0-.824-4.887l5.561-4.171A15.28,15.28,0,0,0,57.8,63.6V59.2a4.215,4.215,0,0,1,4.265-4.151h7.985A4.214,4.214,0,0,1,74.319,59.2V63.6a15.127,15.127,0,0,0-8.257-27.81Zm-50.92-1.376a5.5,5.5,0,1,1,5.5-5.5A5.51,5.51,0,0,1,15.141,34.411ZM48.171,16.52a5.5,5.5,0,1,1,5.5-5.5A5.51,5.51,0,0,1,48.171,16.52Zm-15.139,52.3a5.5,5.5,0,1,1,5.5-5.5A5.51,5.51,0,0,1,33.032,68.817ZM66.062,52.3a5.5,5.5,0,1,1,5.5-5.5A5.51,5.51,0,0,1,66.062,52.3Z" transform="translate(0 -0.004)" fill="#a2abd1" />
                                      </g>
                                    </g>
                                    <g id="Group_4540" data-name="Group 4540" transform="translate(30.28 60.555)">
                                      <g id="Group_4539" data-name="Group 4539">
                                        <ellipse id="Ellipse_169" data-name="Ellipse 169" cx="2.753" cy="2.753" rx="2.753" ry="2.753" fill="#a2abd1" />
                                      </g>
                                    </g>
                                    <g id="Group_4542" data-name="Group 4542" transform="translate(27.527 74.318)">
                                      <g id="Group_4541" data-name="Group 4541">
                                        <path id="Path_2433" data-name="Path 2433" d="M180.181,460.813H172.2a1.461,1.461,0,0,0-1.512,1.4v5.808a14.937,14.937,0,0,0,11.01,0v-5.808A1.462,1.462,0,0,0,180.181,460.813Z" transform="translate(-170.684 -460.813)" fill="#a2abd1" />
                                      </g>
                                    </g>
                                  </svg>
                                </span>
                                <h5 className="card-title fw-normal mb-0 mt-auto">Departments</h5>
                              </div>
                            </Link>
                          </div>



                          <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4">
                            <Link to="/roles" className="inherit-text a-hover-decoration-none">
                              <div className="UM-box k-flex align-items-center justify-content-center px-5 py-5 mb-4">
                                <span>
                                  <svg id="surface1" xmlns="http://www.w3.org/2000/svg" width="59.579" height="69.965" viewBox="0 0 59.579 69.965">
                                    <path id="Path_2437" data-name="Path 2437" d="M133.772,158.457a13.331,13.331,0,1,0,13.33,13.33A13.346,13.346,0,0,0,133.772,158.457Zm7.915,10.82-9.55,9.55a2.052,2.052,0,0,1-2.9,0l-3.65-3.65a2.053,2.053,0,0,1,2.9-2.9l2.2,2.2,8.1-8.1a2.053,2.053,0,1,1,2.9,2.9Zm0,0" transform="translate(-103.983 -136.804)" fill="#a2abd1" />
                                    <path id="Path_2438" data-name="Path 2438" d="M59.51,18.982l0-.054c-.03-.672-.051-1.383-.063-2.174a7.415,7.415,0,0,0-6.982-7.264C44.419,9.041,38.2,6.417,32.879,1.235l-.045-.043a4.477,4.477,0,0,0-6.085,0l-.045.043C21.385,6.417,15.163,9.041,7.118,9.49A7.415,7.415,0,0,0,.136,16.754c-.012.786-.033,1.5-.063,2.174l0,.127c-.156,8.2-.351,18.412,3.064,27.678A35.232,35.232,0,0,0,11.587,59.9a44.217,44.217,0,0,0,16.541,9.784,5.115,5.115,0,0,0,.678.185,5.008,5.008,0,0,0,1.969,0,5.119,5.119,0,0,0,.681-.186,44.245,44.245,0,0,0,16.524-9.789,35.284,35.284,0,0,0,8.453-13.169C59.86,37.429,59.666,27.2,59.51,18.982ZM29.789,52.419A17.436,17.436,0,1,1,47.226,34.983,17.456,17.456,0,0,1,29.789,52.419Zm0,0" transform="translate(0 0.001)" fill="#a2abd1" />
                                  </svg>
                                </span>
                                <h5 className="card-title fw-normal mb-0 mt-auto">Roles &amp; Permissions</h5>
                              </div>
                            </Link>
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
        <Footer />
      </div>Î
    </Fragment >
  )
}

export default HomePage;