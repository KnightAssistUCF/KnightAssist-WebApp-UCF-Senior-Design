const express = require('express');
const router = express.Router();
const bcryptjs = require('bcryptjs');
const { authenticateToken } = require('../utils/jwtUtils');

const userStudent = require('../models/userStudent');

router.get('/', async (req, res) => {
    res.status(200).send("In the editProfile Route API");
});

router.post('/', authenticateToken, async (req, res) => {

    await userStudent.findOne({ email: req.body.email }).then((user) => {
        if (user) {
            var newHashedPassword = bcryptjs.hashSync(req.body.password, 10);
            user.firstName = req.body.firstName;
            user.lastName = req.body.lastName;
            user.email = req.body.email;
            user.password = newHashedPassword;
            user.profilePicture = req.body.profilePicture;
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