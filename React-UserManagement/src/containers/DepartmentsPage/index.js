import React, { Fragment, useEffect, useState } from "react"
import Header from "../../components/Header"
import Footer from "../../components/Footer"
import LeftSideBar from "../../components/LeftSidebar"
import BreadCrumbs from "../../components/Breadcrumbs"
import CreateDepartment from "./CreateDepartment"
import EditDepartment from "./EditDepartment"
import { useSelector, useDispatch } from "react-redux"
import * as Actions from "./actions"
import NoDataScreen from "../../components/NoDataScreen"
import Notification from "../../components/Notification"
import Loader from "../../components/Loader"
import DeleteScreen from "./DeleteScreen"
import SuccessToast from "./SuccessToast"
import * as Services from "../../utils/services"

const DepartmentsPage = () => {
  const [deleteDepartment, setdeleteDepartment] = useState([])
  const [checkboxStatus, setCheckboxStatus] = useState({})

  const dispatch = useDispatch()
  const departmentData = useSelector(state => state.departmentsReducer)
  const homeData = useSelector(state => state.homeReducer)
  const agentData = useSelector(state => state.agentsReducer)

  const fetchDepartments = async () =>{
    dispatch(Actions.fetchDepartmentsRequest())
    const res= await Services.getApiCall({ userId: localStorage.getItem('userId')},'getDepartments')
    if(res.status == 200){
      dispatch(Actions.fetchDepartmentsSuccess(res.data.departments))
    }else{
      dispatch(Actions.fetchDepartmentsFailure(res.message))
    }
  }
  
  useEffect(() => {
    fetchDepartments()
    // dispatch(Actions.fetchDepartmentsRequest(localStorage.getItem('userId')))
    // if (Object.keys(homeData.permissions).length === 0) {
    //   dispatch(commomActions.fetchPermissionsRequest(localStorage.getItem('userId')))
    // }
  }, [homeData.permissions])




  useEffect(() => {
    if (Object.keys(departmentData.departments).length > 0) {
      var data = {}
      departmentData.departments.map(department => {
        data[department.departmentId] = false
      })
      data['main'] = false
      setdeleteDepartment([])
      setCheckboxStatus(data)
    }
    else {
      setdeleteDepartment([])
      setCheckboxStatus({})
    }
  }, [departmentData.departments])


  const handleCheckbox = (id) => {
    if (deleteDepartment.includes(id)) {
      var newdata = deleteDepartment.filter(function (value) { return value !== id; })
      setdeleteDepartment(newdata)
      if (checkboxStatus['main']) {
        setCheckboxStatus({ ...checkboxStatus, [id]: false, main: false })
      } else {
        setCheckboxStatus({ ...checkboxStatus, [id]: false })
      }
    }
    else {
      setdeleteDepartment([...deleteDepartment, id])
      if (checkboxStatus['main']) {
        setCheckboxStatus({ ...checkboxStatus, [id]: true, main: false })
      } else {
        setCheckboxStatus({ ...checkboxStatus, [id]: true })
      }
    }
  }

  function selectall() {
    setdeleteDepartment([])
    var data = {}
    var ids = []
    departmentData.departments.map(department => {
      data[department.departmentId] = true
      ids.push(department.departmentId)
    })
    data['main'] = true
    setCheckboxStatus(data)
    setdeleteDepartment(ids)
  }

  function unselectall() {
    setdeleteDepartment([])
    var data = {}
    departmentData.departments.map(department => {
      data[department.departmentId] = false
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
        {(departmentData.showDepartmentSuccessToast) ?
          <SuccessToast />
          : null}

          <div className={'page-wrapper '+(agentData.showMiniSideBar?'sidebar-collapse':'')}>
          <div className="container-fluid main-container">
            <div className="centerMainContainer">

              <BreadCrumbs />


{/* 
              {(deleteDepartment.length > 0) ?
                <button onClick={() => dispatch(Actions.showDeleteDepartmentScreen())}>Delete</button>
                : null
              } */}


              <div className="row mt-4">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                  <div className="agent-body">
                    <div className="category-header k-flex">
                      <div className="categoryHeaderLeft">
                        <ul className="ul-list-none py-0 px-0">
                        {(deleteDepartment.length > 0) ?
                          <li onClick={() => dispatch(Actions.showDeleteDepartmentScreen())}>
                              <a className="btnWhite btnWhite-hover dropdown icon-with-text" href="javascript:void();" >
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
                          
                          {/* {homeData.permissions.addDepartment ? */}
                            <li><button className="btn-all btnBlue" onClick={() => dispatch(Actions.showCreateDepartmentSideBar())}>+ Add Department</button></li>
                            {/* : null} */}
                        </ul>
                      </div>
                    </div>
                    {(departmentData.loading) ?
                      <Loader />
                      : (departmentData.departments !== undefined && departmentData.departments.length) ?
                        <div className="custome-row agent-table-row">
                          <div className="agent-table-tr custome-tr k-flex align-items-center justify-content-center py-4 px-3 agent-bg">
                            <div className="agent-table-td custome-td agent-table-td-1">
                              <label className="containerCheckBox">
                                <input type="checkbox" name="mainCheckbox" checked={checkboxStatus['main']} onClick={() => handleSelectAll()} />
                                <span className="checkmark" />
                              </label>
                            </div>
                            <div className="agent-table-td custome-td department-table-td-1 px-2">
                              <h6 className="card-title fw-bold mb-0">Department Name</h6>
                            </div>
                            <div className="agent-table-td custome-td department-table-td-2 px-2">
                              <h6 className="card-title fw-bold mb-0">Description</h6>
                            </div>
                            <div className="agent-table-td custome-td department-table-td-3 px-2">
                              <h6 className="card-title fw-bold mb-0">Agents</h6>
                            </div>

                          </div>



                          {departmentData.departments.map((department, i) =>
                            <div className="agent-table-tr custome-tr k-flex align-items-center justify-content-center py-4 px-3 agent-bg" key={i}>
                              <div className="agent-table-td custome-td agent-table-td-1">
                                <label className="containerCheckBox">
                                  <input type="checkbox" checked={checkboxStatus[department.departmentId]} value={department.departmentId} name="departmentCheckbox" onChange={(e) => handleCheckbox(e.target.value)} />
                                  <span className="checkmark" />
                                </label>
                              </div>
                              <div className="agent-table-td custome-td department-table-td-1 px-2">
                                <h6 className="card-title fw-normal mb-0">{department.name.charAt(0).toUpperCase() + department.name.slice(1)}</h6>
                              </div>
                              <div className="agent-table-td custome-td department-table-td-2 px-2">
                                <h6 className="card-title fw-normal mb-0">{department.description}</h6>
                              </div>
                              <div className="agent-table-td custome-td department-table-td-3 px-2">
                                <h6 className="card-title fw-normal mb-0">{department.agents}</h6>
                              </div>
                              <div className="agent-table-td custome-td department-table-td-4 ml-auto">
                                <span data-toggle="dropdown" className="cursorPointer">
                                  <svg xmlns="http://www.w3.org/2000/svg" width={5} height={20} viewBox="0 0 5 20">
                                    <path id="ic_more_vert_24px" d="M12.5,9A2.5,2.5,0,1,0,10,6.5,2.507,2.507,0,0,0,12.5,9Zm0,2.5A2.5,2.5,0,1,0,15,14,2.507,2.507,0,0,0,12.5,11.5Zm0,7.5A2.5,2.5,0,1,0,15,21.5,2.507,2.507,0,0,0,12.5,19Z" transform="translate(-10 -4)" />
                                  </svg>
                                </span>
                                <div className="navbarDropdown dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown1">
                                  <ul>
                                    <li onClick={() => {
                                      dispatch(Actions.resetDepartmentName())
                                      dispatch(Actions.showEditDepartmentSideBar(department.departmentId))}}><a className="dropdown-item" ><span className="preview-item-content" >Edit Preferences</span></a></li>
                                    <li onClick={() => {
                                      setdeleteDepartment([department.departmentId])
                                      dispatch(Actions.showDeleteDepartmentScreen())
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

        {(departmentData.showCreateDepartmentSideBar) ?
          <CreateDepartment />
          : null}

        {(departmentData.showEditDepartmentSideBar) ?
          <EditDepartment />
          : null}


        {(departmentData.showDeleteScreen) ?
          <DeleteScreen deleteDepartment={deleteDepartment} />
          : null}
          <Footer />
      </div>
    </Fragment>
  );
}

export default DepartmentsPage;