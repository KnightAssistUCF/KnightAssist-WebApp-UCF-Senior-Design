const express = require('express');
const router = express.Router();

const event = require('../../models/events');
const organizationSchema = require('../../models/organization');

router.post('/', async (req, res) => {
		console.log(req.body.startTime)
        var newEvent = new event({
            // eventID: "1234" + req.body.name, //will be generated in some other way
            name: req.body.name,
            description: req.body.description,
            location: req.body.location,
            // date: req.body.date, [REMOVED AFTER WE AGREED THAT DATE IS TO BE SPLIT INTO START AND END TIME ONLY]
            sponsoringOrganization: req.body.sponsoringOrganization,
            startTime: req.body.startTime,
            endTime: req.body.endTime,
            profilePicPath: req.body.profilePicPath,
            // eventLinks: req.body.eventLinks,
            eventTags: req.body.eventTags,
            semester: req.body.semester,
            maxAttendees: req.body.maxAttendees
        });
        
        await newEvent.save().then(async (user) => {
            await organizationSchema.findOne({ _id: req.body.sponsoringOrganization }).then((user) => {
                console.log(user.eventsArray)
                user.eventsArray.push(newEvent.eventID)
                console.log(user.eventsArray)
                // user.save(); leads to server crash
                res.status(200).json({message: "Successful", ID: newEvent._id});
                // console.log(user); this seems to cause a server crash as well 
            }).catch((err) => {
                res.status(400).send("Internal server error: " + err);
            });
        }).catch((err) => {
            res.status(503).send("Failed to create user: " + err);
        });
    }
);

module.exports = router;