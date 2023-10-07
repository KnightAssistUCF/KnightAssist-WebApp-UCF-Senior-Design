const express = require('express');
const router = express.Router();

const organization = require('../models/organization');

router.post('/', async (req, res) => {
    const searchEmail = req.body.email;

    await organization.findOne({ email: searchEmail }).then((organization) => {
        if (organization) {
            res.status(200).send("Organization found -> " + organization);
        } else {
            res.status(404).send("Organization not found");
        }
    }).catch((err) => {
        res.status(503).send("Internal server error: " + err);
    });
});

module.exports = router;