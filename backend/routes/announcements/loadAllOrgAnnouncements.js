const express = require("express");
const router = express.Router();

const orgDB = require("../../models/organization");

router.get('/', async (req, res) => {
        const organizationID = req.query.organizationID;
        const organizationName = req.query.organizationName;

        const query = {};
        if (organizationID) query.organizationID = organizationID;
        if (organizationName) query.organizationName = organizationName;

        try {
                const organization = await orgDB.findOne({ $or: [query] });
                if (!organization) return res.status(404).send('Organization not found in the database');

                const announcements = organization.updates.map(update => {
                        return {
                                title: update.title,
                                content: update.content,
                                date: update.date,
                                updateID: update._id
                        };
                });

                res.status(200).json({ announcements });
        } catch (error) {
                console.error(error);
                res.status(500).send('An error occurred - could not retrieve announcements');
        }
});

module.exports = router;

