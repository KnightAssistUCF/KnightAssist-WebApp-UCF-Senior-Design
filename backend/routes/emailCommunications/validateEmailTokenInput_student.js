const express = require('express');
const router = express.Router();
const userStudent = require('../../models/userStudent');

router.post('/', async (req, res) => {
        const { userEmail, tokenEnteredByUser } = req.body;

        try {
                const user = await userStudent.findOne({ email: userEmail });

                if (!user) {
                        return res.status(404).send('User not found in the database');
                }

                if (user.EmailToken === tokenEnteredByUser) {
                        user.EmailValidated = true;
                        await user.save();
                        res.send({ success: true });
                } else {
                        console.log("the user entered the wrong token. The token they entered was " + tokenEnteredByUser + " and the token in the database is " + user.EmailToken);
                        res.send({ success: false });
                }
        } catch (err) {
                res.status(500).send('Server error');
        }
});

module.exports = router;