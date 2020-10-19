import React, { Suspense } from 'react';
import { Router, BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from '../_helpers';
import { alertActions } from '../_actions';
import { PrivateRoute } from '../_components';
import { PublicRoute } from '../_components';
import Gsignin  from '../_helpers/gsignin';
import Gsignup  from '../_helpers/gsignup';

import OnboardingComman from '../onboarding/index';

//import { Authenticate } from '../_components/Authenticate';
import { HomePage } from '../HomePage';
import { LoginPage } from '../LoginPage';
import { SignupPage } from '../SignupPage';
import { VerifyPage } from '../VerifyPage';
import { ForgetPasswordPage } from '../ForgetPasswordPage';
import { Category } from '../Category';
import { Settings } from '../Setting/setting';
import { KbSettings } from '../KbSetting/KbSettings';
import { privacySettings } from '../PrivacySettings/privacy-settings';
import { Nodata } from '../KbSetting/no-data';
import Getstarted from '../LoginPage/getstarted';
import Header from '../_layouts/header';
import Sidebar from '../_layouts/sidebar';

import OrganisationName from '../Organisation/OrganisationName';
import Createthames from '../Organisation/Createthames';
import DeskSettings from '../DeskSettings/home';
import { PrefencePopup } from '../PrefencePopup/PrefencePopup';

import { CategoryList } from '../Category/CategoryList';
import { FolderList } from '../Folder/FolderList'
import { Article } from '../Article'
import { CompanyDetail } from '../CompanyDetail/CompanyDetail'
import { ConfirmPassword } from '../ForgetPasswordPage/ConfirmPassword'
import googlelogin from '../_helpers/googlelogin'
import { succespage } from '../ForgetPasswordPage/succespage'
import { SignupSuccessPage } from '../SignupPage/SignupSuccessPage';
import { ProfileDesign } from '../ProfilePage/profiledesign';
import { Csvupload } from '../_components/Csvupload'
import { userService } from '../_services';
import { NotifySidebar } from '../_layouts/NotifySidebar';
import { Csvexport } from '../_components/Csvexport';
import Amplify from 'aws-amplify';
import awsmobile from '../config/amplify';
import awsexport from '../config/aws-export';
import { userConstants } from '../_constants';
import { userActions } from '../_actions';
console.log(history.location.search)
const query = new URLSearchParams(history.location.search);
if (!query.get('code')) {
    if (history.location.pathname == "/signup")
        Amplify.configure(awsmobile)
    else
        Amplify.configure(awsexport)
}
//var CrossStorageClient = require('cross-storage').CrossStorageClient;
//var storage = new CrossStorageClient('https://commonlogin.pbodev.info/');


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0,
            notify: [],
            newcount: 0
        }
        const { dispatch } = this.props;
        history.listen((location, action) => {
            setTimeout(() => {
                dispatch(alertActions.clear());
            }, 5000)
        });
        setTimeout(() => {
            dispatch(alertActions.clear());
        }, 5000)
        let user = JSON.parse(localStorage.getItem('user'));
        let domainname = (localStorage.getItem('user')) ? user[0].domainname : "";
        if (localStorage.getItem('user') && !domainname)
            history.replace("/setup1");
            
        if(localStorage.getItem('user')){
            window.dataLayer.push({
                'account': {
                'id':user[0].id,
                'email':user[0].data.email,
                'createdAt':user[0].data.createdON, //UNIX Timestamp for account creation date
                'publishedArticles':user[0].publisharticle,
                'draftArticles':user[0].draftarticle
                }
                });
                
        }

        //  const query = new URLSearchParams(this.props.location.search);
        //  console.log(query.get('code'));
    }



    componentDidMount() {
        if (localStorage.getItem('user')){
            this.fetchdata();
        }
           // window.addEventListener('message', this.handleMessage);  
             
    }
    
    handleMessage(event) {
        var iframeEl = document.getElementById('iframe1');
        var parentSite = "https://commonlogin.appypie.com/assets/hubfile.html";
    
        if (event.data.method == 'get') {
            /*var valueField = localStorage.getItem(event.data.field);		
            var postData = {'method':'set','field':event.data.field,'value':valueField};
            iframeEl.contentWindow.postMessage(postData,event.origin);*/
    
        } else if (event.data.method == 'set') {
            localStorage.setItem(event.data.field, event.data.value);
            if ((event.data.field == 'userdata')) {
                var userdata = JSON.parse(localStorage.getItem("userdata"));
                
            }
            if ((event.data.field == 'login_status' && event.data.value == 'yes')) {
                if (localStorage.getItem("userdata") == null || localStorage.getItem("userdata") == '') {
                    var iframeEl = document.getElementById('iframe1');
                    var postData = {
                        'method': 'get',
                        'field': 'userdata'
                    };
                    iframeEl.contentWindow.postMessage(postData, parentSite);
                }
                // var div = document.getElementById('loginlogout');
                // div.innerHTML = '<div id="logoutSection" class="logoutSection"><button onclick="logoutData()">Logout</button></div>';
            } else if ((event.data.field == 'login_status' && event.data.value == 'no')) {
                if(localStorage.getItem('user'))
                userActions.logout();
                var url = window.location.protocol+"//"+window.location.host;
                var redirectFile = 'https://commonlogin.appypie.com/login?frompage='+url+'/&website='+url;
                window.location.href=redirectFile; 
                localStorage.setItem("userdata", '');
                // var div = document.getElementById('userData');
                // div.innerHTML = localStorage.getItem("userdata");
                // var div = document.getElementById('loginlogout');
                // div.innerHTML = '<div id="loginSection" class="loginSection"><a href="' + redirectFile + '">Login</a></div>';
            }
    
    
        } else if (event.data.method == 'remove') {
            localStorage.setItem(event.data.field, '');
        }
    }
    
    componentDidUpdate(){
        const { dispatch } = this.props;
    //         if(localStorage.getItem("login_status") == "yes" && !localStorage.getItem('user')) {   
    //         var userdata = JSON.parse(localStorage.getItem("userdata"));
    //         userService.login(userdata['password_update_time'], userdata['email'])
    //             .then(
    //                 user => { 
    //                     dispatch(success(user.data));
    //                     dispatch(alertActions.success(user.message)); 
    //                     localStorage.removeItem('tempdata'); 
    //                     let users = JSON.parse(localStorage.getItem('user'));
    //                     var iframeEl = document.getElementById('iframe1');
    //                     var parentSite = "https://commonlogin.appypie.com/assets/hubfile.html";
    //                     var postData = {
    //                         'method': 'set',
    //                         'field': 'login_product',
    //                         'value': 'helpdesk'
    //                     };
    //                     iframeEl.contentWindow.postMessage(postData, parentSite);
    //                     window.dataLayer.push({
    //                         'account': {
    //                         'id':users[0].id,
    //                         'email':users[0].data.email,
    //                         'createdAt':users[0].data.createdON, //UNIX Timestamp for account creation date
    //                         'publishedArticles':users[0].publisharticle,
    //                         'draftArticles':users[0].draftarticle
    //                         }
    //                         });
    //                     if(parseInt(localStorage.getItem('articlecount')) > 0){
    //                     history.replace(user.data[0].data.screentype?user.data[0].data.screentype:'/categorylisting');
    //                     } else {
    //                     history.replace("/dashboard");
    //                     }
    //                 },
    //                 error => {
    //                     this.setState({responsesend:!this.state.responsesend})
    //                     this.setState({showgif:false})
    //                     dispatch(alertActions.error(error));
    //                     setTimeout(() => {
    //                         dispatch(alertActions.clear());
    //                     }, 3000)
    //                 }
    //             );
    //             function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    // }
}

        //         var createGuest = require('cross-domain-storage/guest');
        // var bazStorage = createGuest('https://commonlogin.pbodev.info');
        //   bazStorage.get('email',function(key,value){
        //       console.log("dsdsajhd")
        //   })
        // console.log(storage.onConnect())
        // storage.onConnect().then(function() {
        //     alert("dfdf")
        //     console.log(storage.getKeys())
        //     return storage.get('email');
        //   });




    fetchdata() {
        userService.notification()
            .then(response => {
                if (response.status == 200) {
                    this.setState({ count: response.data.length })
                    this.setState({ newcount: response.counts })
                    this.setState({ notify: response.data })

                }
            })
    }



    render() {

        const { alert } = this.props;
        const { toogle } = this.props;
        let user = JSON.parse(localStorage.getItem('user'));
        const initialState = user ? { loggedIn: true, user } : {};
        let addheader = "";
        let addSidebar = "";
        console.log(history.location.pathname)
        if (initialState.loggedIn) {
            addheader = <Header counts={this.state.count} newcounts={this.state.newcount} />;
            addSidebar = <Sidebar />;
        }
        return (

            <div>
                {addheader}
                {addSidebar}
                {toogle.isprofilepage && <ProfileDesign />}
                {(toogle.isprofilepage || toogle.iscsvupload || toogle.isnotifyOpen || toogle.iscommentOpen || toogle.ispopup || toogle.isexport) && <div className="shadow">&nbsp;</div>}
                <Suspense fallback={<h1>Loading…</h1>}>
                    <Router basename='/public' history={history}>

                        <div>
                            {alert.message && (alert.type != "api") &&
                                <div className={`alert ${alert.type}`}>{alert.message}</div>}

                            {alert.message && (alert.type == "api") &&
                                <div className="ticket-succes ticket-succes-merged" style={{ display: 'block' }}>
                                    <div className="success-mgs-wrapper">
                                        <div className="success-container pr-3">
                                            <svg id="Component_59_1" data-name="Component 59 – 1" xmlns="http://www.w3.org/2000/svg" width="48.009" height="48.009" viewBox="0 0 48.009 48.009">
                                                <path id="Path_1897" data-name="Path 1897" d="M16.272,368.773s3.218-3.924-.605-10.883L10,371.4Z" transform="translate(-9.062 -324.332)" fill="#ffbd50" />
                                                <path id="Path_1898" data-name="Path 1898" d="M70.435,271.981c3.823,6.959.605,10.882.605,10.882l4.825-2.023s6.065-4.517-1.7-17.748l-2.355,5.616Z" transform="translate(-63.831 -238.423)" fill="#f1dbc8" />
                                                <path id="Path_1899" data-name="Path 1899" d="M110.188,159.264c7.767,13.231,1.7,17.748,1.7,17.748l5.1-2.137c1.055-1.151,6.741-11.577.3-21.32-1.707-2.283-2.683-4.125-2.6-5.034l-2.763,6.588Z" transform="translate(-99.856 -134.595)" fill="#ffbd50" />
                                                <path id="Path_1900" data-name="Path 1900" d="M183,202.2c6.439,9.744.753,20.169-.3,21.32l.592-.248,6.545-2.745s3.045-2.308,3.056-8.071c-1.411-1.166-2.927-2.545-4.456-4.075A59.066,59.066,0,0,1,183,202.2Z" transform="translate(-165.569 -183.244)" fill="#f1dbc8" />
                                                <path id="Path_1901" data-name="Path 1901" d="M261.877,311.581c-.011,5.763-3.056,8.071-3.056,8.071l9.813-4.115C267.506,315.644,264.94,314.114,261.877,311.581Z" transform="translate(-234.552 -282.365)" fill="#ffbd50" />
                                                <path id="Path_1902" data-name="Path 1902" d="M166.213,153.83c1.53,1.53,3.046,2.909,4.456,4.075,3.063,2.533,5.629,4.063,6.758,3.956l.427-.179c.729-.729-.755-3.477-3.54-6.9A63.83,63.83,0,0,0,170,150.041a62.588,62.588,0,0,0-5.159-4.646c-3.225-2.569-5.783-3.905-6.482-3.206l-.179.427c-.086.909.89,2.751,2.6,5.034A59.08,59.08,0,0,0,166.213,153.83Z" transform="translate(-143.345 -128.689)" fill="#c78f70" />
                                                <circle id="Ellipse_113" data-name="Ellipse 113" cx="1.875" cy="1.875" r="1.875" transform="translate(16.737 4.277)" fill="#f13d7c" />
                                                <circle id="Ellipse_114" data-name="Ellipse 114" cx="1.875" cy="1.875" r="1.875" transform="translate(34.691 0.938)" fill="#bdd377" />
                                                <circle id="Ellipse_115" data-name="Ellipse 115" cx="1.875" cy="1.875" r="1.875" transform="translate(40.554 17.218)" fill="#ff916c" />
                                                <path id="Path_1903" data-name="Path 1903" d="M33.771,28.273c-.4-.587-.846-1.206-1.341-1.845a25.109,25.109,0,0,1,5.34-1.81.938.938,0,1,0-.388-1.835,27.257,27.257,0,0,0-6.163,2.144c-1.154-1.376-2.474-2.814-3.9-4.239-1.514-1.514-3.044-2.911-4.5-4.114a21.186,21.186,0,0,0,3.061-5.319A27.794,27.794,0,0,0,27.709.937a.938.938,0,1,0-1.875,0c0,5.867-1.5,10.723-4.475,14.47-.561-.428-1.1-.821-1.623-1.171-2.779-1.874-4.434-2.314-5.359-1.422l-.02.018,0,0,0,0a1.543,1.543,0,0,0-.439.867l-13.84,33A.938.938,0,0,0,1.3,47.935l16.2-6.792.008,0,7.122-2.987.011,0L34.3,34.095a1.541,1.541,0,0,0,.8-.381c.016-.014.032-.028.047-.042l.018-.017,0,0,.019-.02C36.085,32.707,35.646,31.052,33.771,28.273ZM19.325,38.342a23.635,23.635,0,0,0,1.688-5.327,20.388,20.388,0,0,0-.179-8.62q.666.7,1.37,1.408c1.4,1.4,2.818,2.7,4.175,3.844-.134,4.427-2.165,6.444-2.6,6.828Zm-4.795,2.011a9.466,9.466,0,0,0,.485-1.669c.751-3.831-.475-8.567-3.64-14.083l1.015-2.419a15.918,15.918,0,0,1,2.089,3.2.938.938,0,1,0,1.723-.74,17.793,17.793,0,0,0-3.011-4.366l1.55-3.7c.272.5.608,1.043,1.011,1.641q.417.618.909,1.278a17.635,17.635,0,0,1,2.508,13.173,19.041,19.041,0,0,1-2.619,6.838Zm-4.08-13.544c2.915,5.528,3.134,9.19,2.756,11.347a6.008,6.008,0,0,1-1.666,3.452L9.07,42.643c.549-1.955.694-5.059-1.429-9.134Zm17.7,4.263c.566.432,1.115.829,1.639,1.182.6.4,1.144.74,1.642,1.011L27.009,35.12A12.666,12.666,0,0,0,28.152,31.072ZM20.117,16.819c-.066.068-.131.136-.2.2a.938.938,0,1,0,1.326,1.326q.177-.177.348-.358c1.422,1.176,2.926,2.548,4.4,4.023,1.268,1.268,2.46,2.557,3.517,3.8q-.254.141-.508.287a.938.938,0,1,0,.938,1.624c.26-.15.521-.295.781-.436.407.517.785,1.02,1.127,1.5A10.925,10.925,0,0,1,33.721,32.2a10.932,10.932,0,0,1-3.414-1.872,55.566,55.566,0,0,1-6.776-5.855A55.551,55.551,0,0,1,17.676,17.7,10.927,10.927,0,0,1,15.8,14.287a10.932,10.932,0,0,1,3.414,1.872C19.51,16.366,19.811,16.587,20.117,16.819ZM6.658,35.854a10.42,10.42,0,0,1,.779,5.474A6.308,6.308,0,0,1,6.6,43.68L2.689,45.319Z" transform="translate(0 0.001)" />
                                                <path id="Path_1904" data-name="Path 1904" d="M163.555,283.187a.941.941,0,1,0,.032.081C163.578,283.242,163.566,283.211,163.555,283.187Z" transform="translate(-146.594 -256.132)" />
                                                <path id="Path_1905" data-name="Path 1905" d="M370.779,105.137a.938.938,0,0,0,1.326,0c2.1-2.1,5.489-3.055,7.967-3.255a.938.938,0,1,0-.151-1.869c-2.81.227-6.688,1.344-9.143,3.8A.938.938,0,0,0,370.779,105.137Z" transform="translate(-335.763 -90.632)" />
                                                <path id="Path_1906" data-name="Path 1906" d="M492.554,101.489l-.081-.021a.938.938,0,0,0-.453,1.82l.048.012a.938.938,0,1,0,.486-1.811Z" transform="translate(-445.24 -91.928)" />
                                                <path id="Path_1907" data-name="Path 1907" d="M64.442,47.372h.938v.938a.938.938,0,0,0,1.875,0v-.938h.938a.938.938,0,1,0,0-1.875h-.938v-.938a.938.938,0,1,0-1.875,0V45.5h-.938a.938.938,0,0,0,0,1.875Z" transform="translate(-57.549 -39.53)" />
                                                <path id="Path_1908" data-name="Path 1908" d="M298.44,144.37h.938v.938a.938.938,0,0,0,1.875,0v-.938h.938a.938.938,0,1,0,0-1.875h-.938v-.938a.938.938,0,0,0-1.875,0v.938h-.938a.938.938,0,1,0,0,1.875Z" transform="translate(-269.606 -127.434)" />
                                                <path id="Path_1909" data-name="Path 1909" d="M401.189,399.493h-.938v-.938a.938.938,0,1,0-1.875,0v.938h-.938a.938.938,0,0,0,0,1.875h.938v.938a.938.938,0,1,0,1.875,0v-.938h.938a.938.938,0,1,0,0-1.875Z" transform="translate(-359.322 -360.335)" />
                                                <path id="Path_1910" data-name="Path 1910" d="M362.782,5.627a2.813,2.813,0,1,0-2.813-2.813A2.816,2.816,0,0,0,362.782,5.627Zm0-3.751a.938.938,0,1,1-.938.938A.939.939,0,0,1,362.782,1.876Z" transform="translate(-326.216 -0.001)" />
                                                <path id="Path_1911" data-name="Path 1911" d="M425.314,173.619a2.813,2.813,0,1,0,2.813,2.813A2.816,2.816,0,0,0,425.314,173.619Zm0,3.751a.938.938,0,1,1,.938-.938A.939.939,0,0,1,425.314,177.37Z" transform="translate(-382.884 -157.339)" />
                                                <path id="Path_1912" data-name="Path 1912" d="M171.316,41.246a2.813,2.813,0,1,0-2.813-2.813A2.816,2.816,0,0,0,171.316,41.246Zm0-3.751a.938.938,0,1,1-.938.938A.939.939,0,0,1,171.316,37.5Z" transform="translate(-152.703 -32.28)" />
                                                <path id="Path_1913" data-name="Path 1913" d="M431.065,285a.938.938,0,1,0-.938.938A.939.939,0,0,0,431.065,285Z" transform="translate(-388.946 -257.423)" />
                                                <path id="Path_1914" data-name="Path 1914" d="M326.127,76.935a.938.938,0,1,0-.938-.938A.939.939,0,0,0,326.127,76.935Z" transform="translate(-294.697 -68.021)" />
                                                <path id="Path_1915" data-name="Path 1915" d="M460.126,359.057a.938.938,0,1,0,.938.938A.94.94,0,0,0,460.126,359.057Z" transform="translate(-416.131 -325.39)" />
                                                <path id="Path_1916" data-name="Path 1916" d="M130.13,11.876a.938.938,0,1,0-.938-.938A.939.939,0,0,0,130.13,11.876Z" transform="translate(-117.078 -9.063)" />
                                            </svg>
                                        </div>
                                        <div className="success-container success-container2">
                                            <div>
                                                <p>Hurray!!!</p>
                                                <p>{alert.message}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            }

                            <Switch>
                                <PrivateRoute exact path="/" component={CategoryList} forceRefresh={true} />
                                <PrivateRoute exact path="/dashboard" component={HomePage} forceRefresh={true} />
                                <PrivateRoute path="/categorylisting" component={CategoryList} forceRefresh={true} />
                                <PrivateRoute path="/category" component={Category} forceRefresh={true} />
                                <PrivateRoute exact path="/folder/:cayegoryName/:id" component={FolderList} forceRefresh={true} />
                                <PrivateRoute exact path="/article/:cayegoryName/:folderName?/:id?/:catId?" component={Article} forceRefresh={true} />
                                <PrivateRoute exact path="/alldraft" component={Article} forceRefresh={true} />
                                <PrivateRoute path="/settings" component={Settings} forceRefresh={true} />
                                <PrivateRoute path="/knoBaseSettings" component={KbSettings} forceRefresh={true} />
                                <PrivateRoute path="/desksettings" component={DeskSettings} forceRefresh={true} />
                                <PrivateRoute path="/setup1" component={Createthames} forceRefresh={true} />
                                <PrivateRoute path="/setup2" component={Createthames} forceRefresh={true} />
                                <PublicRoute path="/login" component={LoginPage} forceRefresh={true} />
                                <PublicRoute path="/glogin" component={googlelogin} forceRefresh={true} />
                                <PublicRoute path="/signup" component={SignupPage} forceRefresh={true} />
                                <PublicRoute exact path="/verify/:id" component={VerifyPage} forceRefresh={true} />
                                <PublicRoute path="/company" component={CompanyDetail} forceRefresh={true} />
                                <PublicRoute exact path="/confirmpass/:id" component={ConfirmPassword} forceRefresh={true} />
                                <PublicRoute path="/resetsucess" component={succespage} forceRefresh={true} />
                                <PublicRoute path="/forgetpass" component={ForgetPasswordPage} forceRefresh={true} />
                                <PublicRoute exact path="/success/:id" component={SignupSuccessPage} forceRefresh={true} />
                                <PublicRoute path="/getstarted" component={Getstarted} forceRefresh={true} />
                                <PublicRoute path="/orgname" component={OrganisationName} forceRefresh={true} />
                                <PublicRoute path="/colortheme" component={OrganisationName} forceRefresh={true} />
                                <PublicRoute path="/step3" component={OrganisationName} forceRefresh={true} />
                                <PublicRoute path="/gsignin" component={Gsignin} forceRefresh={true} />
                                <PublicRoute path="/gsignup" component={Gsignup} forceRefresh={true} />
                                <PublicRoute path="/onboarding" component={OnboardingComman} forceRefresh={true} />

                                {/* <Route render={ () => <h1>404 Error</h1> } />Createthames */}
                                <PublicRoute path="/prefencePopup" component={PrefencePopup} forceRefresh={true} />

                                {/* <PublicRoute exact path="test" component={Nodata}/>  */}
                                <PrivateRoute path="/privacysettings" component={privacySettings} forceRefresh={true} />
                            </Switch>
                        </div>
                    </Router>
                </Suspense>

                {toogle.iscsvupload && <Csvupload />}
                {toogle.ispopup && <PrefencePopup />}
                {toogle.isnotifyOpen && <NotifySidebar notify={this.state.notify} />}
                {toogle.isexport && <Csvexport />}

                {initialState.loggedIn && <div className="botomFooter">
                    <div className="row">
                        <div className="col-xs-12 col-sm-12 col-md-3 col-lg-2 vcenter mobilr-center">
                            <a href="#" className="footer-logo" role="link">
                                <img src="https://images.appypie.com/wp-content/uploads/2020/03/16070955/appypie-logo.svg" data-no-lazy={1} width={147} height={42} />
                            </a>
                        </div>
                        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-7 vcenter bottom-footer-nav">
                            <div className="menu-chat-bot-builder-in-footer-container">
                                <ul className="nav s-nav align-items-center justify-content-center ">
                                    <li><a href="https://www.appypie.com/about-us" target="_blank"><span>About Us</span></a></li>
                                    <li><a href="https://www.appypie.com/terms-of-use" target="_blank"><span>Terms of Use</span></a></li>
                                    <li><a href="https://www.appypie.com/privacy-policy" target="_blank"><span>Privacy Policy</span></a></li>
                                    <li><a href="https://www.appypie.com/contact-us" target="_blank"><span>Contact Us</span></a></li>
                                    <li><a title="Career Job" href="https://www.appypie.com/careers" target="_blank"><span>Career</span></a></li>
                                </ul>
                            </div>
                            <div className="copyright text-center d-md-block d-sm-none d-xs-none">© 2020, Appy Pie. All Rights Reserved.</div>
                        </div>
                        <div className="col-xs-12 col-sm-12 col-md-3 col-lg-3 vcenter">
                            <div className="socialLinks">
                                <ul className="social_icons-footer">
                                    <li className="facebook">
                                        <a href="https://www.facebook.com/AppyPieInc" rel="nofollow noopener" title="Facebook" role="link">Facebook
                                                    <span className="icon-facebook">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="10.879" height="21.757" viewBox="0 0 10.879 21.757">
                                                    <path id="facebook" d="M15.08,3.613h1.986V.153A25.648,25.648,0,0,0,14.173,0C11.309,0,9.347,1.8,9.347,5.112V8.159H6.187v3.867h3.16v9.731h3.875v-9.73h3.032l.481-3.867H13.221V5.5c0-1.118.3-1.883,1.859-1.883Z" transform="translate(-6.187)" fill="#606060" />
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
                                                            <path id="Path_1733" data-name="Path 1733" d="M29.537,50.841a12.625,12.625,0,0,1-3.489.956,6.021,6.021,0,0,0,2.664-3.347,12.1,12.1,0,0,1-3.84,1.466A6.055,6.055,0,0,0,14.4,54.057a6.235,6.235,0,0,0,.14,1.381A17.14,17.14,0,0,1,2.057,49.1,6.057,6.057,0,0,0,3.917,57.2a5.98,5.98,0,0,1-2.736-.746v.066a6.083,6.083,0,0,0,4.851,5.95,6.044,6.044,0,0,1-1.588.2,5.354,5.354,0,0,1-1.146-.1,6.113,6.113,0,0,0,5.658,4.218,12.167,12.167,0,0,1-7.508,2.583A11.34,11.34,0,0,1,0,69.282,17.048,17.048,0,0,0,9.289,72c11.143,0,17.235-9.23,17.235-17.231,0-.268-.009-.526-.022-.783A12.08,12.08,0,0,0,29.537,50.841Z" transform="translate(0 -48)" fill="#606060" />
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
                                                    <path id="pinterest" d="M12.326,0C5.747,0,2.25,4.216,2.25,8.812c0,2.131,1.191,4.79,3.1,5.633.544.245.472-.054.94-1.844a.425.425,0,0,0-.1-.417C3.46,9.031,5.654,2.549,11.937,2.549c9.093,0,7.394,12.582,1.582,12.582A2.146,2.146,0,0,1,11.258,12.5c.428-1.733,1.266-3.6,1.266-4.845,0-3.148-4.69-2.681-4.69,1.49A5.046,5.046,0,0,0,8.29,11.3S6.781,17.4,6.5,18.539a16.177,16.177,0,0,0,.111,5.318.158.158,0,0,0,.288.073,18.858,18.858,0,0,0,2.484-4.678c.186-.685.949-3.465.949-3.465a4.146,4.146,0,0,0,3.5,1.668c4.6,0,7.918-4.04,7.918-9.053C21.733,3.6,17.62,0,12.326,0Z" transform="translate(-2.25)" fill="#606060" />
                                                </svg>
                                            </span>
                                        </a>
                                    </li>
                                    <li className="blog">
                                        <a href="https://www.appypie.com/blog" rel="nofollow noopener" title="Appypie blog" role="link">Appypie blog
                                                    <span className="icon-blogger">
                                                <svg id="blogger" xmlns="http://www.w3.org/2000/svg" width="24.001" height="24.001" viewBox="0 0 24.001 24.001">
                                                    <g id="Group_1863" data-name="Group 1863">
                                                        <path id="Path_1734" data-name="Path 1734" d="M23.389,9.285c-.507-.216-2.681.024-3.284-.521-.426-.393-.453-1.1-.62-2.052A8.612,8.612,0,0,0,18.8,4.139C17.747,1.91,15.221,0,12.926,0H7.605A7.618,7.618,0,0,0,0,7.586V16.43A7.61,7.61,0,0,0,7.605,24h8.741a7.627,7.627,0,0,0,7.607-7.571L24,10.305A1.161,1.161,0,0,0,23.389,9.285ZM7.7,6.2h4.218a1.447,1.447,0,1,1,0,2.894H7.7A1.447,1.447,0,1,1,7.7,6.2Zm8.573,11.562H7.7a1.443,1.443,0,1,1,0-2.886h8.573a1.443,1.443,0,1,1,0,2.886Z" fill="#606060" />
                                                    </g>
                                                </svg>
                                            </span>
                                        </a>
                                    </li>
                                    <li className="linden">
                                        <a href="https://www.linkedin.com/company/appy-pie-inc/" rel="nofollow noopener" title="linkedin" role="link">linkedin
                                                    <span className="icon-linkedin-1">
                                                <svg id="linkedin" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                                    <path id="Path_1735" data-name="Path 1735" d="M23.994,24H24V15.2c0-4.306-.927-7.623-5.961-7.623a5.226,5.226,0,0,0-4.707,2.587h-.07V7.976H8.489V24h4.97V16.065c0-2.089.4-4.109,2.983-4.109,2.549,0,2.587,2.384,2.587,4.243V24Z" fill="#606060" />
                                                    <path id="Path_1736" data-name="Path 1736" d="M.4,7.977H5.372V24H.4Z" fill="#606060" />
                                                    <path id="Path_1737" data-name="Path 1737" d="M2.882,0A2.9,2.9,0,1,0,5.764,2.882,2.883,2.883,0,0,0,2.882,0Z" fill="#606060" />
                                                </svg>
                                            </span>
                                        </a>
                                    </li>
                                    <li className="youtube">
                                        <a href="https://www.youtube.com/user/AppyPieInc" rel="nofollow noopener" title="Youtube" role="link">Youtube
                                                    <span className="icon-youtube">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="34.272" height="23.996" viewBox="0 0 34.272 23.996">
                                                    <path id="youtube" d="M33.566-2.327a4.294,4.294,0,0,0-3.021-3.021c-2.682-.734-13.41-.734-13.41-.734s-10.727,0-13.409.706A4.381,4.381,0,0,0,.706-2.327,45.242,45.242,0,0,0,0,5.916a45.075,45.075,0,0,0,.706,8.243A4.294,4.294,0,0,0,3.727,17.18c2.71.734,13.41.734,13.41.734s10.727,0,13.409-.706a4.294,4.294,0,0,0,3.021-3.021,45.256,45.256,0,0,0,.706-8.243S34.3.354,33.566-2.327ZM13.72,11.054V.778l8.921,5.138Zm0,0" transform="translate(0 6.082)" fill="#606060" />
                                                </svg>
                                            </span>
                                        </a>
                                    </li>
                                    <li className="instagram">
                                        <a href="https://www.instagram.com/AppyPieInc/" rel="nofollow noopener" title="Instagram" role="link">Instagram
                                                    <span className="icon-instagram">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                                    <g id="instagram-sketched" transform="translate(0 -0.001)">
                                                        <path id="Path_1740" data-name="Path 1740" d="M12,5.838A6.158,6.158,0,1,0,18.162,12,6.157,6.157,0,0,0,12,5.838Zm0,10.155a4,4,0,1,1,4-4A4,4,0,0,1,12,15.993Z" fill="#606060" />
                                                        <path id="Path_1741" data-name="Path 1741" d="M16.948.076c-2.208-.1-7.677-.1-9.887,0A7.172,7.172,0,0,0,2.025,2.017C-.283,4.325.012,7.435.012,12c0,4.668-.26,7.706,2.013,9.979C4.342,24.291,7.5,23.988,12,23.988c4.624,0,6.22,0,7.855-.63,2.223-.863,3.9-2.85,4.065-6.419.1-2.209.1-7.677,0-9.887-.2-4.213-2.459-6.768-6.976-6.976Zm3.5,20.372c-1.513,1.513-3.612,1.378-8.468,1.378-5,0-7.005.074-8.468-1.393-1.685-1.677-1.38-4.37-1.38-8.453,0-5.525-.567-9.5,4.978-9.788,1.274-.045,1.649-.06,4.856-.06l.045.03c5.329,0,9.51-.558,9.761,4.986.057,1.265.07,1.645.07,4.847,0,4.942.093,6.959-1.394,8.453Z" fill="#606060" />
                                                        <circle id="Ellipse_83" data-name="Ellipse 83" cx="1.439" cy="1.439" r="1.439" transform="translate(16.967 4.156)" fill="#606060" />
                                                    </g>
                                                </svg>
                                            </span>
                                        </a>
                                    </li>
                                    <li className="news">
                                        <a href="https://news.appypie.com/" rel="nofollow noopener" title="Appy Pie News" role="link">Appy Pie News
                                                    <span className="newsicon">
                                                <img alt="Appy Pie News" src="https://www.appypie.com/wp-content/uploads/2019/10/newsicon.svg" width={25} height={25} style={{ width: '100%' }} data-lazy-src="https://www.appypie.com/wp-content/uploads/2019/10/newsicon.svg" className="lazyloaded" data-was-processed="true" />
                                            </span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-12 text-center d-sm-block d-lg-none d-md-none">
                            <div className="copyright text-center">© 2020, Appy Pie. All Rights Reserved.</div>
                        </div>
                    </div>
                </div>}




            </div>

        );
    }
}

function mapStateToProps(state) {
    const { alert, toogle } = state;
    //;
    return {
        alert, toogle
    };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App }; 