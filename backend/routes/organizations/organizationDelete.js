const express = require('express');
const router = express.Router();
const { authenticateToken_Organization } = require('../../utils/jwtUtils');
const nodemailer = require("nodemailer");
const dotenv = require('dotenv');
const mailgen = require('mailgen');

const organization = require('../../models/organization');

// first we lookup the organization by their email
router.get('/', async (req, res) => {
    const query = {
        $or: [
            { _id: req.body.id },
			{name: req.body.name }
        ]
    };
    await organization.findOne(query).then((organization) => {
        if (organization) { res.status(200).send(organization); }
        else throw new Error()
    }).catch((err) => { res.status(400).send("Organization not found") });
});

// then we delete the organization by their email
router.delete('/', async (req, res) => {
    const query = {
        $or: [
            { _id: req.body.id },
            { name: req.body.name }
        ]
    };
    let organization_obj;
    await organization.findOne(query).then(async (organization) => {
        if (organization) {
			console.log(organization)
            organization_obj = organization;

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
                    link: 'https://knightassist-43ab3aeaada9.herokuapp.com/#/login', // dummy link will change later
                    // [not working yet]
                    // logo: '../utils/logo.svg', 
                    // logoWidth: '150px', 
                    // logoHeight: '50px', 
                },
            });

            let response = {
                body: {
                    name: organization_obj.name,
                    intro: 'We are very sad to see you go!',
                    action: {
                        instructions: 'The account associated with ' + organization_obj.email + ' has been deleted and all data will be removed within 5 days. If you did not request this, please contact us immediately by replying to this email.',
                        button: {
                            color: '#22BC66', //[makes the button green, can change later]
                            text: 'Login',
                            link: 'https://knightassist-43ab3aeaada9.herokuapp.com/#/login' // change this later with the correct redirect link
                        }
                    },
                    outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
                }
            }

            let mail = mailGenerator.generate(response);

            let message = {
                from: process.env.EMAIL,
                to: req.body.email,
                subject: 'Account Deletion! [KnightAssist | email: ' + organization_obj.email + ']',
                html: mail
            }

            transporterForLogin.sendMail(message, (err, info) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(info);
                }
            });

            await organization.deleteOne({ name: organization.name }).then((organization) => {
                res.status(200).send("Organization deleted successfully" + organization);
            }).catch((err) => { res.status(400).send("Internal server error: " + err); })
        }
        else throw new Error()
    }).catch((err) => {
        res.status(400).send("Organization not found");
    });
});

module.exports = router;