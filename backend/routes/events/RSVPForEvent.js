const express = require('express');
const router = express.Router();

const Event = require('../../models/events'); 
const userStudent = require('../../models/userStudent');


/* 0 - registered volunteer for event
   1 - already registered for event
   2 - event at full capacity
*/


router.post('/', async (req, res) => {
        const { eventID, eventName, userID, check } = req.body;

        if (!eventID || !userID || !eventName) {
                return res.status(400).send("Missing credentials to RSVP for event");
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
                        return res.status(404).send({ status: "Event not found with neither the ID nor the name (potentially not in the DB)", RSVPStatus: 3 });
                }

                // Check if the user already registered
                if (selectedEvent.registeredVolunteers.includes(userID)
                || selectedEvent.registeredVolunteers.includes(userID)) 
                {
                        return res.status(201).json({ status: "User already registered for event", RSVPStatus: 1 }).send();
                }else if(check == 1){
                        return res.status(202).json({ status: "No RSVP Yet", RSVPStatus: 2 }).send();
                }

                // check if the event is already at max length
                // if it has a max num of attendees (which is not always the case)
                if (selectedEvent.maxAttendees && selectedEvent.registeredVolunteers.length >= selectedEvent.maxAttendees) {
                        return res.status(202).json({ status: "Event at max capacity", RSVPStatus: 2 }).send();
                }

                // register the user to the event
                selectedEvent.registeredVolunteers.push(userID);

                await selectedEvent.save();

                const userRegistered = await userStudent.findOne({ _id: userID});

                if (!userRegistered) {
                        return res.status(404).send("User not found in the DB - cannot add to their event history/RSVP");
                }

                console.log(userRegistered);

                userRegistered.eventsRSVP.push(eventID);
                await userRegistered.save();

                return res.status(200).json({ status: "User registered for event", RSVPStatus: 0 }).send();
        } catch (err) {
                res.status(503).send({status: "Internal server error: " + err.message, RSVPStatus: 3});
        }
});

module.exports = router;
