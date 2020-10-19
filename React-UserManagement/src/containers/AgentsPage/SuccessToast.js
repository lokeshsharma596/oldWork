import React,{useEffect} from 'react';
import * as Actions from "./actions"
import { useSelector, useDispatch } from "react-redux"

const SuccessToast = (props) => {
    const dispatch = useDispatch()
    const agentData = useSelector(state => state.agentsReducer)

    useEffect(() => {
        const timer = setTimeout(() => {
            dispatch(Actions.hideAgentSuccessToast())
        }, 3000);
        return () => clearTimeout(timer);
      }, [dispatch]);
    
    return (
        <div className="success-mgs-wrapper">
            <div className="success-container pr-3">
                <img src="/images/icon/notification.svg" alt="" />
            </div>
            <div className="success-container success-container2">
                <div>
            <p className="card-body-text fw-normal">Congratulations! {agentData.agentToastMessage} successfully.</p>
                </div>
            </div>
        </div>

    );
};

export default SuccessToast;