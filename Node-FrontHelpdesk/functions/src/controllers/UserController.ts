import admin from "../lib/database";
import transporter from "../lib/nodemailer"
const emailTemplates = require("../lib/emailTemplates")
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken')
import * as Config from "../lib/config"


const checkChildUserExist = async (req: any, res: any) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: "400",
      message: "Invalid Request",
      errors: errors.array()
    });

  } else {
    console.log(req.body,'checkChildUserExist');
    
  let query: any = admin.firestore().collection('org_users').where('email', '==', req.body.email)
  query = query.where('org_id', '==', req.body.org_id)
    .get().then((documentSet: any) => {
      if (documentSet.empty) {
        return res.status(200).json({
          "status": 200,
          "message": "User Not Exist,Send to Signup Page",
        });
      } else {
        const user:any=[]
        documentSet.forEach((doc: any) => {
          user.push({
            id: doc.id,
            ...doc.data()
          })
        })


        if(user[0].verify === undefined || user[0].verify === false || user[0].password === undefined || user[0].password.length === 0) {

          const OTP: any = Math.floor(100000 + Math.random() * 900000);

          admin.firestore().collection('org_users').doc(user[0].id).update({
            otp: OTP,
            verify:false
          }).then(() => {

            // transporter.sendMail(emailTemplates.verficationCode({ email: user[0].email, otp: OTP }))

            if(user[0].password === undefined || user[0].password.length === 0){
              return res.status(200).json({
                "status": 200,
                "message": "User Exist,Verify Otp and take password",
              });
            }else{
              return res.status(200).json({
                "status": 200,
                "message": "User Exist,Verify Otp",
              });
            }
            
          })
        }
        else{
          return res.status(200).json({
            "status": 200,
            "message": "User Exist,Please Login",
          });
        }
      }
    })
}
}

const forgotPasswordSendCode = async (req: any, res: any) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: "400",
      message: "Invalid Request",
      errors: errors.array()
    });
  } 
  else {

  let query: any = admin.firestore().collection('org_users').where('email', '==', req.body.email)
  query = query.where('org_id', '==', req.body.org_id)
    .get().then((documentSet: any) => {
      if (documentSet.empty) {
        return res.status(400).json({
          "status": 400,
          "message": "User Not Exist Please SignUp",
        });
      } else {
        const OTP: any = Math.floor(100000 + Math.random() * 900000);
        const userData: any = []

        documentSet.forEach((doc: any) => {
          userData.push(doc.id)
        })

        admin.firestore().collection('org_users').doc(userData[0]).update({
          otp: OTP
        }).then(() => {
          transporter.sendMail(emailTemplates.forgotPasswordSendVerificationCode({ email: req.body.email, otp: OTP,url:req.body.url,portalName:req.body.portalName }))
          return res.status(200).json({
            "status": 200,
            "message": "OTP successfully sent"
          });
        }).catch((error: any) => {
          console.error("Error writing document: ", error);
        });
      }
    }).catch((error: any) => {
      console.error("Error writing document: ", error);
    });
}
}

const signup = async (req: any, res: any) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: "400",
      message: "Invalid Request",
      errors: errors.array()
    });

  } else {
    console.log(req.body,"signup")
    let query: any = admin.firestore().collection('org_users').where('email', '==', req.body.email)
    query = query.where('org_id', '==', req.body.org_id)
      .get().then((documentSet: any) => {
        if (documentSet.empty) {

          const OTP: any = Math.floor(100000 + Math.random() * 900000);

          admin.firestore().collection('org_users').add({
            email: req.body.email,
            password:req.body.password,
            otp: OTP,
            verify: false,
            org_id: req.body.org_id
          }).then(() => {
            transporter.sendMail(emailTemplates.verficationCodeFirstTime({ email: req.body.email, otp: OTP,url:req.body.url,portalName:req.body.portalName }))
            return res.status(200).json({
              "status": 200,
              "message": "OTP successfully sent"
            });
          }).catch((error: any) => {
            console.error("Error writing document: ", error);
          });
        }
        else {
          return res.status(404).json({
            "status": 404,
            "message": "An account with the given email already exists. Please Login",
          });
        }
      }).catch((err: any) => {
        console.log(err);
      })
  }
}


const verifyOtpAndUpdatePassword = async (req: any, res: any) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: "400",
      message: "Invalid Request",
      errors: errors.array()
    });

  } else {
  let query: any = admin.firestore().collection('org_users').where("email", "==", req.body.email)
  query = query.where("org_id", "==", req.body.org_id)
  query = query.where("otp", "==", parseInt(req.body.otp))
    .get().then((documentSet: any) => {
      if (documentSet.empty) {
        return res.status(404).json({
          "status": 400,
          "message": "Invalid OTP"
        });
      } else {
        const userData: any = []
        documentSet.forEach((doc: any) => {
          userData.push({
            id:doc.id,
            ...doc.data()
          })
        })

        if(userData[0].password === req.body.password || userData[0].old_password === req.body.password){
          return res.status(404).json({
            "status": 400,
            "message": "New Password is similar to previous two passwords!"
          });
        }
        else{
          admin.firestore().collection('org_users').doc(userData[0].id).update({
            old_password:userData[0].password,
            password: req.body.password,
            verify:true
          }).then(() => {
            return res.status(200).json({
              "status": "200",
              "message": "Account reset Successfully."
            });
          }).catch((error: any) => {
            console.error("Error: ", error);
          });
        }
       
      }
    })
}
}

const resetConfirm = async (req: any, res: any) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: "400",
      message: "Invalid Request",
      errors: errors.array()
    });

  } else {
 
  console.log(req.body, "resetConfirm")
  transporter.sendMail(emailTemplates.resetSuccess({ email: req.body.email }))
  return res.status(200).json({
    "status": "200",
    "message": "Account reset Successfully."
  });
}
}



const resendVerificationCode = async (req: any, res: any) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: "400",
      message: "Invalid Request",
      errors: errors.array()
    });

  } else {
  const OTP: any = Math.floor(100000 + Math.random() * 900000);



  let query: any = admin.firestore().collection('org_users').where("email", "==", req.body.email)
  query = query.where("org_id", "==", req.body.org_id)
    .get().then((documentSet: any) => {
      const userData: any = []
      documentSet.forEach((doc: any) => {
        userData.push(doc.id)
      })
      admin.firestore().collection('org_users').doc(userData[0]).update({
        otp: OTP
      }).then(() => {
        transporter.sendMail(emailTemplates.forgotPasswordSendVerificationCode({ email: req.body.email, otp: OTP,url:req.body.url,portalName:req.body.portalName }))
        return res.status(200).json({
          "status": 200,
          "message": "OTP successfully sent"
        });
      }).catch((error: any) => {
        console.error("Error writing document: ", error);
      });
    })
}
}

const verifyOtpAndCreateUser = async (req: any, res: any) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: "400",
      message: "Invalid Request",
      errors: errors.array()
    });

  } else {
  console.log(req.body, "verifyOtpAndCreateUser")
  let query: any = admin.firestore().collection('org_users').where("email", "==", req.body.email)
  query = query.where("org_id", "==", req.body.org_id)
  query = query.where("otp", "==", parseInt(req.body.otp))
    .get().then((documentSet: any) => {
      if (documentSet.empty) {
        return res.status(404).json({
          "status": 404,
          "message": "Plaese Enter Correct OTP"
        });
      } else {
        const userData: any = []
        documentSet.forEach((doc: any) => {
          userData.push(doc.id)
        })

          admin.firestore().collection('org_users').doc(userData[0]).update({
            verify: true,
            createdON: Date.now()
          }).then(function () {
            transporter.sendMail(emailTemplates.accountCreatedSuccess({ email: req.body.email,url:req.body.url,portalName:req.body.portalName }))
            return res.status(200).json({
              "status": 200,
              "message": "Account Created Successfully"
            });
          })
    
      }
    })
}
}

const addChildUser = (req: any, res: any) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: "400",
      message: "Invalid Request",
      errors: errors.array()
    });

  } else {
  console.log(req.body, "Add child user");

  admin.firestore().collection('childUsers').add({
    email: req.body.email,
    verify: true,
    parentId: req.body.parentId,
    createdON: Date.now()
  }).then(() => {
    transporter.sendMail(emailTemplates.welcomeEmail({ email: req.body.email }))
    return res.status(200).json({
      "status": 200,
      "message": "User Added Successfully"
    });
  })
}
}

const login = (req: any, res: any) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: "400",
      message: "Invalid Request",
      errors: errors.array()
    });

  } else {

    let query: any = admin.firestore().collection('org_users').where('org_id', '==', req.body.org_id)
    query = query.where('email', '==', req.body.email).get().then((documentSet: any) => {
      if (documentSet.empty) {
        return res.status(400).json({ 
          status:400,
          message: 'User Not Exist Please SignUp' 
        })
      } else {
        const user: any = []
        documentSet.forEach((doc: any) => {
          user.push({
            id:doc.id,
            ...doc.data()
          })
        })

        if (user[0].verify === true) {
          if (user[0].password === req.body.password) {
            const userData={
              id:user[0].id,
              email:user[0].email,
              org_id:user[0].org_id
            }

            jwt.sign({user:userData},Config.JWT_SECRET_KEY,(err:any,token:any) => {
              return res.status(200).json({ 
                token:token,
                status:200,
                message:"success"
               })
            })
            
          } else {
            return res.status(400).json({ 
              status:400,
              message: 'Please Enter Correct Password' 
            })
          }
        } else {
          return res.status(400).json({ 
            status:400,
            message: 'Not Verified' 
          })
        }

      }
    })
  }
}


module.exports = {
  checkChildUserExist: checkChildUserExist,
  resetConfirm: resetConfirm,
  resendVerificationCode: resendVerificationCode,
  verifyOtpAndCreateUser: verifyOtpAndCreateUser,
  signup: signup,
  addChildUser: addChildUser,
  forgotPasswordSendCode: forgotPasswordSendCode,
  verifyOtpAndUpdatePassword: verifyOtpAndUpdatePassword,
  login: login
}