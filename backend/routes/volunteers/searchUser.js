const express = require('express');
const router = express.Router();

const userStudent = require('../../models/userStudent');

router.get('/', async (req, res) => {
    const searchEmail = req.query.email;

    await userStudent.findOne({ email: searchEmail }).then((user) => {
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).send("User not found");
        }
    }).catch((err) => {
        res.status(503).send("Internal server error: " + err);
    });
});

module.exports = router;