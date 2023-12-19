const express = require('express');
const router = express.Router();

const organization = require('../../models/organization');

router.get('/', async (req, res) => {
    const searchEmail = req.query.email;

    const query = {};
    if (searchEmail) {
        query.email = searchEmail;
    } else {
        return res.status(400).send("Search for organization failed - no email provided");
    }

    if (req.query.organizationID) {
        query._id = req.query.organizationID;
    }

    await organization.findOne(query).then((organization) => {
        if (organization) {
            res.status(200).json(organization);
        } else {
            res.status(404).send("Organization not found");
        }
    }).catch((err) => {
        res.status(503).send("Internal server error: " + err);
    });
});

module.exports = router;