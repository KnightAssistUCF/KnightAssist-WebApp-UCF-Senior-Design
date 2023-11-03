const express = require("express");
const router = express.Router();

const orgDB = require("../../models/organization");

router.get('/', async (req, res) => {
    const titleToLookFor = req.query.title;
    const organizationID = req.query.organizationID;

    try {
        const organization = await orgDB.findOne({ organizationID: organizationID });
        if (!organization) return res.status(404).send('Organization not found in the database');

        const indexOfAnnouncement = organization.updates.findIndex(update => update.title.localeCompare(titleToLookFor) === 0);
        if (indexOfAnnouncement === -1) return res.status(404).send('Annoucement/update not found');

        res.status(200).json(organization.updates[indexOfAnnouncement]);
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred - could not search for announcement');
    }
});

module.exports = router;