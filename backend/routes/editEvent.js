const express = require('express');
const router = express.Router();

const event = require('../models/events');
const organization = require('../models/organization');

router.post('/', async (req, res) => {
    const searchID = req.body.organizationID;
    const eventID = req.body.eventID;

    await event.findOne({ sponsoringOrganization: searchID, eventID: eventID }).then(async (events) => {
        console.log(events);
        if (events) {
            events.name = req.body.name;
            events.eventID = req.body.eventID;
            events.description = req.body.description;
            events.location = req.body.location;
            events.date = req.body.date;
            events.sponsoringOrganization = req.body.sponsoringOrganization;
            events.startTime = req.body.startTime;
            events.endTime = req.body.endTime;
            events.eventLinks = req.body.eventLinks;
            events.eventTags = req.body.eventTags;
            events.semester = req.body.semester;
            events.maxAttendees = req.body.maxAttendees;
            events.attendees = req.body.attendees;
            events.registeredVolunteers = req.body.registeredVolunteers;
            events.save();
            res.status(200).send("Event updated successfully");
            console.log(events);
        } else {
            res.status(404).send("Event not found in the database");
        }
    }).catch((err) => {
        res.status(503).send("Internal server error: " + err);
    });
});

module.exports = router;