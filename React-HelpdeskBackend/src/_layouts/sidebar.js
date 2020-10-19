import React from 'react';
import { connect } from 'react-redux';
import ChildSidebar from './ChildSidebar'
import Loader from '../_components/Loader';
import { userService } from '../_services';
import { alertActions } from '../_actions/alert.actions';
import config from 'config';
import { history } from '../_helpers';

class Sidebar extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            feedBackShow:false,
            rule:"",
            score:"",
            experiance:"",
            send:true,
            submitted:false,
            loader:false,
            categories:[] 
        }
    }

    componentDidMount(){
        userService.categorylist()
        .then(response => {
            if(response.status == 200)
            {   
                this.setState({categories:response.data})
            }
        })
    }


    feedBack = () => {
        //this.setState({feedBackShow: !this.setState.feedBackShow})
        const { dispatch } = this.props;
        dispatch({ type: 'FeedbackToggle' })
    }
    feedBackClose=() => {
        const { dispatch } = this.props;
        dispatch({ type: 'FeedbackToggle' })
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
      feedbackSubmit=()=>{
        const { dispatch } = this.props;
          this.setState({submitted:true})
          if(this.state.rule && this.state.score && this.state.experiance){
            //this.setState({ loader: !this.state.loader })
            userService.feedbackform(this.state)
                .then((response) => {
                    if (response.status == 200) {
                       // this.setState({ loader: !this.state.loader })
                        dispatch({ type: 'FeedbackToggle' })
                        dispatch(alertActions.apimessage(response.message));
                        setTimeout(() => {
                            dispatch(alertActions.clear());
                        }, 3000)

                    }

                })
          }
      }
   
    render() {
        const {rule,score,experiance,send,submitted}=this.state
        const url = (JSON.parse(localStorage.getItem('user')))[0].data.screentype?(JSON.parse(localStorage.getItem('user')))[0].data.screentype:"/categorylisting";
        const data   =JSON.parse(localStorage.getItem('user'));
        console.log(data[0].domainname);
        return (
            <div>
                <aside className={'left-sidebar non-click '+ ((!data[0].domainname)?'no-click':'no--click')}>
                    {this.state.loader && <Loader/>}
                        
                    <div className="lef-nav-logo">
                        <span className="topHederLogo">
                            {/* <i className="icon customicon-announcement"></i> */}
                            <img src={`${config.path}/images/logo-icon.svg`} />
                        </span>
                    </div>
                    <div className="scroll-sidebar side-navbarMenu">
                        <nav className="sidebar-nav sidebarTop-nav">
                            <ul className="sidebarnav">
                                {/* <li className="selected">
                                    <a href="#">
                                        <span>
                                            <i className="icon customicon-mail"></i>
                                        </span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <span>
                                            <i className="icon customicon-date-range"></i>
                                        </span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <span>
                                            <i className="icon customicon-friends"></i>
                                        </span>
                                    </a>
                                </li> */}
                                <li className="selected">
                                    <a href={`${config.path}${url}`}>
                                        <span>
                                            <i className={'icon customicon-solution '+ ((history.location.pathname != "/settings" && history.location.pathname != "/knoBaseSettings" && history.location.pathname != "/desksettings" && history.location.pathname != "/privacysetting")?'selected':'')}></i>
                                        </span>
                                    </a>
                                </li>
                                <li>
                                    <a href={`${config.path}/desksettings`}>
                                        <span>
                                            <i className={'icon customicon-settings '+ ((history.location.pathname == "/settings" || history.location.pathname == "/knoBaseSettings" || history.location.pathname == "/desksettings" || history.location.pathname == "/privacysetting")?'selected':'')}></i>
                                        </span>
                                    </a>
                                </li>
                                <li>
                                <a href={`${config.usermanagement}`}>
                                    <span>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="29.452" height="20.614" viewBox="0 0 29.452 20.614">
                                            <path id="Icon_awesome-users-cog" data-name="Icon awesome-users-cog" d="M28.1,16.488a5.4,5.4,0,0,0,0-1.961l1.187-.686a.333.333,0,0,0,.152-.391,6.907,6.907,0,0,0-1.528-2.642.336.336,0,0,0-.414-.064l-1.187.686a5.4,5.4,0,0,0-1.7-.98V9.078a.335.335,0,0,0-.262-.327,6.944,6.944,0,0,0-3.047,0,.335.335,0,0,0-.262.327v1.372a5.4,5.4,0,0,0-1.7.98l-1.187-.686a.337.337,0,0,0-.414.064A6.907,6.907,0,0,0,16.21,13.45a.339.339,0,0,0,.152.391l1.187.686a5.4,5.4,0,0,0,0,1.961l-1.187.686a.333.333,0,0,0-.152.391,6.941,6.941,0,0,0,1.528,2.642.336.336,0,0,0,.414.064l1.187-.686a5.4,5.4,0,0,0,1.7.98v1.372a.335.335,0,0,0,.262.327,6.944,6.944,0,0,0,3.047,0,.335.335,0,0,0,.262-.327V20.565a5.4,5.4,0,0,0,1.7-.98l1.187.686a.337.337,0,0,0,.414-.064,6.907,6.907,0,0,0,1.528-2.642.339.339,0,0,0-.152-.391Zm-5.27,1.252a2.232,2.232,0,1,1,2.232-2.232A2.234,2.234,0,0,1,22.828,17.739ZM4.418,11.089A2.946,2.946,0,1,0,1.473,8.143,2.948,2.948,0,0,0,4.418,11.089Zm10.309,1.473c.087,0,.17-.023.258-.028A8.484,8.484,0,0,1,16.656,9.81a1.814,1.814,0,0,1,1.33-.58,1.769,1.769,0,0,1,.9.244l.364.212c.037-.023.074-.041.11-.064a5.094,5.094,0,0,0,.515-2.209,5.152,5.152,0,1,0-5.15,5.15Zm4.842,8.952c-.106-.055-.212-.12-.313-.179a2.274,2.274,0,0,1-1.266.451,1.829,1.829,0,0,1-1.33-.58A8.392,8.392,0,0,1,14.81,18,1.964,1.964,0,0,1,16,15.687q-.007-.179,0-.359l-.364-.212a1.875,1.875,0,0,1-.451-.373c-.152.009-.3.028-.451.028a7.265,7.265,0,0,1-3.153-.736H11.2a5.3,5.3,0,0,0-5.307,5.3v1.325A2.21,2.21,0,0,0,8.1,22.871H19.855a1.772,1.772,0,0,1-.285-.934v-.423Zm-11.6-8.1a2.937,2.937,0,0,0-2.076-.856H2.946A2.948,2.948,0,0,0,0,15.507V16.98a1.471,1.471,0,0,0,1.473,1.473H4.506a6.749,6.749,0,0,1,3.461-5.035Z" transform="translate(0 -2.257)" fill="#5f6a79" />
                                        </svg>
                                    </span>
                                </a>
                            </li>
                                {/* <li>
                                    <a href="#">
                                        <span>
                                            <i className="icon customicon-analysis"></i>
                                        </span>
                                    </a>
                                </li> */}
                            
                                {this.props.showcomponent.isOpen && <ChildSidebar categories={this.state.categories} />}
                            </ul>
                        </nav>
                        <nav className="sidebar-nav sidebarBottom-nav">
                            <ul className="sidebarnav">
                                <li title="Help ">
                                    <a href="https://www.appypiedesk.com/Appy-Pie-Knowledge" target="_blank">
                                        <span>
                                        <img src={`${config.path}/images/ionic-ios-help-circle.svg`} />
                                        </span>
                                    </a>
                                </li>
                                <li className="selected ps-relative" title=" Feedback">
                                    <a onClick={this.feedBack}>
                                        <span> 
                                        
                                            <img src={`${config.path}/images/Group_4332.svg`} />
                                        </span>
                                    </a>
                                    {this.props.showcomponent.isfeedback && <div className="feedBackSection">
                                        <div className="feedback-details">
                                            <div className="feedback-header pt-4 pb-0 px-4">
                                                <span className="closing-feedback" onClick={this.feedBackClose}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="14.294" height="14.294" viewBox="0 0 14.294 14.294"><path id="ic_clear_24px" d="M19.294,6.44,17.855,5l-5.707,5.707L6.44,5,5,6.44l5.707,5.707L5,17.855l1.44,1.44,5.707-5.707,5.707,5.707,1.44-1.44-5.707-5.707Z" transform="translate(-5 -5)" fill="#bebebe"></path></svg>
                                                </span>
                                                <h4 className="card-title mb-1">Help us improve our services!</h4>
                                                <p className="note-organisation"><strong>Note : </strong>Questions marked in (*) are mandatory</p>
                                                <h5 className="card-title mb-0 mt-3">Provide your feedback </h5>
                                            </div>
                                        <div className="rightPanelFeilds descriptionFeilds py-2 px-4">
                                                <div className="feedback-feilds">
                                                    <span className="feddback-question">Q1. How easy was it for you/your organisation to use the tool?*</span>
                                                    <div className={'feedback-rightFeilds-no' + (submitted && !rule ? ' has-error' : '')}>
                                                    
                                                        <span className="radio-feedback">
                                                            <label className="feedback-label">
                                                                <input type="radio" id="male" name="rule" value="Very difficult" onChange={this.handleChange}/>
                                                                <span className="title">Very difficult </span>
                                                            </label>
                                                            <label className="feedback-label">
                                                                <input type="radio" id="male" name="rule" value="Difficult" onChange={this.handleChange}/>
                                                                <span className="title">Difficult</span>
                                                            </label>
                                                            <label className="feedback-label">
                                                                <input type="radio" id="male" name="rule" value="Normal" onChange={this.handleChange} />
                                                                <span className="title">Normal</span>
                                                            </label>
                                                            <label className="feedback-label">
                                                                <input type="radio" id="male" name="rule" value="Easy" onChange={this.handleChange}/>
                                                                <span className="title">Easy</span>
                                                            </label>
                                                            <label className="feedback-label">
                                                                <input type="radio" id="male" name="rule" value="Very easy" onChange={this.handleChange}/>
                                                                <span className="title">Very easy </span>
                                                            </label>
                                                        </span>
                                                        {submitted && !rule &&
                                                                                <div className="invalid-feedback">Please select any rule.</div>
                                                                        }
                                                    </div>
                                                </div>
                                        </div>
                                        <div className="rightPanelFeilds descriptionFeilds py-2 px-4">
                                            <div class={'feedback-feilds' + (submitted && !score ? ' has-error' : '')}>
                                                <span className="feddback-question">Q2. Please provide the main reason for the above scoring? *</span>
                                                <textarea type="text" id="inputMDEx7" className="form-control" name="score" placeholder="Enter reason here" onChange={this.handleChange}>{score}</textarea>
                                                {submitted && !score &&
                                                        <div className="invalid-feedback">Please provide score.</div>
                                                }
                                            </div>
                                        </div>
                                        <div className="rightPanelFeilds descriptionFeilds py-2 px-4">
                                                <div class={'feedback-feilds' + (submitted && !experiance ? ' has-error' : '')}>
                                                    <span className="feddback-question">Q3. What can we Do, Add or Remove to make your experience better? *</span>
                                                    <textarea type="text" id="inputMDEx7" className="form-control" name="experiance" placeholder="Describe" onChange={this.handleChange}>{experiance}</textarea>
                                                    {submitted && !experiance &&
                                                        <div className="invalid-feedback">Please provide experiance.</div>
                                                }
                                                </div>
                                        </div>
                                        <div className="form-check py-2 ">
                                            <input checked={send} name="send" type="checkbox" id="materialUnchecked" className="form-check-input " onChange={this.handleCheck} />
                                            <label className="form-check-label">Our team can contact you regarding this feedback</label>      
                                        </div>

                                        <div className="feedback-footer py-4 px-4">
                                                <div className="">
                                                    <button className="btnBlue" onClick={this.feedbackSubmit}>Submit Feedback </button>
                                                </div>
                                        </div>
                                        </div>
                                    </div> }
                                </li>
                                {/* <li>
                                    <a onClick={this.openComment}>
                                        <span>
                                            <i className="icon customicon-messages"></i>
                                        </span>
                                    </a>
                                </li> */}
                            </ul>
                        </nav>
                    </div>
                </aside>
                {/* style={{display: 'block', height: 64}} */}
                {/* <footer className="ticketing-footer" >
                    <p className="footer-wrapper"><span><b>Help Desk v3.2</b></span> <span><svg xmlns="http://www.w3.org/2000/svg" width={5} height={16} viewBox="0 0 5 16">
                        <text id="_" data-name="|" transform="translate(0 12)" fill="#c4c4c4" fontSize={16} fontFamily="Helvetica">
                        <tspan x={0} y={0}>|</tspan>
                        </text>
                    </svg>
                    </span> <span>Appy Pie Knowledge V1.0</span></p>
                </footer> */}   






                {/* <div className="botomFooter">    
                    <div className="row">
                    <div className="col-xs-12 col-sm-12 col-md-3 col-lg-2 vcenter hidden-xs hidden-sm">
                        <a href="#" className="footer-logo" role="link">
                            <img src="https://images.appypie.com/wp-content/uploads/2020/03/16070955/appypie-logo.svg" data-no-lazy={1} width={147} height={42} />
                        </a>
                    </div>
                    <div className="col-xs-12 col-sm-12 col-md-6 col-lg-7 vcenter bottom-footer-nav">
                        <div className="menu-chat-bot-builder-in-footer-container">
                            <ul className="nav s-nav align-items-center justify-content-center ">
                                <li><a href="#"><span>About Us</span></a></li>
                                <li><a href="#"><span>Terms of Use</span></a></li>   
                                <li><a href="#"><span>Privacy Policy</span></a></li>
                                <li><a href="#"><span>Contact Us</span></a></li>
                                <li><a title="Career Job" href="#"><span>Career</span></a></li>
                            </ul>
                        </div>
                        <div className="copyright text-center pt-2">© 2020, Appy Pie. All Rights Reserved.</div>
                    </div>
                    <div className="col-xs-12 col-sm-12 col-md-3 col-lg-3 vcenter">
                        <div className="socialLinks">
                            <ul className="social_icons-footer">
                                <li className="facebook">
                                    <a href="https://www.facebook.com/AppyPieInc" rel="nofollow noopener" title="Facebook" role="link">Facebook
                                        <span className="icon-facebook">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="10.879" height="21.757" viewBox="0 0 10.879 21.757">
                                                <path id="facebook" d="M15.08,3.613h1.986V.153A25.648,25.648,0,0,0,14.173,0C11.309,0,9.347,1.8,9.347,5.112V8.159H6.187v3.867h3.16v9.731h3.875v-9.73h3.032l.481-3.867H13.221V5.5c0-1.118.3-1.883,1.859-1.883Z" transform="translate(-6.187)" fill="#606060"/>
                                            </svg>
                                        </span>
                                    </a>
                                </li>
                                <li className="twitter">
                                    <a href="https://twitter.com/AppyPieInc" rel="nofollow noopener" title="Twitter" role="link">Twitter
                                        <span className="icon-twitter-bird-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="29.537" height="23.999" viewBox="0 0 29.537 23.999">
                                                <g id="twitter" transform="translate(0 -48)">
                                                    <g id="Group_1862" data-name="Group 1862" transform="translate(0 48)">
                                                    <path id="Path_1733" data-name="Path 1733" d="M29.537,50.841a12.625,12.625,0,0,1-3.489.956,6.021,6.021,0,0,0,2.664-3.347,12.1,12.1,0,0,1-3.84,1.466A6.055,6.055,0,0,0,14.4,54.057a6.235,6.235,0,0,0,.14,1.381A17.14,17.14,0,0,1,2.057,49.1,6.057,6.057,0,0,0,3.917,57.2a5.98,5.98,0,0,1-2.736-.746v.066a6.083,6.083,0,0,0,4.851,5.95,6.044,6.044,0,0,1-1.588.2,5.354,5.354,0,0,1-1.146-.1,6.113,6.113,0,0,0,5.658,4.218,12.167,12.167,0,0,1-7.508,2.583A11.34,11.34,0,0,1,0,69.282,17.048,17.048,0,0,0,9.289,72c11.143,0,17.235-9.23,17.235-17.231,0-.268-.009-.526-.022-.783A12.08,12.08,0,0,0,29.537,50.841Z" transform="translate(0 -48)" fill="#606060"/>
                                                    </g>
                                                </g>
                                            </svg>
                                        </span>
                                    </a>
                                </li>
                                <li className="pin">
                                    <a href="https://www.pinterest.com/appypie/" rel="nofollow noopener" title="Pinterest" role="link">Pinterest
                                        <span className="icon-pinterest-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="19.499" height="24" viewBox="0 0 19.499 24">
                                                <path id="pinterest" d="M12.326,0C5.747,0,2.25,4.216,2.25,8.812c0,2.131,1.191,4.79,3.1,5.633.544.245.472-.054.94-1.844a.425.425,0,0,0-.1-.417C3.46,9.031,5.654,2.549,11.937,2.549c9.093,0,7.394,12.582,1.582,12.582A2.146,2.146,0,0,1,11.258,12.5c.428-1.733,1.266-3.6,1.266-4.845,0-3.148-4.69-2.681-4.69,1.49A5.046,5.046,0,0,0,8.29,11.3S6.781,17.4,6.5,18.539a16.177,16.177,0,0,0,.111,5.318.158.158,0,0,0,.288.073,18.858,18.858,0,0,0,2.484-4.678c.186-.685.949-3.465.949-3.465a4.146,4.146,0,0,0,3.5,1.668c4.6,0,7.918-4.04,7.918-9.053C21.733,3.6,17.62,0,12.326,0Z" transform="translate(-2.25)" fill="#606060"/>
                                            </svg>
                                        </span>
                                    </a>
                                </li>
                                <li className="blog">
                                    <a href="https://www.appypie.com/blog" rel="nofollow noopener" title="Appypie blog" role="link">Appypie blog
                                        <span className="icon-blogger">
                                            <svg id="blogger" xmlns="http://www.w3.org/2000/svg" width="24.001" height="24.001" viewBox="0 0 24.001 24.001">
                                                <g id="Group_1863" data-name="Group 1863">
                                                    <path id="Path_1734" data-name="Path 1734" d="M23.389,9.285c-.507-.216-2.681.024-3.284-.521-.426-.393-.453-1.1-.62-2.052A8.612,8.612,0,0,0,18.8,4.139C17.747,1.91,15.221,0,12.926,0H7.605A7.618,7.618,0,0,0,0,7.586V16.43A7.61,7.61,0,0,0,7.605,24h8.741a7.627,7.627,0,0,0,7.607-7.571L24,10.305A1.161,1.161,0,0,0,23.389,9.285ZM7.7,6.2h4.218a1.447,1.447,0,1,1,0,2.894H7.7A1.447,1.447,0,1,1,7.7,6.2Zm8.573,11.562H7.7a1.443,1.443,0,1,1,0-2.886h8.573a1.443,1.443,0,1,1,0,2.886Z" fill="#606060"/>
                                                </g>
                                            </svg>
                                        </span>
                                    </a>
                                </li>
                                <li className="linden">
                                    <a href="https://www.linkedin.com/company/appy-pie-inc/" rel="nofollow noopener" title="linkedin" role="link">linkedin
                                        <span className="icon-linkedin-1">
                                            <svg id="linkedin" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                                <path id="Path_1735" data-name="Path 1735" d="M23.994,24H24V15.2c0-4.306-.927-7.623-5.961-7.623a5.226,5.226,0,0,0-4.707,2.587h-.07V7.976H8.489V24h4.97V16.065c0-2.089.4-4.109,2.983-4.109,2.549,0,2.587,2.384,2.587,4.243V24Z" fill="#606060"/>
                                                <path id="Path_1736" data-name="Path 1736" d="M.4,7.977H5.372V24H.4Z" fill="#606060"/>
                                                <path id="Path_1737" data-name="Path 1737" d="M2.882,0A2.9,2.9,0,1,0,5.764,2.882,2.883,2.883,0,0,0,2.882,0Z" fill="#606060"/>
                                            </svg>
                                        </span>
                                    </a>   
                                </li>
                                <li className="youtube">
                                    <a href="https://www.youtube.com/user/AppyPieInc" rel="nofollow noopener" title="Youtube" role="link">Youtube
                                        <span className="icon-youtube">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="34.272" height="23.996" viewBox="0 0 34.272 23.996">
                                                <path id="youtube" d="M33.566-2.327a4.294,4.294,0,0,0-3.021-3.021c-2.682-.734-13.41-.734-13.41-.734s-10.727,0-13.409.706A4.381,4.381,0,0,0,.706-2.327,45.242,45.242,0,0,0,0,5.916a45.075,45.075,0,0,0,.706,8.243A4.294,4.294,0,0,0,3.727,17.18c2.71.734,13.41.734,13.41.734s10.727,0,13.409-.706a4.294,4.294,0,0,0,3.021-3.021,45.256,45.256,0,0,0,.706-8.243S34.3.354,33.566-2.327ZM13.72,11.054V.778l8.921,5.138Zm0,0" transform="translate(0 6.082)" fill="#606060"/>
                                            </svg>
                                        </span>
                                    </a>
                                </li>
                                <li className="instagram">
                                    <a href="https://www.instagram.com/AppyPieInc/" rel="nofollow noopener" title="Instagram" role="link">Instagram
                                        <span className="icon-instagram">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                                <g id="instagram-sketched" transform="translate(0 -0.001)">
                                                    <path id="Path_1740" data-name="Path 1740" d="M12,5.838A6.158,6.158,0,1,0,18.162,12,6.157,6.157,0,0,0,12,5.838Zm0,10.155a4,4,0,1,1,4-4A4,4,0,0,1,12,15.993Z" fill="#606060"/>
                                                    <path id="Path_1741" data-name="Path 1741" d="M16.948.076c-2.208-.1-7.677-.1-9.887,0A7.172,7.172,0,0,0,2.025,2.017C-.283,4.325.012,7.435.012,12c0,4.668-.26,7.706,2.013,9.979C4.342,24.291,7.5,23.988,12,23.988c4.624,0,6.22,0,7.855-.63,2.223-.863,3.9-2.85,4.065-6.419.1-2.209.1-7.677,0-9.887-.2-4.213-2.459-6.768-6.976-6.976Zm3.5,20.372c-1.513,1.513-3.612,1.378-8.468,1.378-5,0-7.005.074-8.468-1.393-1.685-1.677-1.38-4.37-1.38-8.453,0-5.525-.567-9.5,4.978-9.788,1.274-.045,1.649-.06,4.856-.06l.045.03c5.329,0,9.51-.558,9.761,4.986.057,1.265.07,1.645.07,4.847,0,4.942.093,6.959-1.394,8.453Z" fill="#606060"/>
                                                    <circle id="Ellipse_83" data-name="Ellipse 83" cx="1.439" cy="1.439" r="1.439" transform="translate(16.967 4.156)" fill="#606060"/>
                                                </g>
                                            </svg>
                                        </span>
                                    </a>
                                </li>
                                <li className="news">
                                    <a href="https://news.appypie.com/" rel="nofollow noopener" title="Appy Pie News" role="link">Appy Pie News
                                        <span className="newsicon">
                                            <img alt="Appy Pie News" src="https://www.appypie.com/wp-content/uploads/2019/10/newsicon.svg" width={25} height={25} style={{width: '100%'}} data-lazy-src="https://www.appypie.com/wp-content/uploads/2019/10/newsicon.svg" className="lazyloaded" data-was-processed="true" />
                                        </span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    </div>
                </div> */}
                    

            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const  showcomponent  = state.toogle;
    return {
        showcomponent
    }
}
export default connect(mapStateToProps)(Sidebar);
