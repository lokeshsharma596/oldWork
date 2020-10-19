import React, { useState } from 'react';
import { countries, timeZones, languages, compareJson, toTitleCase, CheckObjectPresentInArray } from "./../utils/functions"
import {sendotp,hidePopup} from "../containers/HomePage/actions"
import {useSelector,useDispatch } from "react-redux"
import { firebase } from "./../utils/db"
import * as Actions from "./../containers/HomePage/actions"
import 'react-phone-number-input/style.css'
import ReactPhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/material.css';
import SuccessToast from "./../containers/HomePage/SuccessToast"
import * as Services from "../utils/services"
import Loader from "./Loader"
const Countries = countries()
const Timezones = timeZones()
const Languages = languages()


export default function Prefrencepop() {
    const dispatch = useDispatch()
    const [popup, setpopup] = useState(1)
    const [code, setcode] = useState("")
    const [reason, setreason] = useState("")
    const [desc, setdesc] = useState("")
    const [reasonreq, setreasonreq] = useState(false)
    const [errorcode, seterrorcode] = useState(false)
    const [submitotp, setsubmitotp] = useState(false)
    const [errmsg, seterrmsg] = useState('')
    let user = JSON.parse(localStorage.getItem('user'));
    let email = user[0].data.email;
    const handleSubmit = () => {
        let user = JSON.parse(localStorage.getItem('user'));
        let id = user[0].id;
        setsubmitotp(true)
        if(!code){
        seterrorcode(true)
        }else{
            fetch(`${process.env.REACT_APP_API_KB_CONFIG}/checkotp`, {
                method: 'POST',
                body: JSON.stringify({ 'otp': code,'id':id}),
                headers: { 'Content-Type': 'application/json','Authorization': 'Bearer ' + localStorage.getItem('userId') }
            }).then(res => res.json()).then(response => {
                if(response.status == 200)
                { 
                    setpopup(2);  
                }
                else{
                    seterrmsg(response.message);
                    setTimeout(() => {
                        seterrmsg('');
                      }, 3000)
                }
            })
        }
        
    }
    
    const handlereasonSubmit = () =>{
        if(!reason){
            setreasonreq(true)
        }else{
            setreasonreq(false)
            setpopup(3);
        }
    }
    
        
          
            return (
                
               <div className="popup customePopup popup1 prefence-popup">
         {(popup == 1) && <div className="popupPanel m-auto">
                    <div className="popupHeader">
                    </div>
                    <div className="popupBody">
                        <div className="popup1Show">
                            <div className="popupImages">
                                <img src={`/images/popup/delete.svg`} alt style={{width: '50%'}} />
                            </div>
                            <div className="popupDetails mb-0">
                                <h4 className="popup-title font-weight-normal ">Want to delete your account?</h4>
                            </div>
                            <div className="prefencepopup-feilds">
                                <p className="card-body-text-feilds my-2 text-left">Email id associated with the account</p>
                                <div className="rightFeilds-no">
                                    <div className=" md-form-prefence">
                                        <input type="text" id="inputMDEx1" className="form-control" name="seotitle" readOnly  value={email} placeholder="astha@appypiellp.com" />
                                    </div>
                                </div>
                                <div className="rightFeilds-no">
                                    <div className={'md-form-prefence '+ (errorcode)?'md-form-prefence has-error':''}
                            >
                                        <input type="number" className="form-control" name="otpsend"  placeholder="Enter OTP Here" value={code} onChange={(e) => setcode(e.target.value)}/>
                                    </div>
                                    {errorcode?
                                        <div className="invalid-feedback">OTP is required</div>:''
                                    }
                                    {errmsg ? <div className="invalid-feedback">{errmsg}</div>:''}
                                   
                                </div>
                                <p className="addNewFooterSection-btn text-right"><span onClick={() => dispatch(sendotp()) }>Resend OTP</span></p>
                            </div>

                        </div>
                    </div>
                    <div className="popupFooter mt-3">
                        <div className="popupButton">
                            <button className="popupbtn popupbtnred closePopup---" onClick={() => handleSubmit()}>Proceed</button> <button className="popupbtn popupbtngray" onClick={() => dispatch(hidePopup()) }>Cancel</button>
                        </div>
                        <p className="note-organisation text-center mt-4"><strong>Note* : </strong>Once you delete account, you will lose access to all work.</p>
                    </div>
                </div>}
 
                {(popup == 2) && <div className="popupPanel m-auto" >
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
                                                <input type="radio" name="reason" value="No longer require the services" onChange={(e) => setreason(e.target.value)}/>
                                                <span className="checkmark" /><span className="title">No longer require the services </span>
                                            </label>
                                        </span>
                                        <span className="checkBoxDesign">
                                            <label className="containerCheckBox">
                                                <input type="radio" name="reason" value="Missing features" onChange={(e) => setreason(e.target.value)}/>
                                                <span className="checkmark" /><span className="title">Missing features </span>
                                            </label>
                                        </span>
                                        <span className="checkBoxDesign">
                                            <label className="containerCheckBox">
                                                <input type="radio" name="reason" value="Not satisfied with the services" onChange={(e) => setreason(e.target.value)}/>
                                                <span className="checkmark" /><span className="title">Not satisfied with the services </span>
                                            </label>
                                        </span>
                                        <span className="checkBoxDesign">
                                            <label className="containerCheckBox">
                                                <input type="radio" name="reason" value="Too many bugs" onChange={(e) => setreason(e.target.value)}/>
                                                <span className="checkmark" /><span className="title">Too many bugs </span>
                                            </label>
                                        </span>
                                        <span className="checkBoxDesign">
                                            <label className="containerCheckBox">
                                                <input type="radio" name="reason" value="Got another alternative" onChange={(e) => setreason(e.target.value)}/>
                                                <span className="checkmark" /><span className="title">Got another alternative </span>
                                            </label>
                                        </span>
                                        <span className="checkBoxDesign">
                                            <label className="containerCheckBox">
                                                <input type="radio" name="reason"  value="Other" onChange={(e) => setreason(e.target.value)}/>
                                                <span className="checkmark" /><span className="title">Other </span>
                                            </label>
                                        </span>
                                        {reasonreq ?
                                        <div className="invalid-feedback">Please select any one reason.</div>:null}
                                    
                                    </div>
                                </div>
                                <div className="rightFeilds-no">
                                    <div className="md-form-prefence">
                                        <textarea type="text" className="form-control" name="reasondesc" value={desc} onChange={(e) => setdesc(e.target.value)} placeholder="Enter other reason(optional) or provide details" ></textarea>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="popupFooter mt-3 pb-3" >
                        <div className="popupButton">
                            <button className="popupbtn popupbtnred closePopup---" onClick={() => handlereasonSubmit()}>Submit Request</button> <button className="popupbtn popupbtngray" onClick={() => dispatch(hidePopup()) }>Cancel</button>
                        </div>
                    </div>
                </div>}
            



                {(popup == 3) && <div className="popupPanel m-auto">
                    <div className="popupHeader">
                    </div>
                    <div className="popupBody">
                        <div className="popup1Show">
                            <div className="popupImages">
                            <span className="closing-feedback" onClick={() => dispatch(hidePopup()) }><svg xmlns="http://www.w3.org/2000/svg" width="14.294" height="14.294" viewBox="0 0 14.294 14.294"><path id="ic_clear_24px" d="M19.294,6.44,17.855,5l-5.707,5.707L6.44,5,5,6.44l5.707,5.707L5,17.855l1.44,1.44,5.707-5.707,5.707,5.707,1.44-1.44-5.707-5.707Z" transform="translate(-5 -5)" fill="#bebebe"></path></svg></span>
                                <img src={`/images/popup/request-submit.svg`} alt="" style={{width: '50%'}} />
                            </div>
                            <div className="popupDetails">
                            <h4 className="popup-title">Your request has been submitted.</h4>
                            <p className="popup-body-text">Our team will get in touch with you via email within next 7-10 working days</p>
                            </div>
                        </div>
                    </div>
                </div>}
            </div>

        
        
            )
        }
