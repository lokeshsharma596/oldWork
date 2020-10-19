import React, { Fragment } from 'react';
import { useDispatch } from "react-redux"
import * as Actions from "./actions"
import {postApiCall,getApiCall} from "../../utils/services"

const DeleteScreen = (props) => {
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

      const deleteRoles = async (arg) =>{
          const res= await postApiCall(arg,'deleteRoles')
          if(res.status == 200){
            dispatch(Actions.deleteRolesSuccess())
            dispatch(Actions.hideDeleteRoleScreen())
            dispatch(Actions.showRoleSuccessToast('Role deleted'))
            fetchRoles()
          }else{
            dispatch(Actions.deleteRolesFailure(res.message))
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
                            <button className="popupbtn popupbtngray closePopup mr-2" onClick={() => deleteRoles({roleId:props.deleteRole,userId: localStorage.getItem('userId')})}>Yes, Delete</button>
                            <button className="popupbtn popupbtngray" onClick={() => dispatch(Actions.hideDeleteRoleScreen())}>Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default DeleteScreen;