const express = require('express');
const router = express.Router();

const event = require('../../models/events');

router.get('/', async (req, res) => {
    const searchID = req.query.eventID;

    await event.find({ _id: searchID }).then((event) => {
        if (event) {
            res.status(200).json(event);
        } else {
            res.status(404).send("Event not found");
        }
    }).catch((err) => {
        res.status(503).send("Internal server error: " + err);
    });
});

module.exports = router;