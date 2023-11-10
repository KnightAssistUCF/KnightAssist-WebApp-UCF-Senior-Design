const express = require('express');
const router = express.Router();
const UserVolunteer = require('../../models/userStudent'); 


router.get('/', async (req, res) => {
        try {
                const userID = req.query.userID;
                const user = await UserVolunteer.findOne({ studentID: userID });

                if (!user) {
                        return res.status(404).send('User not found in the database, cannot fetch their interest tags');
                }

                
                return res.json(user.categoryTags).status(200).send('Located single user tags and returned them successfully');
        } catch (error) {
                return res.status(500).send('Internal server error: ' + error);
        }
});

module.exports = router;