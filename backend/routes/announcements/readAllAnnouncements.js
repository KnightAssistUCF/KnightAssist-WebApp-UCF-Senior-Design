const express = require("express");
const router = express.Router();
const orgDB = require("../../models/organization");

router.post('/', async (req, res) => {
    const organizationID = req.body.organizationID;

    try {
        const organization = await orgDB.findOne({ organizationID });
        if (!organization) return res.status(404).send('Organization not found');

        for (const announcement of organization.updates) {
            announcement.read = true;
        }

        await organization.save();
        res.status(200).send('All announcements marked as read successfully');

    } catch (error) {
        console.error(error);
        res.status(500).send('Error - could not mark announcements as read');
    }
});

module.exports = router;
