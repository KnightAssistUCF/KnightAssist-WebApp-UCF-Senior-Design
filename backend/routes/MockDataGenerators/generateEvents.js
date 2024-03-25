const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Event = require('../../models/events');

// genrate completely random events data
const generateRandomEventData = (organizationId, i) => {
	let day = i + (i * 2);
    return new Event({
        name: `Kareok Night #` + i,
        description: `Lots of music will be played`,
        location: `Knights Plaza`,
        sponsoringOrganization: organizationId,
        registeredVolunteers: [],
        startTime: new Date("2024-2-" + day),
        endTime: new Date("2024-2-" + day),
        checkedInStudents: [],
        feedback: [],
        eventTags: [
            'Music & Performance'
        ],
        semeter: 'Fall 2023',
        maxAttendees: 5 
    });
}

router.get('/', async (req, res) => {
    try {
        const organizationId = req.query.organizationId;
        let events = [];

        for (let i = 0; i < 8; i++) {
            let randomEvent = generateRandomEventData(organizationId, i + 1);
            await randomEvent.save(); 
            events.push(randomEvent);
        }

        // return back the newly created events so far we have 10 generated events
        res.json(events);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;