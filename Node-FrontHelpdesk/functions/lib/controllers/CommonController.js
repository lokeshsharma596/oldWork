"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../lib/database");
const nodemailer_1 = require("../lib/nodemailer");
const axios = require('axios');
const emailTemplates = require("../lib/emailTemplates");
const { validationResult } = require('express-validator');
const increaseCount = async (req, res) => {
    console.log(req.body, "increasecount");
    const contentCount = [];
    database_1.default.firestore().collection('article').doc(req.body.articleId)
        .get().then((documentSet) => {
        contentCount.push({
            commentCount: documentSet.data().commentCount,
            downvoteCount: documentSet.data().downvoteCount,
            upvoteCount: documentSet.data().upvoteCount,
            viewCount: documentSet.data().viewCount,
        });
        if (req.body.name === "comment") {
            const ip = (contentCount[0].commentCount === undefined) ? 1 : contentCount[0].commentCount + 1;
            database_1.default.firestore().collection('article').doc(req.body.articleId)
                .update({
                commentCount: parseInt(ip)
            }).then(() => {
                return res.status(202).json({
                    "status": "202",
                    "message": "Success Comment Count Increased",
                });
            }).catch((err) => {
                console.log(err);
            });
        }
        else if (req.body.name === "downvote") {
            console.log("inside downvote");
            if (req.body.msg === "IncrDown") {
                const ip = (contentCount[0].downvoteCount === undefined) ? 1 : contentCount[0].downvoteCount + 1;
                database_1.default.firestore().collection('article').doc(req.body.articleId)
                    .update({
                    downvoteCount: parseInt(ip),
                }).then(() => {
                    return res.status(200).json({
                        "status": "200",
                        "message": "Success IncrDown",
                    });
                }).catch((err) => {
                    console.log(err);
                });
            }
            else if (req.body.msg === "IncrDownDecrUp") {
                const ip = (contentCount[0].downvoteCount === undefined) ? 1 : contentCount[0].downvoteCount + 1;
                const jp = (contentCount[0].upvoteCount === undefined || contentCount[0].upvoteCount === 0) ? 1 : contentCount[0].upvoteCount - 1;
                database_1.default.firestore().collection('article').doc(req.body.articleId)
                    .update({
                    downvoteCount: parseInt(ip),
                    upvoteCount: parseInt(jp)
                }).then(() => {
                    return res.status(200).json({
                        "status": "200",
                        "message": "Success IncrDownDecrUp",
                    });
                }).catch((err) => {
                    console.log(err);
                });
            }
        }
        else if (req.body.name === "upvote") {
            console.log("inside upvote");
            if (req.body.msg === "IncrUp") {
                const ip = (contentCount[0].upvoteCount === undefined) ? 1 : contentCount[0].upvoteCount + 1;
                database_1.default.firestore().collection('article').doc(req.body.articleId)
                    .update({
                    upvoteCount: parseInt(ip),
                }).then(() => {
                    return res.status(200).json({
                        "status": "200",
                        "message": "Success IncrUp",
                    });
                }).catch((err) => {
                    console.log(err);
                });
            }
            else if (req.body.msg === "IncrUpDecrDown") {
                const ip = (contentCount[0].upvoteCount === undefined) ? 1 : contentCount[0].upvoteCount + 1;
                const jp = (contentCount[0].downvoteCount === undefined || contentCount[0].downvoteCount === 0) ? 1 : contentCount[0].downvoteCount - 1;
                database_1.default.firestore().collection('article').doc(req.body.articleId)
                    .update({
                    upvoteCount: parseInt(ip),
                    downvoteCount: parseInt(jp)
                }).then(() => {
                    const _res = {
                        "status": "200",
                        "message": "Success IncrUpDecrDown",
                    };
                    return res.status(200).json(_res);
                }).catch((err) => {
                    console.log(err);
                });
            }
        }
        else if (req.body.name === "viewCount") {
            let query = database_1.default.firestore().collection('users').doc(req.body.userid).collection('views');
            query = query.where("articleId", "==", req.body.articleId);
            query = query.where("ipAddress", "==", req.body.ipAddress)
                .get().then((documentSet1) => {
                const info = [];
                documentSet1.forEach(async (doc) => {
                    info.push({
                        id: doc.id
                    });
                });
                if (info.length === 0) {
                    const ip = (contentCount[0].viewCount === undefined) ? 1 : contentCount[0].viewCount + 1;
                    database_1.default.firestore().collection('article').doc(req.body.articleId)
                        .update({
                        viewCount: parseInt(ip)
                    }).then(() => {
                        database_1.default.firestore().collection('users').doc(req.body.userid).collection('views').add({
                            'ipAddress': req.body.ipAddress,
                            'articleId': req.body.articleId,
                        }).then(() => {
                            return res.status(200).json({
                                "status": "200",
                                "message": "Success ViewCountIncreased",
                            });
                        }).catch((err) => {
                            console.log(err);
                        });
                    }).catch((err) => {
                        console.log(err);
                    });
                }
                else {
                    return res.status(200).json({
                        "status": "200",
                        "message": "Success ViewCountAlreadyThere",
                    });
                }
            }).catch((err) => {
                console.log(err);
            });
        }
    }).catch((err) => {
        console.log(err);
    });
};
const submitEmail = async (req, res) => {
    console.log(req.body, "submitEmail");
    if (req.body.type === "upvote") {
        let query = database_1.default.firestore().collection('users').doc(req.body.userid).collection('downvotes');
        query = query.where("articleId", "==", req.body.articleId);
        query = query.where("userEmail", "==", req.body.email)
            .get().then((documentSet) => {
            const info = [];
            documentSet.forEach(async (doc) => {
                info.push({
                    id: doc.id
                });
            });
            if (info.length === 0) {
                let query1 = database_1.default.firestore().collection('users').doc(req.body.userid).collection('upvotes');
                query1 = query1.where("userEmail", "==", req.body.email);
                query1 = query1.where("articleId", "==", req.body.articleId)
                    .get().then((doc1) => {
                    if (doc1.empty) {
                        database_1.default.firestore().collection('users').doc(req.body.userid).collection('upvotes').add({
                            'articleId': req.body.articleId,
                            'userEmail': req.body.email
                        });
                        database_1.default.firestore().collection('notifications').add({
                            'IsRead': 0,
                            'status': 0,
                            'articleId': req.body.articleId,
                            'text': `<div>A user has left an upvote on the article <i>"${req.body.articlename}"</i><div>`,
                            'type': 'New Upvote Received',
                            'userId': req.body.userid,
                            'createdON': Date.now()
                        });
                        return res.status(200).json({
                            "status": "200",
                            "message": "IncrUp",
                        });
                    }
                    else {
                        return res.status(200).json({
                            "status": "200",
                            "message": "Already Exist",
                        });
                    }
                });
            }
            else {
                database_1.default.firestore().collection('users').doc(req.body.userid).collection('downvotes').doc(info[0].id).delete().then(function () {
                    let query2 = database_1.default.firestore().collection('users').doc(req.body.userid).collection('upvotes');
                    query2 = query2.where("userEmail", "==", req.body.email);
                    query2 = query2.where("articleId", "==", req.body.articleId)
                        .get().then((doc2) => {
                        if (doc2.empty) {
                            database_1.default.firestore().collection('users').doc(req.body.userid).collection('upvotes').add({
                                'articleId': req.body.articleId,
                                'userEmail': req.body.email
                            });
                            database_1.default.firestore().collection('notifications').add({
                                'IsRead': 0,
                                'status': 0,
                                'articleId': req.body.articleId,
                                'text': `<div>A user has left an upvote on the article <i>"${req.body.articlename}"</i><div>`,
                                'type': 'New Upvote Received',
                                'userId': req.body.userid,
                                'createdON': Date.now()
                            });
                            return res.status(200).json({
                                "status": "200",
                                "message": "IncrUpDecrDown",
                            });
                        }
                        else {
                            return res.status(200).json({
                                "status": "200",
                                "message": "Already Exist",
                            });
                        }
                    });
                });
            }
        });
    }
    else if (req.body.type === "downvote") {
        let query3 = database_1.default.firestore().collection('users').doc(req.body.userid).collection('upvotes');
        query3 = query3.where("articleId", "==", req.body.articleId);
        query3 = query3.where("userEmail", "==", req.body.email)
            .get().then((documentSet) => {
            const info = [];
            documentSet.forEach(async (doc) => {
                info.push({
                    id: doc.id
                });
            });
            if (info.length === 0) {
                let query4 = database_1.default.firestore().collection('users').doc(req.body.userid).collection('downvotes');
                query4 = query4.where("userEmail", "==", req.body.email);
                query4 = query4.where("articleId", "==", req.body.articleId)
                    .get().then((doc) => {
                    if (doc.empty) {
                        database_1.default.firestore().collection('users').doc(req.body.userid).collection('downvotes').add({
                            'articleId': req.body.articleId,
                            'userEmail': req.body.email
                        });
                        database_1.default.firestore().collection('notifications').add({
                            'IsRead': 0,
                            'status': 0,
                            'articleId': req.body.articleId,
                            'text': `<div>A user has left an downvote on the article <i>"${req.body.articlename}"</i><div>`,
                            'type': 'New Downvote Received',
                            'userId': req.body.userid,
                            'createdON': Date.now()
                        });
                        return res.status(200).json({
                            "status": "200",
                            "message": "IncrDown",
                        });
                    }
                    else {
                        return res.status(200).json({
                            "status": "200",
                            "message": "Already Exist",
                        });
                    }
                });
            }
            else {
                database_1.default.firestore().collection('users').doc(req.body.userid).collection('upvotes').doc(info[0].id).delete().then(() => {
                    let query5 = database_1.default.firestore().collection('users').doc(req.body.userid).collection('downvotes');
                    query5 = query5.where("userEmail", "==", req.body.email);
                    query5 = query5.where("articleId", "==", req.body.articleId)
                        .get().then((doc) => {
                        if (doc.empty) {
                            database_1.default.firestore().collection('users').doc(req.body.userid).collection('downvotes').add({
                                'articleId': req.body.articleId,
                                'userEmail': req.body.email
                            });
                            database_1.default.firestore().collection('notifications').add({
                                'IsRead': 0,
                                'status': 0,
                                'articleId': req.body.articleId,
                                'text': `<div>A user has left an downvote on the article <i>"${req.body.articlename}"</i><div>`,
                                'type': 'New Downvote Received',
                                'userId': req.body.userid,
                                'createdON': Date.now()
                            });
                            return res.status(200).json({
                                "status": "200",
                                "message": "IncrDownDecrUp",
                            });
                        }
                        else {
                            return res.status(200).json({
                                "status": "200",
                                "message": "Already Exist",
                            });
                        }
                    });
                });
            }
        });
    }
    else if (req.body.type === "comment") {
        const comment_data = {
            articleId: req.body.articleId,
            comment: req.body.comment,
            createdON: Date.now(),
            commenterEmail: req.body.email,
            IsRead: 0
        };
        database_1.default.firestore().collection('users').doc(req.body.userid).collection('comments').add(comment_data)
            .then(() => {
            database_1.default.firestore().collection('notifications').add({
                'IsRead': 0,
                'status': 0,
                'articleId': req.body.articleId,
                'text': `<div>${req.body.email} has left a comment on the article <i>"${req.body.articlename}"</i></div>`,
                'type': 'New Comment Received',
                'userId': req.body.userid,
                'createdON': Date.now()
            }).then(() => {
                nodemailer_1.default.sendMail(emailTemplates.emailAfterComment({
                    email: req.body.ownerEmail,
                    article_url: req.body.article_url,
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                }));
                return res.status(200).json({
                    "status": "200",
                    "message": "IncrComment",
                });
            });
        });
    }
};
const sendRecaptcha = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: "400",
            message: "Invalid Request",
            errors: errors.array()
        });
    }
    else {
        //ReCaptcha Config Prod
        // const RECAPTCHA_SECRET_KEY = "6LfzDO4UAAAAAHeezZ6Pzu8_UyXPSClZZsman6UT"
        //ReCaptcha Config Local-staging
        const RECAPTCHA_SECRET_KEY = "6LctO-EUAAAAACOutTjx1QWgBE9e-5J9sbbqpI6k";
        const response = await axios.get(`https://recaptcha.google.com/recaptcha/api/siteverify?secret=${RECAPTCHA_SECRET_KEY}&response=${req.body.token}`);
        if (response.data.success) {
            return res.status(200).json({
                "status": "200",
                "message": "Verified",
            });
        }
        else {
            return res.status(404).json({
                "status": "404",
                "message": "Not verified",
            });
        }
    }
};
const getSettings = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: "400",
            message: "Invalid Request",
            errors: errors.array()
        });
    }
    else {
        console.log(req.query, "getSettings");
        database_1.default.firestore().collection('usersettings').where("domainname", "==", req.query.subdomain)
            .get().then((documentSet) => {
            if (documentSet.empty) {
                return res.status(404).json({
                    "status": "404",
                    "message": "Settings Not Exist",
                });
            }
            else {
                const usersettings = [];
                documentSet.forEach((doc) => {
                    usersettings.push(Object.assign({ id: doc.id }, doc.data()));
                });
                database_1.default.firestore().collection('frontendsettings').where("userId", "==", usersettings[0].userId)
                    .get()
                    .then((documentSet1) => {
                    const frontendsettings = [];
                    documentSet1.forEach((doc1) => {
                        frontendsettings.push(Object.assign({ id: doc1.id }, doc1.data()));
                    });
                    database_1.default.firestore().collection('users').doc(usersettings[0].userId)
                        .get().then((documentSet2) => {
                        const personal_info = [];
                        personal_info.push({
                            id: documentSet2.id,
                            firstname: documentSet2.data().firstname,
                            lastname: documentSet2.data().lastname,
                            imageurl: documentSet2.data().imageUrl,
                            email: documentSet2.data().email
                        });
                        return res.status(200).json({
                            "status": "200",
                            "message": "Settings Received",
                            "data": { frontendsettings: frontendsettings[0], usersettings: usersettings[0], personal_info: personal_info[0] }
                        });
                    }).catch((err) => {
                        console.log(err);
                    });
                }).catch((err) => {
                    console.log(err);
                });
            }
        });
    }
};
module.exports = {
    increaseCount: increaseCount,
    submitEmail: submitEmail,
    getSettings: getSettings,
    sendRecaptcha: sendRecaptcha
};
//# sourceMappingURL=CommonController.js.map