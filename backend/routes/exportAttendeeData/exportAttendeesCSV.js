const express = require('express');
const router = express.Router();
const json2xls = require('json2xls');
const fs = require('fs');
const path = require('path');

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
            interests: studentId.categoryTags ? studentId.categoryTags.join(", ") : ''
        }));

        const xls = json2xls(attendees);
        const fileName = `event-${eventId}-attendees.xlsx`;
        const filePath = path.join(__dirname, fileName);
        fs.writeFileSync(filePath, xls, 'binary');

        // Set headers to inform the client about the file format
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);

        // Stream the file content to the response
        fs.createReadStream(filePath)
            .on('end', () => {
                // Delete the file after sending it
                fs.unlinkSync(filePath);
            })
            .on('error', (error) => {
                console.error('Error streaming the file', error);
                res.status(500).send('Error streaming the file');
            })
            .pipe(res);

    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

module.exports = router;
