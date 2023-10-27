const express = require("express");
const router = express.Router();
const orgDB = require("../models/organization");

router.post('/', async (req, res) => {
    const fetchID = req.body.organizationID;
    const newAnnouncementContent = req.body.content;
    const newAnnouncementTitle = req.body.title;

    if (!fetchID) return res.status(400).send('Organization ID not provided');
    if (!newAnnouncementContent) return res.status(400).send('Announcement content is needed');
    if (!newAnnouncementTitle) 
        newAnnouncementTitle = req.body.title || 'Untitled';
    try {
        const organization = await orgDB.findOne({ organizationID: fetchID });
        if (!organization) return res.status(404).send('Organization not found');
        
        var newAnnouncement =  {
            "date": Date.now(),
            "title": newAnnouncementTitle,
            "content": newAnnouncementContent
        }

        organization.updates.push(newAnnouncement);
        await organization.save();
        // print the latest added announcement
        console.log(organization.updates[organization.updates.length - 1]);
        res.status(200).send('Announcement created successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred - could not create announcement');
    }
});

module.exports = router;