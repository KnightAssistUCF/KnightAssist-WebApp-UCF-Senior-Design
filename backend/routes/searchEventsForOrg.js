const express = require('express');
const router = express.Router();

const event = require('../models/events');
//const organizationSchema = require('../models/organization');

router.get('/', async (req, res) => {
    const searchID = req.query.organizationID;

    await event.find({ sponsoringOrganization: searchID}).then((events) => {
        if (events) {
            res.status(200).json(events);
        } else {
            res.status(404).send("Organization not found");
        }
    }).catch((err) => {
        res.status(503).send("Internal server error: " + err);
    });
});

module.exports = router;