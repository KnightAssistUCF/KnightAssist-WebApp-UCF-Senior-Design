const express = require('express');
const router = express.Router();

const organization = require('../../models/organization')
const userStudent = require('../../models/userStudent');


router.delete('/', async (req, res) => {
        const { organizationID, userID } = req.body;

        if (!organizationID || !userID ) {
                return res.status(400).send("Missing credentials to Favorite");
        }

	await organization.findOne({ _id: organizationID }).then(async (organization) => {
		if (organization) {
			await userStudent.findOne({ _id : userID }).then((user) => {
				if (user) {
				    let userIdx = user.favoritedOrganizations.indexOf(organization._id);
				    user.favoritedOrganizations.splice(userIdx, 1);

				    let orgIdx = organization.favorites.indexOf(user._id);
				    organization.favorites.splice(orgIdx, 1);

				    user.save();
				    organization.save();
				    console.log(user);
				    res.status(200).json("Favorite org removed");
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
