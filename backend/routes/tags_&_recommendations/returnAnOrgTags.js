const express = require('express');
const router = express.Router();
const bcryptjs = require('bcryptjs');
const organizationModel = require('../../models/organization');

/* This endpoint fetches for the tags that the organization picked to categorize their work */
router.get('/', async (req, res) => {
        try {
                const organizationID = req.query.organizationID;
                const organization = await organizationModel.findOne({ _id: organizationID });

                if (!organization) {
                        return res.status(404).send('Organization not found in the database');
                }

                return res.json(organization.categoryTags);
        } catch (err) {
                return res.status(500).send('Internal server error: ' + err);
        }
});

module.exports = router;