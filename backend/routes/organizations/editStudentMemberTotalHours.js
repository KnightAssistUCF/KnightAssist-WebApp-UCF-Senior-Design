const express = require('express');
const router = express.Router();
const bcryptjs = require('bcryptjs');
const { authenticateToken_User } = require('../../utils/jwtUtils');

const userStudent = require('../../models/userStudent');

router.get('/', async (req, res) => {
                res.status(200).send("In the edit members total hours Route API");
        }
);

router.post('/', authenticateToken_User, async (req, res) => {

        let query = {};
        if (req.body.email) {
                query.email = req.body.email;
        } else if (req.body.studentID) {
                query._id = req.body.studentID;
        } else {
                return res.status(400).send("Search for student failed - no email or name provided");
        }


        await userStudent.findOne(query).then((user) => {
                console.log(user);
                if (user) {
                        user.totalVolunteerHours = req.body.totalVolunteerHours;
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
