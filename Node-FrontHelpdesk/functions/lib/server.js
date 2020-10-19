"use strict";
const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const app = express();
const kbFrontRouter = require('./ApiRouter');
const authMiddleware = require('./lib/authentication');
app.use(cors({ origin: true }))
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: true }))
    .use(authMiddleware.checkToken)
    .use('/api', kbFrontRouter)
    .use('*', (_, res) => res.status(404).json({ success: false, data: "end point not found" }));
module.exports = app;
//# sourceMappingURL=server.js.map