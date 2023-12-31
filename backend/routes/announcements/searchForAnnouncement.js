const express = require("express");
const router = express.Router();

const orgDB = require("../../models/organization");

router.get('/', async (req, res) => {
    const titleToLookFor = req.query.title;
    const organizationID = req.query.organizationID;

    try {
        const organization = await orgDB.findOne({ _id: organizationID });
        if (!organization) return res.status(404).send('Organization not found in the database');

        const matchingUpdates = organization.updates.filter(update => update.title.toLowerCase().includes(titleToLookFor.toLowerCase()));

        if (matchingUpdates.length === 0) return res.status(200).send('No matching announcements/updates found');

        res.status(200).json(matchingUpdates);
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred - could not search for announcement');
    }
});

module.exports = router;