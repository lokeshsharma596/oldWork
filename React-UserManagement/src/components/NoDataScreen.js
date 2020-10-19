import React, { Fragment } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from "react-redux"
import { showCreateAgentSideBar } from '../containers/AgentsPage/actions';
import { showCreateDepartmentSideBar } from '../containers/DepartmentsPage/actions';
import { showCreateRoleSideBar } from '../containers/RolesPage/actions';


const NoDataScreen = () => {
    const dispatch = useDispatch()
    const Path = useLocation().pathname

    return (
        <div className="custome-row department-no-added white-bg ">
            <div className="no-added-department py-5">
                <div className="department-box text-center py-5 px-5">
                    <img src="./images/department-no-added.svg" alt="" className="pb-4" />

                    {(Path === "/agents") ?
                        <Fragment>
                            <h4 className="card-title fw-normal mb-0">No Agent is added.</h4>
                            <p className="card-body-text fw-normal">Please add a Agent or <span className="light-blue-text cursorPointer" onClick={() => dispatch(showCreateAgentSideBar())}>click here</span> to add</p>
                        </Fragment>

                        : (Path === "/departments") ?
                            <Fragment>
                                <h4 className="card-title fw-normal mb-0">No Department is added.</h4>
                                <p className="card-body-text fw-normal">Please add a department or <span className="light-blue-text cursorPointer" onClick={() => dispatch(showCreateDepartmentSideBar())}>click here</span> to add</p>
                            </Fragment>
                            : (Path === "/roles") ?
                                <Fragment>
                                    <h4 className="card-title fw-normal mb-0">No Role is added.</h4>
                                    <p className="card-body-text fw-normal">Please add a Role or <span className="light-blue-text cursorPointer" onClick={() => dispatch(showCreateRoleSideBar())}>click here</span> to add</p>
                                </Fragment>
                                : null}



                </div>
            </div>
        </div>
    );
};

export default NoDataScreen;