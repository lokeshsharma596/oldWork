import React,{Fragment} from "react"
import { useLocation } from 'react-router-dom';
import { useDispatch } from "react-redux"
import {hideNotificationlisting} from "../containers/HomePage/actions"

const Notification = () => {
    const dispatch = useDispatch()

    return (
        <Fragment>
            <div className="rightPanelSection">
                <div className="filterRightPanel">
                    <div className="rightPanelHeader categoryRightPanelHeader">
                        <ul>
                            <li className="closing" onClick={() => dispatch(hideNotificationlisting()) }>
                                <span className="circlebtn">
                                    <img src={`/images/icon/rightpanel/multiply.svg`} alt />
                                </span>
                            </li>
                        </ul>
                    </div>
                    <div className="bodyRightPanel scroll-2">
                        <div className="rightPanelMain">
                            <div className="rightPanelNotification">
                                <div className="notifictionFeilds recent-activity">
                                    <div className="notificationHeading px-4 py-2 notificationHeadingWhite">
                                        <p className="card-body-text">Notification not available.</p>
                                    </div>
                                </div>
                            </div></div></div></div></div>

        </Fragment>

    )
}


export default Notification;