const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const organizationSchema = require('../models/organization');

router.post('/', async (req, res) => {
    // intake: name, description, logoURL, category, events, 
    // followers, favorites, updates, calendarLink, contact, 
    // isActive, eventHappeningNow
    await organizationSchema.findOne({ email: req.body.email }).then((organization) => {
        if (organization) {
            res.status(409).send('Organization already exists');
        } else {
            var hashedPassword = bcrypt.hashSync(req.body.password, 10);
            var newOrganization = new organizationSchema({
                // Note: some components here can be omitted for the signUP phase
                name: req.body.name,
                password: hashedPassword,
                description: req.body.description,
                logoUrl: req.body.logoUrl,
                category: req.body.category,
                events: req.body.events,
                followers: req.body.followers,
                favorites: req.body.favorites,
                updates: req.body.updates,
                calendarLink: req.body.calendarLink,
                contact: req.body.contact,
                isActive: req.body.isActive,
                eventHappeningNow: req.body.eventHappeningNow
            });
            newOrganization.save().then((organization) => {
                res.status(200).send("Organization created - please confirm new organization's email address");
            }).catch((err) => {
                res.status(503).send("Failed to create organization: " + err);
            });
        }
    }).catch((err) => {
        res.status(404).send("Could not search for organization: " + err);
    });
});

module.exports = router;