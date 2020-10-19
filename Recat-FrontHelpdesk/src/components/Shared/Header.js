import React, { Fragment } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { signoutUser, showSuccessToast } from "../../containers/BaseLayout/actions"
import { updateVoteColor } from "../../containers/ArticlePage/actions"

const Header = () => {


    const pathname = useLocation().pathname
    const dispatch = useDispatch()
    const baseData = useSelector(state => state.baseReducer)


    return (
        <Fragment>
            <div className="header">
                <div className="container">
                    <div className="header-menu-nav k-flex align-items-baseline">

                        <div className="logo-section mRa">


                            {(baseData.settings.frontendsettings.logo !== undefined && baseData.settings.frontendsettings.logo.length > 0) ?
                                <Link to="/"> <img src={baseData.settings.frontendsettings.logo} alt="logo" /></Link>
                                : null}

                        </div>

                        <div className="menu-nav">
                            <nav className="menu-nav-list">
                                <ul>
                                    <li >
                                        <Link to="/" className={pathname === "/" ? "actives" : ""}>
                                            {baseData.settings.frontendsettings.Headerlink[0]}
                                        </Link>
                                    </li>
                                    <li >
                                        <Link to="/categories" className={pathname === "/categories" ? "actives" : ""}>
                                            {baseData.settings.frontendsettings.Headerlink[1]}
                                        </Link>
                                    </li>
                                    {/* <li >
                                        <Link to="/my-area" className={pathname === "/my-area" ? "actives" : ""} >
                                            {baseData.settings.frontendsettings.Headerlink[2]}
                                        </Link>
                                    </li> */}
                                </ul>
                            </nav>
                        </div>

                        <div className="userHeader">
                            <ul>

                                {(baseData.settings.frontendsettings.allowsignup) ?
                                        (baseData.isAuthenticated === false) ?
                                            <Fragment>
                                                <li>
                                                    <Link to="/login">Log In</Link>
                                                </li>
                                                <li>
                                                    <Link to="/signup">Sign Up</Link>
                                                </li>


                                            </Fragment>
                                            :
                                            <Fragment>
                                                <li>
                                                    <div className="user-pic">
                                                        {(Object.keys(baseData.authUser).length > 0 && baseData.authUser.email !== undefined) ?
                                                            <div className="avtare-cus-new" style={{ "backgroundColor": '#6c757d' }}>
                                                                {`${baseData.authUser.email[0].toUpperCase()}${baseData.authUser.email[1].toUpperCase()}`}
                                                            </div>
                                                            : null
                                                        }


                                                    </div>
                                                </li>
                                                <li className="signOutBtn">
                                                    <button
                                                        onClick={() => {
                                                            localStorage.removeItem('user')
                                                            dispatch(signoutUser())
                                                            dispatch(updateVoteColor({ upvote: false, downvote: false }))
                                                            dispatch(showSuccessToast('Logged Out Successfully.'))
                                                        }}
                                                    >Sign Out</button>
                                                </li>
                                            </Fragment>                                      
                                    : null}



                            </ul>
                        </div>


                    </div>
                </div>
            </div>



            {/* Html Added for preview */}


            {(pathname === '/preview/article') ?

                (Object.keys(baseData.settings).length > 0) ?
                    <div className="preivew-screen-header">
                        <div className="container">
                            <div className="header-menu-nav k-flex align-items-baseline justify-content-center py-3">

                                <p className="card-body-text" style={{ color: baseData.settings.frontendsettings.themescolor }}>You are viewing the preview screen</p>

                                <Link to="/">
                                    <button className="preview-btn-screen" style={{ backgroundColor: baseData.settings.frontendsettings.themescolor }}>View Help Portal</button>
                                </Link>


                            </div>
                        </div>
                    </div>
                    : null
                : null}


            {/* Html Added for preview */}




        </Fragment>
    )
}

export default Header;