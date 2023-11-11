const express = require('express');
const router = express.Router();
const userStudent = require('../../models/userStudent');
const organizationModel = require('../../models/organization');

router.get('/', async (req, res) => {
        try {
                const userID = req.query.userID;
                const user = await userStudent.findOne({ studentID: userID }).populate('favoritedOrganizations');

                if (!user) {
                        return res.status(404).send('User not found in the database');
                }

                // store the interest tags of the user
                const userTags = user.categoryTags;

                // find orgs to be suggested for the user
                let suggestedOrganizations = await organizationModel.find({ categoryTags: { $in: userTags } });

                // remove organiaztions that the user already favorited
                const favoritedORGS = user.favoritedOrganizations.map(org => org._id.toString());
                suggestedOrganizations = suggestedOrganizations.filter(org => !favoritedORGs.includes(org._id.toString()));

                return res.json(suggestedOrganizations);
        } catch (error) {
                res.status(500).send(error);
        }
});

module.exports = router;

