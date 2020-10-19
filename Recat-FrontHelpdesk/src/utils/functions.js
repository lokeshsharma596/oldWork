// import {firebase}  from "./db"
 

// export const login = (arg) => {
//    return new Promise((resolve, reject) => {
//        firebase.auth().signInWithEmailAndPassword(arg.email, arg.password).then(data => {
//            resolve({ code: "success", data: data })
//        }).catch(error => {
//            console.log(error)
//            resolve(error)
//        });
//    })
// }

// export const Signout = () => {
//    return new Promise((resolve, reject) => {
//        firebase.auth().signOut().then(data => {
//            resolve(data)
//        })
//    })
// }

// export const GoogleLogin = () => {
//     var provider = new firebase.auth.GoogleAuthProvider();
//    return new Promise((resolve, reject) => {
//    firebase.auth().signInWithPopup(provider).then(data => {
//        resolve({ code: "success", data: data })
//    }).catch(error => {
//        console.log(error)
//        resolve(error)
//    });
// })
// }

export const getIpAddress = () => {
   return new Promise((resolve, reject) => {
   fetch('https://api.ipify.org/?format=json').then(res => res.json()).then(response => {
           resolve(response)
       })
   })
}

export const getIdFromUrl = (url) =>{
   return url.split('-').pop();
}
// export const getDomain = () => {
//    var pageURL = location.href
//    var n = pageURL.split("/")
//    return n[3];
// }


export const PopupCenter = (pageURL, title, w, h) => {
   var left = (window.screen.width / 2) - (w / 2);
   var top = (window.screen.height / 2) - (h / 2);
   var targetWin = window.open(pageURL, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);
   return targetWin;
}

export const opensocial = (soc) => {
   
   var share_url = window.location.href

   if (soc.type === "facebook") {
       return PopupCenter(`https://www.facebook.com/sharer/sharer.php?u=${share_url}`, 'Share on Facebook', 600, 600)

   }
   else if (soc.type === "twitter") {
       return PopupCenter(`https://twitter.com/share?url=${share_url}&text=${soc.name}`, 'Share on Twitter', 600, 600)

   }
   else if (soc.type === "linkedin") {
       return PopupCenter(`https://www.linkedin.com/shareArticle?mini=true&url=${share_url}`, 'Share on Linkedin', 600, 600)

   }
   else if (soc.type === "gmail") {
       return PopupCenter(`https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=&su=Knowledge+Base+Article+Sharing&body='+${share_url}+'&ui=2&tf=1&pli=1'`, 'Share on Gmail', 600, 600)

   }
}


export const validateUrl = (arg) => {
   return arg.replace(/[^a-zA-Z0-9]/g, '-')
}




export const Dateformate = (dates) => {
   let date = new Date(dates)
   let months_arr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
   let year = date.getFullYear();
   let month = months_arr[date.getMonth()];
   let day = date.getDate();
   if (dates)
       return day + " " + month + "," + year;
   else
       return "00 0000";
};

export const UpdateStatus = (arg) => {

   var current = Date.now()

   var difference = current - arg
   var hours = difference / 3600000
   var days = hours / 24
   var months = days / 30

   if (days < 30) {
       return Math.floor(days) + " Days"
   }
   else if (months > 12) {
       return Math.floor(months / 12) + " Year"
   }
   else if (months < 12 & days > 30) {
       return Math.floor(months) + " Months"
   }
};

// function createCookie(name,value,minutes) {
//    if (minutes) {
//        var date = new Date();
//        date.setTime(date.getTime()+(minutes*60*1000));
//        var expires = "; expires="+date.toGMTString();
//    } else {
//        var expires = "";
//    }
//    document.cookie = name+"="+value+expires+"; path=/";
// }

// export const readCookie = (arg) =>{
//    var cookieArr = document.cookie.split(";");    
//    for(var i = 0; i < cookieArr.length; i++) {
//        var cookiePair = cookieArr[i].split("=");
//        if(arg == cookiePair[0].trim()) {
//            return decodeURIComponent(cookiePair[1]);
//        }
//    }
//    return null;
// }  

export const urlFormat = (arg) => {
   var p = arg.split('//')[1]

   if (p === undefined) {
       return "https://" + arg
   }
   else {
       return arg
   }
}



