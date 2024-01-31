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

		console.log(events);

		for(let event of events){
			console.log(event)
			const checkInRecord = event.checkedInStudents.find(checkIn => checkIn.studentId.equals(student._id));

			const org = await organization.findById(event.sponsoringOrganization);

			const checkIn = [checkInRecord.checkInTime.toLocaleDateString(), checkInRecord.checkInTime.toLocaleTimeString()];
			const checkOut = [checkInRecord.checkOutTime.toLocaleDateString(), checkInRecord.checkOutTime.toLocaleTimeString()]

			const totalHours = ((checkInRecord.checkOutTime - checkInRecord.checkInTime) / 3600000).toFixed(2);
            const wasAdjusted = checkInRecord.wereHoursAdjusted_ForSudent_ForThisEvent;
            if (wasAdjusted) {
                const whoAdjusted_ID = checkInRecord.wereHoursAdjusted_ForSudent_ForThisEvent.adjuster;
                const howMuchAdjusted = checkInRecord.wereHoursAdjusted_ForSudent_ForThisEvent.howMuchAdjusted;
                let whoAdjusted_Name = "";
                // find the organization that adjusted the hours for the student volunteer
                const org_adjuster = await organization.findById(whoAdjusted_ID);
                if (!org_adjuster) {
                    whoAdjusted_Name = "Admin";
                } else {
                    whoAdjusted_Name = org_adjuster.name + " (Org)";
                }
                eventHistory.push({ "ID": event._id, "name": event.name, "org": org.name, "checkIn": checkIn, "checkOut": checkOut, "hours": totalHours, "adjustedTotal": howMuchAdjusted,"wasAdjusted": wasAdjusted, "whoAdjusted": whoAdjusted_Name });
            }else{
				eventHistory.push({ "ID": event._id, "name": event.name, "org": org.name, "checkIn": checkIn, "checkOut": checkOut, "hours": totalHours, "wasAdjusted": wasAdjusted});
			}
		}

        res.status(200).send(eventHistory);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;
