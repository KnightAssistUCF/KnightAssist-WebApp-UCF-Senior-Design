const express = require('express');
const router = express.Router();
const UserStudent = require('../../models/userStudent');
const Organization = require('../../models/organization');
const Event = require('../../models/events');

router.get('/', async (req, res) => {
    try {
        const orgId = req.query.orgId;

        const organization = await Organization.findById(orgId);
        if (!organization) {
            return res.status(404).send('Organization not found in the database.');
        }

        const events = await Event.find({ sponsoringOrganization: orgId });

        let studentIds = new Set();
        events.forEach(event => {
            event.checkedInStudents.forEach(student => {
                studentIds.add(student.studentId.toString());
            });
        });

        let volunteerDetails = [];

        for (let studentId of studentIds) {
            let totalHours = 0;

            events.forEach(event => {
                event.checkedInStudents.forEach(checkIn => {
                    if (checkIn.studentId.toString() === studentId) {
                        let hours = (checkIn.checkOutTime - checkIn.checkInTime) / 36e5; // Convert milliseconds to hours
                        totalHours += hours;
                    }
                });
            });

            const student = await UserStudent.findById(studentId).select('firstName lastName eventsHistory');
            if (student) {
                volunteerDetails.push({
                    student: student,
                    hoursVolunteered: totalHours
                });
            }
        }

        // Sort the array based on hours volunteered in descending order
        volunteerDetails.sort((a, b) => b.hoursVolunteered - a.hoursVolunteered);

        res.json({ data: volunteerDetails });
    } catch (error) {
        console.error('Internal error: ', error);
        res.status(500).send('Internal server error while making the per org leaderboard.');
    }
});

module.exports = router;
