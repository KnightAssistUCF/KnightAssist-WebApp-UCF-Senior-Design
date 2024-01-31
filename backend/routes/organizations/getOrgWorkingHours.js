const express = require('express');
const router = express.Router();

const organization = require('../../models/organization');

router.get('/', async (req, res) => {

    try {
        const query = {
            $or: [
                { _id: req.query.organizationID },
                { email: req.query.email }
            ]
        };

        const organizationUser = await organization.findOne(query);

        if (!organizationUser) {
            res.status(404).send("Organization not found in the database");
        }

        res.json(organizationUser.workingHoursPerWeek);
    } catch (err) {
        res.status(503).send("Internal server error: " + err);
    }

});

module.exports = router;