const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Feedback = mongoose.model('feedback');
const Event = require('../../models/events');

router.post('/', async (req, res) => {
    try {
        const eventID = req.body.eventID;
        const studentID = req.body.studentID; 
        const studentName = req.body.studentName;
        const rating = req.body.rating;
        const feedbackText = req.body.feedbackText;

        const event = await Event.findById(eventID);
        if (!event) {
            return res.status(404).send('Event not found in the database or the ID provided is incorrect!');
        }

        let feedbackData = {
            studentId: studentID,
            studentName: studentName,
            rating: rating,
            feedbackText: feedbackText
        };
        // Create a new feedback instance and fill it with data and save it 
        const feedback = new Feedback(feedbackData);
        event.feedback.push(feedback);
        await event.save();

        res.status(201).send("Feedback from volunteer: " + studentName + " has been added to event " + event.name + " successfully!");
    } catch (error) {
        res.status(500).send("An error occurred: " + error.message);
    }
});

module.exports = router;