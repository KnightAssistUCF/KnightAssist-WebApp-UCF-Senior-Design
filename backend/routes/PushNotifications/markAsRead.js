const express = require('express');
const router = express.Router();
const Organization = require('../../models/organization');
const Event = require('../../models/events');
const UserStudent = require('../../models/userStudent');

router.post('/', async (req, res) => {
    const { userId, message } = req.body;

    try {
        const user = await UserStudent.findOne({ _id: userId, 'notifications.message': message });

        if (!user) {
            return res.status(404).send('User or notification not found');
        }

        const notificationIndex = user.notifications.findIndex(notif => notif.message === message && !notif.read);
        if (notificationIndex === -1) {
            return res.status(404).send('Notification not found or already marked as read by the user');
        }

        user.notifications[notificationIndex].read = true;
        await user.save();

        res.send('Notification marked as read');
    } catch (error) {
        console.error("Error updating notification status by message", error);
        res.status(500).send("Failed to update notification status by message.");
    }
});


module.exports = router;
