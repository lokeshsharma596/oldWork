import React from 'react';
import { Link } from "react-router-dom"
import {hideMiniSideBar} from "../containers/AgentsPage/actions"
import { useDispatch } from "react-redux"

const MiniSideBar = () => {
    const dispatch = useDispatch()
    return (
        <div className="sidebarnavChild">
            
         {/* <div className="sidebarnavChild"> */}

            <div className="innerChild">
                
                <div className="sidebarnavChildHeader">
                    <div className="rightPanelHeader">
                        <ul>
                            <li className="closingMenu cursorPointer" onClick={() => dispatch(hideMiniSideBar()) }>
                                <span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="14.471" height="14.471" viewBox="0 0 14.471 14.471"><path id="ic_clear_24px" d="M19.471,6.457,18.014,5l-5.778,5.778L6.457,5,5,6.457l5.778,5.778L5,18.014l1.457,1.457,5.778-5.778,5.778,5.778,1.457-1.457-5.778-5.778Z" transform="translate(-5 -5)" fill="#bebebe"></path></svg>
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="sidebar-menu">
                    <ul className="sidebar-menu-ul">
                        <li>
                            <Link to="/agents">
                                <span className="icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="17.057" height="17.057" viewBox="0 0 17.057 17.057">
                                        <path id="Icon_awesome-user-alt" data-name="Icon awesome-user-alt" d="M8.528,9.594a4.8,4.8,0,1,0-4.8-4.8A4.8,4.8,0,0,0,8.528,9.594Zm4.264,1.066H10.957a5.8,5.8,0,0,1-4.857,0H4.264A4.264,4.264,0,0,0,0,14.925v.533a1.6,1.6,0,0,0,1.6,1.6H15.458a1.6,1.6,0,0,0,1.6-1.6v-.533A4.264,4.264,0,0,0,12.792,10.66Z" fill="#848484" />
                                    </svg>
                                </span>
                                <span className="text-menu">Agents</span>
                                <span className="iconArrow">
                                </span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/departments">
                                <span className="icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22.893" height="16.025" viewBox="0 0 22.893 16.025">
                                        <path id="Icon_awesome-user-friends" data-name="Icon awesome-user-friends" d="M6.868,10.262A4.006,4.006,0,1,0,2.862,6.256,4,4,0,0,0,6.868,10.262Zm2.747,1.145h-.3a5.531,5.531,0,0,1-4.9,0h-.3A4.122,4.122,0,0,0,0,15.528v1.03a1.717,1.717,0,0,0,1.717,1.717h10.3a1.717,1.717,0,0,0,1.717-1.717v-1.03A4.122,4.122,0,0,0,9.615,11.407Zm7.555-1.145a3.434,3.434,0,1,0-3.434-3.434A3.435,3.435,0,0,0,17.17,10.262Zm1.717,1.145h-.136a4.511,4.511,0,0,1-3.162,0h-.136a3.973,3.973,0,0,0-1.992.551,5.235,5.235,0,0,1,1.42,3.57V16.9c0,.079-.018.154-.021.229h6.317a1.717,1.717,0,0,0,1.717-1.717,4,4,0,0,0-4.006-4.006Z" transform="translate(0 -2.25)" fill="#848484" />
                                    </svg>
                                </span>
                                <span className="text-menu">Departments</span>
                                <span className="iconArrow" />
                            </Link>
                        </li>
                        <li>
                            <Link to="roles">
                                <span className="icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22.424" height="17.941" viewBox="0 0 22.424 17.941">
                                        <path id="Icon_awesome-user-cog" data-name="Icon awesome-user-cog" d="M21.392,13.081a4.111,4.111,0,0,0,0-1.493l.9-.522a.254.254,0,0,0,.116-.3,5.259,5.259,0,0,0-1.163-2.011.256.256,0,0,0-.315-.049l-.9.522a4.114,4.114,0,0,0-1.293-.746V7.439a.255.255,0,0,0-.2-.249,5.287,5.287,0,0,0-2.32,0,.255.255,0,0,0-.2.249V8.483a4.114,4.114,0,0,0-1.293.746l-.9-.522a.256.256,0,0,0-.315.049,5.259,5.259,0,0,0-1.163,2.011.258.258,0,0,0,.116.3l.9.522a4.111,4.111,0,0,0,0,1.493l-.9.522a.254.254,0,0,0-.116.3A5.285,5.285,0,0,0,13.5,15.912a.256.256,0,0,0,.315.049l.9-.522a4.114,4.114,0,0,0,1.293.746V17.23a.255.255,0,0,0,.2.249,5.287,5.287,0,0,0,2.32,0,.255.255,0,0,0,.2-.249V16.185a4.114,4.114,0,0,0,1.293-.746l.9.522a.256.256,0,0,0,.315-.049A5.259,5.259,0,0,0,22.412,13.9a.258.258,0,0,0-.116-.3l-.9-.522Zm-4.012.953a1.7,1.7,0,1,1,1.7-1.7A1.7,1.7,0,0,1,17.38,14.034ZM7.849,8.97A4.485,4.485,0,1,0,3.364,4.485,4.485,4.485,0,0,0,7.849,8.97Zm7.05,7.937c-.081-.042-.161-.091-.238-.137l-.277.161a1.375,1.375,0,0,1-1.7-.256,6.389,6.389,0,0,1-1.409-2.439,1.371,1.371,0,0,1,.627-1.6l.277-.161q-.005-.137,0-.273L11.9,12.04a1.369,1.369,0,0,1-.627-1.6c.032-.1.077-.2.112-.3-.133-.011-.263-.042-.4-.042H10.4a6.1,6.1,0,0,1-5.109,0H4.709A4.711,4.711,0,0,0,0,14.8v1.458a1.682,1.682,0,0,0,1.682,1.682H14.016a1.68,1.68,0,0,0,.953-.3,1.365,1.365,0,0,1-.07-.413Z" fill="#848484" />
                                    </svg>
                                </span>
                                <span className="text-menu">Roles & Permissions</span>
                                <span className="iconArrow" />
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default MiniSideBar;