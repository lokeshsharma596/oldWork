import React,{useEffect} from 'react';
import * as Actions from "./actions"
import { useSelector, useDispatch } from "react-redux"

const SuccessToast = (props) => {
    const dispatch = useDispatch()
    const homeData = useSelector(state => state.homeReducer)

    useEffect(() => {
        const timer = setTimeout(() => {
            dispatch(Actions.hideCommonSuccessToast())
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
            <p className="card-body-text fw-normal">Congratulations! {homeData.userToastMessage} successfully.</p>
                </div>
            </div>
        </div>

    );
};

export default SuccessToast;