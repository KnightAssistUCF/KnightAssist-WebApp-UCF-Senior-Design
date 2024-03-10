const express = require('express');
const router = express.Router();

const userStudent = require('../../models/userStudent');
const eventModal = require('../../models/events');

router.get('/', async (req, res) => {
	const userID = req.query.userID;
	
        if (!userID ) {
                return res.status(400).send("Missing credential");
        }


	await userStudent.findOne({ _id : userID }).then(async (user) => {
		if (user) {
			let events = await eventModal.find({
				sponsoringOrganization: { $in: user.favoritedOrganizations},
				registeredVolunteers: { $ne: user._id }
			});
			res.status(200).json(events);
		} else {
			res.status(404).send("User not found");
		}
	}).catch((err) => {
		res.status(503).send("Internal server error: " + err);
	});	
});

module.exports = router;
