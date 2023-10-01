/*
    allows finding a user by their ucf email credentials
    allows deleting a user by their ucf email credentials
*/

const express = require('express');
const router = express.Router();

const userStudent = require('../models/userStudent');

// lookUp user by email
router.get('/', async (req, res) => {
    await userStudent.findOne({email: req.body.email}).then((user) => {
        if (user) {res.status(200).send(user);} else {res.status(404).send("User not found: " + err);}
    }).catch((err) => {res.status(400).send("Internal server error: " + err);});
});

// delete user by email
router.delete('/', async (req, res) => {
    await userStudent.deleteOne({email: req.body.email}).then((user) => {
        res.status(200).send("User deleted successfully" + user);
    }).catch((err) => {res.status(400).send("Internal server error: " + err);})
});

// export the router
module.exports = router;
