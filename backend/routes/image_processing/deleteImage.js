const express = require('express');
const multer = require('multer');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const router = express.Router();
require('dotenv').config();

const Event = require('../../models/events');
const Organization = require('../../models/organization');
const UserStudent = require('../../models/userStudent');


router.delete('/', async (req, res) => {
        try {
                const entityType = req.body.entityType;
                const id = req.body.id;


                const profilePicOrBackGround = req.body.profilePicOrBackGround; // always 0 for profile pic and 1 for background (background only for org)


                let user;
                switch (entityType) {
                        case 'event':
                                user = await Event.findById(id);
                                break;
                        case 'organization':
                                user = await Organization.findById(id);
                                break;
                        case 'student':
                                user = await UserStudent.findById(id);
                                break;
                        default:
                                return res.status(400).send('Invalid entity type');
                }

                if (!user
                || (entityType !== 'organization' && !user.profilePicPath)
                || (entityType === 'organization' && !user && (!user.profilePicPath || !user.backgroundPicPath))) {
                        return res.status(404).send('No picture to delete or the user does not exist');
                }

                let filePath;
                if (entityType !== 'organization') {
                        filePath = user.profilePicPath;
                } else if (entityType === 'organization' && profilePicOrBackGround === '0') {
                        filePath = user.profilePicPath;
                } else if (entityType === 'organization' && profilePicOrBackGround === '1') {
                        filePath = user.backgroundURL;
                } else {
                        return res.status(400).send('Invalid profilePicOrBackGround');
                }

                // Delete the file from the filesystem
                fs.unlink(filePath.substring(filePath.indexOf("backend")), (err) => {
                        if (err) {
                                console.error(err);
                                return res.status(500).send('Error deleting the file');
                        }

                        if (entityType !== 'organization')
                                user.profilePicPath = 'backend/images/defaultProfilePic.png';
                        else if (entityType === 'organization' && profilePicOrBackGround === '0')
                                user.profilePicPath = 'backend/images/defaultProfilePic.png';
                        else if (entityType === 'organization' && profilePicOrBackGround === '1')
                                user.backgroundURL = 'backend/images/orgdefaultbackground.png';
                        user.save()
                                .then(() => res.json({ message: 'Picture deleted successfully' }))
                                .catch((error) => {
                                        console.error(error);
                                        res.status(500).send('Error updating the entity');
                                });
                });

        } catch (error) {
                console.error(error);
                res.status(500).send('An error occurred');
        }
});

module.exports = router;