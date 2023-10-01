const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs'); 

const userStudent = require('../models/userStudent');

router.post('/', async (req, res) => {
    const loginEmail = req.body.email;
    const loginPassword = req.body.password;

    await userStudent.findOne({email: loginEmail}).then((user) => {
        if (user) {
            bcrypt.compare(loginPassword, user.password).then((result) => {
                if (result) {res.status(200).send("User logged in successfully -> " + user);}
                else {res.status(400).send("Invalid password");}
            }).catch((err) => {res.status(400).send("Internal server error: " + err);});
        } else {res.status(404).send("User not found - Invalid Email");}
    }).catch((err) => {res.status(503).send("Internal server error: " + err);});
});

// export the router
module.exports = router;
