const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Event = require('../../models/events');
const userStudent = require('../../models/userStudent');

const generateRandomTimes = (start, end) => {
    // const checkInTime = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    // const checkOutTime = new Date(checkInTime.getTime() + Math.random() * (2 * 60 * 60 * 1000));

    let checkInTime;
    let checkOutTime;
    // if the checkout time is before or equal to check in time we add 2 hours to it
    do{
		checkInTime = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
		checkOutTime = new Date(end.getTime() + Math.random() * (2 * 60 * 60 * 1000));
	}while(checkInTime.getTime() >= checkOutTime.getTime());

    return { checkInTime, checkOutTime };
};

router.post('/', async (req, res) => {
    try {
        const events = await Event.find({sponsoringOrganization: "6598366c76beab8af631f919"}).limit(5); // for now we only check them in and out from 5 events 

        for (const event of events) {
            const { checkInTime, checkOutTime } = generateRandomTimes(event.startTime, event.endTime);

            // change this with the id of the student that we want to check in and out
            // across some events
            const studentId = new mongoose.Types.ObjectId('657dff4c5f28be97b30edff1');

            const student = await userStudent.findById(studentId);

            student.eventsHistory.push(event._id);

            await student.save();

            // Check if the user has already checked in
            const checkedInIndex = event.checkedInStudents.findIndex(checkIn => checkIn.studentId.equals(studentId));

            if (checkedInIndex === -1) { // they did not check in yet so we add them
                const checkedInStudent = {
                    studentId,
                    checkInTime,
                    checkOutTime
                };
                await Event.updateOne(
                    { _id: event._id },
                    { $push: { checkedInStudents: checkedInStudent } },
                    // if not in attendees we add them
                    { $addToSet: { attendees: studentId } }
                );
            } else {
                // if they already checked in we just update their check out time
                const updateField = {};
                updateField[`checkedInStudents.${checkedInIndex}.checkOutTime`] = checkOutTime;
                await Event.updateOne(
                    { _id: event._id, 'checkedInStudents.studentId': studentId },
                    { $set: updateField }
                );
            }
        }

        res.send("Checked in and checked out mock students generated and added to the first " + events.length + " events.");
    } catch (error) {
        console.error('Error generating checked in/out volunteers:', error);
        res.status(500).send('Error generating mock checked in/out volunteers.');
    }
});

module.exports = router;