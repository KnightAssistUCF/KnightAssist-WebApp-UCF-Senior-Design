const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs'); // I will use this to hash the password
const { generateToken } = require('../../utils/jwtUtils');
const crypto = require('crypto');
const nodemailer = require("nodemailer");
const dotenv = require('dotenv');
const mailgen = require('mailgen');
const path = require('path');

const userStudent = require('../../models/userStudent');
const jwtSecret = process.env.JWT_SECRET_KEY;

/* email verfication and the jwt tokenization can be gathered here, but later */

router.post('/', async (req, res) => {
    const query = {
        $or: [
            { _id: req.body.id },
            { email: req.body.email }
        ]
    };
    await userStudent.findOne(query).then((user) => {
        if (user) {
            res.status(409).send('User already exists');
        } else {
            var hashedPassword = bcrypt.hashSync(req.body.password, 10);
            var newUser = new userStudent({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: hashedPassword,
                profilePicPath: req.body.profilePicPath,
                totalVolunteerHours: req.body.totalVolunteerHours,
                semesterVolunteerHourGoal: req.body.semesterVolunteerHourGoal,
                categoryTags: req.body.categoryTags, // stores tags marking their interests
                confirmToken: generateToken({ email: req.body.email }, jwtSecret),
                EmailToken: crypto.randomBytes(64).toString('hex').toString(),
                valid: false,
                // EmailToken: crypto.randomBytes(64).toString('hex') [not in use]
                // we can add more here as we wish for the sign up 
            });
            newUser.save().then((user) => {
                res.status(200).send("User created - please confirm new user's email address");
            }).catch((err) => {
                res.status(503).send("Failed to create user: " + err);
            });
            const config = {
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL,
                    pass: process.env.EMAIL_PASSWORD
                }
            }

            const transporterForLogin = nodemailer.createTransport(config);

            const mailGenerator = new mailgen({
                theme: 'default', // neopolitan, default, and cerberus are themes I liked
                product: {
                    name: 'KnightAssist',
                    link: 'https://mailgen.js/', // dummy link will change later
                    // [not working yet]
                    // logo: '../utils/logo.svg', 
                    // logoWidth: '150px', 
                    // logoHeight: '50px', 
                },
            });

            let response = {
                body: {
                    name: req.body.firstName + ' ' + req.body.lastName,
                    intro: 'Welcome to KnightAssist! We\'re very excited to have you on board.',
                    action: {

                        instructions: 'To get started with KnightAssist, please use the following code to confirm your email in the app: ' + newUser.EmailToken + '',
                        button: {
                            color: '#22BC66', //[makes the button green, can change later]
                            text: 'Login and confirm your account',
                            link: 'https://knightassist-43ab3aeaada9.herokuapp.com/#/studentemailverified' // change this later with the correct redirect link
                        }

                    },
                    outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
                }
            }

            let mail = mailGenerator.generate(response);

            let message = {
                from: process.env.EMAIL,
                to: req.body.email,
                subject: 'Welcome to KnightAssist!',
                html: mail
            }
            
            transporterForLogin.sendMail(message, (err, info) => {
                if (err) {
                    console.log(err);
                    return res.status(500).send("Failed to send email confirmation request");
                } else {
                    console.log(info);
                    return res.status(200).send("Email confirmation request sent");
                }
            });

        }
    }).catch((err) => {
        res.status(404).send("Could not search for user: " + err);
    });
});

module.exports = router;