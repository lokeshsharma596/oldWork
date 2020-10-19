"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const config_1 = require("./config");
/**
* varify token for authorized URL
* @param req Request Object
* @param res Response Object
* @param next Callback Object
*/
const checkToken = (req, res, next) => {
    console.log(req.path, "requested path");
    if (req.path === '/api/submitEmail' && req.body.tokenVerification) {
        let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
        if (typeof token === 'undefined') {
            res.status(400).send({
                success: false,
                message: 'Token not found'
            });
        }
        if (token.startsWith('Bearer ')) {
            // Remove Bearer from string
            token = token.slice(7, token.length);
        }
        if (token) {
            jwt.verify(token, config_1.JWT_SECRET_KEY, (err, decoded) => {
                if (err) {
                    return res.send({
                        success: false,
                        message: 'Token is not valid'
                    });
                }
                else {
                    req.decoded = decoded;
                    next();
                }
            });
        }
        else {
            return res.send({
                success: false,
                message: 'Auth token is not supplied'
            });
        }
    }
    else {
        next();
    }
};
module.exports = {
    checkToken: checkToken
};
//# sourceMappingURL=authentication.js.map