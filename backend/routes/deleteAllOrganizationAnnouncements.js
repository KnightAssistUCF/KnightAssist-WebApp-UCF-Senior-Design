const express = require("express");
const router = express.Router();

const orgDB = require("../models/organization");

router.delete('/', async (req, res) => {
    const searchID = req.body.organizationID;
    try {
        const organization = await orgDB.findOne({ organizationID: searchID });
        if (!organization) return res.status(404).send('Organization not found in the database');

        organization.updates = [];
        const result = await organization.save();

        if (organization.updates.length === 0) {
            res.send('All announcements/updates deleted successfully');
        } else {
            res.status(500).send('Internal Server Error - Error deleting all announcements/updates');
            // print the updates length
            console.log(organization.updates.length);
        }

    } catch (err) {
        res.status(500).send('Internal Server Error - Error deleting all events for organization' + err);
    }
});

module.exports = router;