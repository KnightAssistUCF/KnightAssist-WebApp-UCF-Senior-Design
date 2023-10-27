const express = require("express");
const router = express.Router();
const orgDB = require("../models/organization");

router.post('/', async (req, res) => {
    const organizationID = req.body.organizationID;

    try {
        const organization = await orgDB.findOne({ organizationID });
        if (!organization) return res.status(404).send('Organization not found');
        
        var newAnnouncement =  {
            "date": Date.now(),
            "title": req.body.title,
            "content": req.body.content
        }

        organization.updates.push(newAnnouncement);
        await organization.save();
        console.log(organization.updates);
        res.status(200).send('Announcement created successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred - could not create announcement');
    }
});

module.exports = router;