const express = require("express");
const router = express.Router();

const orgDB = require("../../models/organization");

router.delete('/', async (req, res) => {
    const titleToLookFor = req.body.title;
    const organizationID = req.body.organizationID;
    try {

        const organization = await orgDB.findOne({ organizationID: organizationID });
        if (!organization) return res.status(404).send('Organization not found in the database');

        var index = -1;
        for (var i = 0; i < organization.updates.length; i++) {
            // comapre the string of the title to look for with the title of the announcement
            if (organization.updates[i].title.localeCompare(titleToLookFor) === 0) {
                console.log("Found the announcement to delete");
                index = i;
                break;
            }
        }

        if (index === -1) return res.status(404).send('Announcement not found');
        else {
            organization.updates.splice(index, 1);
            const result = await organization.save();
            
        }
        
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred could not delete the announcement/update');
    }
});

module.exports = router;
