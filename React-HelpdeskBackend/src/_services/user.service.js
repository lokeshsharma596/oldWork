import config from 'config';
import { authHeader } from '../_helpers';
import qs from 'querystring'

export const userService = {
    signup,
    login,
    logout,
    confirmation,
    getAll,
    resendpassword,
    sendcode,
    confirmpassword,
    addCategory,
    geteditcategory,
    geteditfolder,
    editCategory,
    editFolder,
    deletecategory,
    categorylist,
    addfolder,
    deletefolder,
    folderlist,
    addArticle,
    getAllArticle,
    geteditArticle,
    Sociallogin,
    editArticle,
    deleteArticle,
    reorderArticle,
    reorderCategory,
    reorderFolder,
    publishArticle,
    addArticlecsv,
    addCategorycsv,
    profileupdate,
    profiledetail,
    profilesetting,
    settingdetail,
    frontendsetting,
    frontendsettingdetail,
    organizationcheck,
    organizationadd,
    comment,
    notification,
    feedbackform,
    sendotp,
    checkotp,
    deleteconfirm,
    exportcsv,
    privacysetting,
    privacydetail,
    updatenotification,
    notificationread,
    glogin,
    cognitogoogle,
    addtempArticle,
    createdomain,
    commontoken
};
function confirmpassword(username) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      //  body: JSON.stringify({ 'email': username, 'code': code, 'newpassword': password })
      body: JSON.stringify({ 'userId': username })
    };

    return fetch(`${config.apiUrl}/resetconfirm`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            if (user.status == 200) {
                return user.message;
            } else {
                const msg = JSON.parse(user.message);
                const error = msg.message;
                return Promise.reject(error);
            }
            // console.log(JSON.stringify(user));
            // return user;
        });
}
function sendcode(username) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 'email': username })
    };

    return fetch(`${config.apiUrl}/forgetpassword`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            if (user.status == 200) {
                // console.log(username);
                localStorage.setItem('sendcode', username);
                return user.msg;
            } else {
                const msg = JSON.parse(user.message);
                const error = msg.message;
                return Promise.reject(error);
            }
            // console.log(JSON.stringify(user));
            // return user;
        });
}
function cognitogoogle(param) {
    const requestOptions = {
        method: 'POST',
        headers: ({ 'Content-Type': 'application/x-www-form-urlencoded','cache-control':'no-cache' }),
        body:""
    };

    return fetch(param, requestOptions)
        .then(handleResponse)
        .then(response => {
            console.log(response.access_token)
            const headerOptions = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json','Authorization': 'Bearer ' + response.access_token},
            };
            return fetch("https://gauth.appypiedesk.com/oauth2/userInfo",headerOptions).then(handleResponse).then(result=>{
                console.log(result);
                return result;
            })
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            
            // console.log(JSON.stringify(user));
            // return user;
        });
}

function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        //body: JSON.stringify({ 'email': username, "password": password })
        body: JSON.stringify({ 'email': username, "password": password,"orgname":localStorage.getItem('orgname'),"domainname":(localStorage.getItem('domainname'))?localStorage.getItem('domainname').trim():'',"color":localStorage.getItem('color') })
    };

    return fetch(`${config.apiUrl}/login`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // var host = window.location.host; 
            // let parts = host.split("."); 
            // console.log(parts);
            // console.log(parts.length);
            // console.log(user.data[0].domainname);
            // // store user details and jwt token in local storage to keep user logged in between page refreshes
            // if(parts.length == 3 && parts[0] != 'www' && parts[0] != 'desk' && parts[0] != 'knowledge'){
            //     if(parts[0] != user.data[0].domainname){
            //         const error = "Incorrect login credentials.";
            //         return Promise.reject(error);
            //     }
                
            // } 
            if (user.status == 200) {
               commontoken(password,user.data[0].id);
                if(localStorage.getItem('domainname') && user.userstatus != "exist_user"){
                    createdomain(localStorage.getItem('domainname').trim()).then(response => {
                        console.log(response);
                    })
                    .catch(function(error) {
                        console.log(error);
                    });
                }
                localStorage.setItem('user', JSON.stringify(user.data));
                localStorage.setItem('articlecount', user.aticlecount);
                return user;
            } else {
                const error = user.message;
                return Promise.reject(error);
            }
            // console.log(JSON.stringify(user));
            // return user;
        });
}

function Sociallogin(username, password, id, type) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 'email': username, "password": password, "id": id, "type": type })
    };

    return fetch(`${config.apiUrl}/sociallogin`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('user', JSON.stringify(user.data));
            if (user.status == 200) {
                return user.message;
            } else {
                const error = JSON.parse(user.message);
                console.log(error.message)
                return Promise.reject(error.message);
            }
            // console.log(JSON.stringify(user));
            // return user;
        });
}

function confirmation() {
    //let user = JSON.parse(localStorage.getItem('userEmail'));
    let id= localStorage.getItem('tempdata');
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 'userId': id})
   //  body: JSON.stringify({ 'email': user.username, "code": code,'id':id })
    };

    return fetch(`${config.apiUrl}/confirmmail`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            if (user.status == 200) {
            //     localStorage.removeItem('userEmail');
            //      localStorage.removeItem('uniqueId');
            //     localStorage.setItem('temp', JSON.stringify(user.data));
                return user.message;
            } else {
                const msg = JSON.parse(user.message);
                const error = msg.message;
                return Promise.reject(error);
            }
            // console.log(JSON.stringify(user));
            // return user;
        });
}

function resendpassword(username) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 'email': username })
    };

    return fetch(`${config.apiUrl}/resendcode`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            if (user.status == 200) {
                return user.message;
            } else {
                const msg = JSON.parse(user.message);
                const error = msg.message;
                return Promise.reject(error);
            }
            // console.log(JSON.stringify(user));
            // return user;
        });
}

function signup(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 'email': username, "password": password,"orgname":localStorage.getItem('orgname'),"domainname":(localStorage.getItem('domainname'))?localStorage.getItem('domainname').trim():'',"color":localStorage.getItem('color') })
    };

    return fetch(`${config.apiUrl}/signup`, requestOptions)
        .then(response => response.json())
        .then(user => {
            if(localStorage.getItem('domainname')){
                createdomain(localStorage.getItem('domainname').trim()).then(response => {
                    console.log(response);
                })
                .catch(function(error) {
                    console.log(error);
                });
            }
            return user;
            // if (user.status == 201 || user.status == 202) {
            //     localStorage.removeItem('domainname');
            //     localStorage.removeItem('color');
            //     (user.status == 201) ? localStorage.setItem('userEmail', JSON.stringify(user.data)) : '';
            //     (user.status == 201) ? localStorage.setItem('uniqueId', user.id) : '';
            //     return user;
            // } else {
            //     if (user.status == 422) {
            //         return Promise.reject(user.message);
            //     }
            //     else {
            //         const msg = JSON.parse(user.message);
            //         let error = msg.message;
            //         return Promise.reject(error);
            //     }

            // }

        });
}

function glogin(username, password) {
    let domainname =(localStorage.getItem('domainname'))?localStorage.getItem('domainname').trim():"";
    let color =(localStorage.getItem('color'))?localStorage.getItem('color').trim():"";
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 'email': username, "password": password,"orgname":localStorage.getItem('orgname'),"domainname":domainname,"color":color })
    };

    return fetch(`${config.apiUrl}/glogin`, requestOptions)
        .then(response => response.json())
        .then(user => {
            localStorage.setItem('user', JSON.stringify(user.data));
            localStorage.setItem('articlecount', user.aticlecount);
            if (user.status == 200) {
                if(domainname){
                    createdomain(domainname.trim()).then(response => {
                        console.log(response);
                    })
                    .catch(function(error) {
                        console.log(error);
                    });
                }
                return user;
            } else {
                const error = user.message;
                return Promise.reject(error);
            }
            // if (user.status == 201 || user.status == 202) {
            //     localStorage.removeItem('domainname');
            //     localStorage.removeItem('color');
            //     (user.status == 201) ? localStorage.setItem('userEmail', JSON.stringify(user.data)) : '';
            //     (user.status == 201) ? localStorage.setItem('uniqueId', user.id) : '';
            //     return user;
            // } else {
            //     if (user.status == 422) {
            //         return Promise.reject(user.message);
            //     }
            //     else {
            //         const msg = JSON.parse(user.message);
            //         let error = msg.message;
            //         return Promise.reject(error);
            //     }

            // }

        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('color');
    localStorage.removeItem('domainname');
    localStorage.removeItem('user');
    localStorage.removeItem('catId');
    localStorage.removeItem('folderId');
    localStorage.setItem("userdata", '');
    localStorage.setItem("login_status", '');
    
}

/* function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/users`, requestOptions).then(handleResponse);
} */

function getAll(params, catId,) {
    let user = getUserid();
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify({ 'userId': user, 'catId': (catId) ? catId : '','search':params.search,'selectionStart':params.selectionStart,'selectionEnd':params.selectionEnd,'allUsers':params.allUsers,'register':params.register,'agents':params.agents,'sort':params.sort, 'offset': params.offset, 'limit': params.pagelimit })
    };
    let url = (catId) ? `${config.apiUrl}/folderlisting` : `${config.apiUrl}/categorylisting`;
    return fetch(url, requestOptions)
        .then(response =>
            response)
        .catch(error => console.log('this is the delete room error', error));
}

function getAllArticle(params, folderId) {
    let user = getUserid();
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify({ 'userId': user, 'folderId': folderId,'search':params.search,'selectionStart':params.selectionStart,'selectionEnd':params.selectionEnd,'allUsers':params.allUsers,'register':params.register,'agents':params.agents,'sort':params.sort, 'offset': params.offset, 'limit': params.pagelimit })
    };
    let url = `${config.apiUrl}/articlelisting`;
    return fetch(url, requestOptions)
        .then(response =>
            response)
        .catch(error => console.log('this is the delete room error', error));
}

function categorylist() {
    let user = getUserid();
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify({ 'userId': user })
    };

    return fetch(`${config.apiUrl}/categorylist`, requestOptions)
        .then(response =>
            response.json())
        .catch(error => console.log('this is the delete room error', error));
}

function folderlist(catId) {
    let user = getUserid();
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify({ 'userId': user, 'catId': catId })
    };

    return fetch(`${config.apiUrl}/folderlist`, requestOptions)
        .then(response =>
            response.json())
        .catch(error => console.log('this is the delete room error', error));
}

function geteditcategory(catId) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify({ 'catId': catId })
    };

    return fetch(`${config.apiUrl}/editcategorylisting`, requestOptions)
        .then(response =>
            response)
        .catch(error => console.log('this is the delete room error', error));
}
function geteditfolder(folderId) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify({ 'folderId': folderId })
    };

    return fetch(`${config.apiUrl}/editfolderlisting`, requestOptions)
        .then(response =>
            response)
        .catch(error => console.log('this is the delete room error', error));
}
function geteditArticle(articleId) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify({ 'articleId': articleId })
    };

    return fetch(`${config.apiUrl}/editArticlelisting`, requestOptions)
        .then(response =>
            response)
        .catch(error => console.log('this is the delete room error', error));
}
function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                location.reload(true);
            }
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}

function addCategory(params) {
    let user = getUserid();
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify({ 'categoryName': params.categoryname, "Description": params.description, "categoryVisible": JSON.stringify(params.userselect), "seoTitle": params.seotitle, "seoDesc": params.seodesc, "seokeyword": JSON.stringify(params.tags), "userId": user })
    };

    return fetch(`${config.apiUrl}/addCategory`, requestOptions)
        .then(response => {
            return response.json();

        });
}

function addCategorycsv(params) {
    let user = getUserid();
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify({ 'categoryName': params.categoryname, "Description": params.description, "categoryVisible": JSON.stringify(params.userselect), "seoTitle": params.seotitle, "seoDesc": params.seodesc, "seokeyword": JSON.stringify(params.tags), "userId": user })
    };

    return fetch(`${config.apiUrl}/addCategory`, requestOptions)
        .then(response => {

            return response.json();

        });
}

function addfolder(params) {
    let user = getUserid();
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify({ 'categoryId': params.categoryid, 'FolderName': params.foldername, "Description": params.description, "categoryVisible": JSON.stringify(params.userselect), "seoTitle": params.seotitle, "seoDesc": params.seodesc, "seokeyword": JSON.stringify(params.tags), "userId": user })
    };

    return fetch(`${config.apiUrl}/addFolder`, requestOptions)
        .then(response => {
            return response.json();
            /*   if(response.status == 200){
                  
                  //localStorage.setItem('userEmail', JSON.stringify(user.data));
                  return response.message;
              } else{
              const msg = response.message;
              const error = msg.message;
              return Promise.reject(error);
              } */

        });
}

function addArticle(params) {
    let user = getUserid();
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify({
            'categoryId': params.catId,
            'folderId': params.folderId, 'articlename': params.articlename, "Description": params.description,
            "pinStatus": params.pinstatus,
            "ispublish": params.ispublish, "articleVisible": JSON.stringify(params.userselect),
            "searchkeyword": JSON.stringify(params.lables)
            , "permission": JSON.stringify(params.permission), "seoTitle": params.seotitle, "seoDesc": params.seodesc, "seokeyword": JSON.stringify(params.tags), "userId": user
        })
    };

    return fetch(`${config.apiUrl}/articleadd`, requestOptions)
        .then(response => {
            return response.json();
            /*   if(response.status == 200){
                  
                  //localStorage.setItem('userEmail', JSON.stringify(user.data));
                  return response.message;
              } else{
              const msg = response.message;
              const error = msg.message;
              return Promise.reject(error);
              } */

        });
}

function addtempArticle(params) {
    let user = getUserid();
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify({
            'categoryId': params.catId,
            'folderId': params.folderId, 'articlename': params.articlename, "Description": params.description,
            "pinStatus": params.pinstatus,
            "ispublish": params.ispublish, "articleVisible": JSON.stringify(params.userselect),
            "searchkeyword": JSON.stringify(params.lables)
            , "permission": JSON.stringify(params.permission), "seoTitle": params.seotitle, "seoDesc": params.seodesc, "seokeyword": JSON.stringify(params.tags), "userId": user
        })
    };

    return fetch(`${config.apiUrl}/articletempadd`, requestOptions)
        .then(response => {
            return response.json();
            /*   if(response.status == 200){
                  
                  //localStorage.setItem('userEmail', JSON.stringify(user.data));
                  return response.message;
              } else{
              const msg = response.message;
              const error = msg.message;
              return Promise.reject(error);
              } */

        });
}

function addArticlecsv(params) {
    let user = getUserid();
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify({
            'bulkdata': params
        })
    };

    return fetch(`${config.apiUrl}/articleaddcsv`, requestOptions)
        .then(response => {
            return response.json();
            /*   if(response.status == 200){
                  
                  //localStorage.setItem('userEmail', JSON.stringify(user.data));
                  return response.message;
              } else{
              const msg = response.message;
              const error = msg.message;
              return Promise.reject(error);
              } */

        });
}

function editCategory(params) {
    let user = getUserid();
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify({ 'createdON':parseFloat(params.createdON),'position':parseFloat(params.position),'catId': params.catId, 'seoId': params.seoId, 'categoryName': params.categoryname, "Description": params.description, "categoryVisible": JSON.stringify(params.userselect), "seoTitle": params.seotitle, "seoDesc": params.seodesc, "seokeyword": JSON.stringify(params.tags), "userId": user })
    };

    return fetch(`${config.apiUrl}/editCategory`, requestOptions)
        .then(response => {
            return response;
            /*   if(response.status == 200){
                  
                  //localStorage.setItem('userEmail', JSON.stringify(user.data));
                  return response.message;
              } else{
              const msg = response.message;
              const error = msg.message;
              return Promise.reject(error);
              } */

        });
}

function editFolder(params) {
    let user = getUserid();
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify({ 'createdON':parseFloat(params.createdON),'position':parseFloat(params.position),'folderId': params.folderId, 'categoryId': params.categoryid, 'seoId': params.seoId, 'FolderName': params.foldername, "Description": params.description, "categoryVisible": JSON.stringify(params.userselect), "seoTitle": params.seotitle, "seoDesc": params.seodesc, "seokeyword": JSON.stringify(params.tags), "userId": user })
    };

    return fetch(`${config.apiUrl}/editFolder`, requestOptions)
        .then(response => {
            return response;
            /*   if(response.status == 200){
                  
                  //localStorage.setItem('userEmail', JSON.stringify(user.data));
                  return response.message;
              } else{
              const msg = response.message;
              const error = msg.message;
              return Promise.reject(error);
              } */

        });
}

function editArticle(params) {
    let user = getUserid();
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify({
            'articleId': params.articleId, seoId: params.seoId, 'categoryId': params.catId,
            'position':parseFloat(params.position),'createdON':parseFloat(params.createdON),'folderId': params.folderId, 'articlename': params.articlename, "Description": params.description,
            "pinStatus": params.pinstatus,
            "ispublish": params.ispublish, "articleVisible": JSON.stringify(params.userselect),
            "searchkeyword": JSON.stringify(params.lables)
            , "permission": JSON.stringify(params.permission), "seoTitle": params.seotitle, "seoDesc": params.seodesc, "seokeyword": JSON.stringify(params.tags), "userId": user
        })
    };

    return fetch(`${config.apiUrl}/editArticle`, requestOptions)
        .then(response => {
            return response;
            /*   if(response.status == 200){
                  
                  //localStorage.setItem('userEmail', JSON.stringify(user.data));
                  return response.message;
              } else{
              const msg = response.message;
              const error = msg.message;
              return Promise.reject(error);
              } */

        });
}

function deletecategory(catId, seoId) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify({ 'catId': JSON.stringify(catId), 'seoId': JSON.stringify(seoId) })
    };

    return fetch(`${config.apiUrl}/deletecategory`, requestOptions)
        .then(response => {
            return response;

        });
}

function deletefolder(folderId, seoId) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify({ 'folderId': JSON.stringify(folderId), 'seoId': JSON.stringify(seoId) })
    };

    return fetch(`${config.apiUrl}/deletefolder`, requestOptions)
        .then(response => {
            return response;

        });
}

function deleteArticle(articleId, seoId) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify({ 'articleId': JSON.stringify(articleId), 'seoId': JSON.stringify(seoId) })
    };

    return fetch(`${config.apiUrl}/deleteArticle`, requestOptions)
        .then(response => {
            return response;

        });
}

function publishArticle(articleId, seoId) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify({ 'articleId': JSON.stringify(articleId), 'seoId': JSON.stringify(seoId) })
    };

    return fetch(`${config.apiUrl}/publishArticle`, requestOptions)
        .then(response => {
            return response.json();

        });
}

function reorderArticle(articleId, position) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify({ 'articleId': articleId, 'position': position })
    };

    return fetch(`${config.apiUrl}/reorderArticle`, requestOptions)
        .then(response => {
            return response;

        });
}

function reorderCategory(categoryId, position) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify({ 'categoryId': categoryId, 'position': position })
    };

    return fetch(`${config.apiUrl}/reorderCategory`, requestOptions)
        .then(response => {
            return response;

        });
}

function reorderFolder(folderId, position) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify({ 'folderId': folderId, 'position': position })
    };

    return fetch(`${config.apiUrl}/reorderFolder`, requestOptions)
        .then(response => {
            return response;

        });
}

function profileupdate(params) {
    let user = getUserid();
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify({"firstname":params.firstname,"lastname":params.lastname,"imageUrl":params.imageUrl,"address":params.address,"country":params.country,"dept":params.dept,"designation":params.designation,"facebooklink":params.facebooklink,"instagramlink":params.instagramlink,"lang": params.lang,"linkdinlink": params.linkdinlink,"mobno": params.mobno,"role": params.role,"timezone": params.timezone,"twitterlink": params.twitterlink,"phoneno":params.phoneno,"dataformate":params.dataformate,"datetimezone":params.datetimezone,"keyshortcut":params.keyshortcut,"nameshow":params.nameshow,"screentype":params.screentype,"userId": user
        })
    };

    return fetch(`${config.apiUrl}/updateProfile`, requestOptions)
        .then(response => {
            
           // localStorage.setItem('user', JSON.stringify(response.data));
            return response.json();
            /*   if(response.status == 200){
                  
                  //localStorage.setItem('userEmail', JSON.stringify(user.data));
                  return response.message;
              } else{
              const msg = response.message;
              const error = msg.message;
              return Promise.reject(error);
              } */

        });
}


function profiledetail() {
    let user = getUserid();
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify({ 'userId': user })
    };

    return fetch(`${config.apiUrl}/profileDeatail`, requestOptions)
        .then(response =>
            response.json())
        .catch(error => console.log('this is the delete room error', error));
}


function profilesetting(params) {
    let user = getUserid();
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify({"domainname":params.domainname,"portalname":params.portalname,"allowlabel":params.allowlabel,"allowrating":params.allowrating,"allowsharing":params.allowsharing,"allowcomment":params.allowcomment,"id":params.setid,"userId": user
        })
    };

    return fetch(`${config.apiUrl}/profilesetting`, requestOptions)
        .then(response => {
            
           // localStorage.setItem('user', JSON.stringify(response.data));
            return response.json();
            /*   if(response.status == 200){
                  
                  //localStorage.setItem('userEmail', JSON.stringify(user.data));
                  return response.message;
              } else{
              const msg = response.message;
              const error = msg.message;
              return Promise.reject(error);
              } */

        });
}

function settingdetail() {
    let user = getUserid();
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify({ 'userId': user })
    };

    return fetch(`${config.apiUrl}/SettingDetail`, requestOptions)
        .then(response =>
            response.json())
        .catch(error => console.log('this is the delete room error', error));
}

function frontendsetting(params) {
    let user = getUserid();
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify({"title":params.title,"description":params.description,"language":params.language,"logo":params.logo,"knoledgebase":params.knoledgebase,"community":params.community,"ticket":params.ticket,"userId": user,"Headerlink":params.Headerlink,"Footerlink":params.Footerlink,"folderlinkurl":params.folderlinkurl,"facebook":params.facebook,"twitter":params.twitter,"other":params.other,"pintrest":params.pintrest,"social":params.social,"organization": params.organization,"organtitle":params.organtitle,"organkeyword":params.organkeyword,"organdescription":params.organdescription,"organlogo":params.organlogo,"imageoverlay":params.imageoverlay,"themescolor":params.themescolor,"textcolor":params.textcolor,"headerimage":params.headerimage,"faviconimage": params.faviconimage,"allowsignup":params.allowsignup,"allowcaptcha":params.allowcaptcha,"enablesearch":params.enablesearch,"allowbredcumb":params.allowbredcumb,"submitticket":params.submitticket,"articleaccess":params.articleaccess,"communityaccess":params.communityaccess,"allowaction":params.allowaction,"googlescan": params.googlescan,"id":params.id,"fontfamily":params.fontfamily,"commentaccess":params.commentaccess,"voteaccess":params.voteaccess})
    }

    return fetch(`${config.apiUrl}/frontendsetting`, requestOptions)
        .then(response => {
            
           // localStorage.setItem('user', JSON.stringify(response.data));
            return response.json();
            /*   if(response.status == 200){
                  
                  //localStorage.setItem('userEmail', JSON.stringify(user.data));
                  return response.message;
              } else{
              const msg = response.message;
              const error = msg.message;
              return Promise.reject(error);
              } */

        });
}

function frontendsettingdetail() {
    let user = getUserid();
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify({ 'userId': user })
    };

    return fetch(`${config.apiUrl}/FrontendSettingDetail`, requestOptions)
        .then(response =>
            response.json())
        .catch(error => console.log('this is the delete room error', error));
}
function organizationcheck(name) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 'organisationname': name })
    };

    return fetch(`${config.apiUrl}/checkorganisation`, requestOptions)
        .then(response =>
            response.json())
        .catch(error => console.log('this is the delete room error', error));
}

function organizationadd(name,color) {
    let user = getUserid();
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify({ 'organisationname': name,"orgname":localStorage.getItem('orgname'),'color': color,'userId': user })
    };

    return fetch(`${config.apiUrl}/organisationadd`, requestOptions)
        .then(response =>{
            if(name){
                createdomain(name.trim()).then(responses => {
                    console.log(responses);
                })
                .catch(function(error) {
                    console.log(error);
                });
            }
            return response.json()
        })
        .catch(error => console.log('this is the delete room error', error));
}





function comment(id) {
    let user = getUserid();
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify({ 'userId': user,'id': id })
    };

    return fetch(`${config.apiUrl}/commentlisting`, requestOptions)
        .then(response =>
            response.json())
        .catch(error => console.log('this is the delete room error', error));
}

function notification() {
    let user = getUserid();
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify({ 'userId': user })
    };

    return fetch(`${config.apiUrl}/notificationlisting`, requestOptions)
        .then(response =>
            response.json())
        .catch(error => console.log('this is the delete room error', error));
}

function feedbackform(params){
    let user = JSON.parse(localStorage.getItem('user'));
    let email = user[0].data.email;
    let id = user[0].id;
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify({ 'email':  email,'id':id,'rule':params.rule,'score':params.score,'experiance':params.experiance,'send':params.send})
    };

    return fetch(`${config.apiUrl}/feedback`, requestOptions)
        .then(response =>
            response.json())
        .catch(error => console.log('this is the delete room error', error));
    
}

function sendotp(params){
    let user = JSON.parse(localStorage.getItem('user'));
    let email = user[0].data.email;
    let id = user[0].id;
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify({ 'email':  email,'id':id})
    };

    return fetch(`${config.apiUrl}/sendOtp`, requestOptions)
        .then(response =>
            response.json())
        .catch(error => console.log('this is the delete room error', error));
    
}

function checkotp(params){
    let user = JSON.parse(localStorage.getItem('user'));
    let id = user[0].id;
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify({ 'otp': params.otpsend,'id':id})
    };

    return fetch(`${config.apiUrl}/checkotp`, requestOptions)
        .then(response =>
            response.json())
        .catch(error => console.log('this is the delete room error', error));
    
}

function deleteconfirm(params){
    let user = JSON.parse(localStorage.getItem('user'));
    let id = user[0].id;
    let email = user[0].data.email;
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify({ 'email': email,'id':id,'reason':params.reason,'reasondesc':params.reasondesc})
    };

    return fetch(`${config.apiUrl}/deleteconfirm`, requestOptions)
        .then(response =>
            response.json())
        .catch(error => console.log('this is the delete room error', error));
    
}

function exportcsv(params){
    let user = JSON.parse(localStorage.getItem('user'));
    let email = user[0].data.email;
    let id = user[0].id;
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify({ 'email':  email,'id':id,'type':params.articletype,'domain':user[0].domainname})
    };

    return fetch(`${config.apiUrl}/exportcsv`, requestOptions)
        .then(response =>
            response.json())
        .catch(error => console.log('this is the delete room error', error));
    
}


function privacysetting(params) {
    let user = getUserid();
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify({"news_special":params.news_special,"product_feature":params.product_feature,"product_subscription":params.product_subscription,"product_feedback":params.product_feedback,"agree":params.agree,"id":params.id,"userId": user
        })
    };

    return fetch(`${config.apiUrl}/privacysetting`, requestOptions)
        .then(response => {
            
           // localStorage.setItem('user', JSON.stringify(response.data));
            return response.json();
            /*   if(response.status == 200){
                  
                  //localStorage.setItem('userEmail', JSON.stringify(user.data));
                  return response.message;
              } else{
              const msg = response.message;
              const error = msg.message;
              return Promise.reject(error);
              } */

        });
}

function privacydetail() {
    let user = getUserid();
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify({ 'userId': user })
    };

    return fetch(`${config.apiUrl}/privacyDetail`, requestOptions)
        .then(response =>
            response.json())
        .catch(error => console.log('this is the delete room error', error));
}

function updatenotification() {
    let user = getUserid();
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify({ 'userId': user })
    };

    return fetch(`${config.apiUrl}/notificationupdate`, requestOptions)
        .then(response =>
            response.json())
        .catch(error => console.log('this is the delete room error', error));
}

function notificationread(param) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify({ 'id': param })
    };

    return fetch(`${config.apiUrl}/notificationread`, requestOptions)
        .then(response =>
            response.json())
        .catch(error => console.log('this is the delete room error', error));
}

function createdomain(orgname) {
    return fetch("https://www.appypiedesk.com/login/api", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 'domain': orgname })
      })
        .then(response => {
            let json = response.json();
          console.log(json);
          if (!response.ok) {
           // throw new Error("Network response was not ok");
            return true;
          }
          return true;
        })
  
}

function getUserid() {
    let user = JSON.parse(localStorage.getItem('user'));
    return user[0].id;

}


function commontoken(email=null,productId=null) {
            console.log(email);
            console.log(productId);
            const headerOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8','Authorization': 'Basic YXBwbGljYXRpb246c2VjcmV0'},
                body: qs.stringify({
                    grant_type: 'password',
                    username: 'pedroetb',
                    password: "password"
                })
            };
            return fetch("https://commonlogin.pbodev.info/backend/oauth/token",headerOptions).then(handleResponse).then(response=>{
                commonapipassproduct(email,productId,response.accessToken);
                return response.accessToken;
            })
            
}

function commonapipassproduct(email=null,productId=null,token=null){
    const headerOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8','Authorization': 'Bearer '+token},
        body: qs.stringify({
            email: email,
            productname: 'helpdesk',
            user_id: productId
        })
    };
    return fetch("https://commonlogin.pbodev.info/backend/api/product/productuser",headerOptions).then(handleResponse).then(response=>{
        return response;
    })
    
}