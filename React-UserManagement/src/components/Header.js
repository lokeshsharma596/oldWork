import React from "react"
import { useSelector,useDispatch } from "react-redux"
import {showNotificationlisting,showeditprofilepage} from "../containers/HomePage/actions"
import Profileedit from './Profileedit'
import { getname } from "./../utils/functions"
import Prefrencepop from "./Prefrencepop"
import Loader from "../components/Loader"
var createGuest = require('cross-domain-storage/guest');
var bazStorage = createGuest(`${process.env.REACT_APP_API_KB_BACKEND}`);


export default function Header() {
  const dispatch = useDispatch()
  const homeData = useSelector(state => state.homeReducer)
  let user = JSON.parse(localStorage.getItem('user'));
  
  const logout=(e)=>{
    e.preventDefault();
    localStorage.removeItem('userId');
    localStorage.removeItem('user');
    localStorage.removeItem('login_status');
    bazStorage.remove('user', function(error, data) {
      // foo is now removed
    });
    bazStorage.set('login_status', 'no', function(error, data) {
        // foo is now set to 'bar'
    });
    
    window.location=`${process.env.REACT_APP_API_HELPDESK}`
    
}
const allLogout=(e)=>{
    e.preventDefault();
    localStorage.removeItem('userId');
    localStorage.removeItem('user');
    localStorage.removeItem('login_status');
    bazStorage.remove('user', function(error, data) {
      // foo is now removed
    });
    bazStorage.set('login_status', 'no', function(error, data) {
        // foo is now set to 'bar'
    });
    var parentSite = `${process.env.REACT_APP_API_COMMON_LOGIN}`;
    var iframeEl = document.getElementById('iframe1');
    var postData = {
        'method': 'set',
        'field': 'logout_product',
        'value': 'helpdesk'
    };
    iframeEl.contentWindow.postMessage(postData, parentSite);
    var postDatas = {
        'method': 'set',
        'field': 'login_status',
        'value': 'no'
    };
    iframeEl.contentWindow.postMessage(postDatas, parentSite);
    window.location=`${process.env.REACT_APP_API_HELPDESK}`
    
}
  return (

    <header className="topbar">
      {/* <nav className="navbar top-navbar k-flex justify-content-end align-items-center">
        <ul className="navbar-nav navbar-nav-left">
          <li>User Management</li>
        </ul>
        <ul className="navbar-nav navbar-nav-right">
          <li>
            <a className="notification-wrapper" href="javascript:void(0)" onClick={() => dispatch(showNotificationlisting()) }>
              <span>
               
                <svg xmlns="http://www.w3.org/2000/svg" width={26} height="31.201" viewBox="0 0 26 31.201">
                  <g id="Group_548" data-name="Group 548" transform="translate(0)">
                    <g id="Group_545" data-name="Group 545">
                      <g id="Group_544" data-name="Group 544">
                        <path id="Path_1265" data-name="Path 1265" d="M68.583,26.317,66.351,22.6a11.052,11.052,0,0,1-1.576-5.686V13.651a9.112,9.112,0,0,0-6.5-8.717V2.6a2.6,2.6,0,0,0-5.2,0V4.934a9.112,9.112,0,0,0-6.5,8.717V16.91A11.059,11.059,0,0,1,45,22.6l-2.232,3.721a.651.651,0,0,0,.556.985h24.7a.65.65,0,0,0,.558-.984Z" transform="translate(-42.675)" fill="#d0d0d0" />
                      </g>
                    </g>
                    <g id="Group_547" data-name="Group 547" transform="translate(8.906 28.601)">
                      <g id="Group_546" data-name="Group 546">
                        <path id="Path_1266" data-name="Path 1266" d="M188.815,469.333a4.523,4.523,0,0,0,8.188,0Z" transform="translate(-188.815 -469.333)" fill="#d0d0d0" />
                      </g>
                    </g>
                  </g>
                </svg>
              </span>
            </a>
          </li>
          <li className="nav-item dropdown">
            <a data-toggle="dropdown">
              <span className="profileHeader">
                <img src={(user.length>0)?((user[0].data.imageUrl)?user[0].data.imageUrl:`images/profile.jpg`):`images/profile.jpg`} alt="profile" />
              </span>
            </a>
            <div className="profileMenuHeader navbarDropdown dropdown-menu-right dropdown-menu" aria-labelledby="navbarDropdown1">
              <div className="user-profile-dropdown">
                <div>
                  <p className="signOut">
                    <span className="edit-profile-icon" onClick={() => dispatch(showeditprofilepage()) }>
                      <svg xmlns="http://www.w3.org/2000/svg" width="23.116" height={23} viewBox="0 0 23.116 23">
                        <g id="edit" transform="translate(0 -0.261)">
                          <path id="Path_1932" data-name="Path 1932" d="M21.335,51.366a.576.576,0,0,0-.576.576v5.112a1.729,1.729,0,0,1-1.727,1.727H2.879a1.729,1.729,0,0,1-1.727-1.727v-15a1.729,1.729,0,0,1,1.727-1.727H7.99a.576.576,0,0,0,0-1.151H2.879A2.882,2.882,0,0,0,0,42.05v15a2.882,2.882,0,0,0,2.879,2.879H19.032a2.882,2.882,0,0,0,2.879-2.879V51.941A.576.576,0,0,0,21.335,51.366Zm0,0" transform="translate(0 -36.671)" />
                          <path id="Path_1933" data-name="Path 1933" d="M123.644,1.02a2.591,2.591,0,0,0-3.664,0L109.709,11.291a.576.576,0,0,0-.148.253l-1.351,4.876a.576.576,0,0,0,.708.709l4.876-1.351a.576.576,0,0,0,.253-.148L124.32,5.359a2.594,2.594,0,0,0,0-3.664ZM110.964,11.665l8.406-8.406,2.711,2.711-8.406,8.406Zm-.542,1.087,2.166,2.166-3,.83Zm13.084-8.207-.611.611-2.711-2.711.611-.611a1.439,1.439,0,0,1,2.035,0l.676.676A1.441,1.441,0,0,1,123.506,4.545Zm0,0" transform="translate(-101.961)" />
                        </g>
                      </svg>
                    </span>
                  </p>
                  <div className="header-profile px-3">
                    <div className="profile-image-header"><img src={(user.length>0)?((user[0].data.imageUrl)?user[0].data.imageUrl:`images/profile.jpg`):`images/profile.jpg`} alt="profile" /></div>
                    <div className="profile-details-header">
                      <div className="name-profile-header pb-1 pt-0 text-left">
                        <h4 className="card-title">{getname(user[0])}</h4>
                        <p className="card-body-text"> </p>
                      </div>
                      <div className="name-email-header text-left">
                      <p className="card-body-text"><a href={(user.length>0)?user[0].data.email:""} onClick={() => dispatch(showeditprofilepage()) }>{(user.length>0)?user[0].data.email:""}</a></p>
                        <p className="card-body-text mt-n2"><a href="telto:+919876543210" className=" waves-effect waves-light" /></p>
                      </div>
                    </div>
                  </div>
                  <div className="header-drp-policy pt-0 pb-2 text-left">
                    <ul>
                      <li>
                        <a href={`${process.env.REACT_APP_API_KB_BACKEND}`+'/privacysettings'} className=" waves-effect waves-light">
                          <svg xmlns="http://www.w3.org/2000/svg" width="18.349" height="18.863" viewBox="0 0 18.349 18.863">
                            <path id="Icon_material-settings" data-name="Icon material-settings" d="M19.59,13.356a6.5,6.5,0,0,0,0-1.849l1.99-1.556a.476.476,0,0,0,.113-.6L19.807,6.084a.474.474,0,0,0-.575-.207l-2.348.943A6.891,6.891,0,0,0,15.289,5.9l-.358-2.5a.46.46,0,0,0-.462-.4H10.7a.46.46,0,0,0-.462.4L9.875,5.9a7.246,7.246,0,0,0-1.594.924L5.933,5.877a.46.46,0,0,0-.575.207L3.471,9.347a.465.465,0,0,0,.113.6l1.99,1.556a7.48,7.48,0,0,0-.066.924,7.48,7.48,0,0,0,.066.924l-1.99,1.556a.476.476,0,0,0-.113.6l1.886,3.263a.474.474,0,0,0,.575.207l2.348-.943a6.891,6.891,0,0,0,1.594.924l.358,2.5a.46.46,0,0,0,.462.4h3.773a.46.46,0,0,0,.462-.4l.358-2.5a7.246,7.246,0,0,0,1.594-.924l2.348.943a.46.46,0,0,0,.575-.207l1.886-3.263a.476.476,0,0,0-.113-.6l-1.99-1.556Zm-7.008,2.377a3.3,3.3,0,1,1,3.3-3.3A3.3,3.3,0,0,1,12.582,15.733Z" transform="translate(-3.406 -3)" fill="#64b5f6" />
                          </svg>
            Privacy &amp; Security Setting
          </a>
                      </li>
                      <li>
                        <a href="javaScript:void(0)" target="_blank" className=" waves-effect waves-light" onClick={(e) => logout(e) }>
                          <svg xmlns="http://www.w3.org/2000/svg" width="17.81" height="15.584" viewBox="0 0 17.81 15.584">
                            <path id="Icon_open-account-login" data-name="Icon open-account-login" d="M6.679,0V2.226h8.905V13.358H6.679v2.226H17.81V0ZM8.905,4.453V6.679H0V8.905H8.905v2.226l4.453-3.339Z" fill="#64b5f6" />
                          </svg>
            Sign out of Appy Pie Desk
          </a>
                      </li>
                      <li>
                        <a href="javaScript:void(0)" target="_blank" className=" waves-effect waves-light" onClick={(e) => allLogout(e) }>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16.071" height="16.331" viewBox="0 0 16.071 16.331">
                            <path id="Icon_awesome-power-off" data-name="Icon awesome-power-off" d="M13.264,1.753a8.035,8.035,0,1,1-9.338,0,.78.78,0,0,1,1.134.249l.512.91a.777.777,0,0,1-.214,1,5.443,5.443,0,1,0,6.477,0,.773.773,0,0,1-.211-1l.512-.91a.777.777,0,0,1,1.128-.253Zm-3.37,6.8V.778A.776.776,0,0,0,9.117,0H8.08A.776.776,0,0,0,7.3.778V8.554a.776.776,0,0,0,.778.778H9.117A.776.776,0,0,0,9.894,8.554Z" transform="translate(-0.563)" fill="#64b5f6" />
                          </svg>
            Sign out of all Appy Pie Products
          </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

            </div>

          </li>
        </ul>
      </nav>
      
      {(homeData.showprofilepage || homeData.showpopup) ?
        <div class="shadow">&nbsp;</div>
        : null }
      {homeData.showprofilepage?<Profileedit />:null}
      {homeData.loader?<Loader/>:null}
      {homeData.showpopup?<Prefrencepop />:null} */}
    </header>

  )
}