const express = require("express");
const router = express.Router();
const orgDB = require("../models/organization");

router.patch('/', async (req, res) => {
    const organizationID = req.body.organizationID;
    const titleToLookFor = req.body.titleToLookFor;
    const newTitle = req.body.newTitle;
    const updatedContent = req.body.newContent;

    try {
        const organization = await orgDB.findOne({ organizationID });
        if (!organization) return res.status(404).send('Organization not found');
        const announcementIndex = organization.updates.findIndex(update => update.title === titleToLookFor);
        if (announcementIndex === -1) return res.status(404).send('Announcement not found');
        const announcement = organization.updates[announcementIndex];
        if (!announcement) return res.status(404).send('Announcement not found');

        // if there is a new title to update to
        if (newTitle) {
            announcement.title = newTitle;
        }

        // if there is new content to update to
        if (updatedContent) {
            announcement.content = updatedContent;
        }

        // save this new content
        await organization.save();
        res.status(200).send('Announcement updated successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred - could not update announcement');
    }
});

module.exports = router;