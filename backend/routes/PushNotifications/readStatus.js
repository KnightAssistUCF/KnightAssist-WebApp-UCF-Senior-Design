const express = require('express');
const router = express.Router();
const Organization = require('../../models/organization');
const Event = require('../../models/events');
const UserStudent = require('../../models/userStudent'); 

router.get('/', async (req, res) => {
    const { userId, message } = req.query;

    try {
        // using the .$ 1 to return only one notification
        const user = await UserStudent.findOne({ _id: userId, 'notifications.message': message }, { 'notifications.$': 1 });

        if (!user || user.notifications.length === 0) {
            return res.status(404).send('Notification not found');
        }

        const notification = user.notifications[0]; 

        // return the status
        res.json({ read: notification.read });
    } catch (error) {
        console.error("Error fetching notification status by message", error);
        res.status(500).send("Failed to fetch notification status by message.");
    }
});

module.exports = router;
