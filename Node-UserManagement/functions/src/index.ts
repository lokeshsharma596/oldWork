import * as functions from 'firebase-functions';
const server = require('./server');

export const webUserApi = functions.https.onRequest(server);

