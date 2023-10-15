const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs'); // I will use this to hash the password
const { generateToken } = require('../utils/jwtUtils');

const userStudent = require('../models/userStudent');

/* email verfication and the jwt tokenization can be gathered here, but later */

router.post('/', async (req, res) => {
    await userStudent.findOne({ email: req.body.email }).then((user) => {
        if (user) {
            res.status(409).send('User already exists');
        } else {
            var hashedPassword = bcrypt.hashSync(req.body.password, 10);
            var newUser = new userStudent({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: hashedPassword,
                profilePicture: req.body.profilePicture 
            });
            newUser.save().then((user) => {
                res.status(200).send("User created - please confirm new user's email address");
            }).catch((err) => {
                res.status(503).send("Failed to create user: " + err);
            });
        }
    }).catch((err) => {
        res.status(404).send("Could not search for user: " + err);
    });
});

module.exports = router;