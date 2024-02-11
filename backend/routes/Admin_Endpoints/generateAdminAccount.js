const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs'); 
const { generateToken } = require('../../utils/jwtUtils');
const crypto = require('crypto');
const nodemailer = require("nodemailer");
const dotenv = require('dotenv');
const mailgen = require('mailgen');
const path = require('path');

const admin = require('../../models/admin');
const jwtSecret = process.env.JWT_SECRET_KEY;

router.post('/', async (req, res) => {
    const query = {
        $or: [
            { _id: req.body.id },
            { email: req.body.email }
        ]
    };
    await admin.findOne(query).then((user) => {
        if (user) {
            res.status(409).send('User already exists');
        } else {
            // generate a randome 8 character string
            let tempPassword = crypto.randomBytes(4).toString('hex');
            let hashedPassword = bcrypt.hashSync(tempPassword, 10);
            var newUser = new admin({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: hashedPassword,
            });
            newUser.save().then((user) => {
                res.status(200).send("Admin created - Admin Credentials Sent to Email");
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
                theme: 'default', 
                product: {
                    name: 'KnightAssist',
                    link: 'https://knightassist-43ab3aeaada9.herokuapp.com/',  
                },
            });

            let response = {
                body: {
                    name: req.body.firstName + ' ' + req.body.lastName,
                    intro: 'Welcome to KnightAssist! We\'re very excited to have you as an Admin on board.',
                    action: {

                        instructions: 'As an admin, to get started with KnightAssist, please use the following credentials to access the admin tools and privileges of our app: '
                        + 'Email: ' + req.body.email + ' Password: ' + tempPassword,
                        button: {
                            color: '#22BC66', 
                            text: 'Login and confirm your account',
                            link: 'https://knightassist-43ab3aeaada9.herokuapp.com/' 
                        }

                    },
                    outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
                }
            }

            let mail = mailGenerator.generate(response);

            let message = {
                from: process.env.EMAIL,
                to: req.body.email,
                subject: '[ADMIN] Welcome to KnightAssist!',
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