import React from 'react';
import Breadcumb from '../_layouts/breadcumb';
import {connect} from 'react-redux';
import Loader from '../_components/Loader';
import { userService } from '../_services';
import { alertActions } from '../_actions/alert.actions';
import config from 'config';




class KbSettings extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
        submitted:false,
        domainname:"",
        portalname:"",
        allowlabel:true,
        allowrating:true,
        allowsharing:true,
        allowcomment:true,
        setid:""
        }
       // this.props.match.params.cayegoryName="Knowledge Base";
    }
    handleChange=(e)=> {
        const { name, value } = e.target;
        this.setState({ [name]: value });
        
      }
      handleCheck=(e)=>{
        const { name } = e.target;
        this.setState({
         [name]: e.target.checked
        })
      }
      
      componentDidMount(){
        this.setState({ loader:!this.state.loader })
        userService.settingdetail(this.state)
        .then((response)=>{
                if(response.status == 200)
                { 
                  this.setState({ loader:!this.state.loader })
                  this.setState({ allowcomment:(response.data[0].allowcomment)?response.data[0].allowcomment:'' })
                  this.setState({ allowlabel:(response.data[0].allowlabel)?response.data[0].allowlabel:''})
                  this.setState({ allowrating:(response.data[0].allowrating)?response.data[0].allowrating:'' })
                  this.setState({ allowsharing:(response.data[0].allowsharing)?response.data[0].allowsharing:'' })
                  this.setState({ domainname:(response.data[0].domainname)?response.data[0].domainname:''})
                  this.setState({ portalname:(response.data[0].portalname)?response.data[0].portalname:'' })
                  this.setState({ setid:response.data[0].id })
                  
                  //dispatch(alertActions.apimessage(response.message));
                    // this.closecomponent();  
                    // this.setState({ loader:!this.state.loader }) 
                    // dispatch({ type: 'FolderToggle' })
                   
                }
    
        })
      }
    ngsubmit = (e) => {
        const { dispatch } = this.props;
        this.setState({ submitted: true });
        if (this.state.domainname && this.state.portalname) {
            this.setState({ loader: !this.state.loader })
            userService.profilesetting(this.state)
                .then((response) => {
                    if (response.status == 200) {
                        this.setState({ loader: !this.state.loader })
                        dispatch(alertActions.apimessage(response.message));
                        setTimeout(() => {
                            dispatch(alertActions.clear());
                        }, 3000)

                    }

                })
        }
    }
    render(){
        const {submitted,domainname,portalname,allowlabel,allowrating,allowsharing,allowcomment } = this.state;
        const {user}   =this.props.authentication;
        return(
            <div className={'page-wrapper' + (' sidebar-collapse--')} >
                {/* {<Loader />} */}

                {/* {<div className="shadow">&nbsp;</div>} */}
                {this.state.loader && <Loader />}
                <div className="container-fluid main-container">
                    <div className="centerMainContainer">
                        <Breadcumb bredcumb="Basic Settings" />
                        <div className="row">
                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                <div className="category-body pt-0">
                                    <div className="category-tiles">
                                    
                                    <div className="category-header k-flex">
                                    <div className="categoryHeaderRight">
                                                <ul>
                                                    <li ref="megaMenu">
                                                        <span className="split-btn">
                                                            <button className="btnBlue" onClick={this.ngsubmit} >
                                                            Save</button>
                                                        </span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="category-row">
                                            <div className="row">
                                                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                                    <div className="knowledgeBaseSettings pt-5 pb-5 pl-4 pr-4">
                                                    <div className="row mb-4">
                                                        <div className="col-sm-12">
                                                            <div className={'wrapperInfo ps-relative' + (submitted && !domainname ? ' has-error' : '')}>
                                                                <input type="text" placeholder="www.Appypie.com/KB" className="w-100" name="domainname" value={domainname}  onChange={this.handleChange} readOnly/>
                                                                <label htmlFor="form1" className="setting-title">Knowledge Base Domain</label>
                                                                {submitted && !domainname &&
                                                                        <div className="invalid-feedback">Base Domain is required.</div>
                                                                }
                                                                
                                                            </div>
                                                            <a style={{color: "#5085dd"}} target="_blank" href={`https://${user[0].domainname.replace(/ /g, "-")}.${config.frontendurl}`}>{`https://${user[0].domainname.replace(/ /g, "-")}.${config.frontendurl}`}</a>
                                                        </div>
                                                       
                                                    </div>
                                                    <div className="row mb-4">
                                                        <div className="col-sm-12">
                                                        <div className={'wrapperInfo ps-relative' + (submitted && !domainname ? ' has-error' : '')}>
                                                                <input type="text" placeholder="Knowledge Base Appy Pie" className="w-100" name="portalname" value={portalname} onChange={this.handleChange}/>
                                                                <label htmlFor="form1" className="setting-title">Organisation Name</label>
                                                                {submitted && !portalname &&
                                                                        <div className="invalid-feedback">Portal Name is required.</div>
                                                                }
                                                              
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                                            <div className="advanceSettingHeading">
                                                                <h4 className="card-title font-weight-normal">General</h4>
                                                            </div>
                                                        </div>
                                                    </div>
                                                      <div className="row mb-4">
                                                            <div className="col-sm-12">
                                                                <div className="wrapperInfo ps-relative ">
                                                                    <span className="radio-Feilds-Manage-span know-base-sett">
                                                                        <div className="radioFeildsProfile perfrenceInformation k-flex align-items-center justify-content-center">
                                                                        <div className="left-information-radio">
                                                                            <p className="text-mutede ">Display Labels in Help Center Portal</p>
                                                                            <p className="card-body-text color-lightgray">Customers can view labels added to your articles in the Help Center</p>
                                                                        </div>
                                                                        <div className="right-information-radio k-flex ">
                                                                            <div className="information-radio pl-4 settings-radio-new">
                                                                                <div className="material-switch">
                                                                                    <input id="someSwitchOptionPrimary" checked={this.state.allowlabel} name="allowlabel" type="checkbox" onChange={this.handleCheck}  />
                                                                                    <label htmlFor="someSwitchOptionPrimary" className="label-primary" />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        </div>
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row mb-4">
                                                            <div className="col-sm-12">
                                                                <div className="wrapperInfo ps-relative ">
                                                                    <span className="radio-Feilds-Manage-span know-base-sett">
                                                                        <div className="radioFeildsProfile perfrenceInformation k-flex align-items-center justify-content-center">
                                                                        <div className="left-information-radio">
                                                                            <p className="text-mutede ">Allow Article Ratings by Default</p>
                                                                            <p className="card-body-text color-lightgray">Users can upvote/downvote Articles</p>
                                                                        </div>
                                                                        <div className="right-information-radio k-flex ">
                                                                            <div className="information-radio pl-4 settings-radio-new">
                                                                                <div className="material-switch">
                                                                                    <input id="someSwitchOptionPrimary1" checked={this.state.allowrating} name="allowrating" type="checkbox" onChange={this.handleCheck} />
                                                                                    <label htmlFor="someSwitchOptionPrimary1" className="label-primary" />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        </div>
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row mb-4">
                                                            <div className="col-sm-12">
                                                                <div className="wrapperInfo ps-relative ">
                                                                    <span className="radio-Feilds-Manage-span know-base-sett">
                                                                        <div className="radioFeildsProfile perfrenceInformation k-flex align-items-center justify-content-center">
                                                                        <div className="left-information-radio">
                                                                            <p className="text-mutede ">Allow Articles Sharing by Default</p>
                                                                            <p className="card-body-text color-lightgray">User can share Article</p>
                                                                        </div>
                                                                        <div className="right-information-radio k-flex ">
                                                                            <div className="information-radio pl-4 settings-radio-new">
                                                                                <div className="material-switch">
                                                                                    <input id="someSwitchOptionPrimary2" checked={this.state.allowsharing} name="allowsharing" type="checkbox" onChange={this.handleCheck}/>
                                                                                    <label htmlFor="someSwitchOptionPrimary2" className="label-primary" />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        </div>
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row mb-4">
                                                            <div className="col-sm-12">
                                                                <div className="wrapperInfo ps-relative ">
                                                                    <span className="radio-Feilds-Manage-span know-base-sett">
                                                                        <div className="radioFeildsProfile perfrenceInformation k-flex align-items-center justify-content-center">
                                                                        <div className="left-information-radio">
                                                                            <p className="text-mutede ">Allow Article Commenting by Default</p>
                                                                            <p className="card-body-text color-lightgray">User can comment on a articles</p>
                                                                        </div>
                                                                        <div className="right-information-radio k-flex ">
                                                                            <div className="information-radio pl-4 settings-radio-new">
                                                                                <div className="material-switch">
                                                                                    <input id="someSwitchOptionPrimary3" checked={this.state.allowcomment} name="allowcomment" type="checkbox" onChange={this.handleCheck} />
                                                                                    <label htmlFor="someSwitchOptionPrimary3" className="label-primary" />
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
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                {/* <Helpbutton />
                {this.props.showComponent.isnotifyOpen && <NotifySidebar/>} */}
                
                {/* {this.props.showComponent.ishelpOpen && <RightPanelhelp/>} */}
            </div>
        );
    }
}

function mapStateToProps(state) {
    const showComponent   = state.toogle;
    const authentication   = state.authentication;
    return {
        showComponent,authentication
    };
}


    const connectedKbSettings = connect(mapStateToProps)(KbSettings); export {connectedKbSettings as KbSettings}