const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const app =  express();
const helpDeskRouter  = require ('./ApiRouter');
// const authMiddel = require('./auth/authentication');


app.use(cors({origin:true}))
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({extended : true}))
    // .use(authMiddel.checkToken)
    .use('/userApi',helpDeskRouter)
    .use('*',(_:any,res:any) =>res.status(404).json({success: false,data:"end point not found"}))

module.exports = app;