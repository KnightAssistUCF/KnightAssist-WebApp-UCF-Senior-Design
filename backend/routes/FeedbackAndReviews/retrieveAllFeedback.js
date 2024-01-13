const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Event = require('../../models/events');
const Organization = require('../../models/organization');

router.get('/', async (req, res) => {
    try {
        const { orgId } = req.query;
       
        const organization = await Organization.findById(orgId);
        if (!organization) {
            return res.status(404).send('Organization not found in the database or the ID provided is incorrect!');
        }

        // Fetch events sponsored by this org
        const events = await Event.find({ sponsoringOrganization: organization._id });

        // Extract feedback from each of these event 
        let allFeedback = [];
        events.forEach(event => {
            allFeedback = allFeedback.concat(event.feedback);
        });

        // Sort feedback from recent to oldest
        allFeedback.sort((a, b) => b.timeFeedbackSubmitted - a.timeFeedbackSubmitted);

        res.status(200).json(allFeedback);
    } catch (error) {
        res.status(500).send("An error occurred: " + error.message);
    }
});

module.exports = router;