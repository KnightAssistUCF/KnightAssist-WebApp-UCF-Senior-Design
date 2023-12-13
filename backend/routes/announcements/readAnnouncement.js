const express = require("express");
const router = express.Router();
const orgDB = require("../../models/organization");

router.post('/', async (req, res) => {
    const organizationID = req.body.organizationID;
    const IDToLookFor = req.body.updateID;

    try {
        const organization = await orgDB.findOne({ organizationID });
        if (!organization) return res.status(404).send('Organization not found');

        const announcement = organization.updates.find(update => update._id.toString() === IDToLookFor);
        if (!announcement) return res.status(404).send('Announcement not found');

        announcement.read = true;
        await organization.save();
        res.status(200).send('Announcement marked as read successfully');

    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred - could not mark announcement as read');
    }
});

module.exports = router;
