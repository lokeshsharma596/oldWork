import React from 'react';
import { connect } from 'react-redux';
import { userActions } from '../_actions';
import {getname} from '../_helpers/auth-header'
import config from 'config';



class Header extends React.Component {
    constructor(props) {
        super(props);
        this._handlenotifysidebar = this._handlenotifysidebar.bind(this)
        this.logout = this.logout.bind(this)
        this.state={
            dropdown:false,
            counts:0,
            newcounts:0,
            searchingShow: false,
        }
        
        let user = JSON.parse(localStorage.getItem('user'));
            let orgname = (localStorage.getItem('user'))?user[0].organizationname:"";
        if(localStorage.getItem('user') && orgname)  
                document.title = "Desk:"+orgname;
    }
    _handlenotifysidebar(){
        const { dispatch } = this.props;
        dispatch({ type: 'NotifyToggle' })
    }
    
    componentWillReceiveProps(newProps) {
        this.setState({counts:newProps.counts});
        this.setState({newcounts:newProps.newcounts});
    }
 
   
    
    _handleprofileidebar=(e)=>{
        e.preventDefault();
        const { dispatch } = this.props;
        dispatch({ type: 'ProfileToggle' })
    }
    logout(){
        this.props.dispatch(userActions.logout());
    }

    searching = () => {
        this.setState({ searchingShow: !this.state.searchingShow })
    }
    closeSearch = () => {
        this.setState({ searchingShow: false })
    }
    // menuMobileClickShow=() => {
    //     var addClass = document.getElementById("main-wrapper");
    //     addClass.classList.add("mobileAddClass");
    // }

     menuMobileClickShow=() => {
        var element, name, arr;
        element = document.getElementById("main-wrapper");
        name = "mobileAddClass";
        arr = element.className.split(" ");
        if (arr.indexOf(name) == -1) {
            element.className += " " + name;
        }else{
            element.classList.remove("mobileAddClass");
        }
    }

    render() {
        const dropDown  = this.state.dropdown;
        const {user}   =this.props.authentication;
        const data   =JSON.parse(localStorage.getItem('user'));
        console.log(data[0].domainname);
        const dropMenu = dropDown ? 'dropdown-menu show' : 'dropdown-menu';
        return (
            <header className={'topbar '+ ((!data[0].domainname)?'no-click':'no--click')}>
            <nav className="navbar top-navbar k-flex justify-content-end align-items-center non-click">
                <div className="mobile-menu pr-2" onClick={this.menuMobileClickShow}>
                    <svg id="open-menu" xmlns="http://www.w3.org/2000/svg" width="26.073" height="18.83" viewBox="0 0 26.073 18.83">
                        <path id="Path_2519" data-name="Path 2519" d="M24.986,124.841H1.086a1.086,1.086,0,0,1,0-2.173h23.9a1.086,1.086,0,0,1,0,2.173Zm0,0" transform="translate(0 -114.339)"/>
                        <path id="Path_2520" data-name="Path 2520" d="M24.986,2.173H1.086A1.086,1.086,0,0,1,1.086,0h23.9a1.086,1.086,0,0,1,0,2.173Zm0,0"/>
                        <path id="Path_2521" data-name="Path 2521" d="M24.986,247.5H1.086a1.086,1.086,0,0,1,0-2.173h23.9a1.086,1.086,0,0,1,0,2.173Zm0,0" transform="translate(0 -228.674)"/>
                    </svg>
                </div>
                <ul className="navbar-nav navbar-nav-left">
                    <li>Knowledge</li>
                </ul>
                <ul className="navbar-nav navbar-nav-right">
                    <li className="mobile-show" style={{paddingTop:'12px'}}>
                    {this.state.searchingShow ? 
                        <span className="gridTileOption searchFocuse mobile-search">
                            <input type="text" placeholder="Search for Article" onChange={this.handleKeyUp} />
                            <span className="searchValues" onClick={this.closeSearch}><svg xmlns="http://www.w3.org/2000/svg" width="17.49"
                                height="17.49" viewBox="0 0 17.49 17.49">
                                <path id="ic_zoom_out_24px"
                                    d="M15.5,14h-.79l-.28-.27a6.51,6.51,0,1,0-.7.7l.27.28v.79l5,4.99L20.49,19Zm-6,0A4.5,4.5,0,1,1,14,9.5,4.494,4.494,0,0,1,9.5,14Z"
                                    transform="translate(-3 -3)" fill="#a2abd1" />
                            </svg></span>
                            <span className="click-Search-cat" onClick={this.componentDidMount}>Search</span>
                        </span>:
                        <span onClick={this.searching}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 17.49 17.49"><path id="ic_zoom_out_24px" d="M15.5,14h-.79l-.28-.27a6.51,6.51,0,1,0-.7.7l.27.28v.79l5,4.99L20.49,19Zm-6,0A4.5,4.5,0,1,1,14,9.5,4.494,4.494,0,0,1,9.5,14Z" transform="translate(-3 -3)" fill="#a2abd1"></path></svg>
                        </span> }
                    </li>
                    <li className="nav-item dropdown" style={{display:'none'}}>
                        <a href="#" data-toggle="dropdown">
                            <span>
                                {this.state.dropdown}
                                <svg xmlns="http://www.w3.org/2000/svg" width="31" height="31" viewBox="0 0 31 31">
                                    <g id="Group_1019" data-name="Group 1019" transform="translate(-1241.689 -20.984)">
                                        <g id="Group_1597" data-name="Group 1597"
                                            transform="translate(297.509 -503.146)">
                                            <rect id="Rectangle_910" data-name="Rectangle 910" width="31" height="31"
                                                rx="5" transform="translate(944.18 524.13)" fill="#eff3ff" />
                                            <path id="Path_1645" data-name="Path 1645"
                                                d="M975.18,545.55v4.58a5,5,0,0,1-5,5h-7.45Z" />
                                        </g>
                                        <path id="ic_clear_24px"
                                            d="M10.068,1.014,9.054,0,5.034,4.02,1.014,0,0,1.014l4.02,4.02L0,9.054l1.014,1.014,4.02-4.02,4.02,4.02,1.014-1.014-4.02-4.02Z"
                                            transform="translate(1249.689 36.103) rotate(-45)" />
                                    </g>
                                </svg>

                            </span>
                        </a>
                        <div className={`navbarDropdown dropdown-menu-right dropdown-menu`} aria-labelledby="navbarDropdown1">
                            <ul>
                                <li>
                                    <a className="dropdown-item" href="#">
                                        <span className="icon">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="14.734" height="18.418"
                                                viewBox="0 0 14.734 18.418">
                                                <path id="ic_description_24px"
                                                    d="M13.209,2H5.842A1.839,1.839,0,0,0,4.009,3.842L4,18.576a1.839,1.839,0,0,0,1.833,1.842h11.06a1.847,1.847,0,0,0,1.842-1.842V7.525Zm1.842,14.734H7.684V14.893h7.367Zm0-3.684H7.684V11.209h7.367Zm-2.763-4.6V3.381l5.065,5.065Z"
                                                    transform="translate(-4 -2)" fill="#bebebe" />
                                            </svg>
                                        </span>
                                        <span className="preview-item-content">
                                            Article
                                        </span>
                                    </a>
                                </li>
                                <li>
                                    <a className="dropdown-item" href="#">
                                        <span className="icon">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="19.1" height="19.1"
                                                viewBox="0 0 19.1 19.1">
                                                <g id="ticket" transform="translate(0 -0.001)">
                                                    <g id="Group_1764" data-name="Group 1764"
                                                        transform="translate(0 0.001)">
                                                        <path id="Path_1670" data-name="Path 1670"
                                                            d="M18.681,6.338,17.253,4.921a2.189,2.189,0,0,1-3.083,0,2.1,2.1,0,0,1-.635-1.542,2.1,2.1,0,0,1,.635-1.542L12.753.42A1.464,1.464,0,0,0,10.7.42L.42,10.69a1.464,1.464,0,0,0,0,2.052L1.836,14.17a2.1,2.1,0,0,1,1.542-.635,2.1,2.1,0,0,1,1.542.635,2.189,2.189,0,0,1,0,3.083l1.428,1.428a1.464,1.464,0,0,0,2.052,0L18.681,8.389a1.464,1.464,0,0,0,0-2.052ZM15.609,8.6,8.6,15.61a.739.739,0,0,1-1.02,0l-4.1-4.1a.712.712,0,0,1,0-1.02l7.005-7.005a.74.74,0,0,1,1.02,0l4.1,4.1a.711.711,0,0,1,0,1.02Z"
                                                            transform="translate(0 -0.001)" fill="#bebebe" />
                                                        <path id="Path_1671" data-name="Path 1671"
                                                            d="M120.136,113.639l3.582,3.582-6.484,6.484-3.582-3.582Z"
                                                            transform="translate(-109.14 -109.127)" fill="#bebebe" />
                                                    </g>
                                                </g>
                                            </svg>
                                        </span>
                                        <span className="preview-item-content">
                                            Ticket
                                        </span>
                                    </a>
                                </li>
                                <li>
                                    <a className="dropdown-item" href="#">
                                        <span className="icon">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16.02" height="19.223"
                                                viewBox="0 0 16.02 19.223">
                                                <path id="ic_contacts_24px"
                                                    d="M16.418,0H3.6V1.6H16.418ZM3.6,19.223H16.418v-1.6H3.6ZM16.418,3.2H3.6A1.607,1.607,0,0,0,2,4.806v9.612a1.607,1.607,0,0,0,1.6,1.6H16.418a1.607,1.607,0,0,0,1.6-1.6V4.806A1.607,1.607,0,0,0,16.418,3.2Zm-6.408,2.2a1.8,1.8,0,1,1-1.8,1.8A1.8,1.8,0,0,1,10.01,5.407Zm4,8.21H6v-1.2c0-1.338,2.667-2,4-2s4,.665,4,2Z"
                                                    transform="translate(-2)" fill="#bebebe" />
                                            </svg>
                                        </span>
                                        <span className="preview-item-content">
                                            Contact
                                        </span>
                                    </a>
                                </li>
                                <li>
                                    <a className="dropdown-item" href="#">
                                        <span className="icon">
                                            <svg id="Group_1765" data-name="Group 1765"
                                                xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                                viewBox="0 0 20 20">
                                                <g id="Group_1766" data-name="Group 1766"
                                                    transform="translate(0 6.797)">
                                                    <g id="Group_1765-2" data-name="Group 1765">
                                                        <path id="Path_1672" data-name="Path 1672"
                                                            d="M13.516,179.664a.391.391,0,0,0-.391.391v2.7a1.955,1.955,0,0,1-1.953,1.953H6.954a.391.391,0,0,0-.391.39v.777l-.932-.932a.391.391,0,0,0-.358-.235H2.734A1.955,1.955,0,0,1,.781,182.75v-6.016a1.955,1.955,0,0,1,1.953-1.953H6.68a.391.391,0,1,0,0-.781H2.734A2.737,2.737,0,0,0,0,176.734v6.016a2.737,2.737,0,0,0,2.734,2.734H5.073l1.6,1.6a.391.391,0,0,0,.667-.276v-1.328h3.827a2.737,2.737,0,0,0,2.734-2.734v-2.7A.391.391,0,0,0,13.516,179.664Z"
                                                            transform="translate(0 -174)" fill="#bebebe" />
                                                    </g>
                                                </g>
                                                <g id="Group_1768" data-name="Group 1768" transform="translate(7.656)">
                                                    <g id="Group_1767" data-name="Group 1767">
                                                        <path id="Path_1673" data-name="Path 1673"
                                                            d="M202.666,0h-.989a5.678,5.678,0,0,0,0,11.355h.989a5.688,5.688,0,0,0,1.441-.185l1.46,1.46a.391.391,0,0,0,.667-.276v-2.26a5.732,5.732,0,0,0,1.492-1.84,5.616,5.616,0,0,0,.617-2.576A5.684,5.684,0,0,0,202.666,0Zm2.943,9.591a.391.391,0,0,0-.156.312v1.508l-.956-.955a.39.39,0,0,0-.391-.1,4.9,4.9,0,0,1-1.44.215h-.989a4.9,4.9,0,0,1,0-9.793h.989a4.9,4.9,0,0,1,2.943,8.81Z"
                                                            transform="translate(-196)" fill="#bebebe" />
                                                    </g>
                                                </g>
                                                <g id="Group_1770" data-name="Group 1770"
                                                    transform="translate(12.284 2.737)">
                                                    <g id="Group_1769" data-name="Group 1769">
                                                        <path id="Path_1674" data-name="Path 1674"
                                                            d="M317.766,71.6a1.658,1.658,0,0,0-1.533-1.533,1.641,1.641,0,0,0-1.245.441,1.66,1.66,0,0,0-.526,1.209.391.391,0,0,0,.781,0,.873.873,0,0,1,.935-.87.873.873,0,0,1,.129,1.722.739.739,0,0,0-.582.725v.938a.391.391,0,0,0,.781,0v-.907A1.645,1.645,0,0,0,317.766,71.6Z"
                                                            transform="translate(-314.462 -70.063)" fill="#bebebe" />
                                                    </g>
                                                </g>
                                                <g id="Group_1772" data-name="Group 1772"
                                                    transform="translate(13.547 8.06)">
                                                    <g id="Group_1771" data-name="Group 1771">
                                                        <path id="Path_1675" data-name="Path 1675"
                                                            d="M347.467,206.444a.391.391,0,1,0,.114.276A.394.394,0,0,0,347.467,206.444Z"
                                                            transform="translate(-346.8 -206.33)" fill="#bebebe" />
                                                    </g>
                                                </g>
                                                <g id="Group_1774" data-name="Group 1774"
                                                    transform="translate(2.109 12.109)">
                                                    <g id="Group_1773" data-name="Group 1773">
                                                        <path id="Path_1676" data-name="Path 1676"
                                                            d="M62.633,310H54.391a.391.391,0,1,0,0,.781h8.242a.391.391,0,0,0,0-.781Z"
                                                            transform="translate(-54 -310)" fill="#bebebe" />
                                                    </g>
                                                </g>
                                                <g id="Group_1776" data-name="Group 1776"
                                                    transform="translate(10.352 14.297)">
                                                    <g id="Group_1775" data-name="Group 1775">
                                                        <path id="Path_1677" data-name="Path 1677"
                                                            d="M265.667,366.114a.39.39,0,1,0,.114.276A.393.393,0,0,0,265.667,366.114Z"
                                                            transform="translate(-265 -366)" fill="#bebebe" />
                                                    </g>
                                                </g>
                                                <g id="Group_1778" data-name="Group 1778"
                                                    transform="translate(2.109 14.297)">
                                                    <g id="Group_1777" data-name="Group 1777">
                                                        <path id="Path_1678" data-name="Path 1678"
                                                            d="M61.1,366H54.391a.391.391,0,1,0,0,.781H61.1a.391.391,0,0,0,0-.781Z"
                                                            transform="translate(-54 -366)" fill="#bebebe" />
                                                    </g>
                                                </g>
                                                <g id="Group_1780" data-name="Group 1780"
                                                    transform="translate(2.109 9.922)">
                                                    <g id="Group_1779" data-name="Group 1779">
                                                        <path id="Path_1679" data-name="Path 1679"
                                                            d="M60.094,254h-5.7a.391.391,0,0,0,0,.781h5.7a.391.391,0,0,0,0-.781Z"
                                                            transform="translate(-54 -254)" fill="#bebebe" />
                                                    </g>
                                                </g>
                                            </svg>
                                        </span>
                                        <span className="preview-item-content">
                                            Community Post
                                        </span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li>
                  <a className="notification-wrapper" onClick={this._handlenotifysidebar}>
                            <span>
                                {(this.state.newcounts >0) && <span className="notification-header">{this.state.newcounts}</span>}
                                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="31.201"
                                    viewBox="0 0 26 31.201">
                                    <g id="Group_548" data-name="Group 548" transform="translate(0)">
                                        <g id="Group_545" data-name="Group 545">
                                            <g id="Group_544" data-name="Group 544">
                                                <path id="Path_1265" data-name="Path 1265"
                                                    d="M68.583,26.317,66.351,22.6a11.052,11.052,0,0,1-1.576-5.686V13.651a9.112,9.112,0,0,0-6.5-8.717V2.6a2.6,2.6,0,0,0-5.2,0V4.934a9.112,9.112,0,0,0-6.5,8.717V16.91A11.059,11.059,0,0,1,45,22.6l-2.232,3.721a.651.651,0,0,0,.556.985h24.7a.65.65,0,0,0,.558-.984Z"
                                                    transform="translate(-42.675)" fill="#d0d0d0" />
                                            </g>
                                        </g>
                                        <g id="Group_547" data-name="Group 547" transform="translate(8.906 28.601)">
                                            <g id="Group_546" data-name="Group 546">
                                                <path id="Path_1266" data-name="Path 1266"
                                                    d="M188.815,469.333a4.523,4.523,0,0,0,8.188,0Z"
                                                    transform="translate(-188.815 -469.333)" fill="#d0d0d0" />
                                            </g>
                                        </g>
                                    </g>
                                </svg>
                            </span>
                            </a>
                    </li>
                    <li className="nav-item dropdown">
                        <a  data-toggle="dropdown">
                            <span className="profileHeader">
                                <img src={(user.length>0)?((data[0].data.imageUrl)?data[0].data.imageUrl:`${config.path}/images/profile.jpg`):`${config.path}/images/profile.jpg`} alt="profile" />
                            </span>
                        </a>
                        <div className={`profileMenuHeader navbarDropdown dropdown-menu-right dropdown-menu`} aria-labelledby="navbarDropdown1">
                            <div className="user-profile-dropdown">
                                <div>
                                    <p className="signOut">
                                        <span onClick={this.logout}><span><svg xmlns="http://www.w3.org/2000/svg" width="13.752" height="13.974" viewBox="0 0 13.752 13.974">
  <path id="Icon_awesome-power-off" data-name="Icon awesome-power-off" d="M11.431,1.5a6.875,6.875,0,1,1-7.991,0,.667.667,0,0,1,.97.213l.438.779a.665.665,0,0,1-.183.86,4.658,4.658,0,1,0,5.542,0,.661.661,0,0,1-.18-.857l.438-.779a.665.665,0,0,1,.965-.216ZM8.548,7.32V.665A.664.664,0,0,0,7.882,0H6.995A.664.664,0,0,0,6.33.665V7.32a.664.664,0,0,0,.665.665h.887A.664.664,0,0,0,8.548,7.32Z" transform="translate(-0.562)" fill="#64b5f6"/>
</svg>
</span>Sign Out</span>
            <span className="edit-profile-icon" onClick={this._handleprofileidebar}> 
                <svg xmlns="http://www.w3.org/2000/svg" width="23.116" height="23" viewBox="0 0 23.116 23">
                    <g id="edit" transform="translate(0 -0.261)">
                        <path id="Path_1932" data-name="Path 1932" d="M21.335,51.366a.576.576,0,0,0-.576.576v5.112a1.729,1.729,0,0,1-1.727,1.727H2.879a1.729,1.729,0,0,1-1.727-1.727v-15a1.729,1.729,0,0,1,1.727-1.727H7.99a.576.576,0,0,0,0-1.151H2.879A2.882,2.882,0,0,0,0,42.05v15a2.882,2.882,0,0,0,2.879,2.879H19.032a2.882,2.882,0,0,0,2.879-2.879V51.941A.576.576,0,0,0,21.335,51.366Zm0,0" transform="translate(0 -36.671)"/>
                        <path id="Path_1933" data-name="Path 1933" d="M123.644,1.02a2.591,2.591,0,0,0-3.664,0L109.709,11.291a.576.576,0,0,0-.148.253l-1.351,4.876a.576.576,0,0,0,.708.709l4.876-1.351a.576.576,0,0,0,.253-.148L124.32,5.359a2.594,2.594,0,0,0,0-3.664ZM110.964,11.665l8.406-8.406,2.711,2.711-8.406,8.406Zm-.542,1.087,2.166,2.166-3,.83Zm13.084-8.207-.611.611-2.711-2.711.611-.611a1.439,1.439,0,0,1,2.035,0l.676.676A1.441,1.441,0,0,1,123.506,4.545Zm0,0" transform="translate(-101.961)"/>
                    </g>
                </svg>

            </span>
 </p>
                                    <div className="profile-image-header">
                                        <img src={(user.length>0)?((data[0].data.imageUrl)?data[0].data.imageUrl:`${config.path}/images/profile.jpg`):`${config.path}/images/profile.jpg`} />
                                    </div>
                                    <div className="name-profile-header pt-3 pb-3 text-center">
                                        <h4 className="card-title">{getname(data[0])}</h4>
                                        <p className="card-body-text">{(data.length>0)?((data[0].data.department)?data[0].data.department+"-":""):""} {(data.length>0)?((data[0].data.designation)?data[0].data.designation:""):""}</p>
                                    </div>
                                    <div className="name-email-header border-bottom text-center pb-3">
                                        {<p className="card-body-text"><a href={(data.length>0)?data[0].data.email:""} onClick={this._handleprofileidebar}>{(data.length>0)?data[0].data.email:""}</a></p>}
                                        <p className="card-body-text"><a href="telto:+919876543210">{(user.length>0)?((data[0].data.phoneno)?"+"+data[0].data.phoneno:""):""}</a></p>
                                    </div>
                                    <div className="header-drp-policy pt-2 pb-2 text-center">
                                        <ul>
                                            <li><a href={`${config.path}/privacysettings`}>Privacy Settings</a></li>
                                            <li><a href="https://www.appypie.com/terms-of-use" target="_blank">Terms & Conditions</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                    {/* <li>
                        <div className="lang-dropdown">
                            <span className="country-icon">
                                <img src={`${config.path}/images/united-states-of-america.jpg`} />
                            </span>
                            <select className="lang-select">
                                <option selected>Eng</option>
                                <option>Hindi</option>
                            </select>
                        </div>

                    </li> */}
                </ul>
            </nav>
        </header> 
        );
    }
}

function mapStateToProps(state){
    const showComponent   = state.toogle;
    const authentication   = state.authentication;
    return {
        showComponent,authentication
    };
}

Header = connect(mapStateToProps)(Header);
export default Header