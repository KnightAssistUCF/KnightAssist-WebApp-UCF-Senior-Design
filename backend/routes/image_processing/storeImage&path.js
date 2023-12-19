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

// setup multer storage 
const storage = multer.diskStorage({
        destination: (req, file, cb) => cb(null, path.join(__dirname, '../../images/')),
        filename: (req, file, cb) => {
                crypto.pseudoRandomBytes(16, (err, raw) => {
                        if (err) return cb(err);
                        cb(null, raw.toString('hex') + path.extname(file.originalname));
                });
        }
});

const upload = multer({ storage: storage });

// Encryption key and algorithm
const algorithm = 'aes-256-ctr';
const secretKey = process.env.secretKey_images;
// intiialization vectore here
const iv = Buffer.from(process.env.iv_images, 'hex'); // Convert hex string to bytes

/*

image processing here:

* take the uploaded file as input and store its path in the modal of the correct entity (i.e. event, organization, student)
* while getting the path, we encrypt the image and then store it in a secure folder within the database (not open sourced)

Requirements:
-the frontend needs to pass in the entity type (event, organization, student) and the id of the entity
-the frontend needs to pass in the image file and name it 'profilePic'           

*/
router.post('/', upload.single('profilePic'), async (req, res) => {
        try {
                const entityType = req.body.entityType;   
                const id = req.body.id;
                const filePath = req.file.path;

                console.log('entityType: ', entityType);
                console.log('id: ', id);
                console.log('filePath: ', filePath);

                // Encrypt the file
                await encryptFile(filePath);

                let user;
                switch (entityType) {
                        case 'event':
                                user = await Event.findOne({ _id: id });
                                break;
                        case 'organization':
                                user = await Organization.findOne({ _id: id });
                                break;
                        case 'student':
                                user = await UserStudent.findOne({ _id: id });
                                break;
                        default:
                                throw new Error('Invalid entity type');
                }
               
                if (user) {
                        user.profilePicPath = filePath;
                        await user.save();
                } else {
                        throw new Error('User not found');
                }

                console.log('user: ', user);
                res.json({ message: 'Profile picture uploaded and user updated successfully' });
        } catch (error) {
                console.error(error);
                res.status(500).send('An error occurred');
        }
});

function encryptFile(filePath) {
        const fileContent = fs.readFileSync(filePath);
        const cipher = crypto.createCipheriv(algorithm, Buffer.from(secretKey, 'hex'), iv);
        const encrypted = Buffer.concat([cipher.update(fileContent), cipher.final()]);
        fs.writeFileSync(filePath, encrypted);
}

module.exports = router;
