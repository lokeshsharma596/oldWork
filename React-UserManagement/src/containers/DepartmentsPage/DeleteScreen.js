import React, { Fragment } from 'react';
import { useDispatch } from "react-redux"
import * as Actions from "./actions"
import {getApiCall,postApiCall} from "../../utils/services"

const DeleteScreen = (props) => {
    const dispatch = useDispatch()
    
    const fetchDepartments = async () =>{
        dispatch(Actions.fetchDepartmentsRequest())
        const res= await getApiCall({ userId: localStorage.getItem('userId')},'getDepartments')
        if(res.status == 200){
          dispatch(Actions.fetchDepartmentsSuccess(res.data.departments))
        }else{
          dispatch(Actions.fetchDepartmentsFailure(res.message))
        }
      }

      const deleteDepartment = async (arg) =>{
          const res= await postApiCall(arg,'deleteDepartments')
          if(res.status == 200){
            dispatch(Actions.deleteDepartmentsSuccess())
            dispatch(Actions.hideDeleteDepartmentScreen())
            dispatch(Actions.showDepartmentSuccessToast('Department deleted'))
            fetchDepartments()
          }else{
            dispatch(Actions.deleteDepartmentsFailure(res.message))
          }
      }

    return (
        <Fragment>
            <div style={{ display: "block" }} className="shadow">&nbsp;</div>

            <div className="popup customePopup popup4">
                <div className="popupPanel m-auto">
                    <div className="popupHeader" />
                    <div className="popupBody">
                        <div className="popup1Show">
                            <div className="popupImages"><img src="/images/sure.svg" alt="" /></div>
                            <div className="popupDetails">
                                <h5 className="popup-title ">Do You Wish To Delete All The Selected Items?</h5>
                                <p className="popup-body-text">Deleting items will erase all the data related to the item.</p>
                            </div>
                        </div>
                    </div>
                    <div className="popupFooter">
                        <div className="popupButton">
                            <button className="popupbtn popupbtngray closePopup mr-2" onClick={() => deleteDepartment({ departmentId: props.deleteDepartment,userId: localStorage.getItem('userId') })}>Yes, Delete</button>
                            <button className="popupbtn popupbtngray" onClick={() => dispatch(Actions.hideDeleteDepartmentScreen())}>Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default DeleteScreen;