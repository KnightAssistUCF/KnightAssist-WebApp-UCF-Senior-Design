const express = require("express");
const router = express.Router();
const event = require("../../models/events");
const userStudent = require("../../models/userStudent");
const organization = require("../../models/organization");


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

		const eventHistory = [];

		for(let event of events){
			const checkInRecord = event.checkedInStudents.find(checkIn => checkIn.studentId.equals(student._id));

			const org = await organization.findById(event.sponsoringOrganization);

			const checkIn = [checkInRecord.checkInTime.toLocaleDateString(), checkInRecord.checkInTime.toLocaleTimeString()];
			const checkOut = [checkInRecord.checkOutTime.toLocaleDateString(), checkInRecord.checkOutTime.toLocaleTimeString()]

			const totalHours = ((checkInRecord.checkOutTime - checkInRecord.checkInTime) / 3600000).toFixed(2);
			eventHistory.push({"ID": event._id, "name": event.name, "org": org.name, "checkIn": checkIn, "checkOut": checkOut, "hours": totalHours});
		}

        res.status(200).send(eventHistory);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;
