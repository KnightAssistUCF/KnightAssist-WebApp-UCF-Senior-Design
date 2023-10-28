const express = require("express");
const router = express.Router();

const orgDB = require("../models/organization");

router.delete('/', async (req, res) => {
    const organizationID = req.body.organizationID;
    try {
        const organization = await orgDB.findOne({ organizationID: organizationID });
        if (!organization) return res.status(404).send('Organization not found in the database');

        organization.updates = [];

        await organization.save();

        res.send('All announcements/updates deleted successfully');
    } catch (err) {
        res.status(500).send('Internal Server Error - Error deleting all events for organization' + err);
    }
});

module.exports = router;