const express = require('express');
const router = express.Router();
const userStudent = require('../../models/userStudent');
const eventModel = require('../../models/events');

function shuffleThis(array) {
        for (let i = array.length - 1; i >= 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
}

router.get('/', async (req, res) => {
        try {
                const userID = req.query.userID;
                const user = await userStudent.findOne({ _id: userID });

                if (!user) {
                        return res.status(404).send('User not found in the database');
                }

                const userTags = user.categoryTags;
				const favoritedOrgs = user.favoritedOrganizations.map(org => org._id.toString());

                let events = await eventModel.find({
                        eventTags: { $in: userTags },
                        registeredVolunteers: { $ne: user._id },
                        endTime: { $gt: new Date() },  // Ensure event is in the future
						sponsoringOrganization: { $nin: favoritedOrgs}
                });

                // Shuffle events before processing
                events = shuffleThis(events);

                let eventsPerOrganization = {};
                let shuffledSelectedEvents = [];

                // Select up to 20 events, considering up to 4 per organization
                for (let event of events) {
                        if (shuffledSelectedEvents.length >= 20) break; // Stop if we have 20 events

                        // Check if the event can be added (up to 4 per organization)
                        if (!eventsPerOrganization[event.sponsoringOrganization] ||
                                eventsPerOrganization[event.sponsoringOrganization].length < 4) {

                                if (!eventsPerOrganization[event.sponsoringOrganization]) {
                                        eventsPerOrganization[event.sponsoringOrganization] = [];
                                }

                                eventsPerOrganization[event.sponsoringOrganization].push(event);
                                shuffledSelectedEvents.push(event);
                        }
                }

                shuffledSelectedEvents = shuffledSelectedEvents.slice(0, 20);

                return res.json(shuffledSelectedEvents);
        } catch (error) {
                console.error(error);
                res.status(500).send(error);
        }
});

module.exports = router;
