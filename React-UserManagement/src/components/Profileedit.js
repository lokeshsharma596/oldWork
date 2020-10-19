import React, { useEffect, useState } from 'react';
import { countries, timeZones, languages, compareJson, toTitleCase, CheckObjectPresentInArray } from "./../utils/functions"
import {hideeditprofilepage,sendotp} from "../containers/HomePage/actions"
import {useSelector,useDispatch } from "react-redux"
import { firebase } from "./../utils/db"
import * as Actions from "./../containers/HomePage/actions"
import 'react-phone-number-input/style.css'
import ReactPhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/material.css';
import SuccessToast from "./../containers/HomePage/SuccessToast"
import Loader from "./Loader"
const Countries = countries()
const Timezones = timeZones()
const Languages = languages()


export default function Profileedit() {
    const dispatch = useDispatch()
    const homeData = useSelector(state => state.homeReducer)
    const [imageAsUrl, setImageAsUrl] = useState('')
    const [showSetting, setShowSetting] = useState(true)
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [mobileNumber, setMobileNumber] = useState('')
    const [phoneNumber, setphoneNumber] = useState('')
    const [department, setDepartment] = useState('')
    const [designation, setDesignation] = useState('')
    const [country, setCountry] = useState('IN')
    const [timezone, setTimezone] = useState('5.5')
    const [address, setAddress] = useState('')
    const [facebookLink, setFacebookLink] = useState('')
    const [twitterLink, setTwitterLink] = useState('')
    const [instagramLink, setInstagramLink] = useState('')
    const [linkedinLink, setLinkedinLink] = useState('')
    const [eventType, setEventType] = useState('')
    const [screentype, setscreentype] = useState('/categorylisting')
    const [submitStatus, setSubmitStatus] = useState(false)
    const [defaultformate, setdefaultformate] = useState("DD MM YY")
    const [keyboard, setkeyboard] = useState("yes")
    const [nameshow, setnameshow] = useState("normal")
    const [timeformat, settimeformat] = useState("12")
    const [email, setEmail] = useState("")
    
    const [showImageUploadError, setShowImageUploadError] = useState(false)
  
    const handleSubmit = () => {
        const data = {
          firstname: firstName,
          lastname: lastName,
          imageUrl: imageAsUrl,
          address: address,
          country: country,
          dept: department,
          designation: designation,
          facebooklink: facebookLink,
          instagramlink: instagramLink,
          lang: 'english',
          linkdinlink: linkedinLink,
          mobno: mobileNumber,
          role:'admin',
          timezone: timezone,
          twitterlink: twitterLink,
          phoneno: phoneNumber,
          dataformate: defaultformate,
          datetimezone: timeformat,
          keyshortcut: keyboard,
          nameshow:nameshow,
          screentype: screentype,
          userId: localStorage.getItem('userId'),
        }
          dispatch(Actions.updateUserprofile({ ...data }))
          setSubmitStatus(true)
      }
    
      useEffect(() => {
        dispatch(Actions.fetchuserRequest(localStorage.getItem('userId')))
      }, [dispatch])
      
      useEffect(() => {

        if (Object.keys(homeData.users).length > 0) {
          setImageAsUrl(homeData.users[0].imageUrl)
          setFirstName(homeData.users[0].firstname)
          setLastName(homeData.users[0].lastname)
          setMobileNumber(homeData.users[0].mobno)
          setphoneNumber(homeData.users[0].phoneno)
          setDepartment(homeData.users[0].department)
          setDesignation(homeData.users[0].designation)
          setCountry(homeData.users[0].country)
          setTimezone(homeData.users[0].timezone)
          setAddress(homeData.users[0].address)
          setFacebookLink(homeData.users[0].facebooklink)
          setTwitterLink(homeData.users[0].twitterlink)
          setInstagramLink(homeData.users[0].instagramlink)
          setLinkedinLink(homeData.users[0].linkdinlink)
          setscreentype(homeData.users[0].screentype)
          setdefaultformate(homeData.users[0].dataformate)
          setkeyboard(homeData.users[0].keyshortcut)
          setnameshow(homeData.users[0].nameshow)
          settimeformat(homeData.users[0].datetimezone)
          setEmail(homeData.users[0].email)
        }
      }, [homeData.users,homeData.users.length])
    
    
  const handleFireBaseUpload = (image) => {
    var storageRef = firebase.storage().ref("logo");
    var randomId = Math.random().toString(36).substring(2)+"_profile";
    var imageRef = storageRef.child(randomId);
    var uploadTask = imageRef.put(image)
    uploadTask.then(function (snapshot) {
      uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
        setImageAsUrl(downloadURL)
      });
    });
  }
  
    return (
        
        <div className="rightPanelSection w-auto">
        {(homeData.showcommontoast)?
        <SuccessToast />
      :null}
            <div className="k-flex articleRightPanelMarge">
                <div className="article-right-col-1 w-650">
                    <div className="articleRightPanel">
                        <div className="rightPanelHeader categoryRightPanelHeader">
                            <ul>
                                <li className="closing" onClick={() => dispatch(hideeditprofilepage()) }>
                                    <span className="circlebtn">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14.294" height="14.294" viewBox="0 0 14.294 14.294">
                                            <path id="ic_clear_24px" d="M19.294,6.44,17.855,5l-5.707,5.707L6.44,5,5,6.44l5.707,5.707L5,17.855l1.44,1.44,5.707-5.707,5.707,5.707,1.44-1.44-5.707-5.707Z" transform="translate(-5 -5)" fill="#bebebe" />
                                        </svg>
                                    </span>
                                </li>
                                { (showSetting) ?
                                <li className="help ps-relative cursor-pointer ">
                                    <span className="profile-settings-drp " onClick={() => setShowSetting(false)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="23.583" height="24.217" viewBox="0 0 23.583 24.217">
                                            <g id="gear_1_" data-name="gear (1)" transform="translate(-6.71)">
                                                <g id="Group_1892" data-name="Group 1892" transform="translate(6.71)">
                                                    <path id="Path_1737" data-name="Path 1737" d="M29.885,14.763l-2.226-1.741a8.763,8.763,0,0,0,.052-.914,8.5,8.5,0,0,0-.052-.914l2.228-1.742a1.091,1.091,0,0,0,.263-1.39L27.835,4.056A1.073,1.073,0,0,0,26.5,3.575L23.87,4.63a9.005,9.005,0,0,0-1.577-.915l-.4-2.786A1.072,1.072,0,0,0,20.823,0H16.182a1.069,1.069,0,0,0-1.068.92l-.4,2.8a9.284,9.284,0,0,0-1.574.915L10.506,3.574a1.094,1.094,0,0,0-1.329.473L6.859,8.057a1.085,1.085,0,0,0,.262,1.4L9.347,11.2a7.984,7.984,0,0,0,0,1.827L7.119,14.765a1.092,1.092,0,0,0-.262,1.39l2.315,4a1.071,1.071,0,0,0,1.339.481l2.627-1.054a9.085,9.085,0,0,0,1.576.915l.4,2.785a1.071,1.071,0,0,0,1.07.93h4.642a1.07,1.07,0,0,0,1.069-.92l.4-2.8a9.327,9.327,0,0,0,1.574-.916L26.5,20.643a1.084,1.084,0,0,0,.4.075,1.065,1.065,0,0,0,.933-.547l2.325-4.026A1.089,1.089,0,0,0,29.885,14.763ZM18.5,16.145a4.036,4.036,0,1,1,4.036-4.036A4.04,4.04,0,0,1,18.5,16.145Z" transform="translate(-6.71)" />
                                                </g>
                                            </g>
                                        </svg>
                                        <span className="preferences-hover-text">Preferences</span>
                                    </span>
                                </li>
                                :
                                <li className="help ps-relative " onClick={() => dispatch(sendotp()) }>
                                <span className="circlebtn">
                                <svg xmlns="http://www.w3.org/2000/svg" width="12.682" height="16.305" viewBox="0 0 12.682 16.305">
                                    <path id="Icon_material-delete" data-name="Icon material-delete" d="M8.406,18.993A1.817,1.817,0,0,0,10.217,20.8h7.247a1.817,1.817,0,0,0,1.812-1.812V8.123H8.406ZM20.181,5.406h-3.17L16.105,4.5H11.576l-.906.906H7.5V7.217H20.181Z" transform="translate(-7.5 -4.5)" fill="#c3c3c3"/>
                                </svg>
                                </span>
                                    <span className="delete-prefence-right-panel pl-2">Delete Account</span>
                            </li>}
                            </ul>
                        </div>
                        {(homeData.usersLoading) ?
                            <Loader />
                            :
                        <div className="bodyRightPanel pb-0">
                            <div className="rightPanelMain">
                                <div className="categroyNameLinkblack">
                                {(!showSetting) && <p className="goBack" onClick={() => setShowSetting(true)}><i className="icon customicon-go-back goback-icon"></i>Go Back</p>}
                                    <div className="lm-basicInfo mt-3">
                                    { (showSetting) ?
                                        <div className="profile-settings-rightpanel">
                                            <div className="lm-user-pic mb-3 mt-0">
                                                <div className="editImage ps-relative">
                                                    <img src={(imageAsUrl) ? imageAsUrl : "images/profile.jpg"} className="rounded img-fluid " />
                                                    <label htmlFor="editImage" className="editImageAdd">
                                                        <span>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 30 30">
                                                                <g id="Group_2478" data-name="Group 2478" transform="translate(-105 -230)">
                                                                    <circle id="Ellipse_110" data-name="Ellipse 110" cx={15} cy={15} r={15} transform="translate(105 230)" fill="#64b5f6" />
                                                                    <path id="ic_clear_24px" d="M14.673,5.974,13.7,5,9.837,8.862,5.974,5,5,5.974,8.862,9.837,5,13.7l.974.974,3.862-3.862L13.7,14.673l.974-.974L10.811,9.837Z" transform="translate(106.429 245.34) rotate(-45)" fill="#fff" stroke="#fff" strokeWidth={1} />
                                                                </g>
                                                            </svg>
                                                        </span>
                                                        <input type="file" id="editImage" accept="image/x-png,image/jpeg" className="d-none" name="userimage"
                                                    onChange={(e) => {
                                                    if ((e.target.files[0].type === "image/png" && e.target.files[0].size < 2097152) || (e.target.files[0].type === "image/jpeg" && e.target.files[0].size < 2097152)) {
                                                        handleFireBaseUpload(e.target.files[0])
                                                    } else {
                                                        e.target.value = null;
                                                        setShowImageUploadError(true)
                                                        setTimeout(() => {
                                                        setShowImageUploadError(false)
                                                        }, 2000)

                                                    }
                                                    }} />
                                                    </label>
                                                </div>
                                                <div className="user-profile-name text-center mt-2 mb-2">
                                                    <h4 className="card-title mb-0">{(firstName)?((nameshow && nameshow == "rev")?(lastName+" "+firstName):(firstName+" "+lastName)):email.split('@')[0]}</h4>
                                                    <p className="card-body-text">{email}</p>
                                                </div>
                                                <div className="lm-basicInfo-icon mt-2 text-center">
                                                    <ul className="list-style-none d-inline-block">
                                                    <li className="toolTipWrapper ps-relative nav-item dropdown">
                                    <a >
                                      <span onClick={() => setEventType("facebook")}>
                                        <svg
                                          id="_001-facebook-logo"
                                          data-name="001-facebook-logo"
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="10.326"
                                          height="19.1"
                                          viewBox="0 0 10.326 19.1">
                                          <path
                                            id="Path_7"
                                            data-name="Path 7"
                                            d="M32.014,0,29.538,0a4.35,4.35,0,0,0-4.581,4.7V6.868h-2.49a.389.389,0,0,0-.389.39V10.4a.389.389,0,0,0,.389.389h2.49V18.71a.389.389,0,0,0,.389.389H28.6a.389.389,0,0,0,.389-.389V10.787H31.9a.389.389,0,0,0,.389-.389V7.257a.39.39,0,0,0-.39-.39H28.985V5.03c0-.883.21-1.331,1.361-1.331h1.668a.389.389,0,0,0,.389-.389V.393A.39.39,0,0,0,32.014,0Z"
                                            transform="translate(-22.077)"
                                            fill={facebookLink ? '#64b5f6' : '#c3c3c3'} />
                                        </svg>
                                      </span>
                                    </a>
                                    <div className={"candidateDetail-wrapper ticketingToolTip lmLeadToolTip" + ((eventType === "facebook") ? ' hidelink' : '')} aria-labelledby="navbarDropdown1">
                                      <div className="card-head">
                                        <div className="enter-link">
                                          <div className="md-form md-form-custom mt-2 mb-2">
                                            <input
                                              type="text"
                                              id="inputMDExlink71"
                                              class="form-control pl-3"
                                              name="facebooklink"
                                              value={facebookLink}
                                              onChange={(e) => setFacebookLink(e.target.value)}
                                            />
                                            <label for="inputMDExlink71" class={(facebookLink ? 'active' : '')}>Enter Links:
                                        </label>
                                            <span className="searchIcon-dep" onClick={() => setEventType("close")}>
                                              <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="19"
                                                height="12"
                                                viewBox="0 0 19 12">
                                                <path
                                                  id="ic_keyboard_return_24px"
                                                  d="M19,7v4H5.83L9.41,7.41,8,6,2,12l6,6,1.41-1.41L5.83,13H21V7Z"
                                                  transform="translate(-2 -6)"
                                                  fill="#64B5F6"></path>
                                              </svg>
                                            </span>
                                          </div>

                                        </div>
                                      </div>
                                    </div>
                                  </li>
                                  <li className="toolTipWrapper ps-relative nav-item dropdown">
                                    <a >
                                      <span onClick={() => setEventType("twitter")}>
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="22.961"
                                          height="19.1"
                                          viewBox="0 0 22.961 19.1">
                                          <path
                                            id="_002-twitter"
                                            data-name="002-twitter"
                                            d="M22.6,36.713a9.092,9.092,0,0,1-1.583.534,4.936,4.936,0,0,0,1.3-2.075h0a.259.259,0,0,0-.379-.3h0a9.135,9.135,0,0,1-2.42,1,.617.617,0,0,1-.151.019.642.642,0,0,1-.424-.162,4.95,4.95,0,0,0-3.275-1.236,5.293,5.293,0,0,0-1.568.242,4.8,4.8,0,0,0-3.232,3.455,5.281,5.281,0,0,0-.117,1.823.177.177,0,0,1-.045.139.184.184,0,0,1-.137.062H10.55a12.98,12.98,0,0,1-8.921-4.766h0a.259.259,0,0,0-.424.033h0A4.956,4.956,0,0,0,2.01,41.5a4.436,4.436,0,0,1-1.129-.437h0a.259.259,0,0,0-.384.223h0a4.956,4.956,0,0,0,2.891,4.566H3.282a4.454,4.454,0,0,1-.834-.08h0a.259.259,0,0,0-.3.333h0a4.961,4.961,0,0,0,3.919,3.374A9.135,9.135,0,0,1,.955,51.031H.383a.379.379,0,0,0-.371.286A.392.392,0,0,0,.2,51.75a13.587,13.587,0,0,0,6.827,1.841,13.773,13.773,0,0,0,5.834-1.238,12.884,12.884,0,0,0,4.269-3.2,14.025,14.025,0,0,0,2.614-4.378,13.83,13.83,0,0,0,.888-4.791v-.075a.842.842,0,0,1,.315-.656,9.784,9.784,0,0,0,1.968-2.16h0a.259.259,0,0,0-.32-.38Z"
                                            transform="translate(0 -34.491)"
                                            fill={twitterLink ? '#64b5f6' : '#c3c3c3'} />
                                        </svg>
                                      </span>
                                    </a>
                                    <div className={"candidateDetail-wrapper ticketingToolTip lmLeadToolTip" + ((eventType === 'twitter') ? ' hidelink' : '')} aria-labelledby="navbarDropdown1">
                                      <div className="card-head">
                                        <div className="enter-link">



                                          <div className="md-form md-form-custom mt-2 mb-2">
                                            <input
                                              type="text"
                                              id="inputMDExlink72"
                                              class="form-control pl-3"
                                              name="twitterlink"
                                              value={twitterLink}
                                              onChange={(e) => setTwitterLink(e.target.value)}
                                            />
                                            <label for="inputMDExlink72" class={(twitterLink ? 'active' : '')}>Enter Links:
                                        </label>
                                            <span className="searchIcon-dep" onClick={() => setEventType("close")}>
                                              <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="19"
                                                height="12"
                                                viewBox="0 0 19 12">
                                                <path
                                                  id="ic_keyboard_return_24px"
                                                  d="M19,7v4H5.83L9.41,7.41,8,6,2,12l6,6,1.41-1.41L5.83,13H21V7Z"
                                                  transform="translate(-2 -6)"
                                                  fill="#64B5F6"></path>
                                              </svg>
                                            </span>
                                          </div>

                                        </div>
                                      </div>
                                    </div>

                                  </li>

                                  <li className="toolTipWrapper ps-relative nav-item dropdown">
                                    <a  >
                                      <span onClick={() => setEventType("linkedin")}>
                                        <svg
                                          id="_005-linkedin-logo"
                                          data-name="005-linkedin-logo"
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="19.988"
                                          height="19.1"
                                          viewBox="0 0 19.988 19.1">
                                          <path
                                            id="LinkedIn"
                                            d="M19.988,21.268v7.39H15.7V21.763c0-1.732-.62-2.914-2.17-2.914a2.344,2.344,0,0,0-2.2,1.567,2.931,2.931,0,0,0-.142,1.045v7.2H6.908s.058-11.677,0-12.887h4.285V17.6c-.009.014-.02.028-.028.042h.028V17.6a4.255,4.255,0,0,1,3.862-2.129C17.874,15.468,19.988,17.309,19.988,21.268ZM2.425,9.558a2.233,2.233,0,1,0-.057,4.454H2.4a2.234,2.234,0,1,0,.028-4.454Zm-2.17,19.1H4.538V15.77H.255Z"
                                            transform="translate(0 -9.558)"
                                            fill={linkedinLink ? '#64b5f6' : '#c3c3c3'} />
                                        </svg>
                                      </span>
                                    </a>
                                    <div className={"candidateDetail-wrapper ticketingToolTip lmLeadToolTip" + ((eventType === 'linkedin') ? ' hidelink' : '')} aria-labelledby="navbarDropdown1">
                                      <div className="card-head">
                                        <div className="enter-link">



                                          <div className="md-form md-form-custom mt-2 mb-2">
                                            <input
                                              type="text"
                                              id="inputMDExlink74"
                                              class="form-control pl-3"
                                              name="linkdinlink"
                                              value={linkedinLink}
                                              onChange={(e) => setLinkedinLink(e.target.value)}
                                            />
                                            <label for="inputMDExlink74" class={(linkedinLink ? 'active' : '')}>Enter Link:
                                        </label>
                                            <span className="searchIcon-dep" onClick={() => setEventType("close")}>
                                              <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="19"
                                                height="12"
                                                viewBox="0 0 19 12">
                                                <path
                                                  id="ic_keyboard_return_24px"
                                                  d="M19,7v4H5.83L9.41,7.41,8,6,2,12l6,6,1.41-1.41L5.83,13H21V7Z"
                                                  transform="translate(-2 -6)"
                                                  fill="#64B5F6"></path>
                                              </svg>
                                            </span>
                                          </div>

                                        </div>
                                      </div>
                                    </div>
                                  </li>


                                  <li className="toolTipWrapper ps-relative nav-item dropdown">
                                    <a >
                                      <span onClick={() => setEventType("instagram")}>
                                        <svg
                                          id="_006-instagram"
                                          data-name="006-instagram"
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="20.335"
                                          height="20.335"
                                          viewBox="0 0 20.335 20.335">
                                          <g id="Group_18" data-name="Group 18">
                                            <g id="Group_17" data-name="Group 17">
                                              <path
                                                id="Path_8"
                                                data-name="Path 8"
                                                d="M13.98,0H6.355A6.355,6.355,0,0,0,0,6.355V13.98a6.355,6.355,0,0,0,6.355,6.355H13.98a6.355,6.355,0,0,0,6.355-6.355V6.355A6.355,6.355,0,0,0,13.98,0Zm4.448,13.98a4.453,4.453,0,0,1-4.448,4.448H6.355A4.453,4.453,0,0,1,1.906,13.98V6.355A4.453,4.453,0,0,1,6.355,1.906H13.98a4.453,4.453,0,0,1,4.448,4.448Z"
                                                transform="translate(0 0)"
                                                fill={instagramLink ? '#64b5f6' : '#c3c3c3'} />
                                            </g>
                                          </g>
                                          <g id="Group_20" data-name="Group 20" transform="translate(5.084 5.084)">
                                            <g id="Group_19" data-name="Group 19">
                                              <path
                                                id="Path_9"
                                                data-name="Path 9"
                                                d="M133.084,128a5.084,5.084,0,1,0,5.084,5.084A5.084,5.084,0,0,0,133.084,128Zm0,8.261a3.177,3.177,0,1,1,3.177-3.177A3.182,3.182,0,0,1,133.084,136.261Z"
                                                transform="translate(-128 -128)"
                                                fill={instagramLink ? '#64b5f6' : '#c3c3c3'} />
                                            </g>
                                          </g>
                                          <g id="Group_22" data-name="Group 22" transform="translate(14.955 4.025)">
                                            <g id="Group_21" data-name="Group 21">
                                              <ellipse
                                                id="Ellipse_8"
                                                data-name="Ellipse 8"
                                                cx="0.677"
                                                cy="0.677"
                                                rx="0.677"
                                                ry="0.677"
                                                fill={instagramLink ? '#64b5f6' : '#c3c3c3'} />
                                            </g>
                                          </g>
                                        </svg>
                                      </span>
                                    </a>
                                    <div className={"candidateDetail-wrapper ticketingToolTip lmLeadToolTip" + ((eventType === 'instagram') ? ' hidelink' : '')} aria-labelledby="navbarDropdown1">
                                      <div className="card-head">
                                        <div className="enter-link">
                                          <div className="md-form md-form-custom mt-2 mb-2">
                                            <input
                                              type="text"
                                              id="inputMDExlink73"
                                              class="form-control pl-3"
                                              name="instagramlink"
                                              value={instagramLink}
                                              onChange={(e) => setInstagramLink(e.target.value)}
                                            />
                                            <label for="inputMDExlink73" class={(instagramLink ? 'active' : '')}>Enter Links:
                                        </label>
                                            <span className="searchIcon-dep" onClick={() => setEventType("close")}>
                                              <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="19"
                                                height="12"
                                                viewBox="0 0 19 12">
                                                <path
                                                  id="ic_keyboard_return_24px"
                                                  d="M19,7v4H5.83L9.41,7.41,8,6,2,12l6,6,1.41-1.41L5.83,13H21V7Z"
                                                  transform="translate(-2 -6)"
                                                  fill="#64B5F6"></path>
                                              </svg>
                                            </span>
                                          </div>

                                        </div>
                                      </div>
                                    </div>
                                  </li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="row mb-3">
                                                <div className="col-sm-6">
                                                    <div className="wrapperInfo">
                                                        <div className="md-form md-form-custom profile-form"><input type="text" id="inputMDEx1" className="w-100" name="firstname" value={firstName} onChange={(e) => setFirstName(e.target.value)}   /><label htmlFor="inputMDEx1" className={firstName?'active':''}>First Name*</label></div>
                                                    </div>
                                                </div>
                                                <div className="col-sm-6">
                                                    <div className="wrapperInfo">
                                                        <div className="md-form md-form-custom profile-form"><input type="text" id="inputMDEx2" className="w-100" name="lastname" value={lastName} onChange={(e) => setLastName(e.target.value)} /><label htmlFor="inputMDEx2" className={lastName?'active':''}>Last Name*</label></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row mb-3">
                                                <div className="col-sm-6">
                                                    <div className="wrapperInfo mobile-n PhoneInput">
                                                        <ReactPhoneInput
                                                          inputExtraProps={{
                                                            name: "Mob no",
                                                            required: true,
                                                            autoFocus: true,
                                                          }}
                                                          defaultCountry="it"
                                                          placeholder="Enter mobile number"
                                                          value={mobileNumber}
                                                          onChange={setMobileNumber}
                                                          className="PhoneInputInput"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-sm-6">
                                                    <div className="wrapperInfo mobile-n PhoneInput">
                                                    <ReactPhoneInput
                                                        inputExtraProps={{
                                                          name: "phone",
                                                          required: true,
                                                          autoFocus: true
                                                        }}
                                                        defaultCountry="it"
                                                        placeholder="Enter phone number"
                                                        value={phoneNumber}
                                                        onChange={setphoneNumber}
                                                      />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mt-3 mb-3 otherNameFeildsTitle">
                                                <h4 className="card-title ticket-subtitle fnt-normal mb-1 font-weight-normal">Advanced Information</h4>
                                            </div>
                                            <div className="row mb-3">
                                                <div className="col-sm-6">
                                                    <div className="wrapperInfo">
                                                        <div className="md-form md-form-custom profile-form">
                                                            <select className="customArrow" id="inputMDEx5">
                                                                <option>Admin Role</option>
                                                            </select>
                                                            <label htmlFor="inputMDEx5" className="active">Role</label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-sm-6">
                                                    <div className="wrapperInfo">
                                                        <div className="md-form md-form-custom profile-form"><input type="text" id="inputMDEx6" className="w-100" name="dept" value={department} onChange={(e) => setDepartment(e.target.value)}  /><label htmlFor="inputMDEx6" className={department?'active':''}>Department</label></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row mb-3">
                                                <div className="col-sm-6">
                                                    <div className="wrapperInfo">
                                                        <div className="md-form md-form-custom profile-form">
                                                            <select className="customArrow" id="inputMDEx7">
                                                                <option value="english">English</option>
                                                            </select>
                                                            <label htmlFor="inputMDEx7" className="active">Language</label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-sm-6">
                                                    <div className="wrapperInfo">
                                                        <div className="md-form md-form-custom profile-form"><input type="text" id="inputMDEx8" className="w-100" name="designation" value={designation} onChange={(e) => setDesignation(e.target.value)} /><label htmlFor="inputMDEx8" className={(designation?'active':'')}>Designation</label></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row mb-3">
                                                <div className="col-sm-12">
                                                    <div className="wrapperInfo">
                                                        <div className="md-form md-form-custom profile-form"><input type="text" id="inputMDEx9" className="w-100" name="address" value={address} onChange={(e) => setAddress(e.target.value)} /><label htmlFor="inputMDEx9" className={(address?'active':'')}>Address</label></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row mb-3">
                                                <div className="col-sm-6">
                                                    <div className="wrapperInfo">
                                                        <div className="md-form md-form-custom profile-form">
                                                            <select className="customArrow" name="country" value={country} onChange={e => setCountry(e.target.value)} id="inputMDEx10">
                                                            {Countries.map(country =>
                                                                    <option value={country.code}>{country.name}</option>
                                                                )}
                                                            </select>
                                                            <label htmlFor="inputMDEx10" className="active">Country</label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-sm-6">
                                                    <div className="wrapperInfo">
                                                    <div className="md-form md-form-custom profile-form">
                                                        <select className="customArrow" name="timezone" value={timezone} onChange={(e) => setTimezone(e.target.value)} id="inputMDEx1Sel">
                                                        {Timezones.map(timezone =>
                                                                <option value={timezone.value}>{timezone.text}</option>
                                                            )}
                                                        </select>
                                                        <label htmlFor="inputMDEx1Sel" className="active">Select TimeZone</label>
                                                    </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        :
                                        <div className="prefence-section">
                        <div className="mt-0 mb-4 otherNameFeildsTitle">
                          <h4 className="card-title ticket-subtitle fnt-normal mb-1 font-weight-normal">
                            Prefrences Information
                          </h4>
                          {/* <p className="card-body-text">Sed ut perspiciatis unde omnis ists natus error sit voluptatem accsantium.</p> */}
                        </div>
                        <div className="row mb-3">
                          <div className="col-sm-12">
                            <div className="wrapperInfo">
                              <span className="radio-Feilds-Manage-span">
                                <div
                                  className="radioFeildsProfile perfrenceInformation k-flex align-items-center justify-content-center">
                                  <div className="left-information-radio">
                                    <p className="card-body-text-feilds">Default Date Format</p>
                                  </div>
                                  <div className="right-information-radio k-flex ">
                                    <div className="information-radio pl-4">
                                      <div className="custom-control custom-radio">
                                        <input
                                          type="radio"
                                          className="custom-control-input"
                                          id="defaultGroupExample1"
                                          name="dataformate" value="DD MM YY" checked={defaultformate == "DD MM YY"} onChange={(e) => setdefaultformate(e.target.value)}/>
                                        <label className="custom-control-label" for="defaultGroupExample1">DD MM YY</label>
                                      </div>
                                    </div>
                                    <div className="information-radio pl-4">
                                      <div className="custom-control custom-radio">  
                                        <input
                                          type="radio"
                                          className="custom-control-input"
                                          id="defaultGroupExample2"
                                          name="dataformate" value="YY MM DD" checked={defaultformate == "YY MM DD"} onChange={(e) => setdefaultformate(e.target.value)}/>
                                        <label className="custom-control-label" for="defaultGroupExample2">YY MM DD</label>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="row mb-3">
                          <div className="col-sm-12">
                            <div className="wrapperInfo">
                              <span className="radio-Feilds-Manage-span">
                                <div
                                  className="radioFeildsProfile perfrenceInformation k-flex align-items-center justify-content-center">
                                  <div className="left-information-radio">
                                    <p className="card-body-text-feilds">Enable Keyboard Shortcut</p>
                                  </div>
                                  <div className="right-information-radio k-flex ">
                                    <div className="information-radio pl-4">
                                      <div className="custom-control custom-radio">
                                        <input
                                          type="radio"
                                          className="custom-control-input"
                                          id="defaultGroupExample3"
                                          name="keyshortcut" value="yes" checked={keyboard == "yes"} onChange={(e) => setkeyboard(e.target.value)}/>
                                        <label className="custom-control-label" for="defaultGroupExample3">Yes</label>
                                      </div>
                                    </div>
                                    <div className="information-radio pl-4">
                                      <div className="custom-control custom-radio">
                                        <input
                                          type="radio"
                                          className="custom-control-input"
                                          id="defaultGroupExample4"
                                          name="keyshortcut" value="no" checked={keyboard == "no"} onChange={(e) => setkeyboard(e.target.value)}/>
                                        <label className="custom-control-label" for="defaultGroupExample4">No</label>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="row mb-3">
                          <div className="col-sm-12">
                            <div className="wrapperInfo">
                              <span className="radio-Feilds-Manage-span">
                                <div
                                  className="radioFeildsProfile perfrenceInformation k-flex align-items-center justify-content-center">
                                  <div className="left-information-radio">
                                    <p className="card-body-text-feilds">Default Name Format</p>
                                  </div>
                                  <div className="right-information-radio k-flex ">
                                    <div className="information-radio pl-4">
                                      <div className="custom-control custom-radio">
                                        <input
                                          type="radio"
                                          className="custom-control-input"
                                          id="defaultGroupExample5"
                                          name="nameshow" value="normal" checked={nameshow == "normal"} onChange={(e) => setnameshow(e.target.value)}/>
                                        <label className="custom-control-label" for="defaultGroupExample5">First Name - Last Name</label>
                                      </div>
                                    </div>
                                    <div className="information-radio pl-4">
                                      <div className="custom-control custom-radio">
                                        <input
                                          type="radio"
                                          className="custom-control-input"
                                          id="defaultGroupExample6"
                                          name="nameshow" value="rev" checked={nameshow == "rev"} onChange={(e) => setnameshow(e.target.value)}/>
                                        <label className="custom-control-label" for="defaultGroupExample6">Last Name - First Name</label>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="row mb-3">
                          <div className="col-sm-12">
                            <div className="wrapperInfo">
                              <span className="radio-Feilds-Manage-span">
                                <div
                                  className="radioFeildsProfile perfrenceInformation k-flex align-items-center justify-content-center">
                                  <div className="left-information-radio">
                                    <p className="card-body-text-feilds">Default Time Format</p>
                                  </div>
                                  <div className="right-information-radio k-flex ">
                                    <div className="information-radio pl-4">
                                      <div className="custom-control custom-radio">
                                        <input
                                          type="radio"
                                          className="custom-control-input"
                                          id="defaultGroupExample7"
                                          name="datetimezone" value="24" checked={timeformat == "24"} onChange={(e) => settimeformat(e.target.value)}/>
                                        <label className="custom-control-label" for="defaultGroupExample7">24 Hrs</label>
                                      </div>
                                    </div>
                                    <div className="information-radio pl-4">
                                      <div className="custom-control custom-radio">
                                        <input
                                          type="radio"
                                          className="custom-control-input"
                                          id="defaultGroupExample8"
                                          name="datetimezone" value="12" checked={timeformat == "12"} onChange={(e) => settimeformat(e.target.value)}/>
                                        <label className="custom-control-label" for="defaultGroupExample8">12 Hrs</label>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="row mb-3">
                          <div className="col-sm-12">
                            <div className="wrapperInfo select-pref">
                              <select className="customArrow" name="screentype"  onChange={(e) => setscreentype(e.target.value)}>
                                <option value="">Default Knowledge Base Screen</option>
                                <option value="/categorylisting" selected={(screentype == "/categorylisting")?"selected":""}>Home</option>
                                <option value="/article/alldrafts" selected={(screentype == "/article/alldrafts")?"selected":""}>All Draft</option>
                                <option value="/article/allpublish" selected={(screentype == "/article/allpublish")?"selected":""}>All Published</option>
                                <option value="/article/allarticle" selected={(screentype == "/article/allarticle")?"selected":""}>All Article</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>}
                                    </div>
                                </div>
                            </div>
                        </div>}
                        <div className="rightPanelFooter categoryRightPanelFooter"><button className={(submitStatus ? 'rightPanelBtn btn disabled' : 'rightPanelBtn')} onClick={() => handleSubmit()}>Save Settings</button></div>
                    </div>
                </div>
            </div>
        </div>


    )
}