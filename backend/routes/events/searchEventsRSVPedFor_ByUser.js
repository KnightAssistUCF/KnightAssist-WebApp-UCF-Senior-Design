const express = require('express');
const router = express.Router();

const Event = require('../../models/events');
const UserStudent = require('../../models/userStudent');

router.get('/', async (req, res) => {
        try {
                const { email, studentID } = req.query;

                const user = await UserStudent.findOne({
                        $or: [{ email: email }, { studentID: studentID }]
                }).exec();

                if (!user) {
                        return res.status(404).send('user not found in the database');
                }

                console.log(user);

                // look up all events the user has RSVPed for and return their full objects
                const eventsRSVPed = await Event.find({
                        '_id': { $in: user.eventsRSVP }
                }).exec();

                console.log("eventsRSVPed for by user: " + user.name);
                console.log(eventsRSVPed);

                return res.json(eventsRSVPed);
        } catch (error) {
                console.error(error);
                res.status(500).send('Internal Server Error');
        }
});

module.exports = router;
