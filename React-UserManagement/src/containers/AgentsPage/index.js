import React, { Fragment, useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux"
import * as Actions from "./actions"
import * as commomActions from "../HomePage/actions"
import Header from "../../components/Header"
import Footer from "../../components/Footer"
import LeftSideBar from "../../components/LeftSidebar"
import BreadCrumbs from "../../components/Breadcrumbs"
import CreateAgent from "./CreateAgent"
import EditAgent from "./EditAgent"
import NoDataScreen from "../../components/NoDataScreen"
import Loader from "../../components/Loader"
import SuccessToast from "./SuccessToast"
import DeleteScreen from "./DeleteScreen"
import { toTitleCase } from "../../utils/functions"
import NoSearchResult from "../../components/NoSearchResult"
import Notification from "../../components/Notification"
import * as Services from "../../utils/services"

const AgentsPage = () => {
  const [searchingShow, setsearchingShow] = useState(false)
  const [search, setSearch] = useState("")
  const [deleteAgent, setDeleteAgent] = useState([])
  const [checkboxStatus, setCheckboxStatus] = useState({})

  const dispatch = useDispatch()
  const agentData = useSelector(state => state.agentsReducer)
  const homeData = useSelector(state => state.homeReducer)

  const fetchAgents = async () => {
  
    dispatch(Actions.hideSearchBackButton())
    dispatch(Actions.fetchAgentsRequest())
    const res = await Services.getApiCall({ userId: localStorage.getItem('userId') }, 'getAgents')
    if (res.status == 200) {
      dispatch(Actions.fetchAgentsSuccess(res.data.agents))
    } else {
      dispatch(Actions.fetchAgentsFailure(res.message))
    }
  }

 
  useEffect(() => {
    // dispatch(Actions.fetchAgentsRequest(localStorage.getItem('userId')))
    fetchAgents()
    // if(Object.keys(homeData.permissions).length === 0){
    //   dispatch(commomActions.fetchPermissionsRequest(localStorage.getItem('userId')))
    // } 
  }, [])
  // }, [fetchAgent, homeData.permissions])

  useEffect(() => {
    if (Object.keys(agentData.agents).length > 0) {
      var data = {}
      agentData.agents.map(agent => {
        data[agent.agentId] = false
      })
      data['main'] = false
      setCheckboxStatus(data)
      setDeleteAgent([])
    }
    else {
      setDeleteAgent([])
      setCheckboxStatus({})
    }
  }, [agentData.agents])


  const handleSearch = async () => {
    if (search.length){
      const res = await Services.getApiCall({ userId: localStorage.getItem('userId'), search: search.toLowerCase()}, 'searchAgents')
      console.log(res,"search result")
      if(res.status == 200){
        if(res.data.agents.length === 0){
          dispatch(Actions.setEmptyAgentSearch())
        }else{
          dispatch(Actions.searchAgentSuccess(res.data.agents))
          dispatch(Actions.showSearchBackButton())
        }
      }else{
        dispatch(Actions.searchAgentFailure(res.message))
      }
      // dispatch(Actions.searchAgentRequest({ userId: localStorage.getItem('userId'), search: search.toLowerCase() }))
    }
  }

  const handleCheckbox = (id) => {
    if (deleteAgent.includes(id)) {
      var newdata = deleteAgent.filter(function (value) { return value !== id; })
      setDeleteAgent(newdata)
      if (checkboxStatus['main']) {
        setCheckboxStatus({ ...checkboxStatus, [id]: false, main: false })
      } else {
        setCheckboxStatus({ ...checkboxStatus, [id]: false })
      }
    }
    else {
      setDeleteAgent([...deleteAgent, id])
      if (checkboxStatus['main']) {
        setCheckboxStatus({ ...checkboxStatus, [id]: true, main: false })
      } else {
        setCheckboxStatus({ ...checkboxStatus, [id]: true })
      }
    }
  }

  const selectall = () => {
    setDeleteAgent([])
    var data = {}
    var ids = []
    agentData.agents.map(agent => {
      data[agent.agentId] = true
      ids.push(agent.agentId)
    })
    data['main'] = true
    setCheckboxStatus(data)
    setDeleteAgent(ids)
  }


  const unselectall = () => {
    setDeleteAgent([])
    var data = {}
    agentData.agents.map(agent => {
      data[agent.agentId] = false
    })
    data['main'] = false
    setCheckboxStatus(data)
  }

  const handleSelectAll = () => {
    if (checkboxStatus['main'] === false) {
      selectall()
    }
    else {
      unselectall()
    }
  }

  const getDepartmentNames = (agent) => {
    var departments = ''
    if (agent !== undefined) {
      agent.map(dep => {
        departments += `${toTitleCase(dep.name)} , `
      })
      return departments.slice(0, -2)
    }
  }

  const handleBackButton = () => {
    fetchAgents()
    // dispatch(Actions.fetchAgentsRequest(localStorage.getItem('userId')))
    setSearch("")
    setsearchingShow(false)
  }

  console.log(agentData.agentsLoading,"hello lokesh")
  return (
    <Fragment>

      <div className="main-wrapper" id="main-wrapper">

        <Header />

        <LeftSideBar />
        {(homeData.shownotification) ?
          <div class="shadow">&nbsp;</div>
          : null}

        {(homeData.shownotification) ?
          <Notification />
          : null}



        {(agentData.showAgentSuccessToast) ?
          <SuccessToast />
          : null}



        <div className={'page-wrapper ' + (agentData.showMiniSideBar ? 'sidebar-collapse' : '')}>
          <div className="container-fluid main-container">
            <div className="centerMainContainer">


              <BreadCrumbs />

              <div className="row mt-4">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                  <div className="agent-body">
                    <div className="category-header k-flex">
                      <div className="categoryHeaderLeft">
                        <ul className="ul-list-none py-0 px-0">
                          {(deleteAgent.length > 0) ?
                            <li onClick={() => dispatch(Actions.showDeleteAgentScreen())}>
                              <a className="btnWhite btnWhite-hover dropdown icon-with-text" href="javascript:void(0)" >
                                <span>
                                  <svg xmlns="http://www.w3.org/2000/svg" width={14} height={18} viewBox="0 0 14 18"><path id="ic_delete_24px" d="M6,19a2.006,2.006,0,0,0,2,2h8a2.006,2.006,0,0,0,2-2V7H6ZM19,4H15.5l-1-1h-5l-1,1H5V6H19Z" transform="translate(-5 -3)" fill="#a2abd1" /></svg>
                                </span>
                                <span className="pl-2">Delete</span>
                              </a>
                            </li>
                            : null
                          }
                        </ul>
                      </div>




                      <div className="categoryHeaderRight ml-auto">
                        <ul className="ul-list-none py-0 px-0">



                          <li>
                            {(searchingShow) ?
                              <Fragment>
                                <span className="gridTileOption searchFocuse">
                                  <input type="text" placeholder="Search for Agents" onChange={(e) => setSearch(e.target.value)} />
                                  <span className="searchValues" onClick={() => setsearchingShow(false)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="17.49"
                                      height="17.49" viewBox="0 0 17.49 17.49">
                                      <path id="ic_zoom_out_24px"
                                        d="M15.5,14h-.79l-.28-.27a6.51,6.51,0,1,0-.7.7l.27.28v.79l5,4.99L20.49,19Zm-6,0A4.5,4.5,0,1,1,14,9.5,4.494,4.494,0,0,1,9.5,14Z"
                                        transform="translate(-3 -3)" fill="#a2abd1" />
                                    </svg>
                                  </span>
                                  <span className="click-Search-cat" onClick={handleSearch}>Search</span>
                                </span>

                                {(agentData.showSearchBackButton) ? <button className="ml-2 btnWhite btnWhite-hover dropdown icon-with-text" onClick={handleBackButton}>Back</button> : null}


                              </Fragment>
                              :
                              <span className="gridTileOption" onClick={() => setsearchingShow(true)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="17.49"
                                  height="17.49" viewBox="0 0 17.49 17.49">
                                  <path id="ic_zoom_out_24px"
                                    d="M15.5,14h-.79l-.28-.27a6.51,6.51,0,1,0-.7.7l.27.28v.79l5,4.99L20.49,19Zm-6,0A4.5,4.5,0,1,1,14,9.5,4.494,4.494,0,0,1,9.5,14Z"
                                    transform="translate(-3 -3)" fill="#a2abd1" />
                                </svg>
                              </span>
                            }
                          </li>


                          {/* {(homeData.permissions.addAgent !== undefined && homeData.permissions.addAgent === true)? */}
                          <li><button className="btn-all btnBlue" onClick={() => dispatch(Actions.showCreateAgentSideBar())}>+ Add Agent</button></li>
                          {/* :null} */}
                        </ul>
                      </div>
                    </div>

                    {(agentData.agentsLoading) ?
                      <Loader />
                      : (agentData.agents !== undefined && agentData.agents.length) ?
                        <div className="custome-row agent-table-row">
                          <div className="agent-table-tr custome-tr k-flex align-items-center justify-content-center py-4 px-3 agent-bg">
                            <div className="agent-table-td custome-td agent-table-td-1">
                              <label className="containerCheckBox">
                                <input type="checkbox" name="mainCheckbox" checked={checkboxStatus['main']} onClick={() => handleSelectAll()} />
                                <span className="checkmark" />
                              </label>
                            </div>
                            <div className="agent-table-td custome-td agent-table-td-2 px-2">
                              <h6 className="card-title fw-bold mb-0">Name & Email</h6>
                            </div>
                            <div className="agent-table-td custome-td agent-table-td-3 px-2">
                              <h6 className="card-title fw-bold mb-0">Alias</h6>
                            </div>
                            <div className="agent-table-td custome-td agent-table-td-4 px-2">
                              <h6 className="card-title fw-bold mb-0">Department</h6>
                            </div>
                            <div className="agent-table-td custome-td agent-table-td-5 px-2">
                              <h6 className="card-title fw-bold mb-0">Role</h6>
                            </div>


                            <div className="agent-table-td custome-td agent-table-td-7 px-2">
                              <h6 className="card-title fw-bold mb-0">Last Login</h6>
                            </div>

                            <div className="agent-table-td custome-td agent-table-td-8 ml-auto">
                              <h6 className="card-title fw-bold mb-0">Action</h6>
                            </div>


                          </div>

                          {agentData.agents.map((agent, i) =>

                            <div className="agent-table-tr custome-tr k-flex align-items-center justify-content-center py-4 px-3 agent-bg" key={i}>
                              <div className="agent-table-td custome-td agent-table-td-1">
                                <label className="containerCheckBox">
                                  <input type="checkbox" checked={checkboxStatus[agent.agentId]}
                                    value={agent.agentId} name="agentCheckbox" onChange={(e) => handleCheckbox(e.target.value)} />
                                  <span className="checkmark" />
                                </label>
                              </div>
                              <div className="agent-table-td custome-td agent-table-td-2 px-2">
                                <div className="avtar-profile k-flex align-items-center">
                                  <div className="avtar-table">
                                    <img src={(agent.photo.length) ? agent.photo : "/images/dummy-avatar.jpg"} alt="" />
                                  </div>
                                  <div className="avtar-details overflow-hidden">
                                    <h6 className="card-title mb-0 fw-bold text-truncate">{agent.firstName.charAt(0).toUpperCase() + agent.firstName.slice(1) + " " + agent.lastName.charAt(0).toUpperCase() + agent.lastName.slice(1)}</h6>
                                    <p className="card-body-text mb-0 fw-normal light-gray-text text-truncate">{agent.email}</p>
                                  </div>
                                </div>
                              </div>
                              <div className="agent-table-td custome-td agent-table-td-3 px-2">
                                <h6 className="card-title fw-normal mb-0 ">{agent.alias}</h6>
                              </div>
                              <div className="agent-table-td custome-td agent-table-td-4 px-2">
                                <h6 className="card-title fw-normal mb-0">{getDepartmentNames(agent.department)}</h6>
                              </div>
                              <div className="agent-table-td custome-td agent-table-td-5 px-2">
                                <h6 className="card-title fw-normal mb-0">{agent.role}</h6>
                              </div>

                              <div className="agent-table-td custome-td agent-table-td-7 px-2">
                                <h6 className="card-title fw-normal mb-0">{agent.lastLogin}</h6>
                              </div>
                              <div className="agent-table-td custome-td agent-table-td-8 ml-auto">
                                <span data-toggle="dropdown" className="cursorPointer px-1">
                                  <svg xmlns="http://www.w3.org/2000/svg" width={5} height={20} viewBox="0 0 5 20">
                                    <path id="ic_more_vert_24px" d="M12.5,9A2.5,2.5,0,1,0,10,6.5,2.507,2.507,0,0,0,12.5,9Zm0,2.5A2.5,2.5,0,1,0,15,14,2.507,2.507,0,0,0,12.5,11.5Zm0,7.5A2.5,2.5,0,1,0,15,21.5,2.507,2.507,0,0,0,12.5,19Z" transform="translate(-10 -4)" />
                                  </svg>
                                </span>
                                <div className="navbarDropdown dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown1">
                                  <ul>

                                    <li onClick={() => {
                                      dispatch(Actions.showEditAgentSideBar(agent.agentId))
                                      }}><a className="dropdown-item" ><span className="preview-item-content" >Edit Preferences</span></a></li>
                                    <li onClick={() => {
                                      setDeleteAgent([agent.agentId])
                                      dispatch(Actions.showDeleteAgentScreen())
                                    }}
                                    ><a className="dropdown-item"><span className="preview-item-content" >Delete</span></a></li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          )
                          }

                        </div>
                        : (agentData.agents.length === 0 && agentData.emptyAgentSearch) ?
                          <NoSearchResult />
                          : <NoDataScreen />
                    }
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {(agentData.showCreateAgentSideBar) ?
          <CreateAgent />
          : null}


        {(agentData.showEditAgentSideBar) ?
          <EditAgent />
          : null}


        {(agentData.showDeleteScreen) ?
          <DeleteScreen deleteAgent={deleteAgent} />
          : null}


        <Footer />
      </div>


    </Fragment>
  );
}

export default AgentsPage;