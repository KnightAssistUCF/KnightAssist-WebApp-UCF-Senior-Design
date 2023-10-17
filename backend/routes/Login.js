const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs'); 
const { generateToken } = require('../utils/jwtUtils');

const userStudent = require('../models/userStudent');
const organization = require('../models/organization');

// ******************************************************************
// [Archive]: Single user login Only
// router.post('/', async (req, res) => {
//     const loginEmail = req.body.email;
//     const loginPassword = req.body.password;

//     await userStudent.findOne({email: loginEmail}).then((user) => {
//         if (user) {
//             bcrypt.compare(loginPassword, user.password).then((result) => {
//                 if (result) {res.status(200).send("User logged in successfully -> " + user);}
//                 else {res.status(400).send("Invalid password");}
//             }).catch((err) => {res.status(400).send("Internal server error: " + err);});
//         } else {res.status(404).send("User not found - Invalid Email");}
//     }).catch((err) => {res.status(503).send("Internal server error: " + err);});
// });
// ******************************************************************

router.post('/', async (req, res) => {
    const loginEmail = req.body.email;
    const loginPassword = req.body.password;

    try {
        let user = await userStudent.findOne({ email: loginEmail });

        if (user) {
            const isPasswordValid = await bcrypt.compare(loginPassword, user.password);
            if (isPasswordValid) {
                const token = generateToken({ email: loginEmail}, process.env.JWT_SECRET_KEY);
                return res.status(200).set("authorization", token).send("User logged in successfully -> " + user);
            } else {
                return res.status(400).send("Invalid password");
            }
        } else {
            user = await organization.findOne({ email: loginEmail });

            if (user) {
                const isPasswordValid = await bcrypt.compare(loginPassword, user.password);
                if (isPasswordValid) {
                    const token = generateToken({ email: loginEmail}, process.env.JWT_SECRET_KEY);
                    return res.status(200).set("authorization", token).send("Organization logged in successfully -> " + user);
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
