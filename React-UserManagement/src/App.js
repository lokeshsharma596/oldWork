import React from 'react';
import { Provider } from 'react-redux'
import store from "./utils/store"
import Routes from "./utils/routes";


export default function App() {
   localStorage.setItem("userId", "3VXsIVsZiYrJuiu5VFjH")

    
//    var createGuest = require('cross-domain-storage/guest');
//    var bazStorage = createGuest(`${process.env.REACT_APP_API_KB_BACKEND}`);
//      bazStorage.get('user',function(key,value){
//          if(value){ 
//          var user=JSON.parse(value);
//          localStorage.setItem('user',value);
//          localStorage.setItem("userId", user[0].id)
//          localStorage.setItem('login_status','yes');
//         // window.location.reload();
//          }
//          else{
//              localStorage.removeItem('userId');
//              localStorage.removeItem('user');
//              localStorage.removeItem('login_status');
//              window.location.href=`${process.env.REACT_APP_API_KB_BACKEND}`;  
//          }
//      })
    return (
        <Provider store={store} >
        <Routes /> 
         </Provider>
    );
}