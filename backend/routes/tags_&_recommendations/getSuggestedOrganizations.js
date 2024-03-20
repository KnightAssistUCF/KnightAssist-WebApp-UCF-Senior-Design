const express = require('express');
const router = express.Router();
const userStudent = require('../../models/userStudent');
const organizationModel = require('../../models/organization');

function shuffleThis(array) {
        for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
}

router.get('/', async (req, res) => {
        try {
                const userID = req.query.userID;
                const user = await userStudent.findOne({ _id: userID }).populate('favoritedOrganizations');

                if (!user) {
                        return res.status(404).send('User not found in the database');
                }

                // Store the interest tags of the user
                const userTags = user.categoryTags;

                // Keep track of suggested organizations
                let suggestedOrganizations = [];
                const favoritedOrgs = user.favoritedOrganizations.map(org => org._id.toString());

                // Fetch and shuffle organizations that match user's interest tags
                let allOrganizations = await organizationModel.find({ categoryTags: { $in: userTags } });
                allOrganizations = shuffleThis(allOrganizations);

                for (let org of allOrganizations) {
                        if (suggestedOrganizations.length >= 20) {
                                break; // Stop if we have gathered 20 suggested organizations
                        }
                        if (!favoritedOrgs.includes(org._id.toString())) {
                                suggestedOrganizations.push(org); // Add to suggestions if not already favorited
                        }
                }

                console.log("Returning suggested organizations:", suggestedOrganizations);
                return res.json(suggestedOrganizations);
        } catch (error) {
                console.error(error);
                res.status(500).send('An error occurred - could not retrieve organizations');
        }
});

module.exports = router;
