const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
// const { Schema } = mongoose;
const Event = require('../../models/events');

const generateRandomTimes = (start, end) => {
    const checkInTime = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    const checkOutTime = new Date(checkInTime.getTime() + Math.random() * (2 * 60 * 60 * 1000));
    return { checkInTime, checkOutTime };
};

router.post('/', async (req, res) => {
    try {
        const events = await Event.find({}).limit(5); // @Noah or whoever uses this, adjust the limit of how many events to load as needed

        for (const event of events) {
            // generate random times
            const { checkInTime, checkOutTime } = generateRandomTimes(event.startTime, event.endTime);

            // Create a dummy student checked in entry
            const checkedInStudent = {
                studentId: mongoose.Types.ObjectId('65616a1011a2035f14571238'), // store the object ID of the student you want to register in the event
                checkInTime,
                checkOutTime
            };

            await Event.updateOne(
                { _id: event._id },
                { $push: { checkedInStudents: checkedInStudent } }
            );
        }

        res.send("Checked in mock students generated and added to the first "+ events.length +" events.");
        } catch (error) {
        console.error('Error generating checked in volunteers:', error);
        res.status(500).send('Error generating mock checked in volunteers.');
    }
});

module.exports = router;