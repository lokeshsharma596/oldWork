import React from "react";
import {firebaseAuth,googleProvider} from "../config/config";
let constent = require('../config/constant');
import Loader from '../_components/Loader';


const firebaseAuthKey = constent.auth_key;
const appTokenKey = constent.TokenKey;

export function loginWithGoogle() {
    
    return firebaseAuth().signInAnonymously();
    //return authenticate(loginWithFirebase(googleProvider));
}

export default class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            splashScreen: false
        };

        this.handleGoogleLogin = this.handleGoogleLogin.bind(this);
    }

    handleGoogleLogin() {
        loginWithGoogle()
            .catch(function (error) {
                alert(error); // or show toast
                localStorage.removeItem(firebaseAuthKey);
            });
        localStorage.setItem(firebaseAuthKey, "1");
    }

    componentDidMount() {
        
        // var url = window.location.protocol+"//"+window.location.host;
        // var redirectFile = 'https://commonlogin.appypie.com/login?frompage='+url+'/&website='+url;
        // if(localStorage.getItem("login_status") == "no")
        // window.location.href=redirectFile; 
        
        /*         firebaseAuth().getRedirectResult().then(function(result) {
         if (result.user) {
         console.log("GoogleLogin Redirect result");
         if (result.credential) {
         // This gives you a Google Access Token. You can use it to access the Google API.
         let token = result.credential.accessToken;
         // ...
         }
         // The signed-in user info.
         let user = result.user;
         console.log("user:", JSON.stringify(user));
         }
         }).catch(function(error) {
         // Handle Errors here.
         var errorCode = error.code;
         var errorMessage = error.message;
         // The email of the user's account used.
         var email = error.email;
         // The firebase.auth.AuthCredential type that was used.
         var credential = error.credential;
         // ...
         alert(error);
         })*/
        ;

        /**
         * We have appToken relevant for our backend API
         */
        /* if (localStorage.getItem(appTokenKey)) {
            this.props.history.replace("/app/home");
            return;
        } */
        firebaseAuth().onAuthStateChanged(user => {
            if (user) {
                var users = JSON.stringify(user);
                console.log(user)
                // firebaseAuth().signOut().then((result) => {
                //      console.log(users)
                //   })
                

                // store the token
               // this.props.history.replace("/app/home")
            }
        });
    }

    render() {
       // return <LoginPage handleGoogleLogin={this.handleGoogleLogin}/>;
        return <Loader />;
    }
}

const LoginPage = ({handleGoogleLogin}) => (
                
           {/* <button onClick={handleGoogleLogin}>Sign in with Google</button> */}
);
const SplashScreen = () => (<p>Loading...</p>)