import React, { Fragment } from 'react';
// import { useDispatch } from "react-redux"
// import { fetchAgentsRequest } from '../containers/AgentsPage/actions';

const NoSearchResult = () => {
    // const dispatch = useDispatch()

    return (
        <div className="custome-row department-no-added white-bg ">
            <div className="no-added-department py-5">
                <div className="department-box text-center py-5 px-5">
                    <img src="./images/department-no-added.svg" alt="" className="pb-4" />

                        <Fragment>
                            <h4 className="card-title fw-normal mb-0">No Agent.Please Search for Another</h4>
                            {/* <p className="card-body-text fw-normal">Go To Agents <span className="light-blue-text cursorPointer" onClick={() => dispatch(fetchAgentsRequest(localStorage.getItem('userId')))}>Click here</span></p> */}
                        </Fragment>
                </div>
            </div>
        </div>
    );
};

export default NoSearchResult;