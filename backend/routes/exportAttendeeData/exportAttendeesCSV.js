const express = require('express');
const router = express.Router();
const json2xls = require('json2xls');
const fs = require('fs');

const Event = require('../../models/events'); 
const UserStudent = require('../../models/userStudent');

router.get('/', async (req, res) => {
    try {
        const { eventId } = req.params;
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
            interests: studentId.categoryTags
        }));

        const xls = json2xls(attendees);
        const fileName = `event-${eventId}-attendees.xlsx`;
        fs.writeFileSync(fileName, xls, 'binary');

        // Send the Excel file as a response
        res.download(fileName, (err) => {
            if (err) {
                res.status(500).send('Error downloading the file');
            }
            fs.unlinkSync(fileName); // Delete the file after sending it
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

module.exports = router;
