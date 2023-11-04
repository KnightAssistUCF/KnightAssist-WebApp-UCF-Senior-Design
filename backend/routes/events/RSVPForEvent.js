const express = require('express');
const router = express.Router();

const Event = require('../../models/events'); 
const userStudent = require('../../models/userStudent');


/* 0 - registered volunteer for event
   1 - already registered for event
   2 - event at full capacity
*/


router.post('/', async (req, res) => {
        const { eventID, eventName, userID, userEmail } = req.body;

        if (!eventID || !userID || !eventName || !userEmail) {
                return res.status(400).send("Missing credentials to RSVP for event");
        }

        try {
                const query = {
                        $or: [
                                { eventID: eventID },
                                { name: eventName }
                        ]
                };
                const selectedEvent = await Event.findOne(query);


                if (!selectedEvent) {
                        return res.status(404).send("Event not found with neither the ID nor the name (potentially not in the DB)");
                }

                // Check if the user already registered
                if (selectedEvent.attendees.includes(userID)
                || selectedEvent.registeredVolunteers.includes(userID)
                || selectedEvent.registeredVolunteers.includes(userEmail)
                || selectedEvent.attendees.includes(userEmail)) 
                {
                        res.status(400).send("User already RSVP'd to this event");
                        return 1;
                }

                // check if the event is already at max length
                // if it has a max num of attendees (which is not always the case)
                if (selectedEvent.maxAttendees && selectedEvent.attendees.length >= selectedEvent.maxAttendees) {
                        res.status(400).send("Event is at full capacity");
                        return 2;
                }

                // register the user to the event
                selectedEvent.attendees.push(userID);

                await selectedEvent.save();

                const userRegistered = await userStudent.findOne({ email: userEmail });

                if (!userRegistered) {
                        return res.status(404).send("User not found in the DB - cannot add to their event history/RSVP");
                }

                userRegistered.eventsRSVP.push(eventID);
                await userRegistered.save();

                res.status(200).send("RSVP successful for user " + userID + " to event " + eventID);
                return 0;
        } catch (err) {
                res.status(503).send("Internal server error: " + err.message);
        }
});

module.exports = router;
