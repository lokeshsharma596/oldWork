import React from 'react';


class GenralSetting extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
        submitted:false,
        title:"",
        description:"",
        language:true,
        logo:true,
        knoledgebase:true,
        communityticket:true,
        ticket:true
        }
       // this.props.match.params.cayegoryName="Knowledge Base";
    }
    render(){
        return(
            <div className="tab-pane fade show active" id="one" role="tabpanel" aria-labelledby="one-tab">
                <div className="customeTabsContent settings-Feilds">
                    <div className="row mb-4">
                        <div className="col-sm-6">
                            <div className="wrapperInfo ps-relative">
                                <input type="text" placeholder="First Name*" className="w-100" placeholder="Enter here example - Welcome to Appy Pie Help Portal" />
                                <label for="form1" className="setting-title">Help Portal Title*</label>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="wrapperInfo ps-relative">
                                <input type="text" placeholder="Last Name*" className="w-100" placeholder="Enter Description (60 Words)"/>
                                <label for="form1" className="setting-title">Description</label>
                            </div>
                        </div>
                    </div>
                    <div className="row mb-4">
                        <div className="col-sm-6">
                            <div className="wrapperInfo ps-relative">
                                <input type="text" placeholder="First Name*" className="w-100" placeholder="English"/>
                                <label for="form1" className="setting-title">Default Language</label>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="wrapperInfo ps-relative">
                                <div className="dregDesign advancesettingdropdesign settingdFeilds mb-0" style={{'minHeight':'auto'}}>
                                    <input type="file" placeholder="Enter Customer Portal Base Title*" />
                                        <div className="uploadLogoContent">
                                            <p>Upload Logo : </p>
                                        </div>
                                        <div className="uplloadLogoRight">
                                            <img className="filedrgImg" src={'../../src/assets/images/icon/settings/file-drag.svg'} alt="" />
                                            <p className="drag-drop"><span className="clickHereFile">Click Here</span><small>(Upto 5 MB of .png, .jpg, & .gif formats allowed)</small></p>
                                        </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="row mb-4">
                        <div className="col-sm-12">
                            <div className="wrapperInfo ps-relative">
                                <span className="radio-Feilds-Manage-span">
                                    <div className="radioFeildsProfile perfrenceInformation k-flex align-items-center justify-content-center">
                                        <div className="left-information-radio">
                                            <p className="card-body-text">Enable Option On Help Portal</p>
                                        </div>
                                        <div className="right-information-radio k-flex ">
                                            <div className="information-radio pl-4 settings-radio-new">
                                                <div className="material-switch">
                                                    <input id="someSwitchOptionPrimary" name="someSwitchOption001" type="checkbox"/>
                                                    <label for="someSwitchOptionPrimary" className="label-primary"></label><span className="card-body-text pl-3">Knowledge Base</span>
                                                </div>
                                            </div>
                                            <div className="information-radio pl-4 settings-radio-new">
                                                <div className="material-switch">
                                                    <input id="someSwitchOptionPrimary1" name="someSwitchOption001" type="checkbox"/>
                                                    <label for="someSwitchOptionPrimary1" className="label-primary"></label><span className="card-body-text pl-3">Community</span>
                                                </div>
                                            </div>
                                            <div className="information-radio pl-4 settings-radio-new">
                                                <div className="material-switch">
                                                    <input id="someSwitchOptionPrimary2" name="someSwitchOption001" type="checkbox"/>
                                                    <label for="someSwitchOptionPrimary2" className="label-primary"></label><span className="card-body-text pl-3">Raise a Ticket</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </span>
                            </div>
                        </div>
                    </div>





                </div>            
            </div>
        );
    }
}

export default GenralSetting;