const express = require('express');
const router = express.Router();
const { generateToken, authenticateToken_User, authenticateToken_Organization } = require('../utils/jwtUtils'); 

router.post('/', authenticateToken_User, authenticateToken_Organization, async (req, res) => {
    try {
        let newToken;

        if (req.user) {
            const payload = { email: req.user.email };
            newToken = generateToken(payload, process.env.JWT_SECRET_KEY);
        } else if (req.organization) {
            const payload = { email: req.organization.email };
            newToken = generateToken(payload, process.env.JWT_SECRET_KEY);
        } else {
            return res.status(403).send('No user or organization found in request.');
        }

        res.json({ token: newToken });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
