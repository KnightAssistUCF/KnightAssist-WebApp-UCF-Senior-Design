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
            var newHashedPassword = (req.body.password) ? bcryptjs.hashSync(req.body.password, 10) : user.password;
            user.name = (req.body.name) ? req.body.name : user.name;
            user.email = (req.body.email) ? req.body.email : user.email;
            user.password = newHashedPassword;
            user.description = (req.body.description) ? req.body.description : user.description;
            user.logoUrl = (req.body.logoUrl) ? req.body.logoUrl : user.logoUrl;
            user.followers = (req.body.followers) ? req.body.followers : user.followers; 
            user.favorites = (req.body.favorites) ? req.body.favorites : user.favorites; 
            user.updates = (req.body.updates) ? req.body.updates : user.updates;
            user.calendarLink = (req.body.calendarLink) ? req.body.calendarLink : user.calendarLink;
            user.contact = (req.body.contact) ? req.body.contact : user.contact;
            user.isActive = (req.body.isActive) ? req.body.isActive : user.isActive;
            user.eventHappeningNow = (req.body.eventHappeningNow) ? req.body.eventHappeningNow : user.eventHappeningNow;
            user.backgroundURL = (req.body.backgroundURL) ? req.body.backgroundURL : user.backgroundURL;
            user.eventsArray = (req.body.eventsArray) ? req.body.eventsArray : user.eventsArray;
            user.location = (req.body.location) ? req.body.location : user.location;
            user.categoryTags = (req.body.categoryTags) ? req.body.categoryTags : user.categoryTags;
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