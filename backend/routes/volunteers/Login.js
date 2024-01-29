const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs'); 
const { generateToken } = require('../../utils/jwtUtils');
const { authenticateToken_User, authenticateToken_Organization } = require('../../utils/jwtUtils');
const nodemailer = require("nodemailer");
const dotenv = require('dotenv');
const mailgen = require('mailgen');

const userStudent = require('../../models/userStudent');
const organization = require('../../models/organization');
const admin = require('../../models/admin');

const sendEmail = (role, user) => {

    if (user.receiveEmails === false)
        return;

    const config = {
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD
        }
    };

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

    let name = '';
    if (role === 'admin')
     name = user.firstName + ' ' + user.lastName;
    else if (role === 'student') name = user.firstName + ' ' + user.lastName;
    else name = user.name;

    let response = {
        body: {
            name: 'Welcome' + name + '!',
            intro: 'Successful login to KnightAssist! We\'re very excited to have you on board today!',
            action: {

                instructions: 'A login has been made to your account at ' + new Date().toLocaleString() + '. If this was not you, please reply to this email and we will open a security ticket.',
                button: {
                    color: '#22BC66', //[makes the button green, can change later]
                    text: 'Login',
                    link: 'https://knightassist-43ab3aeaada9.herokuapp.com/#/organizationemailverified' // change this later with the correct redirect link
                }

            },
            outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
        }
    }

    let mail = mailGenerator.generate(response);

    let message = {
        from: process.env.EMAIL,
        to: user.email,
        subject: 'Successful Login to KnightAssist!',
        html: mail
    }

    transporterForLogin.sendMail(message, (err, info) => {
        if (err) {
            console.log(err);
            return res.status(500).send("Failed to send login email checkpoint");
        } else {
            console.log(info);
            return res.status(200).send("Email for login checkpoint request sent");
        }
    });
}

router.post('/', async (req, res) => {
    const loginEmail = req.body.email;
    const loginPassword = req.body.password;

    try {
        /* [ADMIN] Only */
        let adminUser = await admin.findOne({ email: loginEmail });

        if (adminUser) {
            const isPasswordValid = await bcrypt.compare(loginPassword, adminUser.password);
            if (isPasswordValid) {
                sendEmail('admin', adminUser);
                const token = generateToken({ email: loginEmail}, process.env.JWT_SECRET_KEY);
                return res.status(200).set("authorization", token).send({adminUser, "token": token}); 
            } else {
                return res.status(400).send("Invalid password");
            }
        }
        /* [ADMIN] Only */
        
        let user = await userStudent.findOne({ email: loginEmail });

        if (user) {
            const isPasswordValid = await bcrypt.compare(loginPassword, user.password);
            if (isPasswordValid) {
                sendEmail('student', user);
                const token = generateToken({ email: loginEmail}, process.env.JWT_SECRET_KEY);
                res.status(200).set("authorization", token).send({user, "token": token}); 
            } else {
                return res.status(400).send("Invalid password");
            }
        } else {
            user = await organization.findOne({ email: loginEmail });

            if (user) {
                const isPasswordValid = await bcrypt.compare(loginPassword, user.password);
                if (isPasswordValid) {
                    sendEmail('organization', user);
                    const token = generateToken({ email: loginEmail}, process.env.JWT_SECRET_KEY);
					res.status(200).set("authorization", token).send({user, "token": token}); 
                } else {
                    return res.status(400).send("Invalid password");
                }
            } else {
                return res.status(404).send("Not Found In Either User nor Organization - Invalid Credentials");
            }
        }

    } catch (err) {
        return res.status(503).send("Internal server error: " + err);
    }
});

module.exports = router;
