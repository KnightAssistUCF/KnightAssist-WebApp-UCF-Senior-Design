const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const organization = require('../../models/organization');

router.get('/', async (req, res) => {
    try {
        const org = await organization.findOne({ _id: req.query.organizationID })
            .populate('favorites');
        if (org) {
            res.status(200).json({
                favorites: org.favorites
            });
        } else {
            res.status(404).send("Organization not found");
        }
    } catch (err) {
        res.status(400).send("Internal server error: " + err);
    }
});

module.exports = router;
