import React from "react"
import { useSelector } from "react-redux"


const Loader = () => {
    const baseData = useSelector(state => state.baseReducer)
    return (
        <div className="spinner">
            <div className="bounce1" style={{ backgroundColor: (Object.keys(baseData.settings).length > 0 && baseData.settings.frontendsettings.themescolor)?baseData.settings.frontendsettings.themescolor:"#64b5f6" }}></div>
            <div className="bounce2" style={{ backgroundColor: (Object.keys(baseData.settings).length > 0 && baseData.settings.frontendsettings.themescolor)?baseData.settings.frontendsettings.themescolor:"#64b5f6" }}></div>
            <div className="bounce3" style={{ backgroundColor: (Object.keys(baseData.settings).length > 0 && baseData.settings.frontendsettings.themescolor)?baseData.settings.frontendsettings.themescolor:"#64b5f6" }}></div>
        </div>
    )
}

export default Loader;