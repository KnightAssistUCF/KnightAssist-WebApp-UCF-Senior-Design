const express = require('express');
const router = express.Router();
const userStudent = require('../../models/userStudent');
const eventModel = require('../../models/events');

router.get('/', async (req, res) => {
        try {
                const userID = req.query.userID;
                const user = await userStudent.findOne({ studentID: userID });

                if (!user) {
                        return res.status(404).send('User not found within the database');
                }

                // get the interest tags of the user
                const userTags = user.categoryTags;

                // locate events that match the user interest tags
                const suggestedEvents = await eventModel.find({ eventTags: { $in: userTags } });

                return res.json(suggestedEvents);
        } catch (error) {
                res.status(500).send(error);
        }
});

module.exports = router;