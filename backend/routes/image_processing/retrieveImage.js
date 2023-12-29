const express = require('express');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const router = express.Router();
require('dotenv').config();

const Event = require('../../models/events');
const Organization = require('../../models/organization');
const UserStudent = require('../../models/userStudent');

// Encryption key and algorithm
const algorithm = 'aes-256-ctr';
const secretKey = process.env.secretKey_images;
const iv = Buffer.from(process.env.iv_images, 'hex'); // Convert hex string to bytes

router.get('/', async (req, res) => {
        try {
                const id = req.query.id;
                const entityType = req.query.entityType;
                const profilePicOrBackGround = req.query.profilePicOrBackGround;

                console.log('entityType: ', entityType);
                console.log('id: ', id);

                let user;
                let defaultPath_Background = 'images/orgdefaultbackground.png';
                let defaultPath_ProfilePic = 'images/defaultProfilePic.png';

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

                if (!user) {
                        return res.status(404).send('Entity not found');
                }

                let imagePath;
                if (entityType === 'organization') {
                        imagePath = (profilePicOrBackGround === '0') ? user.profilePicPath : user.backgroundPicPath;
                        imagePath = imagePath || ((profilePicOrBackGround === '0') ? defaultPath_ProfilePic : defaultPath_Background);
                } else {
                        imagePath = user.profilePicPath || defaultPath_ProfilePic;
                }

                imagePath = imagePath.replace(/\\/g, '/'); // Normalize
                const filePath = path.join(__dirname, '..', '..', imagePath);

                console.log('File Path:', filePath);

                if (!fs.existsSync(filePath)) {
                        return res.status(404).send('Image file not found');
                }

                let image;
                if (filePath === path.join(__dirname, '..', '..', defaultPath_Background) ||
                        filePath === path.join(__dirname, '..', '..', defaultPath_ProfilePic)) {
                        image = fs.readFileSync(filePath);
                } else {
                        image = decryptFile(filePath);
                }

                res.setHeader('Content-Type', 'image/' + path.extname(filePath).slice(1));
                res.send(image);

        } catch (error) {
                console.error(error);
                res.status(500).send('An error occurred');
        }
});

function decryptFile(filePath) {
        const encryptedImage = fs.readFileSync(filePath);
        const decipher = crypto.createDecipheriv(algorithm, Buffer.from(secretKey, 'hex'), iv);
        const decrypted = Buffer.concat([decipher.update(encryptedImage), decipher.final()]);
        return decrypted;
}

module.exports = router;
