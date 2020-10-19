import React, { Fragment, useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux"
import { firebase } from "../../utils/db.js"
import { v4 as uuidv4 } from 'uuid';
import * as Actions from "./actions"
import { countries, timeZones, languages, compareJson, toTitleCase, CheckObjectPresentInArray } from "../../utils/functions"
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import Loader from "../../components/Loader"
import * as Services from "../../utils/services"

const Countries = countries()
const Timezones = timeZones()
const Languages = languages()

const EditAgent = () => {
  const [imageAsUrl, setImageAsUrl] = useState('')
  const [showSetting, setShowSetting] = useState(true)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [alias, setAlias] = useState('')
  const [mobileNumber, setMobileNumber] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [status, setStatus] = useState(true)
  const [role, setRole] = useState('')
  const [roleId, setRoleId] = useState('')
  const [departmentId, setDepartmentId] = useState([])
  const [generalDepartmentId, setGeneralDepartmentId] = useState()
  const [language, setLanguage] = useState('')
  const [designation, setDesignation] = useState('')
  const [country, setCountry] = useState('')
  const [timezone, setTimezone] = useState('')
  const [address, setAddress] = useState('')
  const [viewTicket, setViewTicket] = useState(true)
  const [createTicket, setCreateTicket] = useState(true)
  const [changeTicketOwnership, setChangeTicketOwnership] = useState(true)
  const [closeTicket, setCloseTicket] = useState(true)
  const [updateTicketStatus, setUpdateTicketStatus] = useState(true)
  const [deleteTicket, setDeleteTicket] = useState(true)
  const [viewArticle, setViewArticle] = useState(true)
  const [createArticle, setCreateArticle] = useState(true)
  const [updateArticle, setUpdateArticle] = useState(true)
  const [publishDraftArticle, setPublishDraftArticle] = useState(true)
  const [deleteArticle, setDeleteArticle] = useState(true)
  const [manageModule, setManageModule] = useState(true)
  const [addAgent, setAddAgent] = useState(true)
  const [addDepartment, setAddDepartment] = useState(true)
  const [managePermission, setManagePermission] = useState(true)
  const [manageGeneralSetting, setManageGeneralSetting] = useState(true)
  const [importTicket, setImportTicket] = useState(true)
  const [importArticle, setImportArticle] = useState(true)
  const [linkChannelEmail, setLinkChannelEmail] = useState(true)
  const [linkChannelHelpcenter, setLinkChannelHelpcenter] = useState(true)
  const [facebookLink, setFacebookLink] = useState('')
  const [twitterLink, setTwitterLink] = useState('')
  const [instagramLink, setInstagramLink] = useState('')
  const [linkedinLink, setLinkedinLink] = useState('')
  const [eventType, setEventType] = useState('')
  const [submitStatus, setSubmitStatus] = useState(false)
  const [passwordVisibility, setPasswordVisibility] = useState(false)


  //error states
  const [showNameRequiredError, setShowNameRequiredError] = useState(false)
  const [showPasswordRequiredError, setShowPasswordRequiredError] = useState(false)
  const [showPasswordValidationError, setShowPasswordValidationError] = useState(false)
  const [showRoleRequiredError, setShowRoleRequiredError] = useState(false)
  const [showImageUploadError, setShowImageUploadError] = useState(false)
  const [showRoleLoadingError, setShowRoleLoadingError] = useState(false)


  const dispatch = useDispatch()

  const agentData = useSelector(state => state.agentsReducer)

  const fetchAgent = async (arg) => {
    dispatch(Actions.fetchAgentRequest())
    const res = await Services.getApiCall(arg, 'getAgent');
    if (res.status == 200) {
      console.log(res.data.agent.roleId, "role")
      if (res.data.agent.roleId !== 'custom') {
        const res1 = await Services.getApiCall({ userId: localStorage.getItem('userId'), roleId: res.data.agent.roleId }, 'getRole')
        console.log(res1, "role received")
        if (res1.status == 200) {
          dispatch(Actions.fetchRoleSuccess(res1.data.role))
        } else {
          dispatch(Actions.fetchRoleFailure(res1.message))
        }
      }
      dispatch(Actions.fetchAgentSuccess(res.data.agent))
    } else {
      dispatch(Actions.fetchAgentFailure(res.message))
    }
  }

  const fetchRole = async (arg) => {
    dispatch(Actions.fetchRoleRequest())
    const res = await Services.getApiCall(arg, 'getRole')
    console.log(res, "res")
    if (res.status == 200) {
      dispatch(Actions.fetchRoleSuccess(res.data.role))
    } else {
      dispatch(Actions.fetchRoleFailure(res.message))
    }
  }

  const fetchAgentSidebarData = async () => {
    dispatch(Actions.fetchAgentSidebarDataRequest())
    const res = await Services.getApiCall({ userId: localStorage.getItem('userId') }, 'getAgentSidebarData')
    if (res.status == 201) {
      dispatch(Actions.fetchAgentSidebarDataSuccess(res.data))
    }
    else {
      dispatch(Actions.fetchAgentSidebarDataFailure(res.message))
    }
  }


  const fetchAgents = async () => {
    dispatch(Actions.hideSearchBackButton())
    dispatch(Actions.fetchAgentsRequest())
    const res = await Services.getApiCall({ userId: localStorage.getItem('userId') }, 'getAgents')
    console.log(res, "res")
    if (res.status == 200) {
      dispatch(Actions.fetchAgentsSuccess(res.data.agents))
    } else {
      dispatch(Actions.fetchAgentsFailure(res.message))
    }
  }

  const updateAgent = async (arg) => {
    const res = await Services.putApiCall(arg, 'updateAgent')
    if (res.status == 201) {
      dispatch(Actions.updateAgentSuccess())
      dispatch(Actions.hideEditAgentSideBar())
      dispatch(Actions.showAgentSuccessToast('Agent updated'))
      fetchAgents()
    } else {
      dispatch(Actions.updateAgentFailure(res.message))
    }
  }

  useEffect(() => {
    fetchAgent({ agentId: agentData.editAgentId })
    fetchAgentSidebarData()
    // dispatch(Actions.fetchAgentRequest(agentData.editAgentId))
    // dispatch(Actions.fetchAgentSidebarDataRequest(localStorage.getItem('userId')))
  }, [agentData.editAgentId])

  useEffect(() => {
    if (Object.keys(agentData.agentSidebarData).length > 0) {
      agentData.agentSidebarData.departments.map((department, i) => {
        if (department.name === 'general') {
          setGeneralDepartmentId([department])
        }
      })
    }
  }, [agentData.agentSidebarData])

  useEffect(() => {

    if (Object.keys(agentData.agent).length > 0) {
      setImageAsUrl(agentData.agent.photo)
      setFirstName(agentData.agent.firstName)
      setLastName(agentData.agent.lastName)
      setAlias(agentData.agent.alias)
      setMobileNumber(agentData.agent.mobileNumber)
      setEmail(agentData.agent.email)
      setPassword(agentData.agent.password)
      setStatus((agentData.agent.status))
      setRole((agentData.agent.role))
      setRoleId(agentData.agent.roleId)
      setDepartmentId(agentData.agent.department)
      setLanguage(agentData.agent.language)
      setDesignation(agentData.agent.designation)
      setCountry(agentData.agent.country)
      setTimezone(agentData.agent.timezone)
      setAddress(agentData.agent.address)
      setViewTicket(agentData.agent.permissions.viewTicket)
      setCreateTicket(agentData.agent.permissions.createTicket)
      setChangeTicketOwnership(agentData.agent.permissions.changeTicketOwnership)
      setCloseTicket(agentData.agent.permissions.closeTicket)
      setUpdateTicketStatus(agentData.agent.permissions.updateTicketStatus)
      setDeleteTicket(agentData.agent.permissions.deleteTicket)
      setViewArticle(agentData.agent.permissions.viewArticle)
      setCreateArticle(agentData.agent.permissions.createArticle)
      setUpdateArticle(agentData.agent.permissions.updateArticle)
      setPublishDraftArticle(agentData.agent.permissions.publishDraftArticle)
      setDeleteArticle(agentData.agent.permissions.deleteArticle)
      setManageModule(agentData.agent.permissions.manageModule)
      setAddAgent(agentData.agent.permissions.addAgent)
      setAddDepartment(agentData.agent.permissions.addDepartment)
      setManagePermission(agentData.agent.permissions.managePermission)
      setManageGeneralSetting(agentData.agent.permissions.manageGeneralSetting)
      setImportTicket(agentData.agent.permissions.importTicket)
      setImportArticle(agentData.agent.permissions.importArticle)
      setLinkChannelEmail(agentData.agent.permissions.linkChannelEmail)
      setLinkChannelHelpcenter(agentData.agent.permissions.linkChannelHelpcenter)
      setFacebookLink(agentData.agent.social.facebook)
      setLinkedinLink(agentData.agent.social.linkedin)
      setInstagramLink(agentData.agent.social.instagram)
      setTwitterLink(agentData.agent.social.twitter)
    }
  }, [agentData.agent, agentData.agent.length])

  useEffect(() => {
    if (agentData.role.permissions !== undefined) {
      setViewTicket(agentData.role.permissions.viewTicket)
      setCreateTicket(agentData.role.permissions.createTicket)
      setChangeTicketOwnership(agentData.role.permissions.changeTicketOwnership)
      setCloseTicket(agentData.role.permissions.closeTicket)
      setUpdateTicketStatus(agentData.role.permissions.updateTicketStatus)
      setDeleteTicket(agentData.role.permissions.deleteTicket)
      setViewArticle(agentData.role.permissions.viewArticle)
      setCreateArticle(agentData.role.permissions.createArticle)
      setUpdateArticle(agentData.role.permissions.updateArticle)
      setPublishDraftArticle(agentData.role.permissions.publishDraftArticle)
      setDeleteArticle(agentData.role.permissions.deleteArticle)
      setManageModule(agentData.role.permissions.manageModule)
      setAddAgent(agentData.role.permissions.addAgent)
      setAddDepartment(agentData.role.permissions.addDepartment)
      setManagePermission(agentData.role.permissions.managePermission)
      setManageGeneralSetting(agentData.role.permissions.manageGeneralSetting)
      setImportTicket(agentData.role.permissions.importTicket)
      setImportArticle(agentData.role.permissions.importArticle)
      setLinkChannelEmail(agentData.role.permissions.linkChannelEmail)
      setLinkChannelHelpcenter(agentData.role.permissions.linkChannelHelpcenter)
    }
  }, [agentData.role.permissions])


  const handleFireBaseUpload = (image) => {
    var name = `${uuidv4()}-${image.name}`
    var storageRef = firebase.storage().ref();
    var imageRef = storageRef.child(`agents/${name}`);
    var uploadTask = imageRef.put(image)
    uploadTask.then(function (snapshot) {
      uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
        setImageAsUrl(downloadURL)
      });
    });
  }



  const permissions = {
    viewTicket: viewTicket,
    createTicket: createTicket,
    changeTicketOwnership: changeTicketOwnership,
    closeTicket: closeTicket,
    updateTicketStatus: updateTicketStatus,
    deleteTicket: deleteTicket,
    viewArticle: viewArticle,
    createArticle: createTicket,
    updateArticle: updateArticle,
    publishDraftArticle: publishDraftArticle,
    deleteArticle: deleteArticle,
    manageModule: manageModule,
    addAgent: addAgent,
    addDepartment: addDepartment,
    managePermission: managePermission,
    manageGeneralSetting: manageGeneralSetting,
    importTicket: importTicket,
    importArticle: importArticle,
    linkChannelEmail: linkChannelEmail,
    linkChannelHelpcenter: linkChannelHelpcenter,
  }



  const handleSubmit = () => {
    const data = {
      agentId: agentData.editAgentId,
      photo: imageAsUrl,
      firstName: firstName.toLowerCase(),
      lastName: lastName.toLowerCase(),
      alias: (alias.length === 0) ? `${firstName.toLowerCase()} ${lastName.toLowerCase()}` : alias,
      mobileNumber: mobileNumber,
      email: email.toLowerCase(),
      password: password,
      status: status,
      role: (compareJson(permissions, agentData.role.permissions) ? role : (role[role.length - 1] === '*' && compareJson(permissions, agentData.role.permissions) === false) ? `${role}` : `${role}*`),
      roleId: (compareJson(permissions, agentData.role.permissions) ? roleId : `custom`),
      department: (departmentId.length) ? departmentId : generalDepartmentId,
      language: language,
      designation: designation,
      country: country,
      timezone: timezone,
      address: address,
      permissions: permissions,
      parentId: localStorage.getItem('userId'),
      social: {
        facebook: facebookLink,
        twitter: twitterLink,
        instagram: instagramLink,
        linkedin: linkedinLink
      },
      oldData: {
        department: agentData.agent.department,
        roleName: agentData.agent.role,
        roleId: agentData.agent.roleId,
        name: `${agentData.agent.firstName} ${agentData.agent.lastName}`,
        generalDepartmentId: generalDepartmentId
      }
    }
    if (data.firstName.length === 0 || data.password.length === 0 || passwordValidator(password) === false || role.length === 0 || role === 'Agent Role *' || agentData.roleLoading === true) {
      if (data.firstName.length === 0) {
        setShowNameRequiredError(true)
        setTimeout(() => {
          setShowNameRequiredError(false)
        }, 2000)
      }
      if (data.password.length === 0) {
        setShowPasswordRequiredError(true)
        setTimeout(() => {
          setShowPasswordRequiredError(false)
        }, 2000)
      }
      if (data.password.length > 0 && passwordValidator(password) === false) {
        setShowPasswordValidationError(true);
        setTimeout(() => {
          setShowPasswordValidationError(false)
        }, 2000)
      }

      if (role.length === 0 || role === 'Agent Role *') {
        setShowRoleRequiredError(true)
        setTimeout(() => {
          setShowRoleRequiredError(false)
        }, 2000)
      }
      if (agentData.roleLoading) {
        setShowRoleLoadingError(true)
        setTimeout(() => {
          setShowRoleLoadingError(false)
        }, 2000)
      }

    }
    else {
      if (agentData.roleLoading) {
        setShowRoleLoadingError(true)
        setTimeout(() => {
          setShowRoleLoadingError(false)
        }, 2000)
      } else {
        updateAgent({ ...data })
        setSubmitStatus(true)
      }

    }
  }

  const passwordValidator = (pwd) => {
    var passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    if (pwd.match(passw)) {
      setShowPasswordValidationError(false)
      return true
    }
    else {
      setShowPasswordValidationError(true);
      setTimeout(() => {
        setShowPasswordValidationError(false)
      }, 2000)
      return false
    }
  }

  return (
    <Fragment>

      <div className="rightPanelSection w-auto">
        <div className="k-flex articleRightPanelMarge">
          <div className="article-right-col-1 w-650">
            <div className="articleRightPanel">

              <div className="rightPanelHeader categoryRightPanelHeader">
                <ul>
                  <li className="closing">
                    <span className="circlebtn" onClick={() => dispatch(Actions.hideEditAgentSideBar())}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="14.294" height="14.294" viewBox="0 0 14.294 14.294">
                        <path id="ic_clear_24px" d="M19.294,6.44,17.855,5l-5.707,5.707L6.44,5,5,6.44l5.707,5.707L5,17.855l1.44,1.44,5.707-5.707,5.707,5.707,1.44-1.44-5.707-5.707Z" transform="translate(-5 -5)" fill="#bebebe" />
                      </svg>
                    </span>
                  </li>
                  <li className="help position-relative cursorPointer ">
                    <span className="profile-settings-drp ">
                      {(showSetting) ?
                        <span class="profile-settings-drp " onClick={() => setShowSetting(false)}><svg xmlns="http://www.w3.org/2000/svg" width="23.583" height="24.217" viewBox="0 0 23.583 24.217"><g id="gear_1_" data-name="gear (1)" transform="translate(-6.71)"><g id="Group_1892" data-name="Group 1892" transform="translate(6.71)"><path id="Path_1737" data-name="Path 1737" d="M29.885,14.763l-2.226-1.741a8.763,8.763,0,0,0,.052-.914,8.5,8.5,0,0,0-.052-.914l2.228-1.742a1.091,1.091,0,0,0,.263-1.39L27.835,4.056A1.073,1.073,0,0,0,26.5,3.575L23.87,4.63a9.005,9.005,0,0,0-1.577-.915l-.4-2.786A1.072,1.072,0,0,0,20.823,0H16.182a1.069,1.069,0,0,0-1.068.92l-.4,2.8a9.284,9.284,0,0,0-1.574.915L10.506,3.574a1.094,1.094,0,0,0-1.329.473L6.859,8.057a1.085,1.085,0,0,0,.262,1.4L9.347,11.2a7.984,7.984,0,0,0,0,1.827L7.119,14.765a1.092,1.092,0,0,0-.262,1.39l2.315,4a1.071,1.071,0,0,0,1.339.481l2.627-1.054a9.085,9.085,0,0,0,1.576.915l.4,2.785a1.071,1.071,0,0,0,1.07.93h4.642a1.07,1.07,0,0,0,1.069-.92l.4-2.8a9.327,9.327,0,0,0,1.574-.916L26.5,20.643a1.084,1.084,0,0,0,.4.075,1.065,1.065,0,0,0,.933-.547l2.325-4.026A1.089,1.089,0,0,0,29.885,14.763ZM18.5,16.145a4.036,4.036,0,1,1,4.036-4.036A4.04,4.04,0,0,1,18.5,16.145Z" transform="translate(-6.71)"></path></g></g></svg><span class="preferences-hover-text">Preferences</span></span>
                        : <span className="preferences-hover-text--" onClick={() => setShowSetting(true)}><i className="icon customicon-go-back goback-icon" style={{ 'vertical-align': 'text-top' }}></i> Go Back</span>}
                    </span>
                  </li>
                </ul>
              </div>

              {(agentData.agentloading) ?
                <Loader />
                :

                <div className="bodyRightPanel pb-0">
                  <div className="rightPanelMain">
                    <div className="categroyNameLinkblack py-3 px-3">
                      <div className="lm-basicInfo mt-3">





                        {(showSetting) ?


                          <div className="profile-Profile profile-settings-rightpanel right-panel-forems">

                            <div className="lm-user-pic mb-3 mt-0">
                              <div className="editImage position-relative">
                                <img src={(imageAsUrl) ? imageAsUrl : "/images/dummy-avatar.jpg"} alt="" className="rounded img-fluid " />
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
                                    }}
                                  />

                                </label>
                              </div>


                              {(showImageUploadError) ?
                                <p className="invalid-feedback">Only jpeg and png allowed & size lesser than 2 MB</p>
                                : null}

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
                                  <div className="md-form md-form-custom agent-form">
                                    <input type="text"
                                      value={firstName}
                                      id="inputMDEx1"
                                      className="w-100"
                                      name="firstName"
                                      maxLength="40"
                                      onChange={(e) => setFirstName(e.target.value)}
                                    />
                                    <label for="inputMDEx1" className={(firstName.length) ? 'active' : ''}>First Name*</label>
                                    {showNameRequiredError ? <div className="invalid-feedback">Required</div> : null}
                                  </div>
                                </div>
                              </div>
                              <div className="col-sm-6">
                                <div className="wrapperInfo">
                                  <div className="md-form md-form-custom agent-form">
                                    <input type="text"
                                      value={lastName}
                                      id="inputMDEx2"
                                      className="w-100"
                                      name="lastName"
                                      maxLength="40"
                                      onChange={(e) => setLastName(e.target.value)}
                                    />
                                    <label for="inputMDEx2" className={(lastName.length) ? 'active' : ''}>Last Name</label>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="row mb-3">
                              <div className="col-sm-6">
                                <div className="wrapperInfo">
                                  <div className="md-form md-form-custom agent-form">
                                    <input type="text"
                                      id="inputMDEx3"
                                      className="w-100"
                                      name="alias"
                                      maxLength="40"
                                      value={alias}
                                      onChange={(e) => setAlias(e.target.value)}
                                    />
                                    <label for="inputMDEx3" className={(alias.length) ? 'active' : ''}>Alias</label>
                                  </div>
                                </div>
                              </div>
                              <div className="col-sm-6">
                                <div className="wrapperInfo">

                                  <div className="radio-Feilds-Manage-span justify-content-start">
                                    <PhoneInput
                                      className="w-100 mobile-n"
                                      placeholder="Enter phone number"
                                      value={mobileNumber}
                                      onChange={setMobileNumber} />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="row mb-3">
                              <div className="col-sm-6">
                                <div className="wrapperInfo">
                                  <div className="md-form md-form-custom agent-form">
                                    <input type="text"
                                      id="inputMDEx5"
                                      className="w-100"
                                      name="email"
                                      value={email}
                                      readonly="true"
                                    />
                                    <label for="inputMDEx5" className={(email.length) ? 'active' : ''}>Email*</label>

                                  </div>
                                </div>
                              </div>
                              <div className="col-sm-6">
                                <div className="wrapperInfo">
                                  <div className="md-form md-form-custom agent-form">
                                    <input
                                      type={passwordVisibility ? "text" : "password"}
                                      id="inputMDEx6"
                                      className="w-100"
                                      name="password"
                                      value={password}
                                      onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <div className="password-show-hide">
                                      <span onClick={() => { (passwordVisibility) ? setPasswordVisibility(false) : setPasswordVisibility(true) }}>
                                        <img src={(passwordVisibility) ? "/images/icon/show-eye.svg" : "/images/icon/hide-eye.svg"} className="rounded img-fluid " /></span>
                                    </div>

                                    <label for="inputMDEx6" className={(password.length) ? 'active' : ''}>Password*</label>
                                    {showPasswordRequiredError ? <div className="invalid-feedback">Required</div> : null}
                                    {showPasswordValidationError ? <div className="invalid-feedback">6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter</div> : null}
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="row mb-3">
                              <div className="col-sm-6">
                                <div className="wrapperInfo">
                                  <div className="radio-Feilds-Manage-span k-flex align-items-center justify-content-center">
                                    <div className="mr-auto">
                                      <p className="card-body-text">Status</p>
                                    </div>
                                    <div className="right-information-radio k-flex mt-2">
                                      <div className="material-switch">
                                        <input id="status"
                                          name="status"
                                          type="checkbox"
                                          checked={status}
                                          onChange={(e) => setStatus(e.target.checked)}
                                        />

                                        <label htmlFor="status" className="label-primary" />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="mt-3 mb-3 otherNameFeildsTitle">
                              <h4 className="card-title ticket-subtitle fnt-normal mb-1 fw-normal">Advanced Information</h4>
                              <p className="light-gray-text card-body-text">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium.</p>
                            </div>

                            <div className="row mb-3">
                              <div className="col-sm-6">
                                <div className="wrapperInfo">

                                  {agentData.agentSidebarDataloading && <span className="pree-loader"><img className="customgif" alt="" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" /></span>}
                                  {agentData.roleLoading && <span className="pree-loader"><img className="customgif" alt="" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" /></span>}

                                  <div className="md-form md-form-custom agent-form">
                                    <select className="customArrow" name="role" value={role} onChange={(e) => {
                                      setRole(e.target.value)
                                      agentData.agentSidebarData.roles.map((role, i) => {
                                        if (role.name === e.target.value) {
                                          setRoleId(role.roleId)
                                          fetchRole({ userId: localStorage.getItem('userId'), roleId: role.roleId })
                                        }
                                      })
                                    }}>
                                      <option>Agent Role *</option>
                                      {(agentData.agentSidebarData.roles !== undefined) ?
                                        agentData.agentSidebarData.roles.map((role, i) =>
                                          <option value={role.name} key={i}>{role.name}</option>
                                        )
                                        : null}
                                    </select>
                                    <label for="agntRoleLabel" className="active">Agent Role*</label>
                                    {showRoleRequiredError ? <div className="invalid-feedback">Required</div> : null}
                                    {showRoleLoadingError ? <div className="invalid-feedback">Please Wait Loading...</div> : null}

                                  </div>
                                </div>
                              </div>


                              <div className="col-sm-6">
                                <div className="wrapperInfo">
                                  {agentData.agentSidebarDataloading && <span className="pree-loader"><img className="customgif" alt="" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" /></span>}
                                  <div className="md-form md-form-custom agent-form">
                                    <select className="customArrow" name="department" onChange={(e) => {
                                      agentData.agentSidebarData.departments.map((department, i) => {
                                        if (department.name === e.target.value) {
                                          if (CheckObjectPresentInArray(departmentId, department) === false) {
                                            setDepartmentId([...departmentId, department])
                                          }
                                        }
                                      })
                                    }}>
                                      <option>Department </option>
                                      {(agentData.agentSidebarData.departments !== undefined) ?
                                        agentData.agentSidebarData.departments.map((dep, i) =>
                                          <option value={dep.name} key={i}>{dep.name}</option>
                                        )
                                        : null}
                                    </select>
                                    <label for="departmentLabel" className="active">Department</label>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="row mb-3">
                              <div className="col-sm-12">
                                {(departmentId.length > 0) ?
                                  <div className="mb-3">
                                    <ul className="input-tag__tags">

                                      {departmentId.map((department, i) =>
                                        <li className="visibleTo mt-1" key={i}>
                                          <span className={(department.name === "general") ? "" : "selected"}>{toTitleCase(department.name)}

                                            <button
                                              disabled={(department.name === "general") ? true : false}
                                              onClick={() => {
                                                var newDep = departmentId.filter(function (item) {
                                                  return item !== department
                                                })
                                                setDepartmentId(newDep)
                                              }}>+</button>
                                          </span>
                                        </li>
                                      )}
                                    </ul>
                                  </div>
                                  : null}
                              </div>
                            </div>


                            <div className="row mb-3">
                              <div className="col-sm-6">
                                <div className="wrapperInfo">
                                  <div className="md-form md-form-custom agent-form">
                                    <select as="select" className="customArrow" name="language" value={language} onChange={(e) => setLanguage(e.target.value)}>
                                      {Languages.map(language =>
                                        <option value={language.code}>{language.name}</option>
                                      )}
                                    </select>
                                    <label for="languageLabel" className="active">Language</label>
                                  </div>
                                </div>
                              </div>
                              <div className="col-sm-6">
                                <div className="wrapperInfo">
                                  <div className="md-form md-form-custom agent-form">
                                    <input type="text"
                                      id="inputMDEx10"
                                      className="w-100"
                                      name="designation"
                                      value={designation}
                                      onChange={(e) => setDesignation(e.target.value)}
                                    />
                                    <label for="inputMDEx10" className={(designation.length) ? 'active' : ''}>Designation</label>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="row mb-3">
                              <div className="col-sm-12">
                                <div className="wrapperInfo">
                                  <div className="md-form md-form-custom agent-form">
                                    <input type="text"
                                      id="inputMDEx11"
                                      className="w-100"
                                      name="address"
                                      value={address}
                                      onChange={(e) => setAddress(e.target.value)}
                                    />
                                    <label for="inputMDEx11" className={(address.length) ? 'active' : ''}>Address</label>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="row mb-3">
                              <div className="col-sm-6">
                                <div className="wrapperInfo">
                                  <div className="md-form md-form-custom agent-form">
                                    <select as="select" className="customArrow" name="country" value={country} onChange={e => setCountry(e.target.value)} >
                                      {Countries.map(country =>
                                        <option value={country.code}>{country.name}</option>
                                      )}


                                    </select>
                                    <label for="cuntryNameLabel" className="active">country</label>
                                  </div>
                                </div>
                              </div>
                              <div className="col-sm-6">
                                <div className="wrapperInfo">
                                  <div className="md-form md-form-custom agent-form">
                                    <select as="select" className="customArrow" name="timezone" value={timezone} onChange={(e) => setTimezone(e.target.value)}>
                                      {Timezones.map(timezone =>
                                        <option value={timezone.value}>{timezone.text}</option>
                                      )}
                                    </select>
                                    <label for="timeLabel" className="active">Select TimeZone</label>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="rightPanelFooter categoryRightPanelFooter">
                              <button className={(submitStatus ? 'rightPanelBtn btn disabled' : 'rightPanelBtn')} type="submit" onClick={() => handleSubmit()}>Update Agent</button>
                            </div>

                          </div>

                          :

                          <div className="edit-permission profile-settings-rightpanel right-panel-forems">

                            <div className="mt-3 mb-3 otherNameFeildsTitle">
                              <h4 className="card-title ticket-subtitle fnt-normal mb-1 fw-normal">Module Specific Permissions</h4>
                            </div>
                            <div className="mt-3 mb-3 otherNameFeildsTitle">
                              <p className="card-body-text">Ticketing</p>
                            </div>

                            <div className="row mb-3">
                              <div className="col-sm-6">
                                <div className="wrapperInfo">
                                  <div className="radio-Feilds-Manage-span k-flex align-items-center justify-content-center">
                                    <div className="mr-auto">
                                      <p className="card-body-text">View Tickets</p>
                                    </div>
                                    <div className="right-information-radio k-flex mt-2">
                                      <div className="material-switch">
                                        <input checked={viewTicket} type="checkbox" name="viewTicket" id="viewTicket" onChange={(e) => setViewTicket(e.target.checked)} />
                                        <label htmlFor="viewTicket" className="label-primary" />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-sm-6">
                                <div className="wrapperInfo">
                                  <div className="radio-Feilds-Manage-span k-flex align-items-center justify-content-center">
                                    <div className="mr-auto">
                                      <p className="card-body-text">Create Tickets</p>
                                    </div>
                                    <div className="right-information-radio k-flex mt-2">
                                      <div className="material-switch">
                                        <input checked={createTicket} type="checkbox" name="createTicket" id="createTicket" onChange={(e) => setCreateTicket(e.target.checked)} />
                                        <label htmlFor="createTicket" className="label-primary" />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="row mb-3">
                              <div className="col-sm-6">
                                <div className="wrapperInfo">
                                  <div className="radio-Feilds-Manage-span k-flex align-items-center justify-content-center">
                                    <div className="mr-auto">
                                      <p className="card-body-text">Change Ticket Ownership</p>
                                    </div>
                                    <div className="right-information-radio k-flex mt-2">
                                      <div className="material-switch">
                                        <input checked={changeTicketOwnership} onChange={(e) => setChangeTicketOwnership(e.target.checked)} type="checkbox" id="changeTicketOwnership" name="changeTicketOwnership" />
                                        <label htmlFor="changeTicketOwnership" className="label-primary" />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-sm-6">
                                <div className="wrapperInfo">
                                  <div className="radio-Feilds-Manage-span k-flex align-items-center justify-content-center">
                                    <div className="mr-auto">
                                      <p className="card-body-text">Close Ticket</p>
                                    </div>
                                    <div className="right-information-radio k-flex mt-2">
                                      <div className="material-switch">
                                        <input checked={closeTicket} onChange={(e) => setCloseTicket(e.target.checked)} type="checkbox" id="closeTicket" name="closeTicket" />
                                        <label htmlFor="closeTicket" className="label-primary" />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="row mb-3">
                              <div className="col-sm-6">
                                <div className="wrapperInfo">
                                  <div className="radio-Feilds-Manage-span k-flex align-items-center justify-content-center">
                                    <div className="mr-auto">
                                      <p className="card-body-text">Update Ticket Status</p>
                                    </div>
                                    <div className="right-information-radio k-flex mt-2">
                                      <div className="material-switch">
                                        <input checked={updateTicketStatus} onChange={(e) => setUpdateTicketStatus(e.target.checked)} type="checkbox" id="updateTicketStatus" name="updateTicketStatus" />
                                        <label htmlFor="updateTicketStatus" className="label-primary" />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-sm-6">
                                <div className="wrapperInfo">
                                  <div className="radio-Feilds-Manage-span k-flex align-items-center justify-content-center">
                                    <div className="mr-auto">
                                      <p className="card-body-text">Delete Ticket</p>
                                    </div>
                                    <div className="right-information-radio k-flex mt-2">
                                      <div className="material-switch">
                                        <input checked={deleteTicket} onChange={(e) => setDeleteTicket(e.target.checked)} type="checkbox" id="deleteTicket" name="deleteTicket" />
                                        <label htmlFor="deleteTicket" className="label-primary" />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="mt-3 mb-3 otherNameFeildsTitle">
                              <p className="card-body-text">Knowledge Base</p>
                            </div>
                            <div className="row mb-3">
                              <div className="col-sm-6">
                                <div className="wrapperInfo">
                                  <div className="radio-Feilds-Manage-span k-flex align-items-center justify-content-center">
                                    <div className="mr-auto">
                                      <p className="card-body-text">View Articles</p>
                                    </div>
                                    <div className="right-information-radio k-flex mt-2">
                                      <div className="material-switch">
                                        <input checked={viewArticle} onChange={(e) => setViewArticle(e.target.checked)} type="checkbox" id="viewArticle" name="viewArticle" />
                                        <label htmlFor="viewArticle" className="label-primary" />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-sm-6">
                                <div className="wrapperInfo">
                                  <div className="radio-Feilds-Manage-span k-flex align-items-center justify-content-center">
                                    <div className="mr-auto">
                                      <p className="card-body-text">Create Articles</p>
                                    </div>
                                    <div className="right-information-radio k-flex mt-2">
                                      <div className="material-switch">
                                        <input checked={createArticle} onChange={(e) => setCreateArticle(e.target.checked)} type="checkbox" id="createArticle" name="createArticle" />
                                        <label htmlFor="createArticle" className="label-primary" />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="row mb-3">
                              <div className="col-sm-6">
                                <div className="wrapperInfo">
                                  <div className="radio-Feilds-Manage-span k-flex align-items-center justify-content-center">
                                    <div className="mr-auto">
                                      <p className="card-body-text">Update Articles</p>
                                    </div>
                                    <div className="right-information-radio k-flex mt-2">
                                      <div className="material-switch">
                                        <input checked={updateArticle} onChange={(e) => setUpdateArticle(e.target.checked)} type="checkbox" id="updateArticle" name="updateArticle" />
                                        <label htmlFor="updateArticle" className="label-primary" />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-sm-6">
                                <div className="wrapperInfo">
                                  <div className="radio-Feilds-Manage-span k-flex align-items-center justify-content-center">
                                    <div className="mr-auto">
                                      <p className="card-body-text">Publish Draft Articles</p>
                                    </div>
                                    <div className="right-information-radio k-flex mt-2">
                                      <div className="material-switch">
                                        <input checked={publishDraftArticle} onChange={(e) => setPublishDraftArticle(e.target.checked)} type="checkbox" id="publishDraftArticle" name="publishDraftArticle" />
                                        <label htmlFor="publishDraftArticle" className="label-primary" />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="row mb-3">
                              <div className="col-sm-6">
                                <div className="wrapperInfo">
                                  <div className="radio-Feilds-Manage-span k-flex align-items-center justify-content-center">
                                    <div className="mr-auto">
                                      <p className="card-body-text">Delete Articles</p>
                                    </div>
                                    <div className="right-information-radio k-flex mt-2">
                                      <div className="material-switch">
                                        <input checked={deleteArticle} onChange={(e) => setDeleteArticle(e.target.checked)} type="checkbox" id="deleteArticle" name="deleteArticle" />
                                        <label htmlFor="deleteArticle" className="label-primary" />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="mt-3 mb-3 otherNameFeildsTitle">
                              <h4 className="card-title ticket-subtitle fnt-normal mb-1 fw-normal">Admin Permissions</h4>
                            </div>
                            <div className="row mb-3">
                              <div className="col-sm-6">
                                <div className="wrapperInfo">
                                  <div className="radio-Feilds-Manage-span k-flex align-items-center justify-content-center">
                                    <div className="mr-auto">
                                      <p className="card-body-text">Manage Modules</p>
                                    </div>
                                    <div className="right-information-radio k-flex mt-2">
                                      <div className="material-switch">
                                        <input checked={manageModule} onChange={(e) => setManageModule(e.target.checked)} type="checkbox" id="manageModule" name="manageModule" />
                                        <label htmlFor="manageModule" className="label-primary" />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-sm-6">
                                <div className="wrapperInfo">
                                  <div className="radio-Feilds-Manage-span k-flex align-items-center justify-content-center">
                                    <div className="mr-auto">
                                      <p className="card-body-text">Add Agents</p>
                                    </div>
                                    <div className="right-information-radio k-flex mt-2">
                                      <div className="material-switch">
                                        <input checked={addAgent} onChange={(e) => setAddAgent(e.target.checked)} type="checkbox" id="addAgent" name="addAgent" />
                                        <label htmlFor="addAgent" className="label-primary" />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="row mb-3">
                              <div className="col-sm-6">
                                <div className="wrapperInfo">
                                  <div className="radio-Feilds-Manage-span k-flex align-items-center justify-content-center">
                                    <div className="mr-auto">
                                      <p className="card-body-text">Add Departments</p>
                                    </div>
                                    <div className="right-information-radio k-flex mt-2">
                                      <div className="material-switch">
                                        <input checked={addDepartment} onChange={(e) => setAddDepartment(e.target.checked)} type="checkbox" id="addDepartment" name="addDepartment" />
                                        <label htmlFor="addDepartment" className="label-primary" />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-sm-6">
                                <div className="wrapperInfo">
                                  <div className="radio-Feilds-Manage-span k-flex align-items-center justify-content-center">
                                    <div className="mr-auto">
                                      <p className="card-body-text">Manage Permissions</p>
                                    </div>
                                    <div className="right-information-radio k-flex mt-2">
                                      <div className="material-switch">
                                        <input checked={managePermission} onChange={(e) => setManagePermission(e.target.checked)} type="checkbox" id="managePermission" name="managePermission" />
                                        <label htmlFor="managePermission" className="label-primary" />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="row mb-3">
                              <div className="col-sm-6">
                                <div className="wrapperInfo">
                                  <div className="radio-Feilds-Manage-span k-flex align-items-center justify-content-center">
                                    <div className="mr-auto">
                                      <p className="card-body-text">Manage General Settings</p>
                                    </div>
                                    <div className="right-information-radio k-flex mt-2">
                                      <div className="material-switch">
                                        <input checked={manageGeneralSetting} onChange={(e) => setManageGeneralSetting(e.target.checked)} type="checkbox" id="manageGeneralSetting" name="manageGeneralSetting" />
                                        <label htmlFor="manageGeneralSetting" className="label-primary" />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="mt-3 mb-3 otherNameFeildsTitle">
                              <p className="card-body-text">Import</p>
                            </div>
                            <div className="row mb-3">
                              <div className="col-sm-6">
                                <div className="wrapperInfo">
                                  <div className="radio-Feilds-Manage-span k-flex align-items-center justify-content-center">
                                    <div className="mr-auto">
                                      <p className="card-body-text">Tickets</p>
                                    </div>
                                    <div className="right-information-radio k-flex mt-2">
                                      <div className="material-switch">
                                        <input checked={importTicket} onChange={(e) => setImportTicket(e.target.checked)} type="checkbox" id="importTicket" name="importTicket" />
                                        <label htmlFor="importTicket" className="label-primary" />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-sm-6">
                                <div className="wrapperInfo">
                                  <div className="radio-Feilds-Manage-span k-flex align-items-center justify-content-center">
                                    <div className="mr-auto">
                                      <p className="card-body-text">Articles</p>
                                    </div>
                                    <div className="right-information-radio k-flex mt-2">
                                      <div className="material-switch">
                                        <input checked={importArticle} onChange={(e) => setImportArticle(e.target.checked)} type="checkbox" id="importArticle" name="importArticle" />
                                        <label htmlFor="importArticle" className="label-primary" />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="mt-3 mb-3 otherNameFeildsTitle">
                              <p className="card-body-text">Link Channels</p>
                            </div>
                            <div className="row mb-3">
                              <div className="col-sm-6">
                                <div className="wrapperInfo">
                                  <div className="radio-Feilds-Manage-span k-flex align-items-center justify-content-center">
                                    <div className="mr-auto">
                                      <p className="card-body-text">Email</p>
                                    </div>
                                    <div className="right-information-radio k-flex mt-2">
                                      <div className="material-switch">
                                        <input checked={linkChannelEmail} onChange={(e) => setLinkChannelEmail(e.target.checked)} type="checkbox" id="linkChannelEmail" name="linkChannelEmail" />
                                        <label htmlFor="linkChannelEmail" className="label-primary" />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-sm-6">
                                <div className="wrapperInfo">
                                  <div className="radio-Feilds-Manage-span k-flex align-items-center justify-content-center">
                                    <div className="mr-auto">
                                      <p className="card-body-text">Help Centre</p>
                                    </div>
                                    <div className="right-information-radio k-flex mt-2">
                                      <div className="material-switch">
                                        <input checked={linkChannelHelpcenter} onChange={(e) => setLinkChannelHelpcenter(e.target.checked)} type="checkbox" id="linkChannelHelpcenter" name="linkChannelHelpcenter" />
                                        <label htmlFor="linkChannelHelpcenter" className="label-primary" />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                          </div>

                        }

                      </div>
                    </div>
                  </div>
                </div>
              }





            </div>
          </div>
        </div>
      </div>

    </Fragment>
  );

};

export default EditAgent;