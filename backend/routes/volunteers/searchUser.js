const express = require('express');
const router = express.Router();

const userStudent = require('../../models/userStudent');
const { authenticateToken_User } = require('../../utils/jwtUtils');

router.get('/',async (req, res) => {
    const userID = req.query.userID;
    const searchEmail = req.query.email;

    const query = {
        $or: [
                { _id: userID },
                { email: searchEmail }
        ]
    };

    await userStudent.findOne(query).then((user) => {
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