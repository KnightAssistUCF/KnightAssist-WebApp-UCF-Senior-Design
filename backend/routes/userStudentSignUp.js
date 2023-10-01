const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs'); // I will use this to hash the password

const userStudent = require('../models/userStudent');

/* email verfication and the jwt tokenization can be gathered here, but later */

router.post('/', async (req, res) => {
    try {
        // check if the user already exists
        const user = await userStudent.find({ email: req.body.email , firstName: req.body.firstName, lastName: req.body.lastName});
        if (user != null) {
            res.status(400).send("User already exists");
        } else {
            if (typeof req.body.password !== 'string') {
                req.body.password = String(req.body.password);
            }
            // Hash the password 
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            const newUser = new userStudent({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: hashedPassword,
                profilePicture: req.body.profilePicture
            });
            const savedUser = await newUser.save();
            res.status(200).send("User created successfully -> " + savedUser);
        }
    } catch (err) {
        res.status(500).send("Internal server error here: " + err);
    }
});

// export the router
module.exports = router;