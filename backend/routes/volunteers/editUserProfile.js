const express = require('express');
const router = express.Router();
const bcryptjs = require('bcryptjs');

const userStudent = require('../../models/userStudent');

router.get('/', async (req, res) => {
    res.status(200).send("In the editProfile Route API");
});

router.post('/', async (req, res) => {

    const query = {
        $or: [
            { _id: req.body.id },
            { email: req.body.email }
        ]
    };

    await userStudent.findOne(query).then((user) => {
        console.log(user); // debugging
        if (user) {
            var newHashedPassword = (req.body.password) ? bcryptjs.hashSync(req.body.password, 10) : user.password;
            user.firstName = (req.body.firstName) ? req.body.firstName : user.firstName;
            user.lastName = (req.body.lastName) ? req.body.lastName : user.lastName;
            user.email = (req.body.email) ? req.body.email : user.email;
            user.password = newHashedPassword;
            user.profilePicPath = (req.body.profilePicPath) ? req.body.profilePicPath : user.profilePicPath;
            user.totalVolunteerHours = (req.body.totalVolunteerHours) ? req.body.totalVolunteerHours : user.totalVolunteerHours;
            user.confirmToken = (req.body.confirmToken) ? req.body.confirmToken : user.confirmToken;
            user.semesterVolunteerHourGoal = (req.body.semesterVolunteerHourGoal) ? req.body.semesterVolunteerHourGoal : user.semesterVolunteerHourGoal;
            user.categoryTags = (req.body.categoryTags) ? req.body.categoryTags : user.categoryTags; 
			user.appearenceMode = (req.body.appearenceMode) ? req.body.appearenceMode : user.appearenceMode;
			
			// User has logged in by this point
			user.firstTimeLogin = false;
            /* For now this is based on what the schema has */
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