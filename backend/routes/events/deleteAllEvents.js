const express = require('express');
const router = express.Router();

const event = require('../../models/events');
const organization = require('../../models/organization');

router.get('/', async (req, res) => {
    const searchID = req.query.organizationID; // taken as a string but its the organization ID

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

router.delete('/', async (req, res) => {
    const searchID = req.body.organizationID;// taken as a string

    await event.find({ sponsoringOrganization: searchID}).then(async (events) => {
        if (events) {
            await event.deleteMany({ sponsoringOrganization: searchID}).then((events) => {
                res.status(200).send("Events deleted successfully" + events);
            }).catch((err) => { res.status(400).send("Internal server error: " + err); })
        }
        else throw new Error()
    }).catch((err) => {
        res.status(400).send("Events not found");
        res.status(503).send("Internal server error: " + err);
    });
});

module.exports = router;