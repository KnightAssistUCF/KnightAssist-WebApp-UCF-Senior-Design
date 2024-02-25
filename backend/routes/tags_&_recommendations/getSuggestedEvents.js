const express = require('express');
const router = express.Router();
const userStudent = require('../../models/userStudent');
const eventModel = require('../../models/events');
const organizationModel = require('../../models/organization');

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
				
                // locate the user interest tags
                const userTags = user.categoryTags;

                // locate all events that match the user interest tags and that the user did not RSVP for
                let allSuggestedEvents_withoutFilter = await eventModel.find({
                        eventTags: { $in: userTags },
                        $and: [
                                { 'attendees': { $ne: user._id } },
                                { 'registeredVolunteers': { $ne: user._id } }
                        ]
                });

                // Group events by the organization that made the event and cap it to 4 suggested events 
                // per organization just to have enough diversity
                let eventsPerOrganization = {};

                allSuggestedEvents_withoutFilter.forEach(event => {
                        // if the sonsoring org has less than 4 events within our list
                        if (eventsPerOrganization[event.sponsoringOrganization]) {
                                if (eventsPerOrganization[event.sponsoringOrganization].length < 3) {
                                        eventsPerOrganization[event.sponsoringOrganization].push(event);
                                }
                        } 
                        // if the sponsiring org has no events within our list
                        else {
                                eventsPerOrganization[event.sponsoringOrganization] = [event];
                        }
                });

                let finalSuggestedListOfEvents = [].concat(...Object.values(eventsPerOrganization));
                console.log("Length of the final suggested events -> " + finalSuggestedListOfEvents.length);
                
                // shuffle the events just for randomization at each call of the endpoint
                finalSuggestedListOfEvents = shuffleThis(finalSuggestedListOfEvents);
                console.log("printing the shuffled list of events");
                console.log(finalSuggestedListOfEvents);
                return res.json(finalSuggestedListOfEvents);
        } catch (error) {
                res.status(500).send(error);
        }
});

module.exports = router;

