const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Event = require('../../models/events');

// genrate completely random events data
const generateRandomEventData = (organizationId) => {
    return new Event({
        name: `Event ${Math.random().toString(36).substring(7)}`,
        description: `${Math.random().toString(36).substring(7)}`,
        location: `Location ${Math.random().toString(36).substring(7)}`,
        sponsoringOrganization: organizationId,
        attendees: [],
        registeredVolunteers: [],
        startTime: new Date(),
        endTime: new Date(),
        // whatever the heck these links can lead to [these are place holders]
        eventLinks: {
            facebook: `https://facebook.com/${Math.random().toString(36).substring(7)}`,
            twitter: `https://twitter.com/${Math.random().toString(36).substring(7)}`,
            instagram: `https://instagram.com/${Math.random().toString(36).substring(7)}`,
            website: `https://website.com/${Math.random().toString(36).substring(7)}`,
        },
        checkedInStudents: [],
        feedback: [],
        eventTags: [
            'computer science', 
            'engineering', 
            'mathematics'
        ],
        semeter: 'Fall 2023',
        maxAttendees: Math.floor(Math.random() * 500) + 1, 
    });
}

router.get('/', async (req, res) => {
    try {
        const organizationId = req.params.organizationId;
        let events = [];

        for (let i = 0; i < 10; i++) {
            let randomEvent = generateRandomEventData(organizationId);
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