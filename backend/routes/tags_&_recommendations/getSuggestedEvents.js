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
                const eventsCursor = eventModel.find({
                        eventTags: { $in: userTags },
                        registeredVolunteers: { $ne: user._id },
                        endTime: { $gt: new Date() }  // Ensure event is in the future
                }).cursor();

                let eventsPerOrganization = {};
                let totalEventsCount = 0;

                for (let event = await eventsCursor.next(); event != null; event = await eventsCursor.next()) {
                        if (totalEventsCount >= 20) break;  // Stop if we have collected 20 events

                        // Check if the event can be added (up to 4 per organization)
                        if (!eventsPerOrganization[event.sponsoringOrganization] ||
                                eventsPerOrganization[event.sponsoringOrganization].length < 4) {

                                if (!eventsPerOrganization[event.sponsoringOrganization]) {
                                        eventsPerOrganization[event.sponsoringOrganization] = [];
                                }

                                eventsPerOrganization[event.sponsoringOrganization].push(event);
                                totalEventsCount++;
                        }
                }

                let finalSuggestedEvents = shuffleThis([].concat(...Object.values(eventsPerOrganization))).slice(0, 20);

                return res.json(finalSuggestedEvents);
        } catch (error) {
                console.error(error);
                res.status(500).send(error);
        }
});

module.exports = router;
