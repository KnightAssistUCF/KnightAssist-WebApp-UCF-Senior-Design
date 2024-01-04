const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Event = require('../../models/events');

router.put('/', async (req, res) => {
    const { eventId, feedbackId } = req.params;

    try {
        const event = await Event.findOne({ "_id": eventId, "feedback._id": feedbackId });
        if (!event) {
            return res.status(404).send('Event or feedback not found, please check again the IDs provided');
        }

        for (let fb of event.feedback) {
            if (fb._id.toString() === feedbackId) {
                fb.wasReadByUser = true;
                break;
            }
        }

        await event.save();
        res.status(200).send('Feedback marked as read');
    } catch (error) {
        res.status(500).send("An error occurred: " + error.message);
    }
});

module.exports = router;