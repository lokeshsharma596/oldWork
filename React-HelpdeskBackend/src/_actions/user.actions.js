import { userConstants } from '../_constants';
import config from 'config';
import { userService } from '../_services';
import { alertActions } from './alert.actions';
import { history } from '../_helpers';
import { Auth } from 'aws-amplify'
//import React from "react";
import { Redirect } from "react-router-dom";

export const userActions = {
    signup,
    login,
    logout,
    confirmation,
    getAll,
    resendpassword,
    sendcode,
    confirmpassword,
    addCategory,
    editCategory,
    Sociallogin,
    forgetsendcode,
    googlelogin
    
};
function confirmpassword(username,code,password) {
    return dispatch => {
        dispatch(request({ username }));
        Auth.forgotPasswordSubmit(username, code, password)
            .then(data => {
                userService.confirmpassword(btoa(username))
            .then(
                user => { 
                    dispatch(success(user));
                    dispatch(alertActions.success(user));
                    history.replace('/resetsucess');
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
               // history.replace('/resetsucess');
            })
            .catch(err => dispatch(alertActions.error(err.message)));

        // userService.confirmpassword(username,code,password)
        //     .then(
        //         user => { 
        //             dispatch(success(user));
        //             dispatch(alertActions.success(user));
        //             history.replace('/resetsucess');
        //         },
        //         error => {
        //             dispatch(failure(error));
        //             dispatch(alertActions.error(error));
        //         }
        //     );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}
function sendcode(username) {
    return dispatch => {
        dispatch(request({ username }));
        Auth.resendSignUp(username).then(() => {
            dispatch(alertActions.success('code resend successfully')); 
            setTimeout(() => {
                dispatch(alertActions.clear());
            }, 3000)
        }).catch(e => {
            dispatch(alertActions.error(error));
            setTimeout(() => {
                dispatch(alertActions.clear());
            }, 3000)
        });

        // userService.sendcode(username)
        //     .then(
        //         user => { 
        //             dispatch(success(user));
        //             dispatch(alertActions.success(user)); 
        //             history.replace('/confirm')
        //         },
        //         error => {
        //             dispatch(failure(error));
        //             dispatch(alertActions.error(error));
        //         }
        //     );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

// function sendcode(username) {
//     return dispatch => {
//         dispatch(request({ username }));
//         Auth.resendSignUp(username).then(() => {
//             dispatch(alertActions.success('code resend successfully')); 
//             ;
//         }).catch(e => {
//             dispatch(alertActions.error(error));
//             ;
//         });

//         // userService.sendcode(username)
//         //     .then(
//         //         user => { 
//         //             dispatch(success(user));
//         //             dispatch(alertActions.success(user)); 
//         //             history.replace('/confirm')
//         //         },
//         //         error => {
//         //             dispatch(failure(error));
//         //             dispatch(alertActions.error(error));
//         //         }
//         //     );
//     };

//     function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
//     function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
//     function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
// }
function forgetsendcode(username) {
    return dispatch => {
        dispatch(request({ username }));
        Auth.forgotPassword(username).then((data) => {
             dispatch(alertActions.success('code send successfully')); 
            history.replace('/confirmpass/'+btoa(username))
        }).catch(e => {
            dispatch(alertActions.error("Your email id unregistered,Please registered your email id."));
        });

        // userService.sendcode(username)
        //     .then(
        //         user => { r
        //             dispatch(alertActions.success(user)); 
        //             history.replace('/confirm')
        //         },
        //         error => {
        //             dispatch(failure(error));
        //             dispatch(alertActions.error(error));
        //         }
        //     );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}
function resendpassword(username) {
    return dispatch => {
        dispatch(request({ username }));

        userService.resendpassword(username)
            .then(
                user => { 
                    dispatch(success(user));
                    dispatch(alertActions.success(user));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}
function confirmation(username,code) {
    return dispatch => {
        dispatch(request({ code }));
        Auth.confirmSignUp(username, code, {
            // Optional. Force user confirmation irrespective of existing alias. By default set to True.
            forceAliasCreation: true    
        }).then(data => {
            dispatch(success(data));
             userService.confirmation(code)
            .then(
                user => { 
                   // dispatch(success(user));
                   // dispatch(alertActions.success(user));
                    var email = atob(localStorage.getItem('tempdata').split('@')[0]);
                    var password = atob(localStorage.getItem('tempdata').split('@')[1]);  
                    dispatch(login(email,password));
                    //history.replace('/success/'+username);
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
        //             dispatch(alertActions.success(user));
                    
            // 
            
        })
          .catch(err => dispatch(alertActions.error(err.message)));
        // userService.confirmation(code)
        //     .then(
        //         user => { 
        //            // dispatch(success(user));
        //             dispatch(alertActions.success(user));
        //             history.replace('/success');
        //         },
        //         error => {
        //             dispatch(failure(error));
        //             dispatch(alertActions.error(error));
        //         }
        //     );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}
function login(username, password) {
    return dispatch => {
        dispatch(request({ username }));
        Auth.signIn({
            username, // Required, the username
            password, // Optional, the password
        }).then(user =>{
            userService.login(user.username, username)
            .then(
                user => { 
                         
                    dispatch(success(user.data));
                    dispatch(alertActions.success(user.message));
                    localStorage.removeItem('tempdata');
                        history.replace("/dashboard");
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
            
            
        })
        .catch(err => dispatch(alertActions.error(err.message)));

        // userService.login(username, password)
        //     .then(
        //         user => { 
                         
        //            // dispatch(success(user));
        //             dispatch(alertActions.success(user));
        //             localStorage.removeItem('temp');
        //             history.replace('/dashboard');
        //         },
        //         error => {
        //             dispatch(failure(error));
        //             dispatch(alertActions.error(error));
        //         }
        //     );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}
function Sociallogin(username, password) {
    return dispatch => {
        dispatch(request({ username }));

        userService.login(username, password)
            .then(
                user => { 
                    dispatch(success(user.data));
                    dispatch(alertActions.success(user.message));
                    localStorage.removeItem('tempdata');
                    if(parseInt(localStorage.getItem('articlecount')) > 0){
                    history.replace(user.data[0].data.screentype?user.data[0].data.screentype:'/categorylisting');
                    } else {
                    history.replace("/dashboard");
                    }
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}
function googlelogin(username, password) {
    return dispatch => {
        dispatch(request({ username }));

        userService.glogin(username, password)
            .then(
                user => { 
                    dispatch(success(user.data));
                    dispatch(alertActions.success(user.message));
                    localStorage.removeItem('tempdata');
                    localStorage.removeItem('color');
                    localStorage.removeItem('domainname');
                    localStorage.removeItem('orgname');
                    if(parseInt(localStorage.getItem('articlecount')) > 0){
                    history.replace(user.data[0].data.screentype?user.data[0].data.screentype:'/categorylisting');
                    } else {
                    history.replace("/dashboard");
                    }
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}
function signup(username, password) {
    let email = username;
    return dispatch => {
        dispatch(request({ username }));
        Auth.signUp({
            username,
            password,
            attributes: {
                email 
            },
            validationData: []  //optional
            })
            .then(data =>{ 
               
                
            userService.signup(data.userSub, username)
            .then( 
                user => { 
                    // ;
                    // ;
                    // ;
                    localStorage.setItem("tempdata",btoa(username)+'@'+btoa(password))
                     dispatch(success(user.message));
                    dispatch(alertActions.success(user.message));
                    history.replace('/verify/'+user.data.client_id);
                    
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );     
                          
            })
            .catch(err => dispatch(alertActions.error(err.message)));

        // userService.signup(username, password)
        //     .then( 
        //         user => { 
        //             dispatch(success(user.message));
        //             dispatch(alertActions.success(user.message));
        //             if(user.status == 201)
        //             history.replace('/verify');
        //             else
        //             history.replace('/login');
        //         },
        //         error => {
        //             dispatch(failure(error));
        //             dispatch(alertActions.error(error));
        //         }
        //     );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout() {
    userService.logout();
   // window.location.href=`${config.helpdesk}`;
  //  window.location.href="https://www.appypie.com/help-desk/knowledge-base-software";
    history.replace('/login');
//     Auth.signOut()
//     .then(data => console.log(data))
//     .catch(err => console.log(err));
//    window.location.href = `${config.path}/login`;
//     return { type: userConstants.LOGOUT };
    
}

function getAll() {
    return dispatch => {
        dispatch(request());

        userService.getAll()
            .then(
                lisitng => dispatch(success(listing)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: userConstants.GETALL_REQUEST } }
    function success(lisitng) { return { type: userConstants.GETALL_SUCCESS, lisitng } }
    function failure(error) { return { type: userConstants.GETALL_FAILURE, error } }
}

function addCategory(params) {
   
    return dispatch => {
        dispatch(request());

        userService.addCategory(params)
        .then( 
            user => { 
                dispatch(success(user));
                dispatch(alertActions.success(user));
                dispatch({ type: 'CategoryToggle' })
                //history.replace('/categorylisting'); 
                window.location.href=`${config.path}/categorylisting`;
            },
            error => {
                dispatch(failure(error));
                dispatch(alertActions.error(error));
            }
        );
    };

    function request() { return { type: userConstants.GETALL_REQUEST } }
    function success(users) { return { type: userConstants.GETALL_SUCCESS, users } }
    function failure(error) { return { type: userConstants.GETALL_FAILURE, error } }
}

function editCategory(params) {
    return dispatch => {
        dispatch(request());

        userService.editCategory(params)
        .then( 
            user => { 
                dispatch(success(user));
                dispatch(alertActions.success(user));
                dispatch({ type: 'CategoryToggle' })
            },
            error => {
                dispatch(failure(error));
                dispatch(alertActions.error(error));
            }
        );
    };

    function request() { return { type: userConstants.GETALL_REQUEST } }
    function success(users) { return { type: userConstants.GETALL_SUCCESS, users } }
    function failure(error) { return { type: userConstants.GETALL_FAILURE, error } }
}
