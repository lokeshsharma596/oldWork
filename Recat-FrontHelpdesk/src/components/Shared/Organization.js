import React,{Fragment} from "react";
import { useSelector } from "react-redux"

const Organization = (props) => {
    const baseData = useSelector(state => state.baseReducer)

    
    return (
        <Fragment>
             {(baseData.settings.frontendsettings.organization && baseData.settings.frontendsettings.organlogo !== undefined && baseData.settings.frontendsettings.organlogo.length > 0) ?

            <div className="mainFullWidth">
                <div className="bg-bottom-section seo-titleSection k-flex align-items-center" style={{ backgroundColor:baseData.settings.frontendsettings.imageoverlay}}>
                    <div className="seo-left-bg">
                            <img src={baseData.settings.frontendsettings.organlogo} alt="" />  
                    </div>
                    
                    <div className="seo-right-bg">
                    <div className="seo-details">
                        {(baseData.settings.frontendsettings.organtitle !== undefined && baseData.settings.frontendsettings.organtitle.length > 0)?
                            <h2 className="card-title">{baseData.settings.frontendsettings.organtitle}</h2>
                            :null
                        }
                        {(baseData.settings.frontendsettings.organdescription !== undefined && baseData.settings.frontendsettings.organdescription.length > 0)?
                            <p className="text-mutede">{baseData.settings.frontendsettings.organdescription}</p>
                            :null
                        }
                        
                        
                    </div>
                    </div>
                   
                </div>

            </div>

            :null}

        </Fragment>
    )
}

export default Organization;



