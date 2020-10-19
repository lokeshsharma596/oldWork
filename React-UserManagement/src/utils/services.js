export const getApiCall = (arg, name) => {
    var URL = ''
    if (Object.keys(arg).length) {
        const params = new URLSearchParams(arg);
        URL = `${process.env.REACT_APP_API_CONFIG}/${name}?${params.toString()}`;
    }
    else {
        URL = `${process.env.REACT_APP_API_CONFIG}/${name}`;
    }
    
    console.log(URL,"called")
    return new Promise((resolve, reject) => {
        fetch(URL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json()).then(response => {
            resolve(response)
        })
    })
}

export const postApiCall = (arg, name) => {
    return new Promise((resolve, reject) => {
        fetch(`${process.env.REACT_APP_API_CONFIG}/${name}`, {
            method: 'POST',
            body: JSON.stringify(arg),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json()).then(response => {
            resolve(response)
        })
    })
}

export const feedbackSubmit = (arg, name) => {
    let user = JSON.parse(localStorage.getItem('user'));
    return new Promise((resolve, reject) => {
        fetch(`${process.env.REACT_APP_API_KB_CONFIG}/${name}`, {
            method: 'POST',
            body: JSON.stringify(arg),
            headers: { 'Content-Type': 'application/json','Authorization': 'Bearer ' + user[0].token }
        }).then(res => res.json()).then(response => {
            resolve(response.data)
        })
    })
}

export const sendotp = (arg, name) => {
    let user = JSON.parse(localStorage.getItem('user'));
    let email = user[0].data.email;
    let id = user[0].id;
    return new Promise((resolve, reject) => {
        fetch(`${process.env.REACT_APP_API_KB_CONFIG}/${name}`, {
            method: 'POST',
            body: JSON.stringify({ 'email':  email,'id':id}),
            headers: { 'Content-Type': 'application/json','Authorization': 'Bearer ' + user[0].token }
        }).then(res => res.json()).then(response => {
            resolve(response.data)
        })
    })
}

export const updateProfile = (arg, name) => {
    let user = JSON.parse(localStorage.getItem('user'));
    return new Promise((resolve, reject) => {
        fetch(`${process.env.REACT_APP_API_KB_CONFIG}/${name}`, {
            method: 'POST',
            body: JSON.stringify(arg),
            headers: { 'Content-Type': 'application/json','Authorization': 'Bearer ' + user[0].token }
        }).then(res => res.json()).then(response => {
            //localStorage.setItem('user', JSON.stringify(response.data));
        //     var createGuest = require('cross-domain-storage/guest');
        //     var bazStorage = createGuest(`${process.env.REACT_APP_API_KB_BACKEND}`);
        //     bazStorage.set('user', JSON.stringify(response.data), function(error, data) {
        // // foo is now set to 'bar'
        //     });
            resolve(response.data)
        })
    })
}

export const getuser = (arg, name) => {
    let user = JSON.parse(localStorage.getItem('user'));
    return new Promise((resolve, reject) => {
        fetch(`${process.env.REACT_APP_API_KB_CONFIG}/${name}`, {
            method: 'POST',
            body: JSON.stringify(arg),
            headers: { 'Content-Type': 'application/json','Authorization': 'Bearer ' + user[0].token }
        }).then(res => res.json()).then(response => {
            resolve(response.data)
        })
    })
}

export const putApiCall = (arg, name) => {
    console.log(arg,name,"put");
    
    return new Promise((resolve, reject) => {
        fetch(`${process.env.REACT_APP_API_CONFIG}/${name}`, {
            method: 'PUT',
            body: JSON.stringify(arg),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json()).then(response => {
            resolve(response)
        })
    })
}

export const deleteApiCall = (arg, name) => {
    return new Promise((resolve, reject) => {
        fetch(`${process.env.REACT_APP_API_CONFIG}/${name}`, {
            method: 'DELETE',
            body: JSON.stringify(arg),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json()).then(response => {
            resolve(response.data)
        })
    })
}