require('dotenv').config();
const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const mailgen = require('mailgen'); 

router.post('/', async (req, res) => {
    const { firstName, lastName, email, phone_number, messageContent } = req.body;

    if (!firstName) return res.status(400).json({ msg: 'Please enter your first name' });
    if (!lastName) return res.status(400).json({ msg: 'Please enter your last name' });
    if (!email) return res.status(400).json({ msg: 'Please enter your email' });
    if (!phone_number) return res.status(400).json({ msg: 'Please enter your phone number' });
    if (!messageContent) return res.status(400).json({ msg: 'Please enter your message' });

    const config = {
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD
        }
    };

    const transporterForLogin = nodemailer.createTransport(config);

    // response to the user or organizations that submitted the form to knightAssist dev team
    let response = {
        body: {
            name: firstName + " " + lastName,
            intro: "Thank you for contacting us! We will get back to you as soon as possible within the next 3-5 days.",
            table: {
                data: [
                    { item: "First Name", description: firstName },
                    { item: "Last Name", description: lastName },
                    { item: "Email", description: email },
                    { item: "Phone Number", description: phone_number },
                    { item: "Message", description: messageContent }
                ]
            },
            outro: "Thank you for using KnightAssist!"
        }
    };

    let mailGenerator = new mailgen({
        theme: 'default',
        product: {
            name: 'KnightAssist',
            link: 'https://mailgen.js/' // TODO update this link later
        }
    });

    let mail = mailGenerator.generate(response);

    let message = {
        from: process.env.EMAIL,
        to: email,
        subject: 'KnightAssist - Contact Form Submission Confirmation',
        html: mail
    };


    /* The submission form content that will be sent to us so we can handle it after a confirmation of receipt is sent to the user */
    try {
        await transporterForLogin.sendMail(message);
        console.log("Contact form submission confirmation sent to user");

        // Email for KnightAssist dev team itself so we can address it
        let responseToKnightAssist = {
            ...response,
            body: {
                ...response.body,
                intro: `A user has submitted a contact form - ${firstName} ${lastName}`
            }
        };
        let mailToKnightAssist = mailGenerator.generate(responseToKnightAssist);
        let messageToKnightAssist = {
            from: process.env.EMAIL,
            to: process.env.EMAIL,
            subject: `KnightAssist - Contact Form Submission - ${firstName} ${lastName}`,
            html: mailToKnightAssist
        };

        await transporterForLogin.sendMail(messageToKnightAssist);
        console.log("Contact form submission sent to KnightAssist");

        res.status(200).send("Contact form submission processed successfully");
    } catch (err) {
        console.error(err);
        res.status(500).send("Failed to send email confirmation of contact form receipt");
    }
});

module.exports = router;
