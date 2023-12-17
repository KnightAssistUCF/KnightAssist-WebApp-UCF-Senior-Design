const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { generateToken } = require('../../utils/jwtUtils');
const crypto = require('crypto');
const nodemailer = require("nodemailer");
const dotenv = require('dotenv');
const mailgen = require('mailgen');
const path = require('path');

const organizationSchema = require('../../models/organization');

router.post('/', async (req, res) => {
    // intake: name, description, logoURL, category, events, 
    // followers, favorites, updates, calendarLink, contact, 
    // isActive, eventHappeningNow
    await organizationSchema.findOne({ email: req.body.email }).then((organization) => {
        if (organization) {
            res.status(409).send('Organization already exists');
        } else {
            var hashedPassword = bcrypt.hashSync(req.body.password, 10);
            var newOrganization = new organizationSchema({
                // Note: some components here can be omitted for the signUP phase
                organizationID: req.body.organizationID, // this should be stored after its generated at the front end level
                name: req.body.name,
                password: hashedPassword,
                email: req.body.email,
                description: req.body.description,
                logoUrl: req.body.logoUrl,
                categoryTags: req.body.categoryTags,
                events: req.body.events,
                followers: req.body.followers,
                favorites: req.body.favorites,
                updates: req.body.updates,
                calendarLink: req.body.calendarLink,
                contact: req.body.contact,
                isActive: req.body.isActive,
                eventHappeningNow: req.body.eventHappeningNow,
                backgroundURL: req.body.backgroundURL,
                confirmTokenForORG: generateToken({ email: req.body.email}, process.env.JWT_SECRET_KEY),
                EmailTokenForORG: crypto.randomBytes(64).toString('hex').toString(),
                // rest of the components can be added later here if needed
            });
            newOrganization.save().then((organization) => {
                res.status(200).send("Organization created - please confirm new organization's email address");
            }).catch((err) => {
                res.status(503).send("Failed to create organization: " + err);
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
                    name: req.body.name,
                    intro: 'Welcome to KnightAssist! We\'re very excited to have you on board.',
                    action: {

                        instructions: 'To get started with KnightAssist, please use the following code to confirm your email in the app: ' + newOrganization.EmailTokenForORG + '',
                        button: {
                            color: '#22BC66', //[makes the button green, can change later]
                            text: 'Login and confirm your account',
                            link: 'https://nodejs.org/en/' // change this later with the correct redirect link
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
        res.status(404).send("Could not search for organization: " + err);
    });
});

module.exports = router;
