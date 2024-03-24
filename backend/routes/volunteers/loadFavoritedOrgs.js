const express = require('express');
const router = express.Router();

const userStudent = require('../../models/userStudent');
const organization = require('../../models/organization');

router.get('/', async (req, res) => {
	const userID = req.query.userID;
	
	if (!userID ) {
			return res.status(400).send("Missing credential");
	}


	await userStudent.findOne({ _id : userID }).then(async (user) => {
		if (user) {
			const allOrgs = [];
			for(let orgID of user.favoritedOrganizations){

				const org = await organization.findOne({ _id: orgID });

				if (!org) {
					continue;
				}

				allOrgs.push(org);
			}
			console.log(allOrgs);
			res.status(200).json(allOrgs);
		} else {
			res.status(404).send("User not found");
		}
	}).catch((err) => {
		res.status(503).send("Internal server error: " + err);
	});	
});

module.exports = router;
