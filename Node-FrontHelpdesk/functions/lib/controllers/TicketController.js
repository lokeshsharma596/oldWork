"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { validationResult } = require('express-validator');
const database_1 = require("../lib/database");
const getTickets = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: "400",
            message: "Invalid Request",
            errors: errors.array()
        });
    }
    else {
        console.log(req.query);
        database_1.default.firestore().collection('SupportRootCollections').doc(req.query.org_id).collection('tickets').where('contacts.email', '==', req.query.email)
            .get().then((documentSet) => {
            const tickets = [];
            documentSet.forEach((doc) => {
                tickets.push({
                    contacts: doc.data().contacts,
                    ticketStatus: doc.data().ticketStatus
                });
            });
            return res.status(200).json({
                status: "200",
                message: "Ticket Received",
                data: { tickets: tickets }
            });
        });
    }
};
module.exports = {
    getTickets: getTickets
};
//# sourceMappingURL=TicketController.js.map