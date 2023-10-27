const express = require("express");
const router = express.Router();

const organization = require("../models/organization");

router.delete('/', async (req, res) => {
    const titleToLookFor = req.body.titleToLookFor;
    const organizationID = req.body.organizationID;
    try {

        const organization = await Organization.findOne({ organizationID: organizationID });
        if (!organization) return res.status(404).send('Organization not found in the database');

        const updateIndex = organization.updates.findIndex(update => update.title === titleToLookFor);
        if (updateIndex === -1) return res.status(404).send('Annoucement/update not found');

        organization.updates.splice(updateIndex, 1);

        await organization.save();

        res.send('announcement/update deleted successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred could not delete the announcement/update');
    }
});

module.exports = router;
