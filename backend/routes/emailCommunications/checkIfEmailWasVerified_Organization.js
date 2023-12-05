const express = require('express');
const router = express.Router();
const userStudent = require('../../models/userStudent');
const organization = require('../../models/organization');

router.get('/', async (req, res) => {
        try {
                const organizationToFetch = req.query.email;

                const user = await organization.findOne({ email: organizationToFetch });

                if (user) {
                        console.log("accessed the email validated status for user " + organizationToFetch + " and the status is " + organizationToFetch.EmailValidated);
                        res.json({ emailVerifiedStatus: user.EmailValidated }); // returns either true or false
                } else {
                        res.status(404).send('organization not found in the database');
                }
        } catch (err) {
                res.status(500).send(err);
        }
});

module.exports = router;