const { validationResult } = require('express-validator');
import admin from "../lib/database";


const getTickets = (req: any, res: any) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: "400",
            message: "Invalid Request",
            errors: errors.array()
        });

    } else {
        console.log(req.query)

        admin.firestore().collection('SupportRootCollections').doc(req.query.org_id).collection('tickets').where('contacts.email', '==', req.query.email)
            .get().then((documentSet: any) => {
                const tickets: any = []
                documentSet.forEach((doc: any) => {
                    tickets.push({
                        contacts: doc.data().contacts,
                        ticketStatus: doc.data().ticketStatus
                    })
                })
                return res.status(200).json({
                    status: "200",
                    message: "Ticket Received",
                    data: { tickets: tickets }
                });
            })

    }
}


module.exports = {
    getTickets: getTickets
}