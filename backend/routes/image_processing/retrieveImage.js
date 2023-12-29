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

// Encryption key and algorithm
const algorithm = 'aes-256-ctr';
const secretKey = process.env.secretKey_images;
const iv = Buffer.from(process.env.iv_images, 'hex'); // Convert hex string to bytes

router.get('/', async (req, res) => {
        try {
                const id = req.query.id;
                const entityType = req.query.entityType;

                const profilePicOrBackGround = req.query.profilePicOrBackGround; // always 0 for profile pic and 1 for background (background only for org)

				console.log('entityType: ', entityType);
                console.log('id: ', id);

                let user;
				let defaultPath_Background;
                let defaultPath_ProfilePic;

                switch (entityType) {
                        case 'event':
                                user = await Event.findById(id);
                                break;
                        case 'organization':
                                user = await Organization.findById(id);
								defaultPath_Background = 'backend/images/orgdefaultbackground.png'
                                defaultPath_ProfilePic = 'backend/images/defaultProfilePic.png'
                                break;
                        case 'student':
                                user = await UserStudent.findById(id);
                                break;
                        default:
                                throw new Error('Invalid entity type');
                }
                
                if (!user 
                || (entityType !== 'organization' && !user.profilePicPath)
                || (entityType === 'organization' && !user && (!user.profilePicPath || !user.backgroundPicPath))) {
                        return res.status(404).send('Image not found or entity does not exist');
                }

                console.log(user);

                if (entityType === 'organization' && profilePicOrBackGround === '0') {
                        user.profilePicPath = user.profilePicPath.substring(user.profilePicPath.lastIndexOf('backend'));
                        console.log(user.profilePicPath);
                        filePath = path.normalize(user.profilePicPath);
                } else if (entityType === 'organization' && profilePicOrBackGround === '1') {
                        user.backgroundURL = user.backgroundURL.substring(user.backgroundURL.lastIndexOf('backend'));
                        console.log(user.backgroundURL);
                        filePath = path.normalize(user.backgroundURL);
                } else {
                        user.profilePicPath = user.profilePicPath.substring(user.profilePicPath.lastIndexOf('backend'));
                        console.log(user.profilePicPath);
                        filePath = path.normalize(user.profilePicPath);
                }

                
                console.log(filePath);

                // converts the path to be a neutral format 
               /* const normalizedPath = user.profilePicPath.replace(/\\/g, '/');
                const baseDir = path.join(__dirname, '..', '..', 'backend');
                const filePath = path.join(baseDir, normalizedPath);*/

                if(entityType === 'organization' && profilePicOrBackGround === '1' && user.backgroundURL === defaultPath_Background){
                        res.send(fs.readFileSync(filePath));
                } else if (entityType === 'organization' && profilePicOrBackGround === '0' && user.profilePicPath === defaultPath_ProfilePic){
                        res.send(fs.readFileSync(filePath));
                } else if (entityType !== 'organization' && user.profilePicPath === defaultPath_ProfilePic){
                        res.send(fs.readFileSync(filePath));
                } else{
                        // Decrypt the file
                        const decryptedImage = decryptFile(filePath);

                        // update the response header with the content type
                        if (path.extname(filePath) === '.png') {
                                        res.setHeader('Content-Type', 'image/png');
                        } else if (path.extname(filePath) === '.jpg') {
                                        res.setHeader('Content-Type', 'image/jpeg');
                        } else {
                                        throw new Error('Invalid file type');
                        }

                        // Send the response with the decrypted image
                        res.send(decryptedImage);
                }

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
