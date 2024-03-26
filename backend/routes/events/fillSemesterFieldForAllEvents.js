const express = require('express');
const router = express.Router();
const Event = require('../../models/events');

function determineSemester(date) {
    const month = date.getMonth() + 1; 

    if (month >= 1 && month <= 5) {
        return 'Spring';
    } else if (month >= 6 && month <= 8) {
        return 'Summer';
    } else {
        return 'Fall';
    }
}


router.post('/', async (req, res) => {
    try {
        const events = await Event.find({}); 

        for (const event of events) {
            const semester = determineSemester(event.startTime); 
            await Event.updateOne({ _id: event._id }, { $set: { semester: semester } });
        }

        res.status(200).send('Semester fields updated successfully.');
    } catch (error) {
        console.error('Error updating semester fields:', error);
        res.status(500).send('An error occurred during the update operation.');
    }
});

module.exports = router;
