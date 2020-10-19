import React from 'react';
import ColorPickr from 'react-input-colorpicker';
import Dropzone from 'react-dropzone'
import storage from '../config/config'

class Customization extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          image: null,
          url: "",
          progress: 0
        };
      }
    changeHandler=(colors)=> {
        console.log(colors);
    }
    onDrop = (acceptedFiles) => {
        alert(acceptedFiles)
          
        if (acceptedFiles) {
            const image = acceptedFiles[0];
            const metadata = {
                contentType: image.type
              };
            console.log( image.name)
            const uploadTask = storage.ref().child(`images/${image.name}`).put(image,metadata);
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
                        .ref("images")
                        .child(image.name)
                        .getDownloadURL()
                        .then(url => {
                            console.log(url)
                            this.setState({ url });
                        });
                    }
                    );
            
            this.setState(() => ({ image }));
          }
      }
    render(){
        return(
           <div className="tab-pane fade" id="three" role="tabpanel" aria-labelledby="three-tab">
               <div className="customeTabsContent settings-Feilds">
                    <div className="row mb-4">
                        <div className="col-sm-6">
                            <div className="wrapperInfo ps-relative">
                                <span className="radio-Feilds-Manage-span">
                                    <div className="radioFeildsProfile perfrenceInformation k-flex align-items-center justify-content-center ps-relative">
                                        <div className="left-information-radio color-feilds-titles">
                                            <p className="card-body-text">#000000</p>
                                            <label for="form1" className="setting-title">Choose Theme Color</label>
                                        </div>
                                        <div className="right-information-radio k-flex ">
                                            <div className="information-radio pl-4 settings-radio-new">
                                                <div className="material-switch color-feilds">
                                                    
                                                    {/* <input id="someSwitchOptionPrimary" name="someSwitchOption001" type="color" onChange={this.getcolor} /> */}
                                                    <ColorPickr
                                                        color={'#36c'}
                                                        onChange={this.changeHandler}
                                                        mode='RGB'
                                                    />
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
                                    <div className="radioFeildsProfile perfrenceInformation k-flex align-items-center justify-content-center ps-relative">
                                        <div className="left-information-radio color-feilds-titles">
                                            <p className="card-body-text ">#000000</p>
                                            <label for="form1" className="setting-title">Choose text Color</label>
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
                    <div className="row mb-3">
                        <div className="col-sm-6">
                            <div className="wrapperInfo ps-relative">
                                <select className="customArrow">
                                    <option>Agent Role</option>
                                </select>
                                <label for="form1" className="setting-title">Choose Font Style</label>
                            </div>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                            <div className="uploadImg advanceSettinguploadImg dragUploadImage">
                                <label>Upload Header Image :</label>
                                <div className="feilds settingdFeilds">
                                <div className="dregDesign advancesettingdropdesign w-100" style={{"minHeight": "auto", "max-height": "auto", }}>
                                    <img className="filedrgImg" src={'../../src/assets/images/icon/settings/file-drag.svg'} alt />
                                   
                                    <Dropzone
                                        onDrop={this.onDrop}
                                        accept="image/*"
                                        minSize={0}
                                        maxSize={1048576}
                                    >
                                        {({getRootProps, getInputProps, isDragActive, isDragReject, rejectedFiles}) => {
                                        const isFileTooLarge = rejectedFiles.length > 0 && rejectedFiles[0].size > 1048576;
                                        return (
                                            <div {...getRootProps()}>
                                            <input {...getInputProps()} />
                                            {!isDragActive &&  <p>Drag &amp; Drop Or <span>Click Here</span> To Upload Your Logo.</p>}
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
                                    </Dropzone>
                                </div>
                                <p className="drgNote"><strong>Note</strong> : Aspect Ratio should be 16:1 and should not exceed 2.5 mb data as well.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                            <div className="uploadImg advanceSettinguploadImg dragUploadImage">
                                <label>Upload Favicon Image :</label>
                                <div className="feilds settingdFeilds">
                                <div className="dregDesign advancesettingdropdesign w-100" style={{"minHeight": "auto", "max-height": "auto", }}>
                                    <input type="file" placeholder="Enter Customer Portal Base Title*" />
                                    <img className="filedrgImg" src={'../../src/assets/images/icon/settings/file-drag.svg'} alt />
                                    <p>Drag &amp; Drop Or <span>Click Here</span> To Upload Your Logo.</p>
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
                                </div>
                            </div>
                        </div>
                    </div>

                </div>            
            </div>

        );
    }
}


export default Customization;