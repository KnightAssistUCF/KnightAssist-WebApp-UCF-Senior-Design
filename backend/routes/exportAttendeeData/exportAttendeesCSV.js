const express = require('express');
const router = express.Router();
const json2xls = require('json2xls');
const fs = require('fs');
const path = require('path');

const Event = require('../../models/events');
const UserStudent = require('../../models/userStudent');

router.get('/', async (req, res) => {
    try {
        const { eventId } = req.query;
        const event = await Event.findById(eventId)
            .populate({
                path: 'checkedInStudents.studentId',
                model: UserStudent
            });

        if (!event) {
            return res.status(404).send('Event not found in the database');
        }

        const attendees = event.checkedInStudents.map(({ studentId, checkInTime, checkOutTime }) => ({
            studentId: studentId._id,
            firstName: studentId.firstName,
            lastName: studentId.lastName,
            email: studentId.email,
            checkInTime: checkInTime,
            checkOutTime: checkOutTime,
            interests: studentId.categoryTags ? studentId.categoryTags.join(", ") : ''
        }));

        const xls = json2xls(attendees);

        // Define the directory where the file will be saved
        const directoryPath = path.join(__dirname, 'csvAttendeesRequested');

        // Create the directory if it does not exist
        if (!fs.existsSync(directoryPath)) {
            fs.mkdirSync(directoryPath, { recursive: true });
        }

        const fileName = `event-${eventId}-attendees.xlsx`;
        const filePath = path.join(directoryPath, fileName);
        fs.writeFileSync(filePath, xls, 'binary');

        res.status(200).send({ filePath });

    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

module.exports = router;
