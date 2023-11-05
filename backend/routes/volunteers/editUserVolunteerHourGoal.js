const express = require('express');
const router = express.Router();
const bcryptjs = require('bcryptjs');
const { authenticateToken_User } = require('../../utils/jwtUtils');

const userStudent = require('../../models/userStudent');

router.get('/', async (req, res) => {
        res.status(200).send("In the updateUserVolunteerHourGoal Route API");
        }
);

router.post('/', authenticateToken_User, async (req, res) => {

    await userStudent.findOne({ email: req.body.email }).then((user) => {
        console.log(user); 
        if (user) {
            user.semesterVolunteerHourGoal = req.body.semesterVolunteerHourGoal;
            user.save();
            res.status(200).send("User updated successfully");
            console.log(user);
        } else {
            res.status(404).send("User not found in database");
        }
    }).catch((err) => {
        res.status(400).send("Internal server error: " + err);
    });
});

module.exports = router;