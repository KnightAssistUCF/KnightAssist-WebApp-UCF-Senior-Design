/* Create a new image in S3 and store it */

/* Everytime we upload a new file to S3 bucket that has an existing name as a file within S3, 
then the one in S3 is overwritten with the new one */

const express = require('express');
const multer = require('multer');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const router = express.Router();
require('dotenv').config();
import { S3CLIENT, PutObjectCommand } from "@aws-sdk/client-s3"; // what we use to interact with the S3 client
// declaring variables to store the S3 bucket name and the region, access ky and secret access key from the .env file
const S3_BUCKET_NAME = process.env.S3_BUCKET_NAME;
const S3_REGION = process.env.S3_REGION;
const S3_ACCESS_KEY = process.env.S3_ACCESS_KEY;
const S3_SECRET_ACCESS_KEY = process.env.S3_SECRET_ACCESS_KEY;


// importing sharp, which will allow us to store images after reshaping them to a certain size
const sharp = require('sharp');

const S3 = new S3CLIENT({
    region: S3_REGION,
    credentials: {
        accessKeyId: S3_ACCESS_KEY,
        secretAccessKey: S3_SECRET_ACCESS_KEY
    }
});

const Event = require('../../models/events');
const Organization = require('../../models/organization');
const UserStudent = require('../../models/userStudent');

const upload = multer({ storage: storage });
const storage = multer.memoryStorage();

const randomImageName = (bytes = 32) => {
    return crypto.randomBytes(16).toString('hex');
};


router.post('/', upload.single('profilePic'), async (req, res) => {

    // [IMPORTANT !!]
    // event picture: typeOfImage = 1
    // organization profilepicture: typeOfImage = 2
    // user profile picture: typeOfImage = 3
    // organization background picture: typeOfImage = 4

    const typeOfImage = req.body.typeOfImage;

    console.log('req.body: ', req.body);
    console.log('req.file: ', req.file);

    // ressize the image so that it fits withint the dimensions of a small block
    const resizedImage = await sharp(req.file.buffer)
        .resize({heigh: 200, width: 200, fit:"contain"})
        .toBuffer(); // [feel free to modify the dimensions within the .resize()]

    const imageName = randomImageName();
    const params = {
        Bucket: S3_BUCKET_NAME,
        Key: imageName, // doing this so it doesn't overwrite the existing images if they have the same name 
        Body: resizedImage,
        ContentType: req.file.mimetype,
    };

    const command = new PutObjectCommand(params);

    try {
        await S3.send(command);
        res.status(200).send('Uploaded to S3 the image names + ' + req.file.originalname);
    } catch (err) {
        console.log('Error: ', err);
        res.status(500).send('Failed to upload to S3');
    }

    if (typeOfImage === '1') {
        await Event.findByIdAndUpdate(req.body.id, { S3BucketImageDetails: imageName });
    } else if (typeOfImage === '2') {
        await Organization.findByIdAndUpdate(req.body.id, { S3BucketImageDetails_ProfilePic: imageName });
    } else if (typeOfImage === '3') {
        await UserStudent.findByIdAndUpdate(req.body.id, { S3BucketImageDetails: imageName });
    } else if (typeOfImage === '4') {
        await Organization.findByIdAndUpdate(req.body.id, { S3BucketImageDetails_Background: imageName });
    }

    console.log('Image name: ', imageName);
    console.log('Image type: ', typeOfImage);
    console.log("image stored for the entity with id: ", req.body.id);

    res.status(200).send('Image stored in S3 and the image name stored in the database');

});

module.exports = router;