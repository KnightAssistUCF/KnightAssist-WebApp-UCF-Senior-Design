const express = require("express");
const router = express.Router();
const event = require("../../models/events");
const userStudent = require("../../models/userStudent");


router.get("/", async (req, res) => {
    try {
        const studentId = req.query.studentId;

        const student = await userStudent.findById(studentId);
        if (!student) {
            return res.status(404).send("Student not found in the database");
        }

        console.log("STUDENT ID", student);

        // return the events that the user attended, located in the eventsHistory array
        const events = await event.find({ _id: { $in: student.eventsHistory } });
        if (!events) {
            return res.status(404).send("No events found in the history records for this student");
        }

        res.status(200).send(events);

    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;
