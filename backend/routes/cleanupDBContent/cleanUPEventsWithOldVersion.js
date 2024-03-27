const express = require('express');
const router = express.Router();
const Event = require('../../models/events');

router.post('/', async (req, res) => {
    try {

        const eventsWithOutdatedAttributes = await Event.find({
            $or: [
                { "eventLinks": { $exists: true } },
                // { "oldAttribute2": { $exists: true } }
            ]
        });

        // Perform cleanup: either delete or unset attributes
        // Delete events
        // await Event.deleteMany({ _id: { $in: eventsWithOutdatedAttributes.map(event => event._id) } });

        // Or update events to remove outdated attributes
        for (const event of eventsWithOutdatedAttributes) {
            await Event.updateOne({ _id: event._id }, { $unset: { eventLinks: ""} });
        }

        res.status(200).send('removed old attributes from events.');
    } catch (error) {
        console.error('Error during event cleanup:', error);
        res.status(500).send('An error occurred during the cleanup of events from old attributes.');
    }
});

module.exports = router;