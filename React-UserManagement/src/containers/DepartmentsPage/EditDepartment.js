import React, { Fragment, useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux"
import { toTitleCase, CheckObjectPresentInArray } from "../../utils/functions"
import { handleAgentSelection } from "./functions"
import * as Actions from "./actions"
import Loader from "../../components/Loader"
import * as Services from "../../utils/services"

const EditDepartment = () => {
  const [searchAgent, setSearchAgent] = useState([])
  const [addAgents, setAddAgents] = useState([])
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [showNameError, setShowNameError] = useState(false)
  const [showNameNotAvailableError, setShowNameNotAvailableError] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(false)



  const dispatch = useDispatch()
  const departmentData = useSelector(state => state.departmentsReducer)

  const fetchDepartment = async (arg) => {
    dispatch(Actions.fetchDepartmentRequest())
    const res = await Services.getApiCall(arg, 'getDepartment')
    if (res.status == 200) {
      dispatch(Actions.fetchDepartmentSuccess(res.data.department))
    } else {
      dispatch(Actions.fetchDepartmentFailure(res.message))
    }
  }

  const checkDepartmentNameAvailable = async (arg) => {
    dispatch(Actions.checkDepartmentNameRequest())
    const res = await Services.getApiCall({ ...arg, collection: 'departments' }, 'checkNameAvailable')
    if (res.status == 404) {
      dispatch(Actions.checkDepartmentNameSuccess({ "status": true, "message": "" }))
    }
    else if (res.status == 200) {
      dispatch(Actions.checkDepartmentNameSuccess({ "status": false, "message": "That Name is taken. Try another" }))
    }
    else {
      dispatch(Actions.checkDepartmentNameFailure(res.message))
    }
  }

  const fetchDepartments = async () => {
    const res = await Services.getApiCall({ userId: localStorage.getItem('userId') }, 'getDepartments')
    if (res.status == 200) {
      dispatch(Actions.fetchDepartmentsSuccess(res.data.departments))
    } else {
      dispatch(Actions.fetchDepartmentsFailure(res.message))
    }
  }

  const updateDepartment = async (arg) => {
    const res = await Services.putApiCall(arg, 'updateDepartment')
    if (res.status == 201) {
      dispatch(Actions.updateDepartmentSuccess())
      dispatch(Actions.hideEditDepartmentSideBar())
      dispatch(Actions.showDepartmentSuccessToast('Department updated'))
      fetchDepartments()
    } else {
      dispatch(Actions.updateDepartmentFailure(res.message))
    }
  }

  const fetchAgentSubstring = async () => {
    dispatch(Actions.fetchAgentSubstringsRequest())
    const res = await Services.getApiCall({ userId: localStorage.getItem('userId') }, 'getAgentSubstrings')
    if (res.status == 200) {
      dispatch(Actions.fetchAgentSubstringsSuccess(res.data.subStrings))
    } else {
      dispatch(Actions.fetchAgentSubstringsFailure(res.message))
    }
  }

  useEffect(() => {
    fetchDepartment({ departmentId: departmentData.editDepartmentId })
    fetchAgentSubstring()
    // dispatch(Actions.fetchDepartmentRequest(departmentData.editDepartmentId))
    // dispatch(Actions.fetchAgentSubstringsRequest(localStorage.getItem('userId')))
  }, [departmentData.editDepartmentId])


  useEffect(() => {
    if (Object.keys(departmentData.department).length > 0) {
      console.log("called inside ue ");
      setName(departmentData.department.name)
      setDescription(departmentData.department.description)
      setAddAgents(departmentData.department.agents)
    }
  }, [departmentData.department])

  console.log(name, description, addAgents);

  const handleSubmit = () => {
    const data = {
      name: name.toLowerCase(),
      description: description,
      agents: addAgents,
      departmentId: departmentData.editDepartmentId,
      userId: localStorage.getItem('userId')
    }
    if (data.name.length === 0 || departmentData.departmentNameAvailable === false || departmentData.departmentNameAvailable === '' || departmentData.departmentNameCheckLoading === true) {
      if (data.name.length === 0) {
        setShowNameError(true)
        setTimeout(() => {
          setShowNameError(false)
        }, 2000)
      }
      if (departmentData.departmentNameAvailable === false || departmentData.departmentNameAvailable === '' || departmentData.departmentNameCheckLoading === true) {
        setShowNameNotAvailableError(true)
        setTimeout(() => {
          setShowNameNotAvailableError(false)
        }, 2000)
      }
    }
    else {
      updateDepartment(data)
      // dispatch(Actions.updateDepartmentRequest(data))
      setSubmitStatus(true)
    }

  }

  console.log(departmentData.department.name, "dep name");

  return (
    <Fragment>

      <div className="rightPanelSection">
        <div className="k-flex articleRightPanelMarge">
          <div className="article-right-col-1 w-650">



            <div className="articleRightPanel">
              <div className="rightPanelHeader categoryRightPanelHeader">
                <ul>
                  <li className="closing">
                    <span className="circlebtn" onClick={() => dispatch(Actions.hideEditDepartmentSideBar())} >
                      <svg xmlns="http://www.w3.org/2000/svg" width="14.294" height="14.294" viewBox="0 0 14.294 14.294">
                        <path id="ic_clear_24px" d="M19.294,6.44,17.855,5l-5.707,5.707L6.44,5,5,6.44l5.707,5.707L5,17.855l1.44,1.44,5.707-5.707,5.707,5.707,1.44-1.44-5.707-5.707Z" transform="translate(-5 -5)" fill="#bebebe" />
                      </svg>
                    </span>
                  </li>
                </ul>
              </div>

              {(departmentData.departmentLoading) ?
                <Loader />
                :
                <Fragment>
                  <div className="bodyRightPanel pb-0">
                    <div className="rightPanelMain">
                      <div className="categroyNameLinkblack py-3 px-3">
                        <div className="lm-basicInfo">
                          <div className="add-department right-panel-forems">
                            <div className="pb-2 otherNameFeildsTitle">
                              <h4 className="card-title ticket-subtitle fnt-normal mb-1 fw-normal">Edit Department</h4>
                            </div>


                            <div className="row mb-3">
                              <div className="col-sm-12">
                                <div className="wrapperInfo department">
                                  {departmentData.departmentNameCheckLoading && <span className="pree-loader"><img class="customgif" alt="" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" /></span>}
                                  <div className="md-form md-form-custom">
                                    <input type="text"
                                      className="w-100"
                                      name="name"
                                      id="inputMDEx1"
                                      maxLength="40"
                                      value={name}
                                      onChange={(e) => setName(e.target.value)}
                                      onBlur={(e) => {
                                        if (e.target.value.trim().length > 0 && e.target.value.trim().toLowerCase() !== departmentData.department.name) {
                                          checkDepartmentNameAvailable({ name: e.target.value.trim().toLowerCase(), userId: localStorage.getItem('userId') })
                                          // dispatch(Actions.checkDepartmentNameRequest({ name: e.target.value.trim().toLowerCase(), userId: localStorage.getItem('userId') }))
                                        } else if (e.target.value.trim().toLowerCase() === departmentData.department.name) {
                                          dispatch(Actions.resetDepartmentName())
                                        }
                                      }}
                                      readonly={(departmentData.department.name === "general") ? "true" : false}
                                    />
                                    <label htmlFor="inputMDEx1" className={(name.length) ? 'active' : ''}>Enter Name Here*</label>
                                    {(departmentData.departmentNameAvailable === false) ?
                                      <div className="invalid-feedback">{departmentData.departmentNameCheckMessage}</div>
                                      : null
                                    }
                                    {(showNameNotAvailableError) ?
                                      <p className="invalid-feedback">Please Wait,Checking Name!</p>
                                      : null
                                    }

                                    {showNameError ? <p className="invalid-feedback">Required</p> : null}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="row mb-3">
                              <div className="col-sm-12">
                                <div className="wrapperInfo department">
                                  <div className="md-form md-form-custom">
                                    <textarea type="text"
                                      id="inputMDEx2"
                                      className="w-100 py-2"
                                      name="description"
                                      value={description}
                                      rows={4}
                                      onChange={(e) => setDescription(e.target.value)}
                                    />
                                    <label htmlFor="inputMDEx2" className={(description.length) ? 'active' : ''}>Enter Description</label>
                                  </div>
                                </div>
                              </div>
                            </div>



                            <div className="row mb-3">
                              <div className="col-sm-12">
                                <div className="wrapperInfo department">



                                  {(addAgents.length > 0) ?
                                    <div className="mb-3">
                                      <ul className="input-tag__tags">

                                        {addAgents.map((agent, i) =>
                                          <li className="visibleTo mt-1" key={i}>
                                            <span className={(departmentData.department.name === "general") ?"":"selected"}>{toTitleCase(agent.name)}
                                              <button
                                                disabled={(departmentData.department.name === "general") ? true : false}
                                                onClick={() => {
                                                  var newAgent = addAgents.filter(function (item) {
                                                    return item !== agent
                                                  })
                                                  setAddAgents(newAgent)
                                                }}>+</button>
                                            </span>
                                          </li>
                                        )}
                                      </ul>
                                    </div>
                                    : null}


                                  {(departmentData.department.name === "general") ? null :
                                    <div className="md-form md-form-custom">


                                      <input type="text" id="textboxvalue" className="w-100" onChange={(e) => setSearchAgent(handleAgentSelection(e.target.value, departmentData.subStrings))} />
                                      <label htmlFor="textboxvalue" >Search Agents</label>

                                      {(searchAgent.length > 0) ?
                                        <div className="mb-3">
                                          <ul className="input-tag__tags">

                                            {searchAgent.map((agent, i) =>
                                              <li className="visibleTo mt-1" key={i}>
                                                <span className="selected">{toTitleCase(agent.name)}

                                                  <button onClick={() =>
                                                    (CheckObjectPresentInArray(addAgents, agent) === false) ?
                                                      setAddAgents([...addAgents, agent])
                                                      : null
                                                  }>+</button>
                                                </span>
                                              </li>
                                            )}
                                          </ul>
                                        </div>
                                        : null}
                                    </div>
                                  }


                                </div>
                              </div>
                            </div>


                          </div>

                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="rightPanelFooter categoryRightPanelFooter">
                    <button className={(submitStatus ? 'rightPanelBtn btn disabled' : 'rightPanelBtn')} onClick={() => handleSubmit()}>
                      Update Department</button>
                  </div>

                </Fragment>
              }
            </div>
          </div>
        </div>
      </div >

    </Fragment >
  );

};

export default EditDepartment;