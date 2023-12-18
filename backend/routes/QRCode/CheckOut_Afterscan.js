const express = require("express");
const router = express.Router();
const event = require("../../models/events");
const userStudent = require("../../models/userStudent");


router.post("/", async (req, res) => {
    try {
        const { qrCodeData_eventID_WithHash, studentId } = req.body;

		// Not a check out code
		if(qrCodeData_eventID_WithHash.length <= 24 || !qrCodeData_eventID_WithHash.endsWith('out')){
			return res.status(404).send("The QRCode is not a checkout code");
		}

        // store the correct event ID after removing the random appended value at the end
        const qrCodeData_eventID_Modified = qrCodeData_eventID_WithHash.substring(0, 24);

        const eventObj = await event.findOne({ _id: qrCodeData_eventID_Modified });
        if (!eventObj) {
            return res.status(404).send("Event passed through the QRCode not found in the database");
        }

        const student = await userStudent.findById(studentId);
        if (!student) {
            return res.status(404).send("Student not found in the database");
        }

		console.log("STUDENT ID", student);
        
        const checkInRecord = eventObj.checkedInStudents.find(checkIn => checkIn.studentId.equals(student._id));

        if (!checkInRecord) {
            return res.status(400).send("Student did not check in for this event earlier");
        } else {
            checkInRecord.checkOutTime = new Date();
        }

        // get the total volunteering time of the student
        const totalVolunteeringTimeMilliseconds = checkInRecord.checkOutTime - checkInRecord.checkInTime;
        const totalVolunteeringTimeHours = totalVolunteeringTimeMilliseconds / 3600000;
        console.log("total volunteering time in hours -> " + totalVolunteeringTimeHours);
        student.totalVolunteerHours += totalVolunteeringTimeHours;

        await eventObj.save();

        res.status(200).send("Check-out successful and the ID of the student -> " + student._id + "has been removed from the checked in ppl in the event -> " + qrCodeData_eventID_Modified + "");
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;
