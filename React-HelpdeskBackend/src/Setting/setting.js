import React from 'react';
import {connect} from 'react-redux';
// import GenralSetting from './general-settings';
// import AdvanceSettings from './advanced-settings';
// import Customization from './customization';
// import Permissions from './permissions';
import Breadcumb from '../_layouts/breadcumb';
import ColorPickr from 'react-input-colorpicker';
import Dropzone from 'react-dropzone'
import storage from '../config/config'
import Loader from '../_components/Loader';
import { userService } from '../_services';
import { alertActions } from '../_actions/alert.actions';
import config from 'config';
import Resizer from 'react-image-file-resizer';
///import {connect} from 'react-redux';




class Settings extends React.Component{
    constructor(props) {   
        super(props);
        this.state = {
          image: null,
          url: "",
          progress: 0,
          submitted:false,
          title:"Help portal",
          description:"",
          language:"English",
          logo:"",
          knoledgebase:true,
          community:true,
          ticket:true,
          Headerlink:['Home','Knowledge Base','Community','RaiseTicket'],
          Footerlink:['Contact us','Privacy Policy','Terms & condition'],
          folderlinkurl:[],
          facebook:"",
          twitter:"",
          other:"",
          pintrest:"",
          social:false,
          organization:false,
          organtitle:"",
          organkeyword:"",
          organdescription:"",
          organlogo:"",
          imageoverlay:"#3366cc",
          themescolor:"#3366cc",
          textcolor:"#3366cc",
          headerimage:"",
          faviconimage:"",
          allowsignup:true,
          allowcaptcha:true,
          enablesearch:true,
          allowbredcumb:true,
          submitticket:"",
          articleaccess:1, 
          communityaccess:1,
          allowaction:"",
          googlescan:true,
          loader:false,
          id:"",
          font:"",
          count:60,
          fontfamily:"Roboto",
          commentaccess:1,
          voteaccess:""
        };
      }
    changeHandler=(colors)=> {
        if(colors){
       this.setState({imageoverlay:colors.color})
        }
    }
    changeHandlerthemes=(colors)=> {
        if(colors){
       this.setState({themescolor:colors.color})
        }
    }
    changeHandlertext=(colors)=> {
        if(colors){
       this.setState({textcolor:colors.color})
        }
    }
    componentDidMount(){
        this.setState({ loader:!this.state.loader })
        userService.frontendsettingdetail(this.state)
        .then((response)=>{
                console.log(response);
                if(response.status == 200)
                { 
                 console.log(response);
                  this.setState({ loader:!this.state.loader })
                  this.setState({ title:(response.data[0].title)?response.data[0].title:'' })
                  this.setState({ description:(response.data[0].description)?response.data[0].description:''})
                  this.setState({ language:(response.data[0].language)?'English':'' })
                  this.setState({ logo:(response.data[0].logo)?response.data[0].logo:'' })
                  this.setState({ knoledgebase:(response.data[0].knoledgebase)?response.data[0].knoledgebase:''})
                  this.setState({ community:(response.data[0].community)?response.data[0].community:'' })
                  this.setState({ ticket:(response.data[0].ticket)?response.data[0].ticket:'' })
                  this.setState({ Headerlink:(response.data[0].Headerlink)?response.data[0].Headerlink:''})
                  this.setState({ Footerlink:(response.data[0].Footerlink)?response.data[0].Footerlink:'' })
                  this.setState({ folderlinkurl:(response.data[0].folderlinkurl)?response.data[0].folderlinkurl:[] })
                  this.setState({ facebook:(response.data[0].facebook)?response.data[0].facebook:'' })
                  this.setState({ twitter:(response.data[0].twitter)?response.data[0].twitter:''})
                  this.setState({ other:(response.data[0].linkdin)?response.data[0].linkdin:'' })
                  this.setState({ pintrest:(response.data[0].instagram)?response.data[0].instagram:'' })
                  this.setState({ social:(response.data[0].social)?response.data[0].social:''})
                  this.setState({ organization:(response.data[0].organization)?response.data[0].organization:'' })
                  this.setState({ organtitle:(response.data[0].organtitle)?response.data[0].organtitle:'' })
                  this.setState({ organkeyword:(response.data[0].organkeyword)?response.data[0].organkeyword:''})
                  this.setState({ organdescription:(response.data[0].organdescription)?response.data[0].organdescription:'' })
                  this.setState({ organlogo:(response.data[0].organlogo)?response.data[0].organlogo:'' })
                  this.setState({ imageoverlay:(response.data[0].imageoverlay)?response.data[0].imageoverlay:''})
                  this.setState({ themescolor:(response.data[0].themescolor)?response.data[0].themescolor:'' })
                  this.setState({ headerimage:(response.data[0].headerimage)?response.data[0].headerimage:'' })
                  this.setState({ faviconimage:(response.data[0].faviconimage)?response.data[0].faviconimage:''})
                  this.setState({ allowsignup:(response.data[0].allowsignup)?response.data[0].allowsignup:'' })
                  this.setState({ allowcaptcha:(response.data[0].allowcaptcha)?response.data[0].allowcaptcha:'' })
                  this.setState({ enablesearch:(response.data[0].enablesearch)?response.data[0].enablesearch:'' })
                  this.setState({ allowbredcumb:(response.data[0].allowbredcumb)?response.data[0].allowbredcumb:''})
                  this.setState({ submitticket:(response.data[0].submitticket)?response.data[0].submitticket:'' })
                  this.setState({ articleaccess:(response.data[0].articleaccess)?response.data[0].articleaccess:1 })
                  this.setState({ communityaccess:(response.data[0].communityaccess)?response.data[0].communityaccess:1})
                  this.setState({ allowaction:(response.data[0].allowaction)?response.data[0].allowaction:'' })
                  this.setState({ googlescan:(response.data[0].googlescan)?response.data[0].googlescan:'' })
                  this.setState({ id:response.data[0].id })
                  this.setState({ count:(response.data[0].description)?response.data[0].description.split(' ').length:60})
                  this.setState({ fontfamily:(response.data[0].fontFamily)?response.data[0].fontFamily:'Roboto'})
                  this.setState({ commentaccess:(response.data[0].commentaccess)?response.data[0].commentaccess:1 })
                  this.setState({ voteaccess:(response.data[0].voteaccess)?response.data[0].voteaccess:1 })
                //   console.log(this.state);
                  
                  //dispatch(alertActions.apimessage(response.message));
                    // this.closecomponent();  
                    // this.setState({ loader:!this.state.loader }) 
                    // dispatch({ type: 'FolderToggle' })
                   
                }
    
        })
      }
    
    onDrop = (acceptedFiles,e) => {
        if (acceptedFiles) {
            const image = acceptedFiles[0];
            const metadata = {
                contentType: image.type
              };
              Resizer.imageFileResizer(
                event.target.files[0],
                150,
                150,
                'PNG',
                100,
                0,
                uri => {
                    console.log(uri)
                    const randomId = Math.random().toString(36).substring(2)+"_logo";
                    const uploadTask = storage.ref().child(`logo/${randomId}`).put(uri,metadata);
                            uploadTask.on(
                            "state_changed",
                            snapshot => {
                                // progress function ...
                                console.log("asasas");
                                const progress = Math.round(
                                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                                );
                                console.log(progress);
                            },
                            error => {
                                // Error function ...
                                console.log("1212121asasas");
                                console.log(error);
                            },
                            () => {
                                // complete function ...
                                storage
                                .ref("logo")
                                .child(randomId)
                                .getDownloadURL()
                                .then(url => {
                                    console.log(url)
                                    this.setState({ logo:url });
                                });
                            }
                            );
                },
                'blob'
            );
             
            
            this.setState(() => ({ image }));
          }
      }
      onDroporganization = (acceptedFiles,e) => {
        if (acceptedFiles) {
            const image = acceptedFiles[0];
            const metadata = {
                contentType: image.type
              };
              console.log(image);
              const randomId = Math.random().toString(36).substring(2)+"_logo";
            const uploadTask = storage.ref().child(`logo/${randomId}`).put(image,metadata);
                    uploadTask.on(
                    "state_changed",
                    snapshot => {
                        // progress function ...
                        console.log("asasas");
                        const progress = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                        );
                        console.log(progress);
                    },
                    error => {
                        // Error function ...
                        console.log("1212121asasas");
                        console.log(error);
                    },
                    () => {
                        // complete function ...
                        storage
                        .ref("logo")
                        .child(randomId)
                        .getDownloadURL()
                        .then(url => {
                            console.log(url)
                            this.setState({ organlogo:url });
                        });
                    }
                    );
            
            this.setState(() => ({ image }));
          }
      }
      onDropheader = (acceptedFiles,e) => {
        if (acceptedFiles) {
            const image = acceptedFiles[0];
            const metadata = {
                contentType: image.type
              };
              console.log(image);
              const randomId = Math.random().toString(36).substring(2)+"_logo";
            const uploadTask = storage.ref().child(`logo/${randomId}`).put(image,metadata);
                    uploadTask.on(
                    "state_changed",
                    snapshot => {
                        // progress function ...
                        console.log("asasas");
                        const progress = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                        );
                        console.log(progress);
                    },
                    error => {
                        // Error function ...
                        console.log("1212121asasas");
                        console.log(error);
                    },
                    () => {
                        // complete function ...
                        storage
                        .ref("logo")
                        .child(randomId)
                        .getDownloadURL()
                        .then(url => {
                            console.log(url)
                            this.setState({ headerimage:url });
                        });
                    }
                    );
            
            this.setState(() => ({ image }));
          }
      }
      onDropfavicon = (acceptedFiles,e) => {
        if (acceptedFiles) {
            const image = acceptedFiles[0];
            const metadata = {
                contentType: image.type
              };
              console.log(image);
              const randomId = Math.random().toString(36).substring(2)+"_logo";
            const uploadTask = storage.ref().child(`logo/${randomId}`).put(image,metadata);
                    uploadTask.on(
                    "state_changed",
                    snapshot => {
                        // progress function ...
                        console.log("asasas");
                        const progress = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                        );
                        console.log(progress);
                    },
                    error => {
                        // Error function ...
                        console.log("1212121asasas");
                        console.log(error);
                    },
                    () => {
                        // complete function ...
                        storage
                        .ref("logo")
                        .child(randomId)
                        .getDownloadURL()
                        .then(url => {
                            console.log(url)
                            this.setState({ faviconimage:url });
                        });
                    }
                    );
            
            this.setState(() => ({ image }));
          }
      }
      
      handleChange=(e)=> {
        if(e.target.name == 'description'){
        this.setState({count:61-e.target.value.split(' ').length})
            if(e.target.value.split(' ').length > 60)
            return false;
        }
        
        const { name, value } = e.target;
        this.setState({ [name]: value });
        
      }
      handlepush=(index, e)=>{
        const { folderlinkurl } = this.state;
        console.log(this.state);
        folderlinkurl.splice(index, 1, e.target.value)
        this.setState({ folderlinkurl: [...folderlinkurl] }, () => {
          console.log(this.state.folderlinkurl)
        });
      }
      handleCheck=(e)=>{
            e.preventDefault();
        const { name } = e.target;
        this.setState({
         [name]: e.target.checked
        })
      }
      
      ngsubmit=()=>{
        const { dispatch } = this.props;
        this.setState({ submitted: true });
            this.setState({ loader: !this.state.loader })
            userService.frontendsetting(this.state)
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
      _handleChange=(index, e)=> {
        const { Headerlink } = this.state;
        Headerlink.splice(index, 1, e.target.value)
        this.setState({ Headerlink: [...Headerlink] }, () => {
          console.log(this.state.Headerlink)
        });
      }
      _handleChangefooter=(index, e)=> {
        const { Footerlink } = this.state;
        Footerlink.splice(index, 1, e.target.value)
        this.setState({ Footerlink: [...Footerlink] }, () => {
          console.log(this.state.Footerlink)
        });
      }
    
    render(){
        const data   =JSON.parse(localStorage.getItem('user'));
        const {submitted,title,description,language,logo,knoledgebase,community,ticket,folderlinkurl,Headerlink,Footerlink,facebook,twitter,other,pintrest} = this.state;
        return(
            <div className="page-wrapper">
            {this.state.loader && <Loader />}
                <div className="container-fluid main-container">
                    <div className="centerMainContainer">
                    <Breadcumb bredcumb="Help Portal Settings" />
                        <div className="row">
                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                <div className="category-body pt-4">
                                    <div className="category-tiles">
                                        <div className="custome-row all-app-row">
                                            <div className="row">
                                                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                                    <div classname="custome-tabs-knowledgeBase settings settings-Upbtn-Blue">
                                                        <div className="knowledgeBase-tabs app-tabs">
                                                            <ul className="nav nav-tabs card-header-tabs" id="myTab" role="tablist">
                                                                <li className="nav-item" onClick={this.tabsClick}>
                                                                    <a className="nav-link active" id="one-tab" data-toggle="tab" href="#one" role="tab" aria-controls="One" aria-selected="true">General Settings</a>
                                                                </li>
                                                                <li className="nav-item">
                                                                    <a className="nav-link" id="two-tab" data-toggle="tab" href="#two" role="tab" aria-controls="Two" aria-selected="false">Advanced Settings</a>
                                                                </li>
                                                                <li className="nav-item">
                                                                    <a className="nav-link" id="three-tab" data-toggle="tab" href="#three" role="tab" aria-controls="three" aria-selected="false">Customization</a>
                                                                </li>
                                                                <li className="nav-item">
                                                                    <a className="nav-link" id="four-tab" data-toggle="tab" href="#four" role="tab" aria-controls="four" aria-selected="false">Permissions</a>
                                                                </li>
                                                                <div className="categoryHeaderRight categoryHeaderRight-Seetings">
                                                                    <ul>
                                                                       
                                                                        <li>
                                                                            <button className="btnBlue dropdown" onClick={this.ngsubmit} >Save</button>
                                                                        </li>
                                                                        <li>
                                                                            <a className="btnWhite dropdown icon-with-text" href={`https://${data[0].domainname.replace(/ /g, "-")}.${config.frontendurl}`} target="_blank">
                                                                                <svg xmlns="http://www.w3.org/2000/svg" width="18.941"
                                                                                    height="18.941" viewBox="0 0 18.941 18.941">
                                                                                    <g id="Group_1790" data-name="Group 1790"
                                                                                        transform="translate(0.4 0.4)">
                                                                                        <path id="Path_1524" data-name="Path 1524"
                                                                                            d="M162.891,0h-4.71a.472.472,0,1,0,0,.945h3.577l-9.189,9.277a.472.472,0,1,0,.671.665l9.179-9.266V5.182a.472.472,0,1,0,.945,0V.472A.472.472,0,0,0,162.891,0Zm0,0"
                                                                                            transform="translate(-145.223)" fill="#eff3ff"
                                                                                            stroke="#a2abd1" strokeWidth="0.8" />
                                                                                        <path id="Path_1525" data-name="Path 1525"
                                                                                            d="M15.313,57.641a.472.472,0,0,0-.472.472v5.173A1.419,1.419,0,0,1,13.423,64.7H2.362A1.419,1.419,0,0,1,.945,63.286V52.225a1.419,1.419,0,0,1,1.417-1.417H7.535a.472.472,0,1,0,0-.945H2.362A2.365,2.365,0,0,0,0,52.225V63.286a2.365,2.365,0,0,0,2.362,2.362H13.423a2.365,2.365,0,0,0,2.362-2.362V58.113A.472.472,0,0,0,15.313,57.641Zm0,0"
                                                                                            transform="translate(0 -47.508)" fill="#eff3ff"
                                                                                            stroke="#a2abd1" strokeWidth="0.8" />
                                                                                    </g>
                                                                                </svg>
                                                                                <span className="pl-2">View Help Portal</span>
                                                                            </a>
                                                                            
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            </ul>
                                                        </div>


                                                        <div className="tab-content" id="myTabContent">
                                                            {/* <GenralSetting />
                                                            <AdvanceSettings /> 
                                                             <Customization /> 
                                                            <Permissions />  */}
                                                            <div className="tab-pane fade show active" id="one" role="tabpanel" aria-labelledby="one-tab">
                                                                <div className="customeTabsContent settings-Feilds">
                                                                    <div className="row mb-4">
                                                                        <div className="col-sm-6">
                                                                            <div className="wrapperInfo ps-relative">
                                                                                <input type="text" placeholder="First Name*" className="w-100" value={title} name="title" placeholder="Enter here example - Welcome to Appy Pie Help Portal" onChange={this.handleChange}/>
                                                                                <label for="form1" className="setting-title">Help Portal Title Text*</label>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-sm-6">
                                                                            <div className="wrapperInfo ps-relative">
                                                                            <div style={{float: 'right',fontSize: '12px',position: 'absolute',top: '-20px',right: '0'}}>{this.state.count} Words</div>
                                                                                <input type="text" className="w-100" name="description" value={description} onChange={this.handleChange}
                                                                                name="description" placeholder="Enter Description (60 Words)" />
                                                                                <label for="form1" className="setting-title">Help Portal description Text</label>
                                                                                
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="row mb-4">
                                                                        <div className="col-sm-6">
                                                                            <div className="wrapperInfo ps-relative">
                                                                                <input type="text"  className="w-100" placeholder="English" readOnly value={language}
                                                                                onChange={this.handleChange} name="language" />
                                                                                <label for="form1" className="setting-title">Default Language</label>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-sm-6">
                                                                            <div className="wrapperInfo ps-relative">
                                                                                <div className="dregDesign advancesettingdropdesign settingdFeilds mb-0" style={{ 'minHeight': 'auto' }}>
                                                                                   
                                                                                    <div className="uploadLogoContent">
                                                                                        <p>Upload Logo : </p>
                                                                                    </div>
                                                                                    <div className="uplloadLogoRight">
                                                                                        {(this.state.logo)?<img className="filedrgImg" src={`${this.state.logo}`} alt="" />:<img className="filedrgImg" src={`${config.path}/src/assets/images/icon/settings/file-drag.svg`} alt="" />}
                                                                                        <Dropzone
                                                                                            onDrop={this.onDrop}
                                                                                            accept="image/*"
                                                                                            minSize={0}
                                                                                            maxSize={1048576}
                                                                                        >
                                                                                            {({ getRootProps, getInputProps, isDragActive, isDragReject, rejectedFiles }) => {
                                                                                                const isFileTooLarge = rejectedFiles.length > 0 && rejectedFiles[0].size > 1048576;
                                                                                                return (
                                                                                                    <div {...getRootProps()}>
                                                                                                        <input {...getInputProps()} />
                                                                                                        {!isDragActive && <p><span className="clickHereFile">Click Here</span><small>(Upto 5 MB of .png, .jpg, & .gif formats allowed)</small></p>}
                                                                                                        {isDragActive && !isDragReject && "Drop it like it's hot!"}
                                                                                                        {isDragReject && "File type not accepted, sorry!"}
                                                                                                        {isFileTooLarge && (
                                                                                                            <div className="text-danger mt-2">
                                                                                                                File is too large.
                                                                                                            </div>
                                                                                                        )}
                                                                                                    </div>
                                                                                                )
                                                                                            }
                                                                                            }
                                                                                        </Dropzone>
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
                                                                                                    <input id="someSwitchOptionPrimary" name="knoledgebase" type="checkbox" checked={this.state.knoledgebase} disabled onChange={this.handleCheck}/>
                                                                                                    <label for="someSwitchOptionPrimary" className="label-primary"></label><span className="card-body-text pl-3">Knowledge Base</span>
                                                                                                </div>
                                                                                            </div>
                                                                                            {/* <div className="information-radio pl-4 settings-radio-new">
                                                                                                <div className="material-switch">
                                                                                                    <input id="someSwitchOptionPrimary1" name="community" checked={this.state.community} onChange={this.handleCheck} type="checkbox" />
                                                                                                    <label for="someSwitchOptionPrimary1" className="label-primary"></label><span className="card-body-text pl-3">Community</span>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="information-radio pl-4 settings-radio-new">
                                                                                                <div className="material-switch">
                                                                                                    <input id="someSwitchOptionPrimary2" name="ticket" checked={this.state.ticket} onChange={this.handleCheck} type="checkbox" />
                                                                                                    <label for="someSwitchOptionPrimary2" className="label-primary"></label><span className="card-body-text pl-3">Raise a Ticket</span>
                                                                                                </div>
                                                                                            </div> */}
                                                                                        </div>
                                                                                    </div>
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                    </div>





                                                                </div>
                                                            </div>
                                                            <div className="tab-pane fade" id="two" role="tabpanel" aria-labelledby="two-tab">
                                                                <div className="customeTabsContent settings-Feilds">
                                                                    <div className="row">
                                                                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                                                            <div className="advanceSettingHeading">
                                                                                <h4 className="card-title mb-3 font-weight-normal">Header Section</h4>
                                                                                <h5 className="card-title ">Header Links</h5>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                 {/* <div className="row mb-3">
                                                                        <div className="col-sm-6">
                                                                            <div className="wrapperInfo">
                                                                                <input type="text" placeholder="Home" className="w-100" onChange={(e) => { this._handleChange(0, e) }} value={Headerlink[0]}/>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-sm-6">
                                                                            <div className="wrapperInfo">
                                                                                <input type="text" placeholder="https://www.appypie.com/how-to-create-an-app" className="w-100" value={`${config.frontendurl}${data[0].domainname.replace(/ /g, '-')}`} disabled />
                                                                            </div>
                                                                        </div>
                                                                    </div> */}
                                                                    <div className="row mb-3">
                                                                        <div className="col-sm-6">
                                                                            <div className="wrapperInfo">
                                                                                <input type="text" placeholder="Knowledge Base" className="w-100" onChange={(e) => { this._handleChange(1, e) }} value={Headerlink[1]}/>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-sm-6">
                                                                            <div className="wrapperInfo">
                                                                                <input type="text" placeholder="https://www.appypie.com/how-to-create-an-app" className="w-100" value={`${config.frontendurl}${data[0].domainname.replace(/ /g, '-')}`} disabled />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    {/* <div className="row mb-3">
                                                                        <div className="col-sm-6">
                                                                            <div className="wrapperInfo">
                                                                                <input type="text" placeholder="Community" className="w-100" onChange={(e) => { this._handleChange(2, e) }} value={Headerlink[2]}/>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-sm-6">
                                                                            <div className="wrapperInfo">
                                                                                <input type="text" placeholder="https://www.appypie.com/how-to-create-an-app" className="w-100" disabled />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="row mb-3">
                                                                        <div className="col-sm-6">
                                                                            <div className="wrapperInfo">
                                                                                <input type="text" placeholder="Raise a Ticket" className="w-100" onChange={(e) => { this._handleChange(3, e) }} value={Headerlink[3]}/>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-sm-6">
                                                                            <div className="wrapperInfo">
                                                                                <input type="text" placeholder="https://www.appypie.com/how-to-create-an-app" className="w-100" disabled />
                                                                            </div>
                                                                        </div>
                                                                    </div> */}
                                                                    <div className="row mt-5 mb-3">
                                                                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                                                            <div className="advanceSettingHeading">
                                                                                <h4 className="card-title mb-3 font-weight-normal">Footer Section</h4>
                                                                                <h5 className="card-title ">Footer Links</h5>
                                                                               {/* <p className="card-body-text">Set Lorem Ipsum is simply dummy text of the printing and typesetting industry. </p>*/}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="row mb-3">
                                                                        <div className="col-sm-6">
                                                                            <div className="wrapperInfo">
                                                                                <input type="text" placeholder="Contact Us" className="w-100" onChange={(e) => { this._handleChangefooter(0, e) }} value={Footerlink[0]}/>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-sm-6">
                                                                            <div className="wrapperInfo">
                                                                                <input type="text" placeholder="Paste URL" className="w-100" onChange={(e) => { this.handlepush(0, e) }} value={folderlinkurl[0]} />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="row mb-3">
                                                                        <div className="col-sm-6">
                                                                            <div className="wrapperInfo">
                                                                                <input type="text" placeholder="Privacy Policy" className="w-100" onChange={(e) => { this._handleChangefooter(1, e) }} value={Footerlink[1]}/>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-sm-6">
                                                                            <div className="wrapperInfo">
                                                                                <input type="text" placeholder="Paste URL" className="w-100" onChange={(e) => { this.handlepush(1, e) }} value={folderlinkurl[1]} />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="row mb-3">
                                                                        <div className="col-sm-6">
                                                                            <div className="wrapperInfo">
                                                                                <input type="text" placeholder="Terms and Condition" className="w-100" onChange={(e) => { this._handleChangefooter(2, e) }} value={Footerlink[2]}/>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-sm-6">
                                                                            <div className="wrapperInfo">
                                                                                <input type="text" placeholder="Paste URL" className="w-100" onChange={(e) => { this.handlepush(2, e) }} value={folderlinkurl[2]} />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                     {/* <p className="addNewFooterSection-btn text-right"><span>+ Add New</span></p>  */}
                                                                    <div className="row mt-5 mb-3">
                                                                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                                                            <div className="k-flex align-items-center justify-content-center">
                                                                                <div className="advanceSettingHeading">
                                                                                    <h4 className="card-title mb-1 font-weight-normal">Social Media Links</h4>
                                                                                </div>
                                                                                <div className="information-radio pl-4 settings-radio-new">
                                                                                    <div className="material-switch">
                                                                                        <input id="someSwitchOptionPrimary21" name="social" type="checkbox" checked={this.state.social} onChange={this.handleCheck} />
                                                                                        <label for="someSwitchOptionPrimary21" className="label-primary"></label>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className={"row mb-3 "+(!this.state.social?'d-none':'') } >
                                                                        <div className="col-sm-6">
                                                                            <div className="wrapperInfo socialMediaFeildsSettings ps-relative">
                                                                                <span className="socialMediaIconNew social-icon fb">
                                                                                    <img className="filedrgImg" src={`${config.path}/images/icon/socialMedia/facebook-logo.svg`} alt />
                                                                                </span>
                                                                                <input type="text" placeholder="Enter URL*" className="w-100 pl-5 pr-5" name="facebook" value={facebook} onChange={this.handleChange}/>
                                                                                <span className="remove-circle-feilds">
                                                                                    <img className="remove-circle" src={`${config.path}/images/icon/settings/remove-circle.svg`} alt />
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-sm-6">
                                                                            <div className="wrapperInfo socialMediaFeildsSettings ps-relative">
                                                                                <span className="socialMediaIconNew social-icon tw">
                                                                                    <img className="filedrgImg" src={`${config.path}/images/icon/socialMedia/twitter.svg`} alt />
                                                                                </span>
                                                                                <input type="text" placeholder="Enter URL*" className="w-100 pl-5 pr-5" name="twitter" value={twitter} onChange={this.handleChange} />
                                                                                <span className="remove-circle-feilds">
                                                                                    <img className="remove-circle" src={`${config.path}/images/icon/settings/remove-circle.svg`} alt />
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className={"row mb-3 "+(!this.state.social?'d-none':'') }>
                                                                        <div className="col-sm-6">
                                                                            <div className="wrapperInfo socialMediaFeildsSettings ps-relative">
                                                                                <span className="socialMediaIconNew social-icon li">
                                                                                    <img className="filedrgImg" src={`${config.path}/images/icon/socialMedia/linkedin.svg`} alt />
                                                                                </span>
                                                                                <input type="text" placeholder="Enter URL*" className="w-100 pl-5 pr-5" name="other" value={other} onChange={this.handleChange}/>
                                                                                <span className="remove-circle-feilds">
                                                                                    <img className="remove-circle" src={`${config.path}/images/icon/settings/remove-circle.svg`} alt />
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-sm-6">
                                                                            <div className="wrapperInfo socialMediaFeildsSettings ps-relative">
                                                                                <span className="socialMediaIconNew social-icon ig">
                                                                                    <img className="filedrgImg" src={`${config.path}/images/icon/socialMedia/instagram.svg`} alt />
                                                                                </span>
                                                                                <input type="text" placeholder="Enter URL*" className="w-100 pl-5 pr-5" name="pintrest" value={pintrest} onChange={this.handleChange} />
                                                                                <span className="remove-circle-feilds">
                                                                                    <img className="remove-circle" src={`${config.path}/images/icon/settings/remove-circle.svg`} alt />
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    {/* <div className="select-socialMedia-link ps-relative">
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
                                                                    </div> */}
                                                                    <div className="row mt-3 mb-3">
                                                                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                                                            <div className="k-flex align-items-center justify-content-center d-none ">
                                                                                <div className="advanceSettingHeading">
                                                                                    <h4 className="card-title mb-0 font-weight-normal">Organization details</h4>
                                                                                </div>
                                                                                <div className="information-radio pl-4 settings-radio-new">
                                                                                    <div className="material-switch">
                                                                                    <input id="someSwitchOptionPrimary22" name="organization" type="checkbox" checked={this.state.organization} onChange={this.handleCheck} />
                                                                                        <label for="someSwitchOptionPrimary22" className="label-primary"></label>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className={"row mb-3 "+(!this.state.organization?'d-none':'') }>
                                                                        <div className="col-sm-6">
                                                                            <div className="wrapperInfo">
                                                                                <input type="text" placeholder="Organization Title*" className="w-100" name="organtitle" value={this.state.organtitle} onChange={this.handleChange}/>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-sm-6">
                                                                              {/*<div className="wrapperInfo">
                                                                                <input type="text" placeholder="Enter Keywords" className="w-100" name="organkeyword" value={this.state.organkeyword} onChange={this.handleChange} />
                                                                            </div>*/}
                                                                        </div>
                                                                    </div>
                                                                    <div className={"row mb-3 "+(!this.state.organization?'d-none':'') }>
                                                                        <div className="col-sm-6">
                                                                            <div className="uploadImg advanceSettinguploadImg dragUploadImage">
                                                                                <div className="feilds wrapperInfo">
                                                                                    <textarea type="text" className="seo-descrption w-100" name="organdescription" placeholder="Organization Description" onChange={this.handleChange} value={this.state.organdescription}>{this.state.organdescription}</textarea>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-sm-6">
                                                                            <div className="uploadImg advanceSettinguploadImg dragUploadImage">
                                                                                <div className="feilds settingdFeilds settingdFeilds-files ">
                                                                                    <div className="dregDesign advancesettingdropdesign w-100 pt-5 text-center">
                                                                                        {(this.state.organlogo)?<img className="filedrgImg" src={`${this.state.organlogo}`} alt="" />:<img className="filedrgImg" src={`${config.path}/src/assets/images/icon/settings/file-drag.svg`} alt="" />}
                                                                                        <Dropzone
                                                                                            onDrop={this.onDroporganization}
                                                                                            accept="image/*"
                                                                                            minSize={0}
                                                                                            maxSize={1048576}
                                                                                        >
                                                                                            {({ getRootProps, getInputProps, isDragActive, isDragReject, rejectedFiles }) => {
                                                                                                const isFileTooLarge = rejectedFiles.length > 0 && rejectedFiles[0].size > 1048576;
                                                                                                return (
                                                                                                    <div {...getRootProps()} className="pt-4">
                                                                                                        <input {...getInputProps()} />
                                                                                                        {!isDragActive &&  <p className="card-body-text text-center">Drag &amp; Drop Or <span className="clickHereFile">Click Here</span> To Upload Your Image.</p>}
                                                                                                        {!isDragActive &&  <p className="card-body-text text-center"><span className="support-file-drag">(Only PNG, JPG and GIF are supported up to a max file size of 5MB)</span></p>}
                                                                                                        {isDragActive && !isDragReject && "Drop it like it's hot!"}
                                                                                                        {isDragReject && "File type not accepted, sorry!"}
                                                                                                        {isFileTooLarge && (
                                                                                                            <div className="text-danger mt-2">
                                                                                                                File is too large.
                                                                                                            </div>
                                                                                                        )}
                                                                                                    </div>
                                                                                                )
                                                                                            }
                                                                                            }
                                                                                        </Dropzone>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className={"row mb-4 "+(!this.state.organization?'d-none':'') }>
                                                                        <div className="col-sm-12">
                                                                            <div className="wrapperInfo ps-relative">
                                                                                <span className="radio-Feilds-Manage-span">
                                                                                    <div className="radioFeildsProfile perfrenceInformation k-flex align-items-center justify-content-center">
                                                                                        <div className="left-information-radio">
                                                                                            <span className=""><label className="containerCheckBox containerafterchecked"><input type="checkbox" /><span className="checkmark"></span></label></span>
                                                                                            <p className="card-body-text  pl-5">Social Image Overlay Color : {this.state.imageoverlay}</p>
                                                                                        </div>
                                                                                        <div className="right-information-radio k-flex ">
                                                                                            <div className="information-radio pl-4 settings-radio-new">
                                                                                                <div className="material-switch color-feilds">
                                                                                                <ColorPickr
                                                                                                        color={this.state.imageoverlay}
                                                                                                        onChange={this.changeHandler}
                                                                                                        name="imageoverlay"
                                                                                                        mode='RGB'
                                                                                                    />
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
                                                            <div className="tab-pane fade" id="three" role="tabpanel" aria-labelledby="three-tab">
                                                                <div className="customeTabsContent settings-Feilds">
                                                                    <div className="row mb-4">
                                                                        <div className="col-sm-6">
                                                                            <div className="wrapperInfo ps-relative">
                                                                                <span className="radio-Feilds-Manage-span">
                                                                                    <div className="radioFeildsProfile perfrenceInformation k-flex align-items-center justify-content-center ps-relative">
                                                                                        <div className="left-information-radio color-feilds-titles">
                                                                                            <p className="card-body-text">{this.state.themescolor}</p>
                                                                                            <label for="form1" className="setting-title">Choose Theme Color</label>
                                                                                        </div>
                                                                                        <div className="right-information-radio k-flex ">
                                                                                            <div className="information-radio pl-4 settings-radio-new">
                                                                                                <div className="material-switch color-feilds">

                                                                                                    {/* <input id="someSwitchOptionPrimary" name="someSwitchOption001" type="color" onChange={this.getcolor} /> */}
                                                                                                    <ColorPickr
                                                                                                    color={this.state.themescolor}
                                                                                                        onChange={this.changeHandlerthemes}
                                                                                                        mode='RGB'
                                                                                                    />
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                                                                            <div className="wrapperInfo ps-relative">
                                                                                <select className="customArrow" name="fontfamily" onChange={this.handleChange}>
                                                                                    <option value="Roboto" selected={(this.state.fontfamily == 'Roboto')?'selected':''}>Roboto</option>
                                                                                    <option value="Calibri" selected={(this.state.fontfamily == 'Calibri')?'selected':''}>Calibri</option>
                                                                                    <option value="Arial" selected={(this.state.fontfamily == 'Arial')?'selected':''}>Arial</option>
                                                                                    <option value="Times New Roman" selected={(this.state.fontfamily == 'Times New Roman')?'selected':''}>Times New Roman</option>
                                                                                    <option value="Verdana" selected={(this.state.fontfamily == 'Verdana')?'selected':''}>Verdana</option>
                                                                                    <option value="Georgia" selected={(this.state.fontfamily == 'Georgia')?'selected':''}>Georgia</option>   
                                                                                 
                                                                                </select>
                                                                                <label for="form1" className="setting-title">Choose Font Style</label>
                                                                            </div>
                                                                        </div>
                                                                        {/*<div className="col-sm-6">
                                                                            <div className="wrapperInfo ps-relative">
                                                                                <span className="radio-Feilds-Manage-span">
                                                                                    <div className="radioFeildsProfile perfrenceInformation k-flex align-items-center justify-content-center ps-relative">
                                                                                        <div className="left-information-radio color-feilds-titles">
                                                                                            <p className="card-body-text ">{this.state.textcolor}</p>
                                                                                            <label for="form1" className="setting-title">Choose Header text Color</label>
                                                                                        </div>
                                                                                        <div className="right-information-radio k-flex ">
                                                                                            <div className="information-radio pl-4 settings-radio-new">
                                                                                                <div className="material-switch color-feilds">
                                                                                                   
                                                                                                    <ColorPickr
                                                                                                    color={this.state.textcolor}
                                                                                                        onChange={this.changeHandlertext}
                                                                                                        mode='RGB'
                                                                                                    />
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </span>
                                                                            </div>
                                                                        </div>*/}
                                                                    </div>
                                                                    <div className="row mb-3">
                                                                    
                                                                        {/*<div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                                                                            <div className="uploadImg advanceSettinguploadImg dragUploadImage">
                                                                                <label>Upload Header Image :</label>
                                                                                <div className="feilds settingdFeilds">
                                                                                    <div className="dregDesign advancesettingdropdesign w-100" style={{ "minHeight": "auto", "max-height": "auto", }}>
                                                                                        {(this.state.headerimage)?<img className="filedrgImg" src={`${this.state.headerimage}`} alt="" />:<img className="filedrgImg" src={`${config.path}/src/assets/images/icon/settings/file-drag.svg`} alt="" />}
                                                                                        <Dropzone
                                                                                            onDrop={this.onDropheader}
                                                                                            accept="image/*"
                                                                                            minSize={0}
                                                                                            maxSize={1048576}
                                                                                        >
                                                                                            {({ getRootProps, getInputProps, isDragActive, isDragReject, rejectedFiles }) => {
                                                                                                const isFileTooLarge = rejectedFiles.length > 0 && rejectedFiles[0].size > 1048576;
                                                                                                return (
                                                                                                    <div {...getRootProps()}>
                                                                                                        <input {...getInputProps()} />
                                                                                                        {!isDragActive && <p>Drag &amp; Drop Or <span>Click Here</span> To Upload Your Logo.</p>}
                                                                                                        {isDragActive && !isDragReject && "Drop it like it's hot!"}
                                                                                                        {isDragReject && "File type not accepted, sorry!"}
                                                                                                        {isFileTooLarge && (
                                                                                                            <div className="text-danger mt-2">
                                                                                                                File is too large.
                                                </div>
                                                                                                        )}
                                                                                                    </div>
                                                                                                )
                                                                                            }
                                                                                            }
                                                                                        </Dropzone>
                                                                                    </div>
                                                                                    <p className="drgNote"><strong>Note</strong> : Aspect Ratio should be 16:1 and should not exceed 2.5 mb data as well.</p>
                                                                                </div>
                                                                            </div>
                                                                        </div> */}
                                                                    </div>
                                                                    <div className="row mb-3">
                                                                
                                                                        {/* <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                                                                            <div className="uploadImg advanceSettinguploadImg dragUploadImage">
                                                                                <label>Upload Favicon Image :</label>
                                                                                <div className="feilds settingdFeilds">
                                                                                    <div className="dregDesign advancesettingdropdesign w-100" style={{ "minHeight": "auto", "max-height": "auto", }}>
                                                                                       
                                                                                    {(this.state.faviconimage)?<img className="filedrgImg" src={`${this.state.faviconimage}`} alt="" />:<img className="filedrgImg" src={`${config.path}/src/assets/images/icon/settings/file-drag.svg`} alt="" />}
                                                                                        
                                                                                        <Dropzone
                                                                                            onDrop={this.onDropfavicon}
                                                                                            accept="image/*"
                                                                                            minSize={0}
                                                                                            maxSize={1048576}
                                                                                        >
                                                                                            {({ getRootProps, getInputProps, isDragActive, isDragReject, rejectedFiles }) => {
                                                                                                const isFileTooLarge = rejectedFiles.length > 0 && rejectedFiles[0].size > 1048576;
                                                                                                return (
                                                                                                    <div {...getRootProps()}>
                                                                                                        <input {...getInputProps()} />
                                                                                                        {!isDragActive && <p>Drag &amp; Drop Or <span>Click Here</span> To Upload Your Logo.</p>}
                                                                                                        {isDragActive && !isDragReject && "Drop it like it's hot!"}
                                                                                                        {isDragReject && "File type not accepted, sorry!"}
                                                                                                        {isFileTooLarge && (
                                                                                                            <div className="text-danger mt-2">
                                                                                                                File is too large.
                                                </div>
                                                                                                        )}
                                                                                                    </div>
                                                                                                )
                                                                                            }
                                                                                            }
                                                                                        </Dropzone>
                                                                                    </div>
                                                                                    <p className="drgNote"><strong>Note</strong> : Aspect Ratio should be 16:1 and should not exceed 2.5 mb data as well.</p>
                                                                                    {/* <Dropzone 
        onDrop={this.onDrop}
        accept="image/png"
        minSize={0}
        maxSize={1048576}
      >
        {({getRootProps, getInputProps, isDragActive, isDragReject, rejectedFiles}) => {
          const isFileTooLarge = rejectedFiles.length > 0 && rejectedFiles[0].size > 1048576;
          return (
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              {!isDragActive && 'Click here or drop a file to upload!'}
              {isDragActive && !isDragReject && "Drop it like it's hot!"}
              {isDragReject && "File type not accepted, sorry!"}
              {isFileTooLarge && (
                <div className="text-danger mt-2">
                  File is too large.
                </div>
              )}
            </div>
          )}
        }
      </Dropzone> */}
                                                                                {/* </div>
                                                                            </div>
                                                                        </div> */}
                                                                    </div>

                                                                </div>
                                                            </div>
                                                            <div className="tab-pane fade" id="four" role="tabpanel" aria-labelledby="four-tab">
                                                                <div className="customeTabsContent settings-Feilds">
                                                                    <div className="row d-none">
                                                                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                                                            <div className="advanceSettingHeading">
                                                                                <h4 className="card-title mb-1 font-weight-normal">User Signup & Login</h4>
                                                                            </div>
                                                                        </div>
                                                                    </div> 
                                                                  <div className="row mb-4 d-none">
                                                                        <div className="col-sm-6">
                                                                            <div className="wrapperInfo ps-relative">
                                                                                <span className="radio-Feilds-Manage-span">
                                                                                    <div className="radioFeildsProfile perfrenceInformation k-flex align-items-center justify-content-center">
                                                                                        <div className="left-information-radio">
                                                                                            <p className="card-body-text">Enable User Login / Signup</p>
                                                                                        </div>
                                                                                        <div className="right-information-radio k-flex ">
                                                                                            <div className="information-radio pl-4 settings-radio-new">
                                                                                                <div className="material-switch">
                                                                                                     <input id="someSwitchOptionPrimary01" checked={this.state.allowsignup} name="allowsignup" type="checkbox" onChange={this.handleCheck}  />
                                                                                                   
                                                                                                    <label for="someSwitchOptionPrimary01" className="label-primary"></label>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-sm-6">
                                                                            <div className="wrapperInfo ps-relative">
                                                                                <span className="radio-Feilds-Manage-span">
                                                                                    <div className="radioFeildsProfile perfrenceInformation k-flex align-items-center justify-content-center">
                                                                                        <div className="left-information-radio">
                                                                                            <p className="card-body-text">Enable Captcha</p>
                                                                                        </div>
                                                                                        <div className="right-information-radio k-flex ">
                                                                                            <div className="information-radio pl-4 settings-radio-new">
                                                                                                <div className="material-switch">
                                                                                                <input id="someSwitchOptionPrimary02" checked={this.state.allowcaptcha} name="allowcaptcha" type="checkbox" onChange={this.handleCheck}  />
                                                                                                    <label for="someSwitchOptionPrimary02" className="label-primary"></label>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                    </div> 
                                                                    <div className="row mb-3">
                                                                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                                                            <div className="advanceSettingHeading">
                                                                                <h4 className="card-title mb-1 font-weight-normal">Help Portal Properties</h4>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="row mb-4">
                                                                        <div className="col-sm-6">
                                                                            <div className="wrapperInfo ps-relative">
                                                                                <span className="radio-Feilds-Manage-span">
                                                                                    <div className="radioFeildsProfile perfrenceInformation k-flex align-items-center justify-content-center">
                                                                                        <div className="left-information-radio">
                                                                                            <p className="card-body-text">Enable search for articles and posts</p>
                                                                                        </div>
                                                                                        <div className="right-information-radio k-flex ">
                                                                                            <div className="information-radio pl-4 settings-radio-new">
                                                                                                <div className="material-switch">
                                                                                                <input id="someSwitchOptionPrimary03" checked={this.state.enablesearch} name="enablesearch" type="checkbox" onChange={this.handleCheck}  />
                                                                                                    <label for="someSwitchOptionPrimary03" className="label-primary"></label>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-sm-6">
                                                                            <div className="wrapperInfo ps-relative">
                                                                                <span className="radio-Feilds-Manage-span">
                                                                                    <div className="radioFeildsProfile perfrenceInformation k-flex align-items-center justify-content-center">
                                                                                        <div className="left-information-radio">
                                                                                            <p className="card-body-text">Show breadcrumbs for navigation</p>
                                                                                        </div>
                                                                                        <div className="right-information-radio k-flex ">
                                                                                            <div className="information-radio pl-4 settings-radio-new">
                                                                                                <div className="material-switch">
                                                                                                <input id="someSwitchOptionPrimary04" checked={this.state.allowbredcumb} name="allowbredcumb" type="checkbox" onChange={this.handleCheck}  />
                                                                                                    <label for="someSwitchOptionPrimary04" className="label-primary"></label>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="row mb-4">
                                                                        <div className="col-sm-6">
                                                                            <div className="wrapperInfo ps-relative">
                                                                                <span className="radio-Feilds-Manage-span mobile-height-auto">
                                                                                    <div className="radioFeildsProfile perfrenceInformation k-flex align-items-center justify-content-center">
                                                                                        <div className="left-information-radio">
                                                                                            <span className=" ps-relative"><label className="containerCheckBox containerafterchecked"><input checked={this.state.googlescan} name="googlescan" type="checkbox" onChange={this.handleCheck} /><span className="checkmark"></span></label></span>
                                                                                            <p className="card-body-text pl-5">Allow your Knowledge Base to be indexed by search engines, so that your customers can find your articles in Google, Yahoo, Bing etc.</p>
                                                                                        </div>
                                                                                    </div>
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                        {/* <div className="col-sm-6">
                                                                            <div className="wrapperInfo ps-relative">
                                                                                <span className="radio-Feilds-Manage-span">
                                                                                    <div className="radioFeildsProfile perfrenceInformation k-flex align-items-center justify-content-center">
                                                                                        <div className="left-information-radio">
                                                                                            <span className=" ps-relative"><label className="containerCheckBox containerafterchecked"><input type="checkbox" /><span className="checkmark"></span></label></span>
                                                                                            <p className="card-body-text pl-5">Allow your Knowledge Base to be indexed by search engines, so that your customers can find your articles in Google, Yahoo, Bing etc.</p>
                                                                                        </div>
                                                                                    </div>
                                                                                </span>
                                                                            </div>
                                                                        </div> */}
                                                                    </div>
                                                                    <div className="row mb-3">
                                                                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                                                            <div className="advanceSettingHeading">
                                                                                <h4 className="card-title mb-1 font-weight-normal">User Permissions For Help Portal</h4>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="row mb-3">
                                                                        {/* <div className="col-sm-6">
                                                                            <div className="wrapperInfo ps-relative">
                                                                                <select className="customArrow" name="submitticket" onChange={this.handleChange}>
                                                                                    <option value="">Who can submit ticket</option>
                                                                                    <option value="1" selected={(this.state.submitticket == 1)?'selected':''}>All Users</option>
                                                                                    <option value="2" selected={(this.state.submitticket == 2)?'selected':''}>Register Users</option>
                                                                                    <option value="3" selected={(this.state.submitticket == 3)?'selected':''}>Agents</option>
                                                                                </select>
                                                                                <label for="form1" className="setting-title">Who can submit ticket</label>
                                                                            </div>
                                                                        </div> */}
                                                                        <div className="col-sm-6">
                                                                            <div className="wrapperInfo ps-relative">
                                                                                <select className="customArrow" name="articleaccess" onChange={this.handleChange} disabled>
                                                                                    <option value="">Who can access articles</option>
                                                                                    <option value="1" selected={(this.state.articleaccess == 1)?'selected':'selected'}>All Users</option>
                                                                                    <option value="2" selected={(this.state.articleaccess == 2)?'selected':''}>Register Users</option>
                                                                                    <option value="3" selected={(this.state.articleaccess == 3)?'selected':''}>Agents</option>
                                                                                </select>
                                                                                <label for="form1" className="setting-title">Who can access articles</label>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-sm-6">
                                                                            <div className="wrapperInfo">
                                                                                <select className="customArrow" name="commentaccess" onChange={this.handleChange} disabled>
                                                                                    <option  value="">Who can comment</option>
                                                                                    <option value="1" selected={(this.state.commentaccess == 1)?'selected':''}>All Users</option>
                                                                                    <option value="2" selected={(this.state.commentaccess == 2)?'selected':''}>Register Users</option>
                                                                                    <option value="3" selected={(this.state.commentaccess == 3)?'selected':''}>Agents</option>
                                                                                </select>
                                                                                <label for="form1" className="setting-title">Who can comment</label>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="row mb-3">
                                                                        {/*<div className="col-sm-6">
                                                                            <div className="wrapperInfo ps-relative">
                                                                                <select className="customArrow" name="communityaccess" onChange={this.handleChange}>
                                                                                    <option  value="">Who can access community</option>
                                                                                    <option value="1" selected={(this.state.communityaccess == 1)?'selected':'selected'}>All Users</option>
                                                                                    <option value="2" selected={(this.state.communityaccess == 2)?'selected':''}>Register Users</option>
                                                                                    <option value="3" selected={(this.state.communityaccess == 3)?'selected':''}>Agents</option>
                                                                                </select>
                                                                                <label for="form1" className="setting-title">Who can access community</label>
                                                                            </div>
                                                                        </div>*/}
                                                                        <div className="col-sm-6">
                                                                            <div className="wrapperInfo ps-relative">
                                                                                <select className="customArrow" name="voteaccess" onChange={this.handleChange} disabled>
                                                                                    <option  value="">Who can votes</option>
                                                                                    <option value="1" selected={(this.state.voteaccess == 1)?'selected':'selected'}>All Users</option>
                                                                                    <option value="2" selected={(this.state.voteaccess == 2)?'selected':''}>Register Users</option>
                                                                                    <option value="3" selected={(this.state.voteaccess == 3)?'':''}>Agents</option>
                                                                                </select>
                                                                                <label for="form1" className="setting-title">Who can comment, reply or post</label>
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
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

 function mapStateToProps(state) {const showComponent = state.toogle;
     return {showComponent};
 }

     const connectedSettings = connect(mapStateToProps)(Settings); 
     export {connectedSettings as Settings}
    // export default Settings;