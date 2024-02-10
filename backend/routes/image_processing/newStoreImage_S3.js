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

    console.log('req.body: ', req.body);
    console.log('req.file: ', req.file);

    const params = {
        Bucket: S3_BUCKET_NAME,
        Key: randomImageName(), // doing this so it doesn't overwrite the existing images if they have the same name 
        Body: req.file.buffer,
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

    res.send({});

});

module.exports = router;