const express = require('express');
const router = express.Router();

const Event = require('../../models/events');
const UserStudent = require('../../models/userStudent');

router.delete('/', async (req, res) => {
        const { eventID, eventName, userID} = req.body; 

        if (!eventID || !userID || !eventName) {
                return res.status(400).send("event and user credentials are incorrect to perform RSVP cancellation");
        }

        try {
                const query = {
                        $or: [
                                { _id: eventID },
                                { name: eventName }
                        ]
                };
                const selectedEvent = await Event.findOne(query);
                if (!selectedEvent) {
                        return res.status(404).send("Event not found in the DB");
                }

                // delete the user student from the attendees list if found
                const attendeeIndex = selectedEvent.attendees.indexOf(userID);
                console.log("ID", userID);
                console.log("ATTENDEES", selectedEvent.attendees);
                if (attendeeIndex != -1) {
                        selectedEvent.attendees.splice(attendeeIndex, 1);
                        await selectedEvent.save();
                } else {
                        return res.status(404).send("User not found in the event's attendees list");
                }

                // Find the user and remove the event from their RSVP list
                const userRegistered = await UserStudent.findOne({ _id: userID });
                if (userRegistered) {
                        console.log(eventID);
                        console.log(userRegistered.eventsRSVP);

                        const eventIndex = userRegistered.eventsRSVP.findIndex(event => event == eventID);

                        if (eventIndex !== -1) {
                                userRegistered.eventsRSVP.splice(eventIndex, 1);
                                await userRegistered.save();
                        }
                        // [Important!!!]: If the event is not in the user's RSVP list,
                        // I think it is fine, we already removed them from the event attendee list which matters more.
                } else {
                        return res.status(404).send("User not found in the DB - Event registration not removed from their RSVP list");
                }

                res.status(200).send("RSVP cancellation successful for user " + userID + " from event " + eventID);
        } catch (err) {
                res.status(503).send("Internal server error: " + err.message);
        }
});

module.exports = router;
