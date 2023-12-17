const express = require('express');
const router = express.Router();
const userStudent = require('../../models/userStudent');
const organization = require('../../models/organization');

router.post('/', async (req, res) => {
        const { organizationEmail, tokenEnteredByOrg } = req.body;

        try {
                const currentOrg = await organization.findOne({ email: organizationEmail });

                if (!currentOrg) {
                        return res.status(404).send('Organization not found in the database');
                }

                if (currentOrg.EmailTokenForORG === tokenEnteredByOrg) {
                        currentOrg.EmailValidated = true;
                        await currentOrg.save();
                        res.send({ success: true });
                } else {
                        console.log("the organization entered the wrong token. The token they entered was " + tokenEnteredByOrg + " and the token in the database is " + currentOrg.EmailTokenForORG);
                        res.send({ success: false });
                }
        } catch (err) {
                res.status(500).send(`Server error: ${err.message}`);
        }
});

module.exports = router;