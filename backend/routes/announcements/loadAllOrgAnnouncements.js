const express = require("express");
const router = express.Router();

const orgDB = require("../../models/organization");

router.get('/', async (req, res) => {
        const organizationID = req.query.organizationID;

        try {
                const organization = await orgDB.findOne({ organizationID: organizationID });
                if (!organization) return res.status(404).send('Organization not found in the database');

                res.status(200).json(organization.updates); // return all the updates/announcements for an org
        } catch (error) {
                console.error(error);
                res.status(500).send('An error occurred - could not retrieve announcements');
        }
});

module.exports = router;
