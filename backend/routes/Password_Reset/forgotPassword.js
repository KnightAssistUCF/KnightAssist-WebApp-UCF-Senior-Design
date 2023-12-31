const express = require("express");
const router = express.Router();
const userStudent  = require("../../models/userStudent");
const org = require("../../models/organization");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const { reset } = require("nodemon");
const nodemailer = require("nodemailer");
const mailgen = require("mailgen");

router.post("/", async (req, res) => {
    try {
        // Input expected is email
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ error: "Please provide email so we can send a new password to the user" });
        }
        let user;
        user = await userStudent.findOne({ email });
        if (!user) {
            user = await org.findOne({ email });
            if (!user)
                return res.status(404).json({ error: "Email not found -> User or Org not registered with KnightAssist" });
        }

        
        const tempPass = crypto.randomBytes(7).toString("hex");
        if (user.role === "student") {
            await userStudent.findByIdAndUpdate(user._id, {
                $set: {
                    password: await bcrypt.hashSync(tempPass, 10),
                },
            });
        } else {
            await org.findByIdAndUpdate(user._id, {
                $set: {
                    password: await bcrypt.hashSync(tempPass, 10),
                },
            });
        }

        //********************** */
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
                link: 'https://mailgen.js/', // dummy link will change later
            },
        });

        let response;
        if (user.role === "student") {
            response = {
                body: {
                    name: user.firstName + ' ' + user.lastName,
                    intro: 'Thank you for using KnightAssist! We\'re very excited that you are still using our services!',
                    action: {

                        instructions: 'Please use the following temporary code to access your account: ' + tempPass + ' . [Important!] Please change your password after logging in.',
                        button: {
                            color: '#22BC66', 
                            text: 'Login Here',
                            link: 'https://nodejs.org/en/' // change this later with the correct redirect link
                        }

                    },
                    outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
                }
            }
        } else {
            response = {
                body: {
                    name: user.name,
                    intro: 'Thank you for using KnightAssist! We\'re very excited that you are still using our services!',
                    action: {

                        instructions: 'Please use the following temporary code to access your account: ' + tempPass + ' . [Important!] Please change your password after logging in.',
                        button: {
                            color: '#22BC66', 
                            text: 'Login Here',
                            link: 'https://nodejs.org/en/' // change this later with the correct redirect link
                        }

                    },
                    outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
                }
            }
        }

        let mail = mailGenerator.generate(response);

        let message = {
            from: process.env.EMAIL,
            to: req.body.email,
            subject: 'KnightAssist - Forgot Password!',
            html: mail
        }

        transporterForLogin.sendMail(message, (err, info) => {
            if (err) {
                console.log(err);
                return res.status(500).send("Failed to send email confirmation request");
            } else {
                console.log(info);
                return res.status(200).send("Email for forgot password request sent");
            }
        });
        
        //********************** */
        console.log("Password changed successfully - New Temp Password Sent To User Email -> " + user.email);
        return res.status(200).json({ message: "Email with temporary password sent successfully, and encrypted password stored in the DB" });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Error - Error Printed To The Console" });
    }
});

module.exports = router;