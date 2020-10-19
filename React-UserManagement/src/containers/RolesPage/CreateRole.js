import React, { Fragment, useState } from 'react';
import { useDispatch, useSelector } from "react-redux"
import * as Actions from "./actions"
import {getApiCall,postApiCall} from "../../utils/services"

const CreateRole = () => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
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
  const [showNameError, setShowNameError] = useState(false)
  const [showNameNotAvailableError, setShowNameNotAvailableError] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(false)

  const dispatch = useDispatch()


  const fetchRoles = async () => {
    dispatch(Actions.fetchRolesRequest())
    const res = await getApiCall({ userId: localStorage.getItem('userId') }, 'getRoles')
    if (res.status == 200) {
      dispatch(Actions.fetchRolesSuccess(res.data.roles))
    } else {
      dispatch(Actions.fetchRolesFailure(res.message))
    }
  }

  const createRole = async (arg) => {
    const res = await postApiCall(arg, 'createRole')
    if (res.status == 201) {
      dispatch(Actions.createRoleSuccess())
      dispatch(Actions.hideCreateRoleSideBar())
      dispatch(Actions.showRoleSuccessToast('Role added'))
      fetchRoles()
    } else {
      dispatch(Actions.createRoleFailure(res.message))
    }
  }

  const checkRoleName = async (arg) => {
    dispatch(Actions.checkRoleNameRequest())
    const res = await getApiCall({ ...arg, collection: 'roles' }, 'checkNameAvailable')
    if (res.status == 404) {
      dispatch(Actions.checkRoleNameSuccess({ "status": true, "message": "" }))
    }
    else if (res.status == 200) {
      dispatch(Actions.checkRoleNameSuccess({ "status": false, "message": "That Name is taken. Try another" }))
    }
    else {
      dispatch(Actions.checkRoleNameFailure(res.message))
    }

  }

  const roleData = useSelector(state => state.rolesReducer)

  const handleSubmit = () => {
    const data = {
      name: name.toLowerCase(),
      description: description,
      userId: localStorage.getItem('userId'),
      permissions: {
        viewTicket: viewTicket,
        createTicket: createTicket,
        changeTicketOwnership: changeTicketOwnership,
        closeTicket: closeTicket,
        updateTicketStatus: updateTicketStatus,
        deleteTicket: deleteTicket,
        viewArticle: viewArticle,
        createArticle: createArticle,
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
    }

    if (data.name.trim().length === 0 || roleData.roleNameAvailable === false || roleData.roleNameAvailable === '' || roleData.roleNameCheckLoading === true) {
      if (data.name.trim().length === 0) {
        setShowNameError(true)
        setTimeout(() => {
          setShowNameError(false)
        }, 2000)
      }
      if ((roleData.roleNameAvailable === false || roleData.roleNameAvailable === '') && roleData.roleNameCheckLoading === true) {
        setShowNameNotAvailableError(true)
        setTimeout(() => {
          setShowNameNotAvailableError(false)
        }, 2000)
      }
    } else {

      createRole(data)
      // dispatch(Actions.createRoleRequest({ ...data }))
      setSubmitStatus(true)
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
                    <span className="circlebtn" onClick={() => dispatch(Actions.hideCreateRoleSideBar())}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="14.294" height="14.294" viewBox="0 0 14.294 14.294">
                        <path id="ic_clear_24px" d="M19.294,6.44,17.855,5l-5.707,5.707L6.44,5,5,6.44l5.707,5.707L5,17.855l1.44,1.44,5.707-5.707,5.707,5.707,1.44-1.44-5.707-5.707Z" transform="translate(-5 -5)" fill="#bebebe" />
                      </svg>
                    </span>
                  </li>
                </ul>
              </div>


              <div className="bodyRightPanel pb-0">
                <div className="rightPanelMain">
                  <div className="categroyNameLinkblack py-3 px-3">
                    <div className="lm-basicInfo mt-3">



                      <div className="edit-permission profile-settings-rightpanel right-panel-forems">
                        <div className="mb-3 otherNameFeildsTitle">
                          <h4 className="card-title ticket-subtitle fnt-normal mb-1 fw-normal">Create Role</h4>
                        </div>
                        <div className="row mb-3">
                          <div className="col-sm-12">
                            <div className="wrapperInfo">
                              {roleData.roleNameCheckLoading && <span className="pree-loader"><img className="customgif" alt="" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" /></span>}
                              <div className="md-form md-form-custom agent-form">
                                <input type="text"
                                  id="inputMDEx1"
                                  className="w-100"
                                  maxLength="40"
                                  name="name"
                                  onChange={(e) => setName(e.target.value)}
                                  onBlur={(e) => {
                                    if (e.target.value.trim().length > 0) {
                                      checkRoleName({ name: e.target.value.trim().toLowerCase(), userId: localStorage.getItem('userId') })
                                      // dispatch(Actions.checkRoleNameRequest({ name: e.target.value.trim().toLowerCase(), userId: localStorage.getItem('userId') }))
                                    } else {
                                      dispatch(Actions.resetRoleName())
                                    }
                                  }} />
                                <label for="inputMDEx1" className>Enter Role Name*</label>
                                {(roleData.roleNameAvailable === false) ?
                                  <p className="invalid-feedback">{roleData.roleNameCheckMessage}</p>
                                  : null
                                }
                                {(showNameNotAvailableError) ?
                                  <p className="invalid-feedback">Please Wait,Checking Name!</p>
                                  : null
                                }

                                {showNameError ? <div className="invalid-feedback">Required</div> : null}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row mb-3">
                          <div className="col-sm-12">
                            <div className="wrapperInfo">
                              <div className="md-form md-form-custom agent-form">
                                <textarea type="text"
                                  component="textarea"
                                  id="inputMDEx2"
                                  className="w-100 py-2"
                                  name="description"
                                  rows={4}
                                  onChange={(e) => setDescription(e.target.value)}
                                />
                                <label for="inputMDEx2" className>Enter the Description</label>
                              </div>
                            </div>
                          </div>
                        </div>

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


                    </div>
                  </div>
                </div>

              </div>



              <div className="rightPanelFooter categoryRightPanelFooter">
                <button type="submit" className={(submitStatus ? 'rightPanelBtn btn disabled' : 'rightPanelBtn')} onClick={() => handleSubmit()}>Create Role</button></div>

            </div>

          </div>
        </div>
      </div>

    </Fragment>
  );

};

export default CreateRole;