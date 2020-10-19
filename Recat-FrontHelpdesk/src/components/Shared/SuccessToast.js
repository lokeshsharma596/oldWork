import React, { useEffect } from 'react';
import {hideSuccessToast} from "../../containers/BaseLayout/actions"
import { useSelector, useDispatch } from "react-redux"

const SuccessToast = () => {
    const dispatch = useDispatch()
    const baseData = useSelector(state => state.baseReducer)


    useEffect(() => {
        const timer = setTimeout(() => {
            dispatch(hideSuccessToast())
        }, 2000);
        return () => clearTimeout(timer);
    }, [dispatch]);

    return (
        <div className="success-mgs-wrapper">
            <div className="success-container pr-3">
                <img src="/images/notification.svg" alt="" />
            </div>
            <div className="success-container success-container2">
                <div>
                    <p className="card-body-text fw-normal">{baseData.successToastMessage}</p>
                </div>
            </div>
        </div>

    );
};

export default SuccessToast;