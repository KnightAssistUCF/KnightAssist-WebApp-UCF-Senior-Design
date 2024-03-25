const express = require('express');
const router = express.Router();

const userStudent = require('../../models/userStudent');
const eventModel = require('../../models/events');

router.get('/', async (req, res) => {
    const userID = req.query.userID;
    
    if (!userID) {
        return res.status(400).send("Missing credential");
    }

    try {
        const user = await userStudent.findOne({ _id: userID });

        if (!user) {
            return res.status(404).send("User not found");
        }

        let events = await eventModel.find({
            sponsoringOrganization: { $in: user.favoritedOrganizations },
            registeredVolunteers: { $ne: user._id },
            endTime: { $gt: new Date() }  
        }).limit(20);  

        res.status(200).json(events);
    } catch (err) {
        console.error("Internal server error:", err);
        res.status(503).send("Internal server error: " + err);
    }   
});

module.exports = router;
