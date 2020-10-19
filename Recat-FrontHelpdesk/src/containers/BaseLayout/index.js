import React, { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux"
import { fetchSettingsRequest, setAuthenticationStatus, setAuthUser, setBrowserHistory } from "./actions"
import Header from "../../components/Shared/Header"
import Footer from "../../components/Shared/Footer"
import HeaderContent from "../../components/Shared/HeaderContent"
// import Organization from "../../components/Shared/Organization"
import Loader from "../../components/Shared/Loader"
import { Helmet } from "react-helmet";
import jwt_decode from "jwt-decode";
import { useLocation } from 'react-router-dom';
import SeoTags from "../../components/Shared/SeoTags"
import SuccessToast from "../../components/Shared/SuccessToast"


const Index = (props) => {
    const dispatch = useDispatch()
    const baseData = useSelector(state => state.baseReducer)
    const pathname = useLocation().pathname



    useEffect(() => {
        const domainname = window.location.hostname.split('.')[0]
        if (baseData.settings.length === 0) {
            dispatch(fetchSettingsRequest(domainname))
        }

        if (localStorage.getItem('user') !== null) {
            const user = JSON.parse(localStorage.getItem('user'))
            if (user.token) {
                const decode = jwt_decode(user.token)
                dispatch(setAuthenticationStatus(true))
                dispatch(setAuthUser(decode.user))
            }else{
                localStorage.removeItem('user')
                dispatch(setAuthenticationStatus(false))
                dispatch(setAuthUser({}))
            }
        }

        dispatch(setBrowserHistory({ pathname: pathname, path: (pathname === '/') ? "/" : pathname.split('/')[1] }))

    }, [])

    return (
        <Fragment>

            {(Object.keys(baseData.settings).length > 0 && baseData.settings.usersettings.userId !== undefined) ?

                <div style={{ fontFamily: 'Roboto' }}>

                    <Helmet>

                        <title>{baseData.settings.usersettings.portalname}</title>

                    </Helmet>

                    <Header />

                    <HeaderContent />

                    {baseData.successToastVisibility ? <SuccessToast /> : null}



                    {props.children}

                    {/* {(pathname === "/" || pathname === "/404" || pathname === "/login") ?
                        null
                        : <Organization />} */}

                    <SeoTags />

                    <Footer />

                </div>
                : <Loader />
            }


        </Fragment  >
    );
};

export default Index;