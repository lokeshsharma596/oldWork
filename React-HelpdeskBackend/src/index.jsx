
import React from 'react';
import { render } from 'react-dom';
import { Provider,connect } from 'react-redux';

import { store } from './_helpers';
import { App } from './App';
import "./config/i18next";


render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('main-wrapper')
);
// var createGuest = require('cross-domain-storage/guest');
// var bazStorage = createGuest('https://commonlogin.pbodev.info');
//   bazStorage.get('email',function(key,value){
//       console.log("dsdsajhd")
//   })
            
(function(apiKey) {
    (function(p, e, n, d, o) {
        var v, w, x, y, z;
        o = p[d] = p[d] || {};
        o._q = [];
        v = ['initialize', 'identify', 'updateOptions', 'pageLoad'];
        for (w = 0, x = v.length; w < x; ++w)(function(m) {
            o[m] = o[m] || function() {
                o._q[m === v[0] ? 'unshift' : 'push']([m].concat([].slice.call(arguments, 0)));
            };
        })(v[w]);
        y = e.createElement(n);
        y.async = !0;
        y.src = 'https://cdn.pendo.io/agent/static/' + apiKey + '/pendo.js';

        z = e.getElementsByTagName(n)[0];
        z.parentNode.insertBefore(y, z);
    })(window, document, 'script', 'pendo');
    pendo.initialize({
        visitor: {
            id: (localStorage.getItem('user'))?(JSON.parse(localStorage.getItem('user')))[0].id:'',
            email: (localStorage.getItem('user'))?(JSON.parse(localStorage.getItem('user')))[0].data.email:''        // Recommended if using Pendo Feedback, or NPS Email
                // full_name:    // Recommended if using Pendo Feedback
                // role:         // Optional

            // You can add any additional visitor level key-values here,
            // as long as it's not one of the above reserved names.
        },

        account: {
            id: 'ACCOUNT-UNIQUE-ID' // Highly recommended
                // name:         // Optional
                // is_paying:    // Recommended if using Pendo Feedback
                // monthly_value:// Recommended if using Pendo Feedback
                // planLevel:    // Optional
                // planPrice:    // Optional
                // creationDate: // Optional

            // You can add any additional account level key-values here,
            // as long as it's not one of the above reserved names.
        }
    });

})('d1d56151-ae16-41e2-69dd-b9082b0ca33e');

console.log(window.location.hostname);
console.log(window.location.protocol);
//window.addEventListener("message", handleMessage, false);
// window.addEventListener("visibilitychange", sendMessage, false);
// window.addEventListener("load", sendMessage, false);
// var parentSite = "https://commonlogin.appypie.com/assets/hubfile.html";
// var redirectFile = 'https://commonlogin.appypie.com/login?frompage=http://localhost:8082/&website=http://localhost:8082';



// function sendMessage() {
//     var iframeEl = document.getElementById('iframe1');
//     var postData = {
//         'method': 'get',
//         'field': 'login_status'
//     };
//     iframeEl.contentWindow.postMessage(postData, parentSite);
// }

// function logoutData() {
//     var iframeEl = document.getElementById('iframe1');
//     var postData = {
//         'method': 'set',
//         'field': 'login_status',
//         'value': 'no'
//     };
//     iframeEl.contentWindow.postMessage(postData, parentSite);
//     // var div = document.getElementById('loginlogout');
//     // div.innerHTML = '<div id="loginSection" class="loginSection"><a href="' + redirectFile + '">Login</a></div>';
//     // var div = document.getElementById('userData');
//     // div.innerHTML = '';

// }

// function checklogin() {
//     if (localStorage.getItem("login_status") == null || localStorage.getItem("login_status") == 'no') {

//         var div = document.getElementById('loginlogout');
//         div.innerHTML = '<div id="loginSection" class="loginSection"><a href="' + redirectFile + '">Login</a></div>';
//     } else {
//         var div = document.getElementById('loginlogout');
//         div.innerHTML = '<div id="logoutSection" class="logoutSection"><button onclick="logoutData()">Logout</button></div>';
//         var div = document.getElementById('userData');
//         div.innerHTML = localStorage.getItem("userdata");

//     }
// }

// checklogin();