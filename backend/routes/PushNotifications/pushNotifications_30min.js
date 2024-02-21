const express = require('express');
const router = express.Router();


const Organization = require('../../models/organization');
const Event = require('../../models/event');
const UserStudent = require('../../models/userStudent');

router.get('/', async (req, res) => {
    try {
        const userId = req.query.userId;
        const intervalStart = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

        
        const favoriteOrgsUpdates = await Organization.find({
            favorites: userId,
            'updates.date': { $gt: intervalStart }
        }, 'name updates').lean();

        // Extract updates from favorite organizations
        const updates = favoriteOrgsUpdates.map(org => ({
            organizationName: org.name,
            updates: org.updates.filter(update => update.date > intervalStart)
        }));

        // Fetch events that the user has registered for or provided feedback on
        const userEvents = await Event.find({
            $or: [
                { 'registeredVolunteers': userId },
                { 'feedback.studentId': userId }
            ],
            startTime: { $gt: intervalStart } 
        }).lean();

        // get the new events of the orgs that hte user has favorited
        const favoriteOrgs = await Organization.find({ favorites: userId }, 'name events').lean();
        const newEvents = favoriteOrgs.map(org => ({
            organizationName: org.name,
            events: org.events.filter(event => event.startTime > intervalStart)
        }));


        const response = {
            orgUpdates: updates,
            registeredAndCritiques_events: userEvents,
            newEvents: newEvents
        };

        res.json(response);
    } catch (error) {
        console.error("Error fetching updates and events", error);
        res.status(500).send("Failed to fetch updates and events.");
    }
});

module.exports = router;
