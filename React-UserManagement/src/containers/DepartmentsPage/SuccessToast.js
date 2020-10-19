import React,{useEffect} from 'react';
import * as Actions from "./actions"
import { useSelector, useDispatch } from "react-redux"

const SuccessToast = () => {
    const dispatch = useDispatch()
    const departmentData = useSelector(state => state.departmentsReducer)

    useEffect(() => {
        const timer = setTimeout(() => {
            dispatch(Actions.hideDepartmentSuccessToast())
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
            <p className="card-body-text fw-normal">Congratulations! {departmentData.departmentToastMessage} successfully.</p>
                </div>
            </div>
        </div>

    );
};

export default SuccessToast;