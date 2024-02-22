const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Organization = require('../../models/organization');
const Event = require('../../models/events');
const UserStudent = require('../../models/userStudent'); 

router.get('/', async (req, res) => {
    try {
        const userId = req.query.userId;
        const intervalStart = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

        const user = await UserStudent.findById(userId);

        const favoriteOrgsUpdates = await Organization.find({
            favorites: userId,
            'updates.date': { $gt: intervalStart }
        }, 'name updates').lean();

        // Create notifications for updates from favorite organizations
        let newNotifications = favoriteOrgsUpdates.map(org => ({
            message: `New update from ${org.name}: ${org.updates[0].title}`,
            createdAt: `${org.updates[0].date}`,
            read: false
        }));

        const favoriteOrgs = await Organization.find({ favorites: userId });

        for (let org of favoriteOrgs) {
            const events = await Event.find({
                sponsoringOrganization: org._id,
                createdAt: { $gt: intervalStart }
            });

            if (events.length > 0) {
                newNotifications.push({
                    message: `New event from ${org.name}`,
                    createdAt: new Date(), // just for simplicity
                    read: false
                });
            }
        }

        // store new notifications to the user
        if (newNotifications.length > 0) {
            await UserStudent.findByIdAndUpdate(userId, {
                $push: { notifications: { $each: newNotifications } }
            });
        }

        // Refetch the user to get updated notifications
        const updatedUser = await UserStudent.findById(userId);

        // split notifications into new and old based on the read status and createdAt
        const segregatedNotifications = updatedUser.notifications.filter(notification => !notification.read && notification.createdAt > intervalStart);
        const oldNotifications = updatedUser.notifications.filter(notification => notification.read || notification.createdAt <= intervalStart);

        const response = {
            notifications: {
                new: segregatedNotifications,
                old: oldNotifications
            }
        };

        res.json(response);
    } catch (error) {
        console.error("Error fetching updates, events, and storing notifications", error);
        res.status(500).send("Failed to fetch updates, events, and store notifications.");
    }
});

module.exports = router;
