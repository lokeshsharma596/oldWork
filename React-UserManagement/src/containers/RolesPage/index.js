import React, { Fragment, useEffect, useState } from "react"
import Header from "../../components/Header"
import LeftSideBar from "../../components/LeftSidebar"
import Footer from "../../components/Footer"
import BreadCrumbs from "../../components/Breadcrumbs"
import { useSelector, useDispatch } from "react-redux"
import CreateRole from "./CreateRole"
import NoDataScreen from "../../components/NoDataScreen"
import EditRole from "./EditRole"
import Loader from "../../components/Loader"
import DeleteScreen from "./DeleteScreen"
import SuccessToast from "./SuccessToast"
import * as Actions from "./actions"
import Notification from "../../components/Notification"
import {getApiCall} from "../../utils/services"

const RolesPage = () => {
  const [deleteRole, setDeleteRole] = useState([])
  const [checkboxStatus, setCheckboxStatus] = useState({})

  const dispatch = useDispatch()


  const fetchRoles = async () =>{
    dispatch(Actions.fetchRolesRequest())
    const res= await getApiCall({userId:localStorage.getItem('userId')},'getRoles')
    console.log(res.data.roles, "rolesfetch")
    if(res.status == 200){
      dispatch(Actions.fetchRolesSuccess(res.data.roles))
    }else{
      dispatch(Actions.fetchRolesFailure(res.message))
    }
  }

  useEffect(() => {
    fetchRoles()
    // dispatch(Actions.fetchRolesRequest(localStorage.getItem('userId')))
  }, [])

  const rolesData = useSelector(state => state.rolesReducer)
  const homeData = useSelector(state => state.homeReducer)
  const agentData = useSelector(state => state.agentsReducer)

  const handleCheckbox = (id) => {
    if (deleteRole.includes(id)) {
      var newdata = deleteRole.filter(function (value) { return value !== id; })
      setDeleteRole(newdata)
      if (checkboxStatus['main']) {
        setCheckboxStatus({ ...checkboxStatus, [id]: false, main: false })
      } else {
        setCheckboxStatus({ ...checkboxStatus, [id]: false })
      }
    }
    else {
      setDeleteRole([...deleteRole, id])
      if (checkboxStatus['main']) {
        setCheckboxStatus({ ...checkboxStatus, [id]: true, main: false })
      } else {
        setCheckboxStatus({ ...checkboxStatus, [id]: true })
      }
    }
  }

  function selectall() {
    setDeleteRole([])
    var data = {}
    var ids = []
    rolesData.roles.map(role => {
      data[role.roleId] = true
      ids.push(role.roleId)
    })
    data['main'] = true
    setCheckboxStatus(data)
    setDeleteRole(ids)
  }


  function unselectall() {
    setDeleteRole([])
    var data = {}
    rolesData.roles.map(role => {
      data[role.roleId] = false
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

  useEffect(() => {
    if (rolesData.roles && Object.keys(rolesData.roles).length > 0) {
      var data = {}
      rolesData.roles.map(role => {
        data[role.roleId] = false
      })
      data['main'] = false
      setDeleteRole([])
      setCheckboxStatus(data)
    }
    else{
      setDeleteRole([])
      setCheckboxStatus({})
    }
  }, [rolesData.roles])


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

        {(rolesData.showRoleSuccessToast) ?
          <SuccessToast />
          : null}

          <div className={'page-wrapper '+(agentData.showMiniSideBar?'sidebar-collapse':'')}>
          <div className="container-fluid main-container">
            <div className="centerMainContainer">

              <BreadCrumbs />

              <div className="row mt-4">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                  <div className="agent-body">
                    <div className="category-header k-flex">
                      <div className="categoryHeaderLeft">
                        <ul className="ul-list-none py-0 px-0">
                        {(deleteRole.length > 0) ?
                          <li onClick={() => dispatch(Actions.showDeleteRoleScreen())}>
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
                          <li><button className="btn-all btnBlue" onClick={() => dispatch(Actions.showCreateRoleSideBar())}>+ Add Role</button></li>
                        </ul>
                      </div>
                    </div>

                    {(rolesData.loading) ?
                      <Loader />
                      : (rolesData.roles !== undefined && rolesData.roles.length) ?
                        <div className="custome-row agent-table-row">
                          <div className="agent-table-tr custome-tr k-flex align-items-center justify-content-center py-4 px-3 agent-bg">
                            <div className="agent-table-td custome-td agent-table-td-1">
                              <label className="containerCheckBox">
                                <input type="checkbox" name="mainCheckbox" checked={checkboxStatus['main']} onClick={() => handleSelectAll()} />
                                <span className="checkmark" />
                              </label>
                            </div>
                            <div className="agent-table-td custome-td department-table-td-1 px-2">
                              <h6 className="card-title fw-bold mb-0">Role</h6>
                            </div>
                            <div className="agent-table-td custome-td department-table-td-2 px-2">
                              <h6 className="card-title fw-bold mb-0">Description</h6>
                            </div>
                            <div className="agent-table-td custome-td department-table-td-3 px-2">
                              <h6 className="card-title fw-bold mb-0">Agents</h6>
                            </div>

                          </div>


                          {rolesData.roles.map((role, i) =>

                            <div className="agent-table-tr custome-tr k-flex align-items-center justify-content-center py-4 px-3 agent-bg">
                              <div className="agent-table-td custome-td agent-table-td-1">
                                <label className="containerCheckBox">
                                  <input type="checkbox" checked={checkboxStatus[role.roleId]}
                                    value={role.roleId} name="roleCheckbox" onChange={(e) => handleCheckbox(e.target.value)} />
                                  <span className="checkmark" />
                                </label>
                              </div>
                              <div className="agent-table-td custome-td department-table-td-1 px-2">
                                <h6 className="card-title fw-normal mb-0">{role.name.charAt(0).toUpperCase() + role.name.slice(1)}</h6>
                              </div>
                              <div className="agent-table-td custome-td department-table-td-2 px-2">
                                <h6 className="card-title fw-normal mb-0">{role.description}</h6>
                              </div>
                              <div className="agent-table-td custome-td department-table-td-3 px-2">
                                <h6 className="card-title fw-normal mb-0">{role.agents}</h6>
                              </div>
                              <div className="agent-table-td custome-td department-table-td-4 ml-auto">
                                <span data-toggle="dropdown" className="cursorPointer">
                                  <svg xmlns="http://www.w3.org/2000/svg" width={5} height={20} viewBox="0 0 5 20">
                                    <path id="ic_more_vert_24px" d="M12.5,9A2.5,2.5,0,1,0,10,6.5,2.507,2.507,0,0,0,12.5,9Zm0,2.5A2.5,2.5,0,1,0,15,14,2.507,2.507,0,0,0,12.5,11.5Zm0,7.5A2.5,2.5,0,1,0,15,21.5,2.507,2.507,0,0,0,12.5,19Z" transform="translate(-10 -4)" />
                                  </svg>
                                </span>
                                <div className="navbarDropdown dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown1">
                                  <ul>
                                    <li onClick={() => dispatch(Actions.showEditRoleSideBar(role.roleId))}><a className="dropdown-item" ><span className="preview-item-content" >Edit Preferences</span></a></li>
                                    <li onClick={() => {
                                      setDeleteRole([role.roleId])
                                      dispatch(Actions.showDeleteRoleScreen())
                                    }}>
                                      <a className="dropdown-item" ><span className="preview-item-content" >Delete</span></a></li>
                                  </ul>
                                </div>
                              </div>
                            </div>

                          )}

                        </div>
                        : <NoDataScreen />
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {(rolesData.showCreateRoleSideBar) ?
          <CreateRole />
          : null}

        {(rolesData.showEditRoleSideBar) ?
          <EditRole />
          : null}

        {(rolesData.showDeleteScreen) ?
          <DeleteScreen deleteRole={deleteRole} />
          : null}
      <Footer />
      </div>
    </Fragment>
  );
}

export default RolesPage;