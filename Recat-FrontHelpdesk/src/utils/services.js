export const getApiCall = (arg, name) => {
    var URL = ''
    if (Object.keys(arg).length) {
        const params = new URLSearchParams(arg);
        URL = `${process.env.REACT_APP_API_CONFIG}/${name}?${params.toString()}`;
    }
    else {
        URL = `${process.env.REACT_APP_API_CONFIG}/${name}`;
    }
  
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

export const putApiCall = (arg, name) => {
    
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
            resolve(response)
        })
    })
}

export const postApiCallwithHeaderAuth = (arg,token,name) => {
    return new Promise((resolve, reject) => {
        fetch(`${process.env.REACT_APP_API_CONFIG}/${name}`, {
            method: 'POST',
            body: JSON.stringify(arg),
            headers: {
                'Content-Type': 'application/json',
                'authorization':`Bearer ${token}`
            }
        }).then(res => res.json()).then(response => {
            resolve(response)
        })
    })
}