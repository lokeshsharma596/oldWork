import React, { Fragment } from 'react';
import { useDispatch } from "react-redux"
import * as Actions from "./actions"
import * as Services from "../../utils/services"

const DeleteScreen = (props) => {
    const dispatch = useDispatch()
    
    const fetchAgents = async () => {
        dispatch(Actions.hideSearchBackButton())
        dispatch(Actions.fetchAgentRequest())
        const res = await Services.getApiCall({ userId: localStorage.getItem('userId') }, 'getAgents')
        console.log(res, "res")
        if (res.status == 200) {
          dispatch(Actions.fetchAgentsSuccess(res.data.agents))
        } else {
          dispatch(Actions.fetchAgentsFailure(res.message))
        }
      }

    const deleteAgent = async (arg) =>{
        const res= await Services.postApiCall(arg,'deleteAgents')
        if(res.status == 200){
            dispatch(Actions.deleteAgentsSuccess())
            dispatch(Actions.hideDeleteAgentScreen())
            dispatch(Actions.showAgentSuccessToast('Agent deleted'))
            fetchAgents()
        }else{
            dispatch(Actions.deleteAgentsFailure(res.message))
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
                                <h5 className="popup-title">Do You Wish To Delete All The Selected Items?</h5>
                                <p className="popup-body-text">Deleting items will erase all the data related to the item.</p>
                            </div>
                        </div>
                    </div>
                    <div className="popupFooter">
                        <div className="popupButton">
                            <button className="popupbtn popupbtngray closePopup mr-2" onClick={() => deleteAgent({ agentId: props.deleteAgent,userId: localStorage.getItem('userId') })}>Yes, Delete</button>
                            <button className="popupbtn popupbtngray" onClick={() => dispatch(Actions.hideDeleteAgentScreen())}>Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default DeleteScreen;