const express = require("express");
const router = express.Router();
const event = require("../../models/events");
const userStudent = require("../../models/userStudent");


router.post("/", async (req, res) => {
        try {
                const { qrCodeData_eventID, studentId } = req.body;

                const eventObj = await event.findOne({ _id: qrCodeData_eventID });
                if (!eventObj) {
                        return res.status(404).send("Event passed through the QRCode not found in the database");
                }

                const student = await userStudent.findById(studentId);
                if (!student) {
                        return res.status(404).send("Student not found in the database");
                }

                const alreadyCheckedIn = eventObj.checkedInStudents.some(checkIn => checkIn.studentId.equals(student._id));
                if (alreadyCheckedIn) {
                        return res.status(400).send("Student already checked in for this event");
                }

                eventObj.checkedInStudents.push({
                        studentId: student._id,
                        checkInTime: new Date(),
                        checkOutTime: null 
                });
          
                await eventObj.save();

                res.status(200).send({message: "Check-in successful and the ID of the student" + student._id + "has been added to the event" + qrCodeData_eventID + "", eventObj: eventObj});
        } catch (err) {
                res.status(500).send(err.message);
        }
});

module.exports = router;
