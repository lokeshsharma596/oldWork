import React, { Fragment } from "react";
import ReactTooltip from 'react-tooltip'
import Search from "../../utils/algolia"
import BreadCrumbs from "./BreadCrumbs"
import Categories from "../Sidebar/Category"
import SideFolders from "../Sidebar/Folders"
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux"
import { showCategorySideBar, hideCategorySideBar, showFolderSideBar, hideFolderSideBar } from "../../containers/BaseLayout/actions"
import {Link} from "react-router-dom"

const HeaderContent = () => {

  const pathname = useLocation().pathname.split("/")[1]
  const dispatch = useDispatch()
  const baseData = useSelector(state => state.baseReducer)
  const folderData = useSelector(state => state.folderReducer)
  const articlesData = useSelector(state => state.articlesReducer)

  return (
    <Fragment>

      {(useLocation().pathname === "/") ?
        <div className="mainFullWidth">
          <div className="bgSpace" style={{ backgroundColor: baseData.settings.frontendsettings.themescolor }}>
            <div className="container">
              <div className=" welcome-appypie-search">
                <div className="headingTitleSearch-details">

                  <h2 className="card-title white-text" style={{ color: baseData.settings.frontendsettings.textcolor }}>{baseData.settings.frontendsettings.title}</h2>

                  {(baseData.settings.frontendsettings.description !== undefined && baseData.settings.frontendsettings.description.length !== 0) ?
                    <p className="text-welcome white-text" style={{ color: baseData.settings.frontendsettings.textcolor }}>{baseData.settings.frontendsettings.description}</p>
                    : null
                  }

                </div>

                {(Object.keys(baseData.settings).length > 0 && baseData.settings.frontendsettings.enablesearch) ?
                  <Search userinfo={[baseData.settings.usersettings.userId]} />
                  : null}

              </div>
            </div>
          </div>


          <div className="knowledgebase-colume">
            <div className="container">
              <div className="row">
                <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4">


                  <div className="knowledge-wel-col text-center">
                    <Link to="/categories">
                     
                        <div>
                          <div className="knowledge-wel-image">
                            <svg xmlns="http://www.w3.org/2000/svg" width="63.205" height="65.787" viewBox="0 0 63.205 65.787">
                              <g id="Group_4285" data-name="Group 4285" transform="translate(-357 -666)">
                                <g id="_005-knowledge" data-name="005-knowledge" transform="translate(357 719.822)">
                                  <g id="Group_997" data-name="Group 997" transform="translate(0.057)">
                                    <g id="Group_996" data-name="Group 996">
                                      <path id="Path_1480" data-name="Path 1480" d="M63.507,370.611v-2.176c-14.191,0-29.271,3.43-29.369,9.79H29.787c-.1-6.359-15.177-9.79-29.369-9.79v2.176c15.935,0,27.063,4,27.188,7.614H.418V380.4H63.507v-2.175H36.319C36.445,374.61,47.572,370.611,63.507,370.611Z" transform="translate(-0.418 -368.435)" fill="#a2abd1" />
                                    </g>
                                  </g>
                                  <g id="Group_999" data-name="Group 999" transform="translate(0 5.442)">
                                    <g id="Group_998" data-name="Group 998" transform="translate(0 0)">
                                      <rect id="Rectangle_732" data-name="Rectangle 732" width="2.175" height="20.7" transform="translate(0 2.172) rotate(-86.985)" fill="#a2abd1" />
                                    </g>
                                  </g>
                                  <g id="Group_1001" data-name="Group 1001" transform="translate(42.42 5.44)">
                                    <g id="Group_1000" data-name="Group 1000" transform="translate(0 0)">
                                      <rect id="Rectangle_733" data-name="Rectangle 733" width="20.7" height="2.175" transform="translate(0 1.091) rotate(-3.021)" fill="#a2abd1" />
                                    </g>
                                  </g>
                                </g>
                                <g id="Group_1003" data-name="Group 1003" transform="translate(362.19 666)">
                                  <path id="XMLID_49_" d="M41.128,46.1v1.541a2.445,2.445,0,0,1-2.073,2.421l-.38,1.4a1.743,1.743,0,0,1-1.683,1.292H33.226a1.743,1.743,0,0,1-1.683-1.292l-.369-1.4a2.456,2.456,0,0,1-2.084-2.432V46.092a1.483,1.483,0,0,1,1.487-1.487h9.064A1.5,1.5,0,0,1,41.128,46.1Zm6.98-20.777a12.932,12.932,0,0,1-3.647,9.021,11.918,11.918,0,0,0-3.191,6.47,2.149,2.149,0,0,1-2.128,1.813H31.076a2.128,2.128,0,0,1-2.117-1.8,12.051,12.051,0,0,0-3.213-6.492,13,13,0,1,1,22.362-9.01ZM36.58,17.456a1.466,1.466,0,0,0-1.465-1.465,9.388,9.388,0,0,0-9.379,9.379,1.465,1.465,0,1,0,2.931,0,6.456,6.456,0,0,1,6.448-6.448A1.459,1.459,0,0,0,36.58,17.456Zm-1.465-9.39A1.466,1.466,0,0,0,36.58,6.6V1.465a1.465,1.465,0,1,0-2.931,0V6.6A1.466,1.466,0,0,0,35.115,8.066ZM17.865,25.315A1.466,1.466,0,0,0,16.4,23.849H11.265a1.465,1.465,0,0,0,0,2.931H16.4A1.459,1.459,0,0,0,17.865,25.315Zm41.1-1.465H53.829a1.465,1.465,0,0,0,0,2.931h5.135a1.465,1.465,0,0,0,0-2.931ZM20.851,37.516l-3.637,3.637a1.462,1.462,0,0,0,2.063,2.073l3.637-3.637a1.462,1.462,0,1,0-2.063-2.073Zm27.5-23.969a1.463,1.463,0,0,0,1.031-.423l3.637-3.637a1.466,1.466,0,0,0-2.073-2.073l-3.637,3.637a1.461,1.461,0,0,0,0,2.073A1.488,1.488,0,0,0,48.347,13.548Zm-27.5-.434a1.462,1.462,0,1,0,2.063-2.073L19.277,7.4A1.466,1.466,0,0,0,17.2,9.477Zm28.528,24.4a1.466,1.466,0,0,0-2.073,2.073l3.637,3.637A1.462,1.462,0,0,0,53,41.153Z" transform="translate(-9.8)" fill="#a2abd1" />
                                </g>
                              </g>
                            </svg>

                          </div>
                          <div className="knowledge-wel-details">
                            <h4>Knowledge base</h4>
                            <p>Browser through our collection of article, user, guides and FAQs.</p>
                          </div>
                        </div>

                      </Link>
                  </div>


                </div>
                <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4">
                  <div className="knowledge-wel-col text-center">
                    <div>
                      <div className="knowledge-wel-image">
                        <svg xmlns="http://www.w3.org/2000/svg" width="97.65" height="54.975" viewBox="0 0 97.65 54.975">
                          <g id="Group_4286" data-name="Group 4286" transform="translate(-804.59 -862.021)">
                            <g id="Group_2306" data-name="Group 2306" transform="translate(804.59 862.021)">
                              <g id="_003-user" data-name="003-user" transform="translate(0 0)">
                                <g id="Group_953" data-name="Group 953" transform="translate(0)">
                                  <path id="Path_1470" data-name="Path 1470" d="M340.6,173.9v7.515a5.366,5.366,0,0,0,1.515,3.728v2.551a1.973,1.973,0,1,0,3.947,0v-3.468a1.979,1.979,0,0,0-.877-1.635,1.4,1.4,0,0,1-.638-1.176V173.9a4.8,4.8,0,0,1,4.784-4.784h1.615a4.8,4.8,0,0,1,4.784,4.784v7.515a1.4,1.4,0,0,1-.638,1.176,1.93,1.93,0,0,0-.877,1.635v7.236a2.33,2.33,0,0,0,1.3,2.073,57.6,57.6,0,0,1,10.3,6.6,1.668,1.668,0,0,1,.6,1.3V204.6H352.58a1.973,1.973,0,0,0,0,3.947h15.807a1.965,1.965,0,0,0,1.973-1.973v-5.143a5.57,5.57,0,0,0-2.053-4.345,62.931,62.931,0,0,0-10.146-6.638v-5.322a5.364,5.364,0,0,0,1.515-3.727v-7.515a8.741,8.741,0,0,0-8.731-8.731h-1.615A8.771,8.771,0,0,0,340.6,173.9Z" transform="translate(-272.71 -153.569)" fill="#a2abd1" />
                                  <path id="Path_1471" data-name="Path 1471" d="M1.973,208.624H18.019a1.973,1.973,0,0,0,0-3.947H3.947v-3.169a1.7,1.7,0,0,1,.6-1.3,55.69,55.69,0,0,1,10.305-6.6,2.3,2.3,0,0,0,1.3-2.073v-7.236a1.979,1.979,0,0,0-.877-1.634,1.4,1.4,0,0,1-.638-1.176v-7.515a4.8,4.8,0,0,1,4.784-4.784h1.615a4.8,4.8,0,0,1,4.784,4.784V181.5a1.4,1.4,0,0,1-.638,1.176,1.93,1.93,0,0,0-.877,1.634v3.628a1.973,1.973,0,0,0,3.947,0v-2.711A5.365,5.365,0,0,0,29.76,181.5v-7.515a8.741,8.741,0,0,0-8.731-8.731H19.415a8.741,8.741,0,0,0-8.731,8.731V181.5a5.365,5.365,0,0,0,1.515,3.728v5.322a60.723,60.723,0,0,0-10.146,6.638A5.633,5.633,0,0,0,0,201.528v5.123A1.965,1.965,0,0,0,1.973,208.624Z" transform="translate(0 -153.649)" fill="#a2abd1" />
                                  <path id="Path_1472" data-name="Path 1472" d="M154.273,127.481v-9.707A10.727,10.727,0,0,0,143.55,107.05h-2.093a10.727,10.727,0,0,0-10.724,10.724v9.707a6.36,6.36,0,0,0,1.953,4.585v7.475a78.169,78.169,0,0,0-13.355,8.691,6.631,6.631,0,0,0-2.432,5.163v6.658a1.965,1.965,0,0,0,1.973,1.973h47.24a1.965,1.965,0,0,0,1.973-1.973v-6.658a6.631,6.631,0,0,0-2.432-5.163,79.443,79.443,0,0,0-13.355-8.691v-7.475A6.268,6.268,0,0,0,154.273,127.481Zm8.89,23.8a2.714,2.714,0,0,1,1,2.113v4.684H120.867v-4.684a2.714,2.714,0,0,1,1-2.113A74.689,74.689,0,0,1,135.3,142.65a2.433,2.433,0,0,0,1.355-2.153v-9.368a1.979,1.979,0,0,0-.877-1.635A2.4,2.4,0,0,1,134.7,127.5v-9.707a6.784,6.784,0,0,1,6.777-6.777h2.093a6.784,6.784,0,0,1,6.777,6.777V127.5a2.375,2.375,0,0,1-1.076,1.993,1.93,1.93,0,0,0-.877,1.635V140.5a2.411,2.411,0,0,0,1.355,2.153A76.815,76.815,0,0,1,163.163,151.281Z" transform="translate(-93.598 -107.05)" fill="#a2abd1" />
                                </g>
                              </g>
                              <path id="Path_1828" data-name="Path 1828" d="M424.37,507.636l.734-8.791,9.124-5.445,5.388-5.617.407-8.111-2.292-5.135,1.885-13.919s5.791-4.572,7.713-4.34,9.313,3.367,9.908,7.1,1.493,5.794.657,9.686-1.2,6.435-1.471,7.891.535,7.87,1.471,9.14.044,1.8,4.738,3.874,6.091,1.249,7.089,3.642,3.229,4.58,2.447,6.542-1.146,4.737-2.447,4.569-16.161.8-24.519.718a165.307,165.307,0,0,1-17.829-1.3C426.678,508.042,424.37,507.636,424.37,507.636Z" transform="translate(-399.276 -455.061)" fill="#a2abd1" />
                            </g>
                          </g>
                        </svg>

                      </div>
                      <div className="knowledge-wel-details">
                        <h4>Community</h4>
                        <p>Ask questions,share ideas or start a discussion with other customers.</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4">
                  <div className="knowledge-wel-col text-center">
                    <div>
                      <div className="knowledge-wel-image">
                        <svg xmlns="http://www.w3.org/2000/svg" width="54.51" height="54.577" viewBox="0 0 54.51 54.577">
                          <g id="Group_2305" data-name="Group 2305" transform="translate(-0.314)">
                            <g id="Group_1853" data-name="Group 1853" transform="translate(0.314)">
                              <g id="Group_1852" data-name="Group 1852" transform="translate(0)">
                                <circle id="Ellipse_82" data-name="Ellipse 82" cx="2.129" cy="2.129" r="2.129" transform="translate(36.411 41.802)" fill="#a2abd1" />
                                <circle id="Ellipse_83" data-name="Ellipse 83" cx="2.129" cy="2.129" r="2.129" transform="translate(31.513 14.333)" fill="#a2abd1" />
                                <path id="Path_1730" data-name="Path 1730" d="M52.7,33.284h2.129V20.508h-5.43a4.258,4.258,0,0,1-1.962-8.038l1.814-.945L43.824,0,.364,20.5l0,.009H.314V33.284H2.443a4.259,4.259,0,1,1,0,8.517H.314V54.577h54.51V41.8H52.7a4.259,4.259,0,1,1,0-8.517ZM29.29,11.564A2.127,2.127,0,0,0,33.137,9.75L41.785,5.67l1.973,4.193a8.508,8.508,0,0,0-1.734,10.645h-31.7ZM50.566,45.791v4.528H40.984a2.129,2.129,0,0,0-4.259,0H4.573V45.791a8.519,8.519,0,0,0,0-16.5V24.767H36.725a2.129,2.129,0,1,0,4.259,0h9.582V29.3a8.519,8.519,0,0,0,0,16.5Z" transform="translate(-0.314)" fill="#a2abd1" />
                                <circle id="Ellipse_84" data-name="Ellipse 84" cx="2.129" cy="2.129" r="2.129" transform="translate(36.411 29.026)" fill="#a2abd1" />
                                <circle id="Ellipse_85" data-name="Ellipse 85" cx="2.129" cy="2.129" r="2.129" transform="translate(36.411 35.414)" fill="#a2abd1" />
                              </g>
                            </g>
                          </g>
                        </svg>

                      </div>
                      <div className="knowledge-wel-details">
                        <h4>Ticketing</h4>
                        <p>View your previous tickets;know their statuses and solutions.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>


        : (pathname === "categories") ?
          <div className="mainFullWidth">

            <div className="bgSpace" style={{ backgroundColor: (Object.keys(baseData.settings).length > 0) ? baseData.settings.frontendsettings.themescolor : null }}>
              <div className="container">

                {(Object.keys(baseData.settings).length > 0 && baseData.settings.frontendsettings.allowbredcumb) ?
                  <BreadCrumbs />
                  : null}


                <div className="brandLogo">
                  <div className="knowledge-wel-image" style={{ margin: 'auto' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="63.205" height="65.787" viewBox="0 0 63.205 65.787">
                      <g id="Group_4285" data-name="Group 4285" transform="translate(-357 -666)">
                        <g id="_005-knowledge" data-name="005-knowledge" transform="translate(357 719.822)">
                          <g id="Group_997" data-name="Group 997" transform="translate(0.057)">
                            <g id="Group_996" data-name="Group 996">
                              <path id="Path_1480" data-name="Path 1480" d="M63.507,370.611v-2.176c-14.191,0-29.271,3.43-29.369,9.79H29.787c-.1-6.359-15.177-9.79-29.369-9.79v2.176c15.935,0,27.063,4,27.188,7.614H.418V380.4H63.507v-2.175H36.319C36.445,374.61,47.572,370.611,63.507,370.611Z" transform="translate(-0.418 -368.435)" fill="#1c223a" />
                            </g>
                          </g>
                          <g id="Group_999" data-name="Group 999" transform="translate(0 5.442)">
                            <g id="Group_998" data-name="Group 998" transform="translate(0 0)">
                              <rect id="Rectangle_732" data-name="Rectangle 732" width="2.175" height="20.7" transform="translate(0 2.172) rotate(-86.985)" fill="#1c223a" />
                            </g>
                          </g>
                          <g id="Group_1001" data-name="Group 1001" transform="translate(42.42 5.44)">
                            <g id="Group_1000" data-name="Group 1000" transform="translate(0 0)">
                              <rect id="Rectangle_733" data-name="Rectangle 733" width="20.7" height="2.175" transform="translate(0 1.091) rotate(-3.021)" fill="#1c223a" />
                            </g>
                          </g>
                        </g>
                        <g id="Group_1003" data-name="Group 1003" transform="translate(362.19 666)">
                          <path id="XMLID_49_" d="M41.128,46.1v1.541a2.445,2.445,0,0,1-2.073,2.421l-.38,1.4a1.743,1.743,0,0,1-1.683,1.292H33.226a1.743,1.743,0,0,1-1.683-1.292l-.369-1.4a2.456,2.456,0,0,1-2.084-2.432V46.092a1.483,1.483,0,0,1,1.487-1.487h9.064A1.5,1.5,0,0,1,41.128,46.1Zm6.98-20.777a12.932,12.932,0,0,1-3.647,9.021,11.918,11.918,0,0,0-3.191,6.47,2.149,2.149,0,0,1-2.128,1.813H31.076a2.128,2.128,0,0,1-2.117-1.8,12.051,12.051,0,0,0-3.213-6.492,13,13,0,1,1,22.362-9.01ZM36.58,17.456a1.466,1.466,0,0,0-1.465-1.465,9.388,9.388,0,0,0-9.379,9.379,1.465,1.465,0,1,0,2.931,0,6.456,6.456,0,0,1,6.448-6.448A1.459,1.459,0,0,0,36.58,17.456Zm-1.465-9.39A1.466,1.466,0,0,0,36.58,6.6V1.465a1.465,1.465,0,1,0-2.931,0V6.6A1.466,1.466,0,0,0,35.115,8.066ZM17.865,25.315A1.466,1.466,0,0,0,16.4,23.849H11.265a1.465,1.465,0,0,0,0,2.931H16.4A1.459,1.459,0,0,0,17.865,25.315Zm41.1-1.465H53.829a1.465,1.465,0,0,0,0,2.931h5.135a1.465,1.465,0,0,0,0-2.931ZM20.851,37.516l-3.637,3.637a1.462,1.462,0,0,0,2.063,2.073l3.637-3.637a1.462,1.462,0,1,0-2.063-2.073Zm27.5-23.969a1.463,1.463,0,0,0,1.031-.423l3.637-3.637a1.466,1.466,0,0,0-2.073-2.073l-3.637,3.637a1.461,1.461,0,0,0,0,2.073A1.488,1.488,0,0,0,48.347,13.548Zm-27.5-.434a1.462,1.462,0,1,0,2.063-2.073L19.277,7.4A1.466,1.466,0,0,0,17.2,9.477Zm28.528,24.4a1.466,1.466,0,0,0-2.073,2.073l3.637,3.637A1.462,1.462,0,0,0,53,41.153Z" transform="translate(-9.8)" fill="#1c223a" />
                        </g>
                      </g>
                    </svg>
                  </div>
                </div>



              </div>
            </div>


            <div className="headingTitleSearch">
              <div className="container">
                {/* <div className="headingTitleSearch-details">

                  {(Object.keys(baseData.settings).length > 0) ?
                    <>
                      <h3 className="card-title pb-3">{baseData.settings.frontendsettings.title}</h3>
                      <p className="card-body-text">{baseData.settings.frontendsettings.description}</p>
                    </>
                    : null}
                </div> */}

                {(Object.keys(baseData.settings).length > 0 && baseData.settings.frontendsettings.enablesearch) ?
                  <Search userinfo={[baseData.settings.usersettings.userId]} />
                  : null}
              </div>

            </div>


          </div>


          : (pathname === "category") ?
            <Fragment>
              {(baseData.categorySidebarVisibility) ? <div className="shadow"></div> : null}

              <div className="mainFullWidth">
                <div className="bgSpace" style={{ backgroundColor: baseData.settings.frontendsettings.themescolor }}>
                  <div className="container">




                    {(baseData.settings.frontendsettings.allowbredcumb) ?
                      <BreadCrumbs />
                      : null}

                    <div className="brandLogo">

                      <div className="knowledge-wel-image" style={{ margin: 'auto' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="63.205" height="65.787" viewBox="0 0 63.205 65.787">
                          <g id="Group_4285" data-name="Group 4285" transform="translate(-357 -666)">
                            <g id="_005-knowledge" data-name="005-knowledge" transform="translate(357 719.822)">
                              <g id="Group_997" data-name="Group 997" transform="translate(0.057)">
                                <g id="Group_996" data-name="Group 996">
                                  <path id="Path_1480" data-name="Path 1480" d="M63.507,370.611v-2.176c-14.191,0-29.271,3.43-29.369,9.79H29.787c-.1-6.359-15.177-9.79-29.369-9.79v2.176c15.935,0,27.063,4,27.188,7.614H.418V380.4H63.507v-2.175H36.319C36.445,374.61,47.572,370.611,63.507,370.611Z" transform="translate(-0.418 -368.435)" fill="#1c223a" />
                                </g>
                              </g>
                              <g id="Group_999" data-name="Group 999" transform="translate(0 5.442)">
                                <g id="Group_998" data-name="Group 998" transform="translate(0 0)">
                                  <rect id="Rectangle_732" data-name="Rectangle 732" width="2.175" height="20.7" transform="translate(0 2.172) rotate(-86.985)" fill="#1c223a" />
                                </g>
                              </g>
                              <g id="Group_1001" data-name="Group 1001" transform="translate(42.42 5.44)">
                                <g id="Group_1000" data-name="Group 1000" transform="translate(0 0)">
                                  <rect id="Rectangle_733" data-name="Rectangle 733" width="20.7" height="2.175" transform="translate(0 1.091) rotate(-3.021)" fill="#1c223a" />
                                </g>
                              </g>
                            </g>
                            <g id="Group_1003" data-name="Group 1003" transform="translate(362.19 666)">
                              <path id="XMLID_49_" d="M41.128,46.1v1.541a2.445,2.445,0,0,1-2.073,2.421l-.38,1.4a1.743,1.743,0,0,1-1.683,1.292H33.226a1.743,1.743,0,0,1-1.683-1.292l-.369-1.4a2.456,2.456,0,0,1-2.084-2.432V46.092a1.483,1.483,0,0,1,1.487-1.487h9.064A1.5,1.5,0,0,1,41.128,46.1Zm6.98-20.777a12.932,12.932,0,0,1-3.647,9.021,11.918,11.918,0,0,0-3.191,6.47,2.149,2.149,0,0,1-2.128,1.813H31.076a2.128,2.128,0,0,1-2.117-1.8,12.051,12.051,0,0,0-3.213-6.492,13,13,0,1,1,22.362-9.01ZM36.58,17.456a1.466,1.466,0,0,0-1.465-1.465,9.388,9.388,0,0,0-9.379,9.379,1.465,1.465,0,1,0,2.931,0,6.456,6.456,0,0,1,6.448-6.448A1.459,1.459,0,0,0,36.58,17.456Zm-1.465-9.39A1.466,1.466,0,0,0,36.58,6.6V1.465a1.465,1.465,0,1,0-2.931,0V6.6A1.466,1.466,0,0,0,35.115,8.066ZM17.865,25.315A1.466,1.466,0,0,0,16.4,23.849H11.265a1.465,1.465,0,0,0,0,2.931H16.4A1.459,1.459,0,0,0,17.865,25.315Zm41.1-1.465H53.829a1.465,1.465,0,0,0,0,2.931h5.135a1.465,1.465,0,0,0,0-2.931ZM20.851,37.516l-3.637,3.637a1.462,1.462,0,0,0,2.063,2.073l3.637-3.637a1.462,1.462,0,1,0-2.063-2.073Zm27.5-23.969a1.463,1.463,0,0,0,1.031-.423l3.637-3.637a1.466,1.466,0,0,0-2.073-2.073l-3.637,3.637a1.461,1.461,0,0,0,0,2.073A1.488,1.488,0,0,0,48.347,13.548Zm-27.5-.434a1.462,1.462,0,1,0,2.063-2.073L19.277,7.4A1.466,1.466,0,0,0,17.2,9.477Zm28.528,24.4a1.466,1.466,0,0,0-2.073,2.073l3.637,3.637A1.462,1.462,0,0,0,53,41.153Z" transform="translate(-9.8)" fill="#1c223a" />
                            </g>
                          </g>
                        </svg>
                      </div>



                    </div>
                    <div className="pagignat-on-bg" onClick={() => { dispatch(showCategorySideBar()) }}>
                      <ul>
                        <li className="showright">
                          <span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="28.083" height="28.648" viewBox="0 0 28.083 28.648">
                              <g id="Group_1876" data-name="Group 1876" transform="translate(-268.88 -75.427)">
                                <path id="Path_1738" data-name="Path 1738" d="M282.952,75.432a2.039,2.039,0,0,1,1.039.212q6.126,2.862,12.251,5.724c.293.137.719.193.711.641-.008.418-.412.475-.694.607q-6.183,2.9-12.374,5.779a2.178,2.178,0,0,1-1.908.01q-6.292-2.929-12.578-5.873c-.239-.112-.524-.2-.521-.542s.291-.426.529-.538q6.247-2.921,12.5-5.836A2.089,2.089,0,0,1,282.952,75.432Z" fill={baseData.settings.frontendsettings.themescolor} />
                                <path id="Path_1739" data-name="Path 1739" d="M272.586,106.725a2.18,2.18,0,0,1,1,.237q4.116,1.927,8.236,3.848a2.461,2.461,0,0,0,2.2,0c2.744-1.286,5.493-2.562,8.237-3.849a2.346,2.346,0,0,1,2.035-.029c.75.333,1.489.693,2.232,1.042.221.1.44.222.44.508s-.22.4-.441.507q-6.33,2.955-12.663,5.906a2.191,2.191,0,0,1-1.91-.015q-6.292-2.93-12.58-5.871c-.233-.109-.482-.215-.485-.523s.241-.419.476-.529q1.075-.5,2.149-1.008A2.4,2.4,0,0,1,272.586,106.725Z" transform="translate(-0.001 -18.738)" fill={baseData.settings.frontendsettings.themescolor} />
                                <path id="Path_1740" data-name="Path 1740" d="M282.864,134.364a2.172,2.172,0,0,1-1.224-.306q-6.024-2.817-12.05-5.631c-.293-.137-.718-.2-.705-.645.012-.417.416-.467.7-.606.628-.312,1.268-.6,1.9-.9a2.376,2.376,0,0,1,2.117.008c2.678,1.252,5.364,2.484,8.032,3.756a2.784,2.784,0,0,0,2.57,0c2.682-1.278,5.381-2.519,8.074-3.774a2.317,2.317,0,0,1,2.034-.013c.733.337,1.461.683,2.189,1.029.23.109.479.215.465.534-.012.291-.246.389-.462.491q-4.3,2.012-8.6,4.02c-1.325.619-2.653,1.233-3.975,1.859A2.1,2.1,0,0,1,282.864,134.364Z" transform="translate(-0.003 -30.303)" fill={baseData.settings.frontendsettings.themescolor} />
                              </g>
                            </svg>
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {(baseData.categorySidebarVisibility) ?
                  <div className="rightPanelSection">
                    <div className="filterRightPanel">
                      <div className="rightPanelHeader categoryRightPanelHeader">
                        <ul>
                          <li className="closing">
                            <span className="circlebtn" onClick={() => {
                              dispatch(hideCategorySideBar())

                            }}>
                              <svg xmlns="http://www.w3.org/2000/svg" width="14.294" height="14.294" viewBox="0 0 14.294 14.294">
                                <path id="ic_clear_24px" d="M19.294,6.44,17.855,5l-5.707,5.707L6.44,5,5,6.44l5.707,5.707L5,17.855l1.44,1.44,5.707-5.707,5.707,5.707,1.44-1.44-5.707-5.707Z" transform="translate(-5 -5)" fill="#bebebe" />
                              </svg>
                            </span>
                          </li>
                        </ul>
                      </div>
                      <div className="bodyRightPanel">
                        <div className="rightPanelMain">
                          <div className="rightPanelHeadingLink categroyNameLinkblack">
                            <h6>Choose Category</h6>
                          </div>

                          {/* side bar component */}
                          <Categories />


                        </div>
                      </div>
                    </div>
                  </div>
                  : null}


                <div className="headingTitleSearch">

                  <div className="container">
                    {/* {(Object.keys(folderData.seoData).length > 0) ?
                            <>
                        
                              <h3 className="card-title pb-3">{folderData.seoData.folder_info.name}</h3>
                              <p className="card-body-text">{folderData.seoData.folder_info.description}</p>
                            </>
                            : null} */}
                    {(Object.keys(folderData.seoData).length > 0) ?
                      <div className="headingTitleSearch-details">

                        {(folderData.seoData.header_data.name.length > 20) ?
                          <>
                            <h3 className="card-title pb-3" data-tip={folderData.seoData.header_data.name}>{folderData.seoData.header_data.name.substring(0, 20) + " ..."}</h3>
                            <ReactTooltip />
                          </>
                          :
                          <h3 className="card-title pb-3">{folderData.seoData.header_data.name}</h3>
                        }

                        <p className="card-body-text">{folderData.seoData.header_data.description}</p>

                      </div>
                      : <div className="headingTitleSearch-details"></div>}



                    {(Object.keys(baseData.settings).length > 0 && baseData.settings.frontendsettings.enablesearch) ?
                      <Search userinfo={[baseData.settings.usersettings.userId]} />
                      : null}
                  </div>


                </div>
              </div>



            </Fragment>


            : (pathname === "article") ?

              <Fragment>
                {(baseData.categorySidebarVisibility || baseData.folderSidebarVisibility) ? <div className="shadow"></div> : null}


                <div className="mainFullWidth" style={{ 'marginBottom': '130px' }}>
                  <div className="bgSpace" style={{ backgroundColor: baseData.settings.frontendsettings.themescolor }}>
                    <div className="container">


                      {(baseData.settings.frontendsettings.allowbredcumb) ?
                        <BreadCrumbs />
                        : null}


                      <div className="brandLogo">

                        <div className="knowledge-wel-image" style={{ margin: 'auto' }}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="63.205" height="65.787" viewBox="0 0 63.205 65.787">
                            <g id="Group_4285" data-name="Group 4285" transform="translate(-357 -666)">
                              <g id="_005-knowledge" data-name="005-knowledge" transform="translate(357 719.822)">
                                <g id="Group_997" data-name="Group 997" transform="translate(0.057)">
                                  <g id="Group_996" data-name="Group 996">
                                    <path id="Path_1480" data-name="Path 1480" d="M63.507,370.611v-2.176c-14.191,0-29.271,3.43-29.369,9.79H29.787c-.1-6.359-15.177-9.79-29.369-9.79v2.176c15.935,0,27.063,4,27.188,7.614H.418V380.4H63.507v-2.175H36.319C36.445,374.61,47.572,370.611,63.507,370.611Z" transform="translate(-0.418 -368.435)" fill="#1c223a" />
                                  </g>
                                </g>
                                <g id="Group_999" data-name="Group 999" transform="translate(0 5.442)">
                                  <g id="Group_998" data-name="Group 998" transform="translate(0 0)">
                                    <rect id="Rectangle_732" data-name="Rectangle 732" width="2.175" height="20.7" transform="translate(0 2.172) rotate(-86.985)" fill="#1c223a" />
                                  </g>
                                </g>
                                <g id="Group_1001" data-name="Group 1001" transform="translate(42.42 5.44)">
                                  <g id="Group_1000" data-name="Group 1000" transform="translate(0 0)">
                                    <rect id="Rectangle_733" data-name="Rectangle 733" width="20.7" height="2.175" transform="translate(0 1.091) rotate(-3.021)" fill="#1c223a" />
                                  </g>
                                </g>
                              </g>
                              <g id="Group_1003" data-name="Group 1003" transform="translate(362.19 666)">
                                <path id="XMLID_49_" d="M41.128,46.1v1.541a2.445,2.445,0,0,1-2.073,2.421l-.38,1.4a1.743,1.743,0,0,1-1.683,1.292H33.226a1.743,1.743,0,0,1-1.683-1.292l-.369-1.4a2.456,2.456,0,0,1-2.084-2.432V46.092a1.483,1.483,0,0,1,1.487-1.487h9.064A1.5,1.5,0,0,1,41.128,46.1Zm6.98-20.777a12.932,12.932,0,0,1-3.647,9.021,11.918,11.918,0,0,0-3.191,6.47,2.149,2.149,0,0,1-2.128,1.813H31.076a2.128,2.128,0,0,1-2.117-1.8,12.051,12.051,0,0,0-3.213-6.492,13,13,0,1,1,22.362-9.01ZM36.58,17.456a1.466,1.466,0,0,0-1.465-1.465,9.388,9.388,0,0,0-9.379,9.379,1.465,1.465,0,1,0,2.931,0,6.456,6.456,0,0,1,6.448-6.448A1.459,1.459,0,0,0,36.58,17.456Zm-1.465-9.39A1.466,1.466,0,0,0,36.58,6.6V1.465a1.465,1.465,0,1,0-2.931,0V6.6A1.466,1.466,0,0,0,35.115,8.066ZM17.865,25.315A1.466,1.466,0,0,0,16.4,23.849H11.265a1.465,1.465,0,0,0,0,2.931H16.4A1.459,1.459,0,0,0,17.865,25.315Zm41.1-1.465H53.829a1.465,1.465,0,0,0,0,2.931h5.135a1.465,1.465,0,0,0,0-2.931ZM20.851,37.516l-3.637,3.637a1.462,1.462,0,0,0,2.063,2.073l3.637-3.637a1.462,1.462,0,1,0-2.063-2.073Zm27.5-23.969a1.463,1.463,0,0,0,1.031-.423l3.637-3.637a1.466,1.466,0,0,0-2.073-2.073l-3.637,3.637a1.461,1.461,0,0,0,0,2.073A1.488,1.488,0,0,0,48.347,13.548Zm-27.5-.434a1.462,1.462,0,1,0,2.063-2.073L19.277,7.4A1.466,1.466,0,0,0,17.2,9.477Zm28.528,24.4a1.466,1.466,0,0,0-2.073,2.073l3.637,3.637A1.462,1.462,0,0,0,53,41.153Z" transform="translate(-9.8)" fill="#1c223a" />
                              </g>
                            </g>
                          </svg>
                        </div>




                      </div>
                      <div className="pagignat-on-bg">
                        <ul>

                          <li onClick={() => { dispatch(showCategorySideBar()) }}>

                            <span>
                              <svg xmlns="http://www.w3.org/2000/svg" width="28.083" height="28.648" viewBox="0 0 28.083 28.648">
                                <g id="Group_1876" data-name="Group 1876" transform="translate(-268.88 -75.427)">
                                  <path id="Path_1738" data-name="Path 1738" d="M282.952,75.432a2.039,2.039,0,0,1,1.039.212q6.126,2.862,12.251,5.724c.293.137.719.193.711.641-.008.418-.412.475-.694.607q-6.183,2.9-12.374,5.779a2.178,2.178,0,0,1-1.908.01q-6.292-2.929-12.578-5.873c-.239-.112-.524-.2-.521-.542s.291-.426.529-.538q6.247-2.921,12.5-5.836A2.089,2.089,0,0,1,282.952,75.432Z" fill={baseData.settings.frontendsettings.themescolor} />
                                  <path id="Path_1739" data-name="Path 1739" d="M272.586,106.725a2.18,2.18,0,0,1,1,.237q4.116,1.927,8.236,3.848a2.461,2.461,0,0,0,2.2,0c2.744-1.286,5.493-2.562,8.237-3.849a2.346,2.346,0,0,1,2.035-.029c.75.333,1.489.693,2.232,1.042.221.1.44.222.44.508s-.22.4-.441.507q-6.33,2.955-12.663,5.906a2.191,2.191,0,0,1-1.91-.015q-6.292-2.93-12.58-5.871c-.233-.109-.482-.215-.485-.523s.241-.419.476-.529q1.075-.5,2.149-1.008A2.4,2.4,0,0,1,272.586,106.725Z" transform="translate(-0.001 -18.738)" fill={baseData.settings.frontendsettings.themescolor} />
                                  <path id="Path_1740" data-name="Path 1740" d="M282.864,134.364a2.172,2.172,0,0,1-1.224-.306q-6.024-2.817-12.05-5.631c-.293-.137-.718-.2-.705-.645.012-.417.416-.467.7-.606.628-.312,1.268-.6,1.9-.9a2.376,2.376,0,0,1,2.117.008c2.678,1.252,5.364,2.484,8.032,3.756a2.784,2.784,0,0,0,2.57,0c2.682-1.278,5.381-2.519,8.074-3.774a2.317,2.317,0,0,1,2.034-.013c.733.337,1.461.683,2.189,1.029.23.109.479.215.465.534-.012.291-.246.389-.462.491q-4.3,2.012-8.6,4.02c-1.325.619-2.653,1.233-3.975,1.859A2.1,2.1,0,0,1,282.864,134.364Z" transform="translate(-0.003 -30.303)" fill={baseData.settings.frontendsettings.themescolor} />
                                </g>
                              </svg>
                            </span>
                          </li>

                          <li onClick={() => { dispatch(showFolderSideBar()) }}>

                            <span>
                              <svg xmlns="http://www.w3.org/2000/svg" width="30.655" height="26.956" viewBox="0 0 30.655 26.956">
                                <g id="Group_1902" data-name="Group 1902" transform="translate(0 -3.5)">
                                  <path id="Path_1754" data-name="Path 1754" d="M13.214,7.2,10.571,3.5H0V30.456H30.655V10.9h-14.8Z" fill={baseData.settings.frontendsettings.themescolor} />
                                  <path id="Path_1755" data-name="Path 1755" d="M27.643,14.2h14.8V10.5H25Z" transform="translate(-11.786 -3.3)" fill={baseData.settings.frontendsettings.themescolor} />
                                </g>
                              </svg>
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {(baseData.categorySidebarVisibility) ?
                  <div className="rightPanelSection">
                    <div className="filterRightPanel">
                      <div className="rightPanelHeader categoryRightPanelHeader">
                        <ul>
                          <li className="closing">
                            <span className="circlebtn" onClick={() => { dispatch(hideCategorySideBar()) }}>

                              <svg xmlns="http://www.w3.org/2000/svg" width="14.294" height="14.294" viewBox="0 0 14.294 14.294">
                                <path id="ic_clear_24px" d="M19.294,6.44,17.855,5l-5.707,5.707L6.44,5,5,6.44l5.707,5.707L5,17.855l1.44,1.44,5.707-5.707,5.707,5.707,1.44-1.44-5.707-5.707Z" transform="translate(-5 -5)" fill="#bebebe" />
                              </svg>
                            </span>
                          </li>
                        </ul>
                      </div>
                      <div className="bodyRightPanel">
                        <div className="rightPanelMain">
                          <div className="rightPanelHeadingLink categroyNameLinkblack">
                            <h6>Choose Category</h6>
                          </div>

                          <Categories />


                        </div>
                      </div>
                    </div>
                  </div>
                  : null}

                {(baseData.folderSidebarVisibility) ?
                  <div className="rightPanelSection">
                    <div className="filterRightPanel">
                      <div className="rightPanelHeader categoryRightPanelHeader">
                        <ul>
                          <li className="closing">
                            <span className="circlebtn" onClick={() => { dispatch(hideFolderSideBar()) }}>

                              <svg xmlns="http://www.w3.org/2000/svg" width="14.294" height="14.294" viewBox="0 0 14.294 14.294">
                                <path id="ic_clear_24px" d="M19.294,6.44,17.855,5l-5.707,5.707L6.44,5,5,6.44l5.707,5.707L5,17.855l1.44,1.44,5.707-5.707,5.707,5.707,1.44-1.44-5.707-5.707Z" transform="translate(-5 -5)" fill="#bebebe" />
                              </svg>
                            </span>
                          </li>
                        </ul>
                      </div>
                      <div className="bodyRightPanel">
                        <div className="rightPanelMain">
                          <div className="rightPanelHeadingLink categroyNameLinkblack">
                            <h6>Choose Folder</h6>
                          </div>

                          <SideFolders />

                        </div>
                      </div>
                    </div>
                  </div>
                  : null}
              </Fragment>


              : (pathname === "folder") ?
                <Fragment>
                  {(baseData.categorySidebarVisibility || baseData.folderSidebarVisibility) ? <div className="shadow"></div> : null}



                  <div className="mainFullWidth">
                    <div className="bgSpace" style={{ backgroundColor: baseData.settings.frontendsettings.themescolor }}>
                      <div className="container">


                        {(baseData.settings.frontendsettings.allowbredcumb) ?
                          <BreadCrumbs />
                          : null}



                        <div className="brandLogo">

                          <div className="knowledge-wel-image" style={{ margin: 'auto' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="63.205" height="65.787" viewBox="0 0 63.205 65.787">
                              <g id="Group_4285" data-name="Group 4285" transform="translate(-357 -666)">
                                <g id="_005-knowledge" data-name="005-knowledge" transform="translate(357 719.822)">
                                  <g id="Group_997" data-name="Group 997" transform="translate(0.057)">
                                    <g id="Group_996" data-name="Group 996">
                                      <path id="Path_1480" data-name="Path 1480" d="M63.507,370.611v-2.176c-14.191,0-29.271,3.43-29.369,9.79H29.787c-.1-6.359-15.177-9.79-29.369-9.79v2.176c15.935,0,27.063,4,27.188,7.614H.418V380.4H63.507v-2.175H36.319C36.445,374.61,47.572,370.611,63.507,370.611Z" transform="translate(-0.418 -368.435)" fill="#1c223a" />
                                    </g>
                                  </g>
                                  <g id="Group_999" data-name="Group 999" transform="translate(0 5.442)">
                                    <g id="Group_998" data-name="Group 998" transform="translate(0 0)">
                                      <rect id="Rectangle_732" data-name="Rectangle 732" width="2.175" height="20.7" transform="translate(0 2.172) rotate(-86.985)" fill="#1c223a" />
                                    </g>
                                  </g>
                                  <g id="Group_1001" data-name="Group 1001" transform="translate(42.42 5.44)">
                                    <g id="Group_1000" data-name="Group 1000" transform="translate(0 0)">
                                      <rect id="Rectangle_733" data-name="Rectangle 733" width="20.7" height="2.175" transform="translate(0 1.091) rotate(-3.021)" fill="#1c223a" />
                                    </g>
                                  </g>
                                </g>
                                <g id="Group_1003" data-name="Group 1003" transform="translate(362.19 666)">
                                  <path id="XMLID_49_" d="M41.128,46.1v1.541a2.445,2.445,0,0,1-2.073,2.421l-.38,1.4a1.743,1.743,0,0,1-1.683,1.292H33.226a1.743,1.743,0,0,1-1.683-1.292l-.369-1.4a2.456,2.456,0,0,1-2.084-2.432V46.092a1.483,1.483,0,0,1,1.487-1.487h9.064A1.5,1.5,0,0,1,41.128,46.1Zm6.98-20.777a12.932,12.932,0,0,1-3.647,9.021,11.918,11.918,0,0,0-3.191,6.47,2.149,2.149,0,0,1-2.128,1.813H31.076a2.128,2.128,0,0,1-2.117-1.8,12.051,12.051,0,0,0-3.213-6.492,13,13,0,1,1,22.362-9.01ZM36.58,17.456a1.466,1.466,0,0,0-1.465-1.465,9.388,9.388,0,0,0-9.379,9.379,1.465,1.465,0,1,0,2.931,0,6.456,6.456,0,0,1,6.448-6.448A1.459,1.459,0,0,0,36.58,17.456Zm-1.465-9.39A1.466,1.466,0,0,0,36.58,6.6V1.465a1.465,1.465,0,1,0-2.931,0V6.6A1.466,1.466,0,0,0,35.115,8.066ZM17.865,25.315A1.466,1.466,0,0,0,16.4,23.849H11.265a1.465,1.465,0,0,0,0,2.931H16.4A1.459,1.459,0,0,0,17.865,25.315Zm41.1-1.465H53.829a1.465,1.465,0,0,0,0,2.931h5.135a1.465,1.465,0,0,0,0-2.931ZM20.851,37.516l-3.637,3.637a1.462,1.462,0,0,0,2.063,2.073l3.637-3.637a1.462,1.462,0,1,0-2.063-2.073Zm27.5-23.969a1.463,1.463,0,0,0,1.031-.423l3.637-3.637a1.466,1.466,0,0,0-2.073-2.073l-3.637,3.637a1.461,1.461,0,0,0,0,2.073A1.488,1.488,0,0,0,48.347,13.548Zm-27.5-.434a1.462,1.462,0,1,0,2.063-2.073L19.277,7.4A1.466,1.466,0,0,0,17.2,9.477Zm28.528,24.4a1.466,1.466,0,0,0-2.073,2.073l3.637,3.637A1.462,1.462,0,0,0,53,41.153Z" transform="translate(-9.8)" fill="#1c223a" />
                                </g>
                              </g>
                            </svg>
                          </div>

                        </div>
                        <div className="pagignat-on-bg">
                          <ul>
                            <li onClick={() => { dispatch(showCategorySideBar()) }}>
                              <span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="28.083" height="28.648" viewBox="0 0 28.083 28.648">
                                  <g id="Group_1876" data-name="Group 1876" transform="translate(-268.88 -75.427)">
                                    <path id="Path_1738" data-name="Path 1738" d="M282.952,75.432a2.039,2.039,0,0,1,1.039.212q6.126,2.862,12.251,5.724c.293.137.719.193.711.641-.008.418-.412.475-.694.607q-6.183,2.9-12.374,5.779a2.178,2.178,0,0,1-1.908.01q-6.292-2.929-12.578-5.873c-.239-.112-.524-.2-.521-.542s.291-.426.529-.538q6.247-2.921,12.5-5.836A2.089,2.089,0,0,1,282.952,75.432Z" fill={baseData.settings.frontendsettings.themescolor} />
                                    <path id="Path_1739" data-name="Path 1739" d="M272.586,106.725a2.18,2.18,0,0,1,1,.237q4.116,1.927,8.236,3.848a2.461,2.461,0,0,0,2.2,0c2.744-1.286,5.493-2.562,8.237-3.849a2.346,2.346,0,0,1,2.035-.029c.75.333,1.489.693,2.232,1.042.221.1.44.222.44.508s-.22.4-.441.507q-6.33,2.955-12.663,5.906a2.191,2.191,0,0,1-1.91-.015q-6.292-2.93-12.58-5.871c-.233-.109-.482-.215-.485-.523s.241-.419.476-.529q1.075-.5,2.149-1.008A2.4,2.4,0,0,1,272.586,106.725Z" transform="translate(-0.001 -18.738)" fill={baseData.settings.frontendsettings.themescolor} />
                                    <path id="Path_1740" data-name="Path 1740" d="M282.864,134.364a2.172,2.172,0,0,1-1.224-.306q-6.024-2.817-12.05-5.631c-.293-.137-.718-.2-.705-.645.012-.417.416-.467.7-.606.628-.312,1.268-.6,1.9-.9a2.376,2.376,0,0,1,2.117.008c2.678,1.252,5.364,2.484,8.032,3.756a2.784,2.784,0,0,0,2.57,0c2.682-1.278,5.381-2.519,8.074-3.774a2.317,2.317,0,0,1,2.034-.013c.733.337,1.461.683,2.189,1.029.23.109.479.215.465.534-.012.291-.246.389-.462.491q-4.3,2.012-8.6,4.02c-1.325.619-2.653,1.233-3.975,1.859A2.1,2.1,0,0,1,282.864,134.364Z" transform="translate(-0.003 -30.303)" fill={baseData.settings.frontendsettings.themescolor} />
                                  </g>
                                </svg>
                              </span>
                            </li>
                            <li onClick={() => { dispatch(showFolderSideBar()) }}>
                              <span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="30.655" height="26.956" viewBox="0 0 30.655 26.956">
                                  <g id="Group_1902" data-name="Group 1902" transform="translate(0 -3.5)">
                                    <path id="Path_1754" data-name="Path 1754" d="M13.214,7.2,10.571,3.5H0V30.456H30.655V10.9h-14.8Z" fill={baseData.settings.frontendsettings.themescolor} />
                                    <path id="Path_1755" data-name="Path 1755" d="M27.643,14.2h14.8V10.5H25Z" transform="translate(-11.786 -3.3)" fill={baseData.settings.frontendsettings.themescolor} />
                                  </g>
                                </svg>
                              </span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {(baseData.categorySidebarVisibility) ?
                      <div className="rightPanelSection">
                        <div className="filterRightPanel">
                          <div className="rightPanelHeader categoryRightPanelHeader">
                            <ul>
                              <li className="closing">
                                <span className="circlebtn" onClick={() => { dispatch(hideCategorySideBar()) }}>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="14.294" height="14.294" viewBox="0 0 14.294 14.294">
                                    <path id="ic_clear_24px" d="M19.294,6.44,17.855,5l-5.707,5.707L6.44,5,5,6.44l5.707,5.707L5,17.855l1.44,1.44,5.707-5.707,5.707,5.707,1.44-1.44-5.707-5.707Z" transform="translate(-5 -5)" fill="#bebebe" />
                                  </svg>
                                </span>
                              </li>
                            </ul>
                          </div>
                          <div className="bodyRightPanel">
                            <div className="rightPanelMain">
                              <div className="rightPanelHeadingLink categroyNameLinkblack">
                                <h6>Choose Category</h6>
                              </div>
                              <Categories />
                            </div>
                          </div>
                        </div>
                      </div>
                      : null}

                    {(baseData.folderSidebarVisibility) ?
                      <div className="rightPanelSection">
                        <div className="filterRightPanel">
                          <div className="rightPanelHeader categoryRightPanelHeader">
                            <ul>
                              <li className="closing">
                                <span className="circlebtn" onClick={() => { dispatch(hideFolderSideBar()) }}>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="14.294" height="14.294" viewBox="0 0 14.294 14.294">
                                    <path id="ic_clear_24px" d="M19.294,6.44,17.855,5l-5.707,5.707L6.44,5,5,6.44l5.707,5.707L5,17.855l1.44,1.44,5.707-5.707,5.707,5.707,1.44-1.44-5.707-5.707Z" transform="translate(-5 -5)" fill="#bebebe" />
                                  </svg>
                                </span>
                              </li>
                            </ul>
                          </div>
                          <div className="bodyRightPanel">
                            <div className="rightPanelMain">
                              <div className="rightPanelHeadingLink categroyNameLinkblack">
                                <h6>Choose Folder</h6>
                              </div>

                              <SideFolders />

                            </div>
                          </div>
                        </div>
                      </div>
                      : null}

                    <div className="headingTitleSearch">
                      <div className="container">
                        <div className="headingTitleSearch-details">

                          {(Object.keys(articlesData.seoData).length > 0) ?
                            <>

                              <h3 className="card-title pb-3">{articlesData.seoData.folder_info.name}</h3>
                              <p className="card-body-text">{articlesData.seoData.folder_info.description}</p>
                            </>
                            : null}
                        </div>


                        {(Object.keys(baseData.settings).length > 0 && baseData.settings.frontendsettings.enablesearch) ?
                          <Search userinfo={[baseData.settings.usersettings.userId]} />
                          : null}

                      </div>


                    </div>
                  </div>
                </Fragment>

                : (pathname === "preview") ?

                  <Fragment>

                    <div className="mainFullWidth" style={{ 'marginBottom': '130px' }}>
                      <div className="bgSpace" style={{ backgroundColor: (Object.keys(baseData.settings).length > 0) ? baseData.settings.frontendsettings.themescolor : null }}>
                        <div className="container">

                          {(Object.keys(baseData.settings).length > 0 && baseData.settings.frontendsettings.allowbredcumb) ?
                            <BreadCrumbs />
                            : null}

                          <div className="brandLogo">

                            <div className="knowledge-wel-image" style={{ margin: 'auto' }}>
                              <svg xmlns="http://www.w3.org/2000/svg" width="63.205" height="65.787" viewBox="0 0 63.205 65.787">
                                <g id="Group_4285" data-name="Group 4285" transform="translate(-357 -666)">
                                  <g id="_005-knowledge" data-name="005-knowledge" transform="translate(357 719.822)">
                                    <g id="Group_997" data-name="Group 997" transform="translate(0.057)">
                                      <g id="Group_996" data-name="Group 996">
                                        <path id="Path_1480" data-name="Path 1480" d="M63.507,370.611v-2.176c-14.191,0-29.271,3.43-29.369,9.79H29.787c-.1-6.359-15.177-9.79-29.369-9.79v2.176c15.935,0,27.063,4,27.188,7.614H.418V380.4H63.507v-2.175H36.319C36.445,374.61,47.572,370.611,63.507,370.611Z" transform="translate(-0.418 -368.435)" fill="#1c223a" />
                                      </g>
                                    </g>
                                    <g id="Group_999" data-name="Group 999" transform="translate(0 5.442)">
                                      <g id="Group_998" data-name="Group 998" transform="translate(0 0)">
                                        <rect id="Rectangle_732" data-name="Rectangle 732" width="2.175" height="20.7" transform="translate(0 2.172) rotate(-86.985)" fill="#1c223a" />
                                      </g>
                                    </g>
                                    <g id="Group_1001" data-name="Group 1001" transform="translate(42.42 5.44)">
                                      <g id="Group_1000" data-name="Group 1000" transform="translate(0 0)">
                                        <rect id="Rectangle_733" data-name="Rectangle 733" width="20.7" height="2.175" transform="translate(0 1.091) rotate(-3.021)" fill="#1c223a" />
                                      </g>
                                    </g>
                                  </g>
                                  <g id="Group_1003" data-name="Group 1003" transform="translate(362.19 666)">
                                    <path id="XMLID_49_" d="M41.128,46.1v1.541a2.445,2.445,0,0,1-2.073,2.421l-.38,1.4a1.743,1.743,0,0,1-1.683,1.292H33.226a1.743,1.743,0,0,1-1.683-1.292l-.369-1.4a2.456,2.456,0,0,1-2.084-2.432V46.092a1.483,1.483,0,0,1,1.487-1.487h9.064A1.5,1.5,0,0,1,41.128,46.1Zm6.98-20.777a12.932,12.932,0,0,1-3.647,9.021,11.918,11.918,0,0,0-3.191,6.47,2.149,2.149,0,0,1-2.128,1.813H31.076a2.128,2.128,0,0,1-2.117-1.8,12.051,12.051,0,0,0-3.213-6.492,13,13,0,1,1,22.362-9.01ZM36.58,17.456a1.466,1.466,0,0,0-1.465-1.465,9.388,9.388,0,0,0-9.379,9.379,1.465,1.465,0,1,0,2.931,0,6.456,6.456,0,0,1,6.448-6.448A1.459,1.459,0,0,0,36.58,17.456Zm-1.465-9.39A1.466,1.466,0,0,0,36.58,6.6V1.465a1.465,1.465,0,1,0-2.931,0V6.6A1.466,1.466,0,0,0,35.115,8.066ZM17.865,25.315A1.466,1.466,0,0,0,16.4,23.849H11.265a1.465,1.465,0,0,0,0,2.931H16.4A1.459,1.459,0,0,0,17.865,25.315Zm41.1-1.465H53.829a1.465,1.465,0,0,0,0,2.931h5.135a1.465,1.465,0,0,0,0-2.931ZM20.851,37.516l-3.637,3.637a1.462,1.462,0,0,0,2.063,2.073l3.637-3.637a1.462,1.462,0,1,0-2.063-2.073Zm27.5-23.969a1.463,1.463,0,0,0,1.031-.423l3.637-3.637a1.466,1.466,0,0,0-2.073-2.073l-3.637,3.637a1.461,1.461,0,0,0,0,2.073A1.488,1.488,0,0,0,48.347,13.548Zm-27.5-.434a1.462,1.462,0,1,0,2.063-2.073L19.277,7.4A1.466,1.466,0,0,0,17.2,9.477Zm28.528,24.4a1.466,1.466,0,0,0-2.073,2.073l3.637,3.637A1.462,1.462,0,0,0,53,41.153Z" transform="translate(-9.8)" fill="#1c223a" />
                                  </g>
                                </g>
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Fragment>

                  : null}
    </Fragment>
  )
}

export default HeaderContent;