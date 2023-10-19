const express = require('express');
const router = express.Router();

const event = require('../models/events');
const organization = require('../models/organization');

// check that the event exists under the correct organzation
router.get('/', async (req, res) => {
    const searchID = req.query.organizationID;
    const eventID = req.query.eventID;

    await event.findOne({ sponsoringOrganization: searchID, eventID: eventID }).then((events) => {
        if (events) {
            res.status(200).json(events);
        } else {
            res.status(404).send("Event not found");
        }
    }).catch((err) => {
        res.status(503).send("Internal server error: " + err);
    });
});

// delete the event
router.delete('/', async (req, res) => {
    const searchID = req.body.organizationID;
    const eventID = req.body.eventID;

    await event.findOne({ sponsoringOrganization: searchID, eventID: eventID }).then(async (events) => {
        if (events) {
            await event.deleteOne({ sponsoringOrganization: searchID, eventID: eventID }).then((events) => {
                res.status(200).send("Event deleted successfully" + events);
            }).catch((err) => { res.status(400).send("Internal server error: " + err); })
        }
        else throw new Error()
    }).catch((err) => {
        res.status(400).send("Event not found");
        res.status(503).send("Internal server error: " + err);
    });
});

module.exports = router;

