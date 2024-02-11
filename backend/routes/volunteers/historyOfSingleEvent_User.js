const express = require("express");
const router = express.Router();
const event = require("../../models/events");
const userStudent = require("../../models/userStudent");
const organization = require("../../models/organization");

router.get("/", async (req, res) => {
    try {
        const studentId = req.query.studentId;
		const eventId = req.query.eventId;

        const student = await userStudent.findById(studentId);
        if (!student) {
            return res.status(404).send("Student not found in the database");
        }

        // return the events that the user attended, located in the eventsHistory array
        const theEvent =  await event.findById(eventId);
       
		if (!theEvent) {
            return res.status(404).send("Event not found in the database");
        }

		const checkInRecord = theEvent.checkedInStudents.find(checkIn => checkIn.studentId.equals(student._id));

		console.log(checkInRecord);

        res.status(200).send(checkInRecord);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;
