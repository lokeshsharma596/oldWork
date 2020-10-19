"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../lib/database");
const nodemailer_1 = require("../lib/nodemailer");
const emailTemplates = require("../lib/emailTemplates");
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const Config = require("../lib/config");
const checkChildUserExist = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: "400",
            message: "Invalid Request",
            errors: errors.array()
        });
    }
    else {
        console.log(req.body, 'checkChildUserExist');
        let query = database_1.default.firestore().collection('org_users').where('email', '==', req.body.email);
        query = query.where('org_id', '==', req.body.org_id)
            .get().then((documentSet) => {
            if (documentSet.empty) {
                return res.status(200).json({
                    "status": 200,
                    "message": "User Not Exist,Send to Signup Page",
                });
            }
            else {
                const user = [];
                documentSet.forEach((doc) => {
                    user.push(Object.assign({ id: doc.id }, doc.data()));
                });
                if (user[0].verify === undefined || user[0].verify === false || user[0].password === undefined || user[0].password.length === 0) {
                    const OTP = Math.floor(100000 + Math.random() * 900000);
                    database_1.default.firestore().collection('org_users').doc(user[0].id).update({
                        otp: OTP,
                        verify: false
                    }).then(() => {
                        // transporter.sendMail(emailTemplates.verficationCode({ email: user[0].email, otp: OTP }))
                        if (user[0].password === undefined || user[0].password.length === 0) {
                            return res.status(200).json({
                                "status": 200,
                                "message": "User Exist,Verify Otp and take password",
                            });
                        }
                        else {
                            return res.status(200).json({
                                "status": 200,
                                "message": "User Exist,Verify Otp",
                            });
                        }
                    });
                }
                else {
                    return res.status(200).json({
                        "status": 200,
                        "message": "User Exist,Please Login",
                    });
                }
            }
        });
    }
};
const forgotPasswordSendCode = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: "400",
            message: "Invalid Request",
            errors: errors.array()
        });
    }
    else {
        let query = database_1.default.firestore().collection('org_users').where('email', '==', req.body.email);
        query = query.where('org_id', '==', req.body.org_id)
            .get().then((documentSet) => {
            if (documentSet.empty) {
                return res.status(400).json({
                    "status": 400,
                    "message": "User Not Exist Please SignUp",
                });
            }
            else {
                const OTP = Math.floor(100000 + Math.random() * 900000);
                const userData = [];
                documentSet.forEach((doc) => {
                    userData.push(doc.id);
                });
                database_1.default.firestore().collection('org_users').doc(userData[0]).update({
                    otp: OTP
                }).then(() => {
                    nodemailer_1.default.sendMail(emailTemplates.forgotPasswordSendVerificationCode({ email: req.body.email, otp: OTP, url: req.body.url, portalName: req.body.portalName }));
                    return res.status(200).json({
                        "status": 200,
                        "message": "OTP successfully sent"
                    });
                }).catch((error) => {
                    console.error("Error writing document: ", error);
                });
            }
        }).catch((error) => {
            console.error("Error writing document: ", error);
        });
    }
};
const signup = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: "400",
            message: "Invalid Request",
            errors: errors.array()
        });
    }
    else {
        console.log(req.body, "signup");
        let query = database_1.default.firestore().collection('org_users').where('email', '==', req.body.email);
        query = query.where('org_id', '==', req.body.org_id)
            .get().then((documentSet) => {
            if (documentSet.empty) {
                const OTP = Math.floor(100000 + Math.random() * 900000);
                database_1.default.firestore().collection('org_users').add({
                    email: req.body.email,
                    password: req.body.password,
                    otp: OTP,
                    verify: false,
                    org_id: req.body.org_id
                }).then(() => {
                    nodemailer_1.default.sendMail(emailTemplates.verficationCodeFirstTime({ email: req.body.email, otp: OTP, url: req.body.url, portalName: req.body.portalName }));
                    return res.status(200).json({
                        "status": 200,
                        "message": "OTP successfully sent"
                    });
                }).catch((error) => {
                    console.error("Error writing document: ", error);
                });
            }
            else {
                return res.status(404).json({
                    "status": 404,
                    "message": "An account with the given email already exists. Please Login",
                });
            }
        }).catch((err) => {
            console.log(err);
        });
    }
};
const verifyOtpAndUpdatePassword = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: "400",
            message: "Invalid Request",
            errors: errors.array()
        });
    }
    else {
        let query = database_1.default.firestore().collection('org_users').where("email", "==", req.body.email);
        query = query.where("org_id", "==", req.body.org_id);
        query = query.where("otp", "==", parseInt(req.body.otp))
            .get().then((documentSet) => {
            if (documentSet.empty) {
                return res.status(404).json({
                    "status": 400,
                    "message": "Invalid OTP"
                });
            }
            else {
                const userData = [];
                documentSet.forEach((doc) => {
                    userData.push(Object.assign({ id: doc.id }, doc.data()));
                });
                if (userData[0].password === req.body.password || userData[0].old_password === req.body.password) {
                    return res.status(404).json({
                        "status": 400,
                        "message": "New Password is similar to previous two passwords!"
                    });
                }
                else {
                    database_1.default.firestore().collection('org_users').doc(userData[0].id).update({
                        old_password: userData[0].password,
                        password: req.body.password,
                        verify: true
                    }).then(() => {
                        return res.status(200).json({
                            "status": "200",
                            "message": "Account reset Successfully."
                        });
                    }).catch((error) => {
                        console.error("Error: ", error);
                    });
                }
            }
        });
    }
};
const resetConfirm = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: "400",
            message: "Invalid Request",
            errors: errors.array()
        });
    }
    else {
        console.log(req.body, "resetConfirm");
        nodemailer_1.default.sendMail(emailTemplates.resetSuccess({ email: req.body.email }));
        return res.status(200).json({
            "status": "200",
            "message": "Account reset Successfully."
        });
    }
};
const resendVerificationCode = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: "400",
            message: "Invalid Request",
            errors: errors.array()
        });
    }
    else {
        const OTP = Math.floor(100000 + Math.random() * 900000);
        let query = database_1.default.firestore().collection('org_users').where("email", "==", req.body.email);
        query = query.where("org_id", "==", req.body.org_id)
            .get().then((documentSet) => {
            const userData = [];
            documentSet.forEach((doc) => {
                userData.push(doc.id);
            });
            database_1.default.firestore().collection('org_users').doc(userData[0]).update({
                otp: OTP
            }).then(() => {
                nodemailer_1.default.sendMail(emailTemplates.forgotPasswordSendVerificationCode({ email: req.body.email, otp: OTP, url: req.body.url, portalName: req.body.portalName }));
                return res.status(200).json({
                    "status": 200,
                    "message": "OTP successfully sent"
                });
            }).catch((error) => {
                console.error("Error writing document: ", error);
            });
        });
    }
};
const verifyOtpAndCreateUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: "400",
            message: "Invalid Request",
            errors: errors.array()
        });
    }
    else {
        console.log(req.body, "verifyOtpAndCreateUser");
        let query = database_1.default.firestore().collection('org_users').where("email", "==", req.body.email);
        query = query.where("org_id", "==", req.body.org_id);
        query = query.where("otp", "==", parseInt(req.body.otp))
            .get().then((documentSet) => {
            if (documentSet.empty) {
                return res.status(404).json({
                    "status": 404,
                    "message": "Plaese Enter Correct OTP"
                });
            }
            else {
                const userData = [];
                documentSet.forEach((doc) => {
                    userData.push(doc.id);
                });
                database_1.default.firestore().collection('org_users').doc(userData[0]).update({
                    verify: true,
                    createdON: Date.now()
                }).then(function () {
                    nodemailer_1.default.sendMail(emailTemplates.accountCreatedSuccess({ email: req.body.email, url: req.body.url, portalName: req.body.portalName }));
                    return res.status(200).json({
                        "status": 200,
                        "message": "Account Created Successfully"
                    });
                });
            }
        });
    }
};
const addChildUser = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: "400",
            message: "Invalid Request",
            errors: errors.array()
        });
    }
    else {
        console.log(req.body, "Add child user");
        database_1.default.firestore().collection('childUsers').add({
            email: req.body.email,
            verify: true,
            parentId: req.body.parentId,
            createdON: Date.now()
        }).then(() => {
            nodemailer_1.default.sendMail(emailTemplates.welcomeEmail({ email: req.body.email }));
            return res.status(200).json({
                "status": 200,
                "message": "User Added Successfully"
            });
        });
    }
};
const login = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: "400",
            message: "Invalid Request",
            errors: errors.array()
        });
    }
    else {
        let query = database_1.default.firestore().collection('org_users').where('org_id', '==', req.body.org_id);
        query = query.where('email', '==', req.body.email).get().then((documentSet) => {
            if (documentSet.empty) {
                return res.status(400).json({
                    status: 400,
                    message: 'User Not Exist Please SignUp'
                });
            }
            else {
                const user = [];
                documentSet.forEach((doc) => {
                    user.push(Object.assign({ id: doc.id }, doc.data()));
                });
                if (user[0].verify === true) {
                    if (user[0].password === req.body.password) {
                        const userData = {
                            id: user[0].id,
                            email: user[0].email,
                            org_id: user[0].org_id
                        };
                        jwt.sign({ user: userData }, Config.JWT_SECRET_KEY, (err, token) => {
                            return res.status(200).json({
                                token: token,
                                status: 200,
                                message: "success"
                            });
                        });
                    }
                    else {
                        return res.status(400).json({
                            status: 400,
                            message: 'Please Enter Correct Password'
                        });
                    }
                }
                else {
                    return res.status(400).json({
                        status: 400,
                        message: 'Not Verified'
                    });
                }
            }
        });
    }
};
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
};
//# sourceMappingURL=UserController.js.map