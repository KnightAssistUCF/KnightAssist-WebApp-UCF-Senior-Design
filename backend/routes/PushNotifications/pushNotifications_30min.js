const express = require('express');
const router = express.Router();

const Event = require('../../models/events');
const Organization = require('../../models/organization');

function getIntervalStart() {
    return new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
}

router.get('/', async (req, res) => {
    try {
        const intervalStart = getIntervalStart();
        const userId = req.query.userId; 

        // Find new events since the last interval
        const newEvents = await Event.find({
            createdAt: { $gt: intervalStart }
        });

        // Find new announcements from organizations the user is interested in
        const userInterestedOrgs = await Organization.find({
            'favorites': userId, 
            'updates.date': { $gt: intervalStart }
        }, {
            'name': 1,
            'updates': 1
        }).lean();

        const newAnnouncements = userInterestedOrgs.map(org => ({
            organizationName: org.name,
            announcements: org.updates.filter(update => update.date > intervalStart)
        })).filter(org => org.announcements.length > 0);

        const notifications = {
            newEvents,
            newAnnouncements
        };

        res.json(notifications);
    } catch (error) {
        console.error("Failed to fetch for new notifications", error);
        res.status(500).send("An error occurred while fetching for new notifications.");
    }
});

module.exports = router;
