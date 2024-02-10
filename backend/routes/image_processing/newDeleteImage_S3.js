/* retieve a new image in S3 and store it */

/* Everytime we upload a new file to S3 bucket that has an existing name as a file within S3, 
then the one in S3 is overwritten with the new one */

const express = require('express');
const multer = require('multer');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const router = express.Router();
require('dotenv').config();
import { S3CLIENT, GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3"; // what we use to interact with the S3 client
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

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// specific presigned imorts and global declarations
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

router.delete('/', async (req, res) => {

    // event picture: typeOfImage = 1
    // organization profilepicture: typeOfImage = 2
    // user profile picture: typeOfImage = 3
    // organization background picture: typeOfImage = 4

});

module.exports = router;