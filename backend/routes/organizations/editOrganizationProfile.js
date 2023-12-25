const express = require('express');
const router = express.Router();
const bcryptjs = require('bcryptjs');
const { authenticateToken_Organization } = require('../../utils/jwtUtils');

const organization = require('../../models/organization');

router.get('/', async (req, res) => {
    res.status(200).send("In the editOrganizationProfile Route API");
});

router.post('/', authenticateToken_Organization, async (req, res) => {

    const query = {
        $or: [
            { _id: req.body.id },
            { email: req.body.email }
        ]
    };

    await organization.findOne(query).then((user) => {
        console.log(user); // debugging
        if (user) {
            var newHashedPassword = bcryptjs.hashSync(req.body.password, 10);
            user.name = req.body.name;
            user._id = req.body._id;
            user.email = req.body.email;
            user.password = newHashedPassword;
            user.description = req.body.description;
            user.logoUrl = req.body.logoUrl;
            user.followers = req.body.followers; // I doubt these work as of yet
            user.favorites = req.body.favorites; // I doubt these work as of yet
            user.updates = req.body.updates;
            user.calendarLink = req.body.calendarLink;
            user.contact = req.body.contact;
            user.isActive = req.body.isActive;
            user.eventHappeningNow = req.body.eventHappeningNow;
            user.backgroundURL = req.body.backgroundURL;
            user.eventsArray = req.body.eventsArray;
            user.location = req.body.location;
            user.categoryTags = req.body.categoryTags;
            /* we will add more here as is needed later once we determine what actually can 
            be editatble */
            user.save();
            res.status(200).send("User updated successfully");
            // for testing, let's see if the new components were saved
            console.log(user);
        } else {
            res.status(404).send("User not found in database");
        }
    }).catch((err) => {
        res.status(400).send("Internal server error: " + err);
    });
});

module.exports = router;