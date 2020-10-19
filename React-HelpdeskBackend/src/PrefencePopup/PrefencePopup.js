import React from 'react';
import {connect} from 'react-redux';
import Loader from '../_components/Loader';
import { userService } from '../_services';
import { alertActions } from '../_actions/alert.actions';
import config from 'config';

class PrefencePopup extends React.Component{
    constructor(props){
        super(props)
        let user = JSON.parse(localStorage.getItem('user'));
        let email = user[0].data.email; 
         this.state={
             popstage:1,
             email:email,
             loader: false,
             submitted:false,
             otpsend:"",
             reasondesc:"",
             reason:"",
             error:"",
         }
           
    }
    
    _handleChange = (e) => {
        this.setState({actionperformed:true})
        const { name, value } = e.target;
        this.setState({ [name]: value });
      }
    popup=(type)=>{
        const { dispatch } = this.props;
        //this.setState({popstage:type})
        if(type == 2)
        {   
            this.setState({submitted:true})
            if(this.state.otpsend){
                this.setState({ loader:!this.state.loader })
        userService.checkotp(this.state)
        .then((response)=>{
                if(response.status == 200)
                { 
                  this.setState({popstage:type})
                  this.setState({ loader:!this.state.loader })
                  this.setState({submitted:false})
                  
                   
                }
                else{
                    this.setState({ loader:!this.state.loader })
                    this.setState({ error:response.message })
                }
    
        }) 
            }
        }
        if(type == 3)
        {   
            this.setState({submitted:true})
            if(this.state.reason){
                this.setState({ loader:!this.state.loader })
        userService.deleteconfirm(this.state)
        .then((response)=>{
                if(response.status == 200)
                { 
                  this.setState({popstage:type})
                  this.setState({ loader:!this.state.loader })
                  this.setState({submitted:false})
                  dispatch(alertActions.apimessage(response.message))
                  setTimeout(() => {
                    dispatch(alertActions.clear());
                  }, 3000)
                  
                   
                }
                else{
                    this.setState({ loader:!this.state.loader })
                    dispatch(alertActions.error(response.message));
                    setTimeout(() => {
                        dispatch(alertActions.clear());
                      }, 3000)
                }
    
        }) 
            }
        }
        
        
    }
    prefrencepop=()=>{
        const { dispatch } = this.props;
        dispatch({ type: 'PopupToggle' })
        
      }
      prefrenceproceed=()=>{
        this.setState({ loader:!this.state.loader })
        userService.sendotp(this.state)
        .then((response)=>{
                if(response.status == 200)
                { 
                  this.setState({ loader:!this.state.loader })
                   
                }
    
        })
        
        
      }
    render(){
      
        return(
            <div className="popup customePopup popup1 prefence-popup">
            {this.state.loader && <Loader />}
                {(this.state.popstage == 1) && <div className="popupPanel m-auto">
                    <div className="popupHeader">
                    </div>
                    <div className="popupBody">
                        <div className="popup1Show">
                            <div className="popupImages">
                                <img src={`${config.path}/images/popup/delete.svg`} alt style={{width: '50%'}} />
                            </div>
                            <div className="popupDetails mb-0">
                                <h4 className="popup-title font-weight-normal ">Want to delete your account?</h4>
                            </div>
                            <div className="prefencepopup-feilds">
                                <p className="card-body-text-feilds my-2 text-left">Email id associated with the account</p>
                                <div className="rightFeilds-no">
                                    <div className=" md-form-prefence">
                                        <input type="text" id="inputMDEx1" className="form-control" name="seotitle" readOnly value={this.state.email} placeholder="astha@appypiellp.com" />
                                    </div>
                                </div>
                                <div className="rightFeilds-no">
                                    <div className={'md-form-prefence' + (this.state.submitted && (!this.state.otpsend || this.state.error) ? ' has-error' : '')}
                            >
                                        <input type="text" className="form-control" name="otpsend" value={this.state.otpsend} placeholder="Enter OTP Here" onChange={this._handleChange} />
                                    </div>
                                    {this.state.submitted && !this.state.otpsend &&
                                        <div className="invalid-feedback">OTP is required</div>
                                    }
                                    {this.state.submitted && this.state.error &&
                                        <div className="invalid-feedback">{this.state.error}</div>
                                    }
                                </div>
                                <p className="addNewFooterSection-btn text-right" onClick={this.prefrenceproceed}><span >Resend OTP</span></p>
                            </div>

                        </div>
                    </div>
                    <div className="popupFooter mt-3">
                        <div className="popupButton">
                            <button className="popupbtn popupbtnred closePopup" onClick={()=>this.popup(2)}>Proceed</button> <button className="popupbtn popupbtngray" onClick={this.prefrencepop}>Cancel</button>
                        </div>
                        <p className="note-organisation text-center mt-4"><strong>Note* : </strong>Once you delete account, you will lose access to all work.</p>
                    </div>
                </div>}

                {(this.state.popstage == 2) && <div className="popupPanel m-auto">
                    <div className="popupHeader">
                    </div>
                    <div className="popupBody">
                        <div className="popup1Show">
                            <div className="prefencepopup-feilds">
                            <h5 className="card-title my-2 text-left pt-4">Please specify reason for deletion request</h5>
                                <div className="rightFeilds-no">
                                    <div className="rightFeilds-no mb-3 text-left prefence-checkbox">
                                        <span className="checkBoxDesign">
                                            <label className="containerCheckBox">
                                                <input type="radio" name="reason" value="No longer require the services" onChange={this._handleChange}/>
                                                <span className="checkmark" /><span className="title">No longer require the services </span>
                                            </label>
                                        </span>
                                        <span className="checkBoxDesign">
                                            <label className="containerCheckBox">
                                                <input type="radio" name="reason" value="Missing features"  onChange={this._handleChange}/>
                                                <span className="checkmark" /><span className="title">Missing features </span>
                                            </label>
                                        </span>
                                        <span className="checkBoxDesign">
                                            <label className="containerCheckBox">
                                                <input type="radio" name="reason" value="Not satisfied with the services" onChange={this._handleChange}/>
                                                <span className="checkmark" /><span className="title">Not satisfied with the services </span>
                                            </label>
                                        </span>
                                        <span className="checkBoxDesign">
                                            <label className="containerCheckBox">
                                                <input type="radio" name="reason" value="Too many bugs" onChange={this._handleChange}/>
                                                <span className="checkmark" /><span className="title">Too many bugs </span>
                                            </label>
                                        </span>
                                        <span className="checkBoxDesign">
                                            <label className="containerCheckBox">
                                                <input type="radio" name="reason" value="Got another alternative" onChange={this._handleChange}/>
                                                <span className="checkmark" /><span className="title">Got another alternative </span>
                                            </label>
                                        </span>
                                        <span className="checkBoxDesign">
                                            <label className="containerCheckBox">
                                                <input type="radio" name="reason"  value="Other" onChange={this._handleChange}/>
                                                <span className="checkmark" /><span className="title">Other </span>
                                            </label>
                                        </span>
                                        {this.state.submitted && !this.state.reason &&
                                        <div className="invalid-feedback">Please select any one reason.</div>
                                    }
                                    </div>
                                </div>
                                <div className="rightFeilds-no">
                                    <div className="md-form-prefence">
                                        <textarea type="text" className="form-control" name="reasondesc" value={this.state.reasondesc} onChange={this._handleChange} placeholder="Enter other reason(optional) or provide details" ></textarea>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="popupFooter mt-3 pb-3">
                        <div className="popupButton">
                            <button className="popupbtn popupbtnred closePopup" onClick={()=>this.popup(3)}>Submit Request</button> <button className="popupbtn popupbtngray" onClick={this.prefrencepop}>Cancel</button>
                        </div>
                    </div>
                </div>}
            



                {(this.state.popstage == 3) &&  <div className="popupPanel m-auto">
                    <div className="popupHeader">
                    </div>
                    <div className="popupBody">
                        <div className="popup1Show">
                            <div className="popupImages">
                            <span className="closing-feedback" onClick={this.prefrencepop}><svg xmlns="http://www.w3.org/2000/svg" width="14.294" height="14.294" viewBox="0 0 14.294 14.294"><path id="ic_clear_24px" d="M19.294,6.44,17.855,5l-5.707,5.707L6.44,5,5,6.44l5.707,5.707L5,17.855l1.44,1.44,5.707-5.707,5.707,5.707,1.44-1.44-5.707-5.707Z" transform="translate(-5 -5)" fill="#bebebe"></path></svg></span>
                                <img src={`${config.path}/images/popup/request-submit.svg`} alt="" style={{width: '50%'}} />
                            </div>
                            <div className="popupDetails">
                            <h4 className="popup-title">Your request has been submitted.</h4>
                            <p className="popup-body-text">Our team will get in touch with you via email within next 7-10 working days</p>
                            </div>
                        </div>
                    </div>
                </div>}
            </div>


        );
    }
}
function mapStateToProps(state) {
    const showComponent = state.toogle;
    return {showComponent};
}

    const connectedPrefencePopup = connect(mapStateToProps)(PrefencePopup); 
    export {connectedPrefencePopup as PrefencePopup}
//export default PrefencePopup;