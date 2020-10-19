import React,{Fragment} from "react"
import { Link } from "react-router-dom"
import { useLocation } from 'react-router-dom';
import { useDispatch } from "react-redux"
import {showMiniSideBar} from "../containers/AgentsPage/actions"

const Breadcrumbs = () => {
    const dispatch = useDispatch()

    let pathname = useLocation().pathname

    return (
        <Fragment>
        <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <div className="customeBreadcrumb">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="/">User Management</Link></li>
                            {(pathname === "/") ?
                                <li className="breadcrumb-item active" aria-current="page">Home</li>
                                : (pathname === "/agents") ?
                                    <li className="breadcrumb-item active" aria-current="page">Agents</li>
                                    : (pathname === "/departments") ?
                                        <li className="breadcrumb-item active" aria-current="page">Departments</li>
                                        : (pathname === "/roles") ?
                                            <li className="breadcrumb-item active" aria-current="page">Roles & Permissions</li>
                                            : null}
                        </ol>
                    </nav>
                </div>
            </div>
        </div>
        <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <div className="page-heading body-heading k-flex">
                    <span className="icon customicon-solution-home mr-2 fnt-24 menu-toggle" onClick={()=>dispatch(showMiniSideBar())}>
                    </span>
                    {(pathname === "/") ?
                        <span className="body-heading-span">User Management</span>
                        : (pathname === "/agents") ?
                            <span className="body-heading-span">Agents</span>
                            : (pathname === "/departments") ?
                                <span className="body-heading-span">Departments</span>
                                : (pathname === "/roles") ?
                                    <span className="body-heading-span">Roles & Permissions</span>
                                    : null}
                </div >
            </div>
        </div>
        </Fragment>

    )
}


export default Breadcrumbs;