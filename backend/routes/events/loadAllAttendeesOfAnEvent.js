const express = require('express');
const router = express.Router();
const Event = require('../../models/events');
const userStudent = require('../../models/userStudent');

router.get('/', async (req, res) => {
        const query = {
                $or: [
                        { eventID: req.query.eventID },
                        { name: req.query.name }
                ]
        };
        
        try {
                const eventToLookUp = await Event.findOne(query)
                        .populate('attendees')
                        .exec();

                if (!eventToLookUp) {
                        return res.status(404).send({ message: 'Event not found' });
                }

                // If no attendees simply return with exception
                if (eventToLookUp.attendees.length === 0) {
                        return res.status(200).send({ message: 'No attendees found for this event' });
                }

                return res.status(200).json(eventToLookUp.attendees);

        } catch (error) {
                console.error(error);
                res.status(500).send({ message: 'Internal Server Error' });
        }
});

module.exports = router;
