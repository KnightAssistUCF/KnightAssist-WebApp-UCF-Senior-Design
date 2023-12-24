const express = require('express');
const router = express.Router();

const organization = require('../../models/organization')
const userStudent = require('../../models/userStudent');


router.post('/', async (req, res) => {
        const { organizationID, userID } = req.body;

        if (!organizationID || !userID ) {
                return res.status(400).send("Missing credentials to Favorite");
        }

	await organization.findOne({ _id: organizationID }).then(async (organization) => {
		if (organization) {
			await userStudent.findOne({ _id : userID }).then(async (user) => {
				if (user) {
				    user.favoritedOrganizations.push(organization._id);
				    organization.favorites.push(user._id);
				    await user.save();
				    await organization.save();
				    console.log(user);
				    res.status(200).json("Favorite org added");
				} else {
				    res.status(404).send("User not found");
				}
			    }).catch((err) => {
				res.status(503).send("Internal server error: " + err);
			    });	
		} else {
		    res.status(404).send("Organization not found");
		}
	}).catch((err) => {
		res.status(503).send("Internal server error: " + err);
	});
});

module.exports = router;
