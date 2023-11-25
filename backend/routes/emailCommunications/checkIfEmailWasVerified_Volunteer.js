const express = require('express');
const router = express.Router();
const userStudent = require('../../models/userStudent');

router.get('/', async (req, res) => {
        try {
                const userToFetch = req.query.email;
                
                const user = await userStudent.findOne({ email: userToFetch });

                if (user) {
                        console.log("accessed the email validated status for user " + userToFetch+ " and the status is " + user.EmailValidated);
                        res.json({ emailVerifiedStatus: user.EmailValidated}); // returns either true or false
                } else {
                        res.status(404).send('User not found in the database');
                }
        } catch (err) {
                res.status(500).send(err);
        }
});

module.exports = router;