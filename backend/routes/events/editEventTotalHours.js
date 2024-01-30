const express = require("express");
const router = express.Router();
const event = require("../../models/events");
const userStudent = require("../../models/userStudent");
const organization = require("../../models/organization");


router.post("/", async (req, res) => {
    try {
        const eventID = req.body.eventID;
        const studentID = req.body.studentID;
        const newCheckIn  = req.body.newCheckIn;
        const newCheckOut = req.body.newCheckOut;
        const whoAdjustedTime = req.body.whoAdjustedTime; // can be either admin or org depends if the call is coming from the admin interface or Noah's 

        const student_obj = await userStudent.findById(studentID);

        const event_obj = await event.findById(eventID);
        if (!event_obj) {
            return res.status(404).send("Event not found in the database");
        }

        // check if the student was in the list of checked in students
        const checkInRecord = event_obj.checkedInStudents.find(checkIn => checkIn.studentId.equals(studentID));
        if (!checkInRecord) {
            return res.status(404).send("Student not found in the list of checked in students for event named " + event_obj.name);
        }
        let adjusterEntity = null;
        if(whoAdjustedTime !== "admin")
            adjusterEntity = await organization.findById(event_obj.sponsoringOrganization);


        const oldCheckin = checkInRecord.checkInTime;
        const oldCheckout = checkInRecord.checkOutTime;
        const oldCalculatedTime = ((oldCheckout - oldCheckin) / 3600000).toFixed(2);

        // update the checkIn and checkOut times with the new ones
        checkInRecord.checkInTime = newCheckIn;
        checkInRecord.checkOutTime = newCheckOut;
        checkInRecord.wereHoursAdjusted_ForSudent_ForThisEvent = true;
        checkInRecord.wereHoursAdjusted_ForSudent_ForThisEvent.adjuster = adjusterEntity._id;
        const newTotalHours = ((newCheckOut - newCheckIn) / 3600000).toFixed(2);
        checkInRecord.wereHoursAdjusted_ForSudent_ForThisEvent.howMuchAdjusted = oldCalculatedTime - newTotalHours;
        await event_obj.save();



        // update the actual record of the student 
        student_obj.totalVolunteerHours -= oldCalculatedTime;
        student_obj.totalVolunteerHours += newTotalHours;

        res.status(200).send(event_obj.checkedInStudents);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;
