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

                if (!user || !user.profilePicPath) {
                        return res.status(404).send('No profile picture to delete or the user does not exist');
                }

                const filePath = user.profilePicPath;

                // Delete the file from the filesystem
                fs.unlink(filePath.substring(filePath.indexOf("backend")), (err) => {
                        if (err) {
                                console.error(err);
                                return res.status(500).send('Error deleting the file');
                        }

                        user.profilePicPath = "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y";
                        user.save()
                                .then(() => res.json({ message: 'Profile picture deleted successfully' }))
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