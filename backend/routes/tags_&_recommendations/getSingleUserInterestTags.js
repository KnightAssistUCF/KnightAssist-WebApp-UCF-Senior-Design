const express = require('express');
const router = express.Router();
const UserVolunteer = require('../../models/userStudent'); 

/* locates a user within the database and then return their interest tags */
router.get('/', async (req, res) => {
        try {
                const userID = req.query.userID;
                const user = await UserVolunteer.findOne({ studentID: userID });

                if (!user) {
                        return res.status(404).send('User not found in the database, cannot fetch their interest tags');
                }

                
                return res.json(user.categoryTags);
        } catch (error) {
                return res.status(500).send('Internal server error: ' + error);
        }
});

module.exports = router;