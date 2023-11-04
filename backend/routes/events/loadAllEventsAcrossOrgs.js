const express = require('express');
const router = express.Router();

const Event = require('../../models/events');

router.get('/', async (req, res) => {
        try {
                const events = await Event.find({});
                res.status(200).json(events);
        } catch (err) {
                res.status(503).send("Could not load all events across all Orgs: " + err);
        }
});

module.exports = router;
