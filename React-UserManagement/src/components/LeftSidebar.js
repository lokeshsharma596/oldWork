import React, {  useState } from 'react';
import { Link } from "react-router-dom"
import MiniSideBar from "./MiniSideBar"
import * as Actions from "./../containers/AgentsPage/actions"
import {showFeedbackform,hideFeedbackform} from "../containers/AgentsPage/actions"
import { useSelector,useDispatch } from "react-redux"

const LeftSideBar = () => {

  const agentData = useSelector(state => state.agentsReducer)
  const dispatch = useDispatch()
  // set value
  const [score, setScore] = useState('')
  const [experiance, setExperiance] = useState('')
  const [send, setSend] = useState(true)
  const [rule, setRule] = useState('')
  const [submitStatus, setSubmitStatus] = useState(false)
  

  //error states
  const [showScoreRequiredError, setShowScoreRequiredError] = useState(false)
  const [showExperianceRequiredError, setShowExperianceRequiredError] = useState(false)
  const [showRuleRequiredError, setShowRuleRequiredError] = useState(false)
  
  const handleSubmit = () => {
    let user = JSON.parse(localStorage.getItem('user'));
    let email = user[0].data.email; 
    const data={
        score : score,
        experiance:experiance,
        send:send,
        rule:rule,
        id:localStorage.getItem('userId'),
        email:email
        
    }
    if(data.score.length === 0 || data.experiance.length === 0 || data.rule.length === 0){
        if (data.score.length === 0) {
            setShowScoreRequiredError(true)
            setTimeout(() => {
            setShowScoreRequiredError(false)
            }, 2000)
        }
        if(data.experiance.length === 0){
            setShowExperianceRequiredError(true)
            setTimeout(() => {
                setShowExperianceRequiredError(false)
            }, 2000)
            
        }
        if(data.rule.length === 0){
            setShowRuleRequiredError(true)
            setTimeout(() => {
                setShowRuleRequiredError(false)
            }, 2000)
            
        }
    }
    else{
        console.log("-----Line 51-------");
        dispatch(Actions.createFeedbackRequest({ ...data }))
        setSubmitStatus(true)
    }
      
  }

    return (
       
        <aside className="left-sidebar">
            <div className="lef-nav-logo">
                <span className="topHederLogo">
                    {/* <i className="icon customicon-announcement" /> */}
                    <img src={`/images/logo-icon.svg`} />
                </span>
            </div>
            <div className="scroll-sidebar side-navbarMenu">
                <nav className="sidebar-nav sidebarTop-nav">
                    <ul className="sidebarnav">
                    <li className="selected">
                                 <a href={`${process.env.REACT_APP_API_KB_BACKEND}`}>
                                        <span>
                                            <i className={'icon customicon-solution '}></i>
                                        </span>
                                </a>
                                </li>
                                <li>
                                <a href={`${process.env.REACT_APP_API_KB_BACKEND}`+'/desksettings'}>
                                        <span>
                                            <i className={'icon customicon-settings'}></i>
                                        </span>
                                </a>
                                </li>
                        
                        <li>
                            <Link to="/">
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="29.452" height="20.614" viewBox="0 0 29.452 20.614">
                                        <path id="Icon_awesome-users-cog" data-name="Icon awesome-users-cog" d="M28.1,16.488a5.4,5.4,0,0,0,0-1.961l1.187-.686a.333.333,0,0,0,.152-.391,6.907,6.907,0,0,0-1.528-2.642.336.336,0,0,0-.414-.064l-1.187.686a5.4,5.4,0,0,0-1.7-.98V9.078a.335.335,0,0,0-.262-.327,6.944,6.944,0,0,0-3.047,0,.335.335,0,0,0-.262.327v1.372a5.4,5.4,0,0,0-1.7.98l-1.187-.686a.337.337,0,0,0-.414.064A6.907,6.907,0,0,0,16.21,13.45a.339.339,0,0,0,.152.391l1.187.686a5.4,5.4,0,0,0,0,1.961l-1.187.686a.333.333,0,0,0-.152.391,6.941,6.941,0,0,0,1.528,2.642.336.336,0,0,0,.414.064l1.187-.686a5.4,5.4,0,0,0,1.7.98v1.372a.335.335,0,0,0,.262.327,6.944,6.944,0,0,0,3.047,0,.335.335,0,0,0,.262-.327V20.565a5.4,5.4,0,0,0,1.7-.98l1.187.686a.337.337,0,0,0,.414-.064,6.907,6.907,0,0,0,1.528-2.642.339.339,0,0,0-.152-.391Zm-5.27,1.252a2.232,2.232,0,1,1,2.232-2.232A2.234,2.234,0,0,1,22.828,17.739ZM4.418,11.089A2.946,2.946,0,1,0,1.473,8.143,2.948,2.948,0,0,0,4.418,11.089Zm10.309,1.473c.087,0,.17-.023.258-.028A8.484,8.484,0,0,1,16.656,9.81a1.814,1.814,0,0,1,1.33-.58,1.769,1.769,0,0,1,.9.244l.364.212c.037-.023.074-.041.11-.064a5.094,5.094,0,0,0,.515-2.209,5.152,5.152,0,1,0-5.15,5.15Zm4.842,8.952c-.106-.055-.212-.12-.313-.179a2.274,2.274,0,0,1-1.266.451,1.829,1.829,0,0,1-1.33-.58A8.392,8.392,0,0,1,14.81,18,1.964,1.964,0,0,1,16,15.687q-.007-.179,0-.359l-.364-.212a1.875,1.875,0,0,1-.451-.373c-.152.009-.3.028-.451.028a7.265,7.265,0,0,1-3.153-.736H11.2a5.3,5.3,0,0,0-5.307,5.3v1.325A2.21,2.21,0,0,0,8.1,22.871H19.855a1.772,1.772,0,0,1-.285-.934v-.423Zm-11.6-8.1a2.937,2.937,0,0,0-2.076-.856H2.946A2.948,2.948,0,0,0,0,15.507V16.98a1.471,1.471,0,0,0,1.473,1.473H4.506a6.749,6.749,0,0,1,3.461-5.035Z" transform="translate(0 -2.257)" fill="#64B5F6" />
                                    </svg>
                                </span>
                            </Link>
                        </li>
                        {(agentData.showMiniSideBar) ?
                        <li>
                                <MiniSideBar />  
                        </li>
                        : null}
                    </ul>
                </nav>
                <nav className="sidebar-nav sidebarBottom-nav">
                            <ul className="sidebarnav">
                                <li title="Help">
                                    <a href="https://www.appypiedesk.com/Appy-Pie-Knowledge" target="_blank">
                                        <span>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26">
  <path id="Icon_ionic-ios-help-circle" data-name="Icon ionic-ios-help-circle" d="M16.375,3.375a13,13,0,1,0,13,13A13,13,0,0,0,16.375,3.375Zm-.269,19a1.289,1.289,0,1,1,1.344-1.288,1.305,1.305,0,0,1-1.344,1.288Zm2.513-6.056c-1.088.631-1.456,1.094-1.456,1.894v.494H14.994l-.019-.538a2.6,2.6,0,0,1,1.475-2.75c1.056-.631,1.5-1.031,1.5-1.806a1.517,1.517,0,0,0-1.681-1.344,1.581,1.581,0,0,0-1.675,1.537H12.375c.044-2.012,1.531-3.438,4.044-3.438,2.344,0,3.956,1.3,3.956,3.169a3.059,3.059,0,0,1-1.756,2.782Z" transform="translate(-3.375 -3.375)" fill="#5f6a79"/>
</svg>
                                        </span>
                                    </a>
                                </li>
                        <li className="selected ps-relative" title=" Feedback" onClick={() => dispatch(showFeedbackform()) }>
                                <a onClick={() => dispatch(showFeedbackform()) }>
                                <span>

                                <svg xmlns="http://www.w3.org/2000/svg" width="30.682" height="35.388" viewBox="0 0 30.682 35.388">
  <g id="Group_4332" data-name="Group 4332" transform="translate(-20.338 -971.405)">
    <path id="Icon_feather-message-circle" data-name="Icon feather-message-circle" d="M27.662,15.438a10.783,10.783,0,0,1-1.158,4.89,10.938,10.938,0,0,1-9.78,6.048,10.783,10.783,0,0,1-4.89-1.158L4.5,27.662l2.445-7.335a10.783,10.783,0,0,1-1.158-4.89,10.938,10.938,0,0,1,6.048-9.78A10.783,10.783,0,0,1,16.724,4.5h.643a10.912,10.912,0,0,1,10.3,10.294Z" transform="translate(16.838 978.131)" fill="none" stroke="#5f6a79" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
    <g id="Polygon_10" data-name="Polygon 10" transform="translate(34.937 976.65)">
      <path id="Path_243" data-name="Path 243" d="M11.063,15.03,9.177,13.847,6,11.855,2.823,13.847.937,15.03l.369-2.2.714-4.248L-.73,5.649l-1.312-1.4,1.9-.272,3.635-.52L5.076-.381,6-2.623,6.924-.381,8.507,3.455l3.635.52,1.9.272-1.312,1.4L9.981,8.586l.714,4.248Z" fill="#5f6a79"/>
      {/* <path id="Path_244" data-name="Path 244" d="M6,0,4.2,4.364l-4.2.6,3.088,3.3L2.292,13,6,10.674,9.708,13l-.8-4.736L12,4.966l-4.2-.6L6,0M6-5.245,7.849-.763,9.214,2.546l3.07.44,3.8.544-2.623,2.8L11.049,8.909l.632,3.76.738,4.392L8.646,14.694,6,13.035,3.354,14.694-.418,17.06l.738-4.392.632-3.76L-1.46,6.332l-2.623-2.8,3.8-.544,3.07-.44L4.151-.763Z" fill="#1c223a"/> */}
    </g>
  </g>
</svg>

                                </span>
                                </a>

                                </li>
                            </ul>
                            {(agentData.showFeedbackForm) ? 
                            <div className="feedBackSection">
                                <div className="feedback-details">
                                    <div className="feedback-header pt-4 pb-0 px-4">
                                        <span className="closing-feedback" onClick={() => dispatch(hideFeedbackform()) }>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="14.294" height="14.294" viewBox="0 0 14.294 14.294"><path id="ic_clear_24px" d="M19.294,6.44,17.855,5l-5.707,5.707L6.44,5,5,6.44l5.707,5.707L5,17.855l1.44,1.44,5.707-5.707,5.707,5.707,1.44-1.44-5.707-5.707Z" transform="translate(-5 -5)" fill="#bebebe" /></svg>
                                        </span>
                                        <h4 className="card-title mb-1">Help us improve our services!</h4>
                                        <p className="note-organisation"><strong>Note : </strong>Questions marked in (*) are mandatory</p>
                                        <h5 className="card-title mb-0 mt-3">Provide your feedback </h5>
                                    </div>
                                    <div className="rightPanelFeilds descriptionFeilds py-2 px-4">
                                        <div className="feedback-feilds">
                                            <span className="feddback-question">Q1. How easy was it for you/your organisation to use the tool?*</span>
                                            <div className="feedback-rightFeilds-no">
                                                <span className="radio-feedback"><label className="feedback-label">
                                                    <input type="radio" id="male" name="rule" onChange={(e) => setRule(e.target.value)} defaultValue="Very difficult" />
                                                    <span className="title">Very difficult </span>
                                                </label>
                                                    <label className="feedback-label">
                                                        <input type="radio" id="male" name="rule" onChange={(e) => setRule(e.target.value)} defaultValue="Difficult" />
                                                        <span className="title">Difficult</span>
                                                    </label>
                                                    <label className="feedback-label">
                                                        <input type="radio" id="male" name="rule" onChange={(e) => setRule(e.target.value)} defaultValue="Normal" />
                                                        <span className="title">Normal</span>
                                                    </label>
                                                    <label className="feedback-label">
                                                        <input type="radio" id="male" name="rule" onChange={(e) => setRule(e.target.value)} defaultValue="Easy" />
                                                        <span className="title">Easy</span>
                                                    </label>
                                                    <label className="feedback-label">
                                                        <input type="radio" id="male" name="rule" onChange={(e) => setRule(e.target.value)} defaultValue="Very easy" />
                                                        <span className="title">Very easy </span>
                                                    </label>
                                                </span>
                                            </div>
                                            {showRuleRequiredError ? <div className="invalid-feedback">Required</div> : null}
                                        </div>
                                    </div>
                                    <div className="rightPanelFeilds descriptionFeilds py-2 px-4">
                                        <div className="feedback-feilds">
                                            <span className="feddback-question">Q2. Please provide the main reason for the above scoring? *</span>
                                            <textarea type="text" id="inputMDEx7" className="form-control" name="score" placeholder="Enter reason here" onChange={(e) => setScore(e.target.value)} defaultValue={score} />
                                        </div>
                                        {showScoreRequiredError ? <div className="invalid-feedback">Required</div> : null}
                                    </div>
                                    <div className="rightPanelFeilds descriptionFeilds py-2 px-4">
                                        <div className="feedback-feilds">
                                            <span className="feddback-question">Q3. What can we Do, Add or Remove to make your experience better? *</span>
                                            <textarea type="text" id="inputMDEx7" className="form-control" name="experiance" placeholder="Describe" defaultValue={experiance} onChange={(e) => setExperiance(e.target.value)}  />
                                        </div>
                                        {showExperianceRequiredError ? <div className="invalid-feedback">Required</div> : null}
                                    </div>
                                    <div className="form-check py-2 ">
                                        <input name="send" type="checkbox" id="materialUnchecked" className="form-check-input " checked={send} onChange={(e) => setSend(e.target.checked)} />
                                        <label className="form-check-label">Our team can contact you regarding this feedback</label>
                                    </div>
                                    <div className="feedback-footer py-4 px-4">
                                        <div className><button className="btnBlue" type="submit" onClick={() => handleSubmit()}>Submit Feedback </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            : null}
                        </nav>

                
            </div>
        </aside>



    )

}

export default LeftSideBar;