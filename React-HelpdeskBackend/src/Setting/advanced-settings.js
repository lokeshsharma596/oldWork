import React from 'react';

class AdvanceSettings extends React.Component{
    render(){
        return(
           <div className="tab-pane fade" id="two" role="tabpanel" aria-labelledby="two-tab">
                <div className="customeTabsContent settings-Feilds">
                    <div className="row">
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                            <div className="advanceSettingHeading">
                                <h3 className="card-title">Header Section</h3>
                                <h5 className="card-title">Header Links</h5>
                            </div>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-sm-6">
                            <div className="wrapperInfo">
                                <input type="text" placeholder="Home" className="w-100" />
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="wrapperInfo">
                                <input type="text" placeholder="https://www.appypie.com/how-to-create-an-app" className="w-100" disabled/>
                            </div>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-sm-6">
                            <div className="wrapperInfo">
                                <input type="text" placeholder="Knowledge Base" className="w-100" />
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="wrapperInfo">
                                <input type="text" placeholder="https://www.appypie.com/how-to-create-an-app" className="w-100"  disabled/>
                            </div>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-sm-6">
                            <div className="wrapperInfo">
                                <input type="text" placeholder="Community" className="w-100" />
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="wrapperInfo">
                                <input type="text" placeholder="https://www.appypie.com/how-to-create-an-app" className="w-100" disabled/>
                            </div>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-sm-6">
                            <div className="wrapperInfo">
                                <input type="text" placeholder="Raise a Ticket" className="w-100" />
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="wrapperInfo">
                                <input type="text" placeholder="https://www.appypie.com/how-to-create-an-app" className="w-100" disabled/>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-4 mb-3">
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                            <div className="advanceSettingHeading">
                                <h3 className="card-title">Footer Section</h3>
                                <h5 className="card-title">Footer Links</h5>
                                <p className="card-body-text">Set Lorem Ipsum is simply dummy text of the printing and typesetting industry. </p>
                            </div>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-sm-6">
                            <div className="wrapperInfo">
                                <input type="text" placeholder="Contact Us" className="w-100" />
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="wrapperInfo">
                                <input type="text" placeholder="Paste URL" className="w-100"  disabled/>
                            </div>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-sm-6">
                            <div className="wrapperInfo">
                                <input type="text" placeholder="Privacy Policy" className="w-100" />
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="wrapperInfo">
                                <input type="text" placeholder="Paste URL" className="w-100" disabled/>
                            </div>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-sm-6">
                            <div className="wrapperInfo">
                                <input type="text" placeholder="Terms and Condition" className="w-100" />
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="wrapperInfo">
                                <input type="text" placeholder="Paste URL" className="w-100" disabled/>
                            </div>
                        </div>
                    </div>
                    <p className="addNewFooterSection-btn text-right"><span>+ Add New</span></p>
                    <div className="row mt-5 mb-3">
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                            <div className="k-flex align-items-center justify-content-center">
                                <div className="advanceSettingHeading">
                                    <h4 className="card-title ">Social Media Links</h4>
                                    <p className="card-body-text">Set Lorem Ipsum is simply dummy text of the printing and typesetting industry. </p>
                                </div>
                                <div className="information-radio pl-4 settings-radio-new">
                                    <div className="material-switch">
                                        <input id="someSwitchOptionPrimary2" name="someSwitchOption001" type="checkbox"/>
                                        <label for="someSwitchOptionPrimary2" className="label-primary"></label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-sm-6">
                            <div className="wrapperInfo socialMediaFeildsSettings ps-relative">
                                <span className="socialMediaIconNew social-icon fb">
                                    <img className="filedrgImg" src={'../../src/assets/images/icon/socialMedia/facebook-logo.svg'} alt />
                                </span>
                                <input type="text" placeholder="Enter URL*" className="w-100 pl-5 pr-5" />
                                <span className="remove-circle-feilds">
                                    <img className="remove-circle" src={'../../images/icon/settings/remove-circle.svg'} alt />  
                                </span>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="wrapperInfo socialMediaFeildsSettings ps-relative">
                                <span className="socialMediaIconNew social-icon tw">
                                    <img className="filedrgImg" src={'../../src/assets/images/icon/socialMedia/twitter.svg'} alt />
                                </span>
                                <input type="text" placeholder="Enter URL*" className="w-100 pl-5 pr-5" disabled/>
                                <span className="remove-circle-feilds">
                                    <img className="remove-circle" src={'../../images/icon/settings/remove-circle.svg'} alt />  
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-sm-6">
                            <div className="wrapperInfo socialMediaFeildsSettings ps-relative">
                                <span className="socialMediaIconNew social-icon li">
                                    <img className="filedrgImg" src={'../../images/icon/socialMedia/linkedin.svg'} alt />
                                </span>
                                <input type="text" placeholder="Enter URL*" className="w-100 pl-5 pr-5" />
                                <span className="remove-circle-feilds">
                                    <img className="remove-circle" src={'../../images/icon/settings/remove-circle.svg'} alt />  
                                </span>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="wrapperInfo socialMediaFeildsSettings ps-relative">
                                <span className="socialMediaIconNew social-icon ig">
                                    <img className="filedrgImg" src={'../../images/icon/socialMedia/instagram.svg'} alt />
                                </span>
                                <input type="text" placeholder="Enter URL*" className="w-100 pl-5 pr-5" disabled/>
                                <span className="remove-circle-feilds">
                                    <img className="remove-circle" src={'../../images/icon/settings/remove-circle.svg'} alt />  
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="select-socialMedia-link ps-relative">
                        <p className="addNewFooterSection-btn text-right"><span>+ Add Social Media</span></p>
                        <div className="selectLinkSocial">
                            <p className="card-body-text">Add a Social Media Field : </p>
                            <div className="wrapperInfo">
                            <div className="row mb-3">
                                <div className="col-sm-12">
                                    <div className="wrapperInfo mt-3 mb-2">
                                        <select className="customArrow">
                                            <option>Agent Role</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            </div>
                            <button className="btnBlue dropdown" data-toggle="dropdown">Add Link</button>
                        </div>
                    </div>
                    <div className="row mt-4 mb-3">
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                            <div className="k-flex align-items-center justify-content-center">
                                <div className="advanceSettingHeading">
                                    <h3 className="card-title mb-0">SEO Links</h3>
                                </div>
                                <div className="information-radio pl-4 settings-radio-new">
                                    <div className="material-switch">
                                        <input id="someSwitchOptionPrimary2" name="someSwitchOption001" type="checkbox"/>
                                        <label for="someSwitchOptionPrimary2" className="label-primary"></label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-sm-6">
                            <div className="wrapperInfo">
                                <input type="text" placeholder="Social Title*" className="w-100" />
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="wrapperInfo">
                                <input type="text" placeholder="Enter Keywords" className="w-100" disabled/>
                            </div>
                        </div>
                    </div>
                    <div className="row mb50">
                    <div className="col-sm-6">
                        <div className="uploadImg advanceSettinguploadImg dragUploadImage">
                        <div className="feilds wrapperInfo">
                            <textarea type="text" className="seo-descrption w-100"></textarea>
                        </div>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="uploadImg advanceSettinguploadImg dragUploadImage">
                            <div className="feilds settingdFeilds settingdFeilds-files ">
                                <div className="dregDesign advancesettingdropdesign w-100 pt-5 text-center">
                                <input type="file" placeholder="Enter Customer Portal Base Title*" />
                                <img className="filedrgImg" src={'../../src/assets/images/icon/settings/file-drag.svg'} alt className="mb-4" />
                                <p className="card-body-text text-center">Drag &amp; Drop Or <span className="clickHereFile">Click Here</span> To Upload Your Image.</p>
                                <p className="text-mutede text-center">Upload Social Image</p>
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
                                            <span className=""><label className="containerCheckBox containerafterchecked"><input type="checkbox" /><span className="checkmark"></span></label></span>
                                            <p className="card-body-text  pl-5">Social Image Overlay Color : #000000</p>
                                        </div>
                                        <div className="right-information-radio k-flex ">
                                            <div className="information-radio pl-4 settings-radio-new">
                                                <div className="material-switch color-feilds">
                                                    <input id="someSwitchOptionPrimary" name="someSwitchOption001" type="color"/>
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

export default AdvanceSettings;