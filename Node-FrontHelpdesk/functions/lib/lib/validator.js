"use strict";
const { check } = require('express-validator');
module.exports = {
    listCategories: [
        check('UserId')
            .notEmpty().withMessage('Please provide UserId'),
        check('lastVisible')
            .notEmpty().withMessage('Please provide Last Visible Article Id else init')
    ],
    login: [
        check('org_id')
            .notEmpty().withMessage('Please provide org_id'),
        check('email')
            .notEmpty().withMessage('Please provide email')
            .isEmail().withMessage('Invalid email format'),
        check('password')
            .notEmpty().withMessage('Please provide password')
            .isLength({ min: 6 }).withMessage('Invalid password length min 6 digit')
    ],
    getFolderPageSeo: [
        check('CategoryId')
            .notEmpty().withMessage('Please provide CategoryId'),
    ],
    listFolders: [
        check('lastVisible')
            .notEmpty().withMessage('Please provide last visible folderid else init'),
        check('CategoryId')
            .notEmpty().withMessage('Please provide CategoryId'),
        check('UserId')
            .notEmpty().withMessage('Please provide UserId')
    ],
    listFolderNames: [
        check('lastVisible')
            .notEmpty().withMessage('Please provide last visible folderid else init'),
        check('CategoryId')
            .notEmpty().withMessage('Please provide CategoryId'),
        check('UserId')
            .notEmpty().withMessage('Please provide UserId')
    ],
    getArticle: [
        check('ArticleId')
            .notEmpty().withMessage('Please provide ArticleId'),
        check('UserId')
            .notEmpty().withMessage('Please provide UserId')
    ],
    getAllArticlesSeo: [
        check('FolderId')
            .notEmpty().withMessage('Please provide FolderId')
    ],
    listArticles: [
        check('more')
            .notEmpty().withMessage('Please provide more'),
        check('lastVisible')
            .notEmpty().withMessage('Please provide lastVisible'),
        check('FolderId')
            .notEmpty().withMessage('Please provide FolderId'),
        check('UserId')
            .notEmpty().withMessage('Please provide UserId'),
    ],
    getPreviewArticle: [
        check('ArticleId')
            .notEmpty().withMessage('Please provide ArticleId'),
        check('UserId')
            .notEmpty().withMessage('Please provide UserId')
    ],
    increaseCount: [
        check('articleId')
            .notEmpty().withMessage('Please provide articleId'),
        check('name')
            .notEmpty().withMessage('Please provide name'),
        check('msg')
            .notEmpty().withMessage('Please provide msg'),
        check('userid')
            .notEmpty().withMessage('Please provide userid'),
        check('ipAddress')
            .notEmpty().withMessage('Please provide ipAddress'),
    ],
    submitEmail: [
        check('type')
            .notEmpty().withMessage('Please provide type'),
        check('userid')
            .notEmpty().withMessage('Please provide userid'),
        check('articleId')
            .notEmpty().withMessage('Please provide articleId'),
        check('email')
            .notEmpty().withMessage('Please provide email')
            .isEmail().withMessage('Invalid email format'),
        check('articlename')
            .notEmpty().withMessage('Please provide articlename'),
        check('comment')
            .notEmpty().withMessage('Please provide comment'),
        check('comment')
            .notEmpty().withMessage('Please provide comment'),
        check('commenterEmail')
            .notEmpty().withMessage('Please provide commenterEmail'),
        check('article_url')
            .notEmpty().withMessage('Please provide article_url'),
        check('firstname')
            .notEmpty().withMessage('Please provide firstname'),
        check('lastname')
            .notEmpty().withMessage('Please provide lastname'),
    ],
    getSettings: [
        check('subdomain')
            .notEmpty().withMessage('Please provide subdomain')
    ],
    sendRecaptcha: [
        check('token')
            .notEmpty().withMessage('Please provide token')
    ],
    checkChildUserExist: [
        check('email')
            .notEmpty().withMessage('Please provide email'),
        check('org_id')
            .notEmpty().withMessage('Please provide org_id')
    ],
    forgotPasswordSendCode: [
        check('email')
            .notEmpty().withMessage('Please provide email')
            .isEmail().withMessage('Invalid email format'),
        check('org_id')
            .notEmpty().withMessage('Please provide org_id'),
        check('portalName')
            .notEmpty().withMessage('Please provide portalName'),
        check('url')
            .notEmpty().withMessage('Please provide url'),
    ],
    resetConfirm: [
        check('email')
            .notEmpty().withMessage('Please provide email')
            .isEmail().withMessage('Invalid email format')
    ],
    resendVerificationCode: [
        check('email')
            .notEmpty().withMessage('Please provide email')
            .isEmail().withMessage('Invalid email format'),
        check('org_id')
            .notEmpty().withMessage('Please provide org_id'),
        check('portalName')
            .notEmpty().withMessage('Please provide portalName'),
        check('url')
            .notEmpty().withMessage('Please provide url'),
    ],
    verifyOtpAndCreateUser: [
        check('email')
            .notEmpty().withMessage('Please provide email')
            .isEmail().withMessage('Invalid email format'),
        check('org_id')
            .notEmpty().withMessage('Please provide org_id'),
        check('otp')
            .notEmpty().withMessage('Please provide otp'),
        check('portalName')
            .notEmpty().withMessage('Please provide portalName'),
        check('url')
            .notEmpty().withMessage('Please provide url')
    ],
    verifyOtpAndUpdatePassword: [
        check('email')
            .notEmpty().withMessage('Please provide email')
            .isEmail().withMessage('Invalid email format'),
        check('org_id')
            .notEmpty().withMessage('Please provide org_id'),
        check('otp')
            .notEmpty().withMessage('Please provide otp'),
        check('password')
            .notEmpty().withMessage('Please provide password')
            .isLength({ min: 6 }).withMessage('Invalid password length min 6 digit'),
        check('portalName')
            .notEmpty().withMessage('Please provide portalName'),
        check('url')
            .notEmpty().withMessage('Please provide url'),
    ],
    addChildUser: [
        check('email')
            .notEmpty().withMessage('Please provide email')
            .isEmail().withMessage('Invalid email format'),
        check('parentId')
            .notEmpty().withMessage('Please provide parentId')
    ],
    signup: [
        check('email')
            .notEmpty().withMessage('Please provide email')
            .isEmail().withMessage('Invalid email format'),
        check('org_id')
            .notEmpty().withMessage('Please provide org_id'),
        check('password')
            .notEmpty().withMessage('Please provide password')
            .isLength({ min: 6 }).withMessage('Invalid password length min 6 digit'),
        check('portalName')
            .notEmpty().withMessage('Please provide portalName'),
        check('url')
            .notEmpty().withMessage('Please provide url'),
    ]
};
//# sourceMappingURL=validator.js.map