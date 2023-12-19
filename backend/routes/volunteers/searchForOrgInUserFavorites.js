const express = require('express');
const router = express.Router();

const organization = require('../../models/organization')
const userStudent = require('../../models/userStudent');


router.get('/', async (req, res) => {
    const organizationID = req.query.organizationID;
	const userID = req.query.userID;
	
	if (!organizationID || !userID ) {
			return res.status(400).send("Missing credentials to Favorite");
	}

	await organization.findOne({ _id: organizationID }).then(async (organization) => {
		if (organization) {
			await userStudent.findOne({ _id : userID }).then((user) => {
				if (user) {
				    let userIdx = user.favoritedOrganizations.indexOf(organization._id);
				    let orgIdx = organization.favorites.indexOf(user._id);

				    if(userIdx != -1 && orgIdx != -1){
					return res.status(200).json({ status: "Org is a favorite", favoriteStatus: 0 }).send();
				    }else{
					return res.status(200).json({ status: "Org is not a favorite", favoriteStatus: 1 }).send();
				    }
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
