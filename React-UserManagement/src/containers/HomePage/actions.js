import * as Constants from "./constants"


export const fetchPermissionsRequest = data =>  ({
    type: Constants.FETCH_PERMISSIONS_REQUEST,
    payload:data
  })


export const fetchPermissionsSuccess = permissions => ({
    type: Constants.FETCH_PERMISSIONS_SUCCESS,
    payload: permissions
})

export const fetchPermissionsFailure = error => ({
    type: Constants.FETCH_PERMISSIONS_FAILURE,
    payload: error
})

export const showNotificationlisting = () => ({
    type: Constants.SHOW_NOTIFICATION_LIST
})

export const hideNotificationlisting = () => ({
    type: Constants.HIDE_NOTIFICATION_LIST
})

export const showeditprofilepage = () => ({
    type: Constants.SHOW_PROFILE_PAGE
})

export const hideeditprofilepage = () => ({
    type: Constants.HIDE_PROFILE_PAGE
})

export const updateUserprofile = data =>  ({
    type: Constants.UPDATE_USER_REQUEST, 
    payload:data
})

export const updateUserFailure = error => ({
    type: Constants.UPDATE_USER_FAILURE,
    payload: error
  })

  
export const updateUserSuccess = data => ({
   type: Constants.UPDATE_USER_SUCCESS,
   payload: data
})

export const showCommonSuccessToast = data => ({
    type: Constants.SHOW_COMMON_SUCCESS_TOAST,
    payload:data
  })
  
  export const hideCommonSuccessToast = () => ({
    type: Constants.HIDE_COMMON_SUCCESS_TOAST
  })
  
  export const fetchuserRequest = data =>  ({
    type: Constants.FETCH_USER_REQUEST,
    payload:data
  })
  
  export const fetchuserSuccess = users => ({
    type: Constants.FETCH_USER_SUCCESS,
    payload: users
})

export const fetchuserFailure = error => ({
    type: Constants.FETCH_USER_FAILURE,
    payload: error
})

export const showPopup = data => ({
  type: Constants.SHOW_POPUP
})

export const hidePopup = () => ({
  type: Constants.HIDE_POPUP
})

export const sendotp = () => ({
  type: Constants.SEND_OTP
})