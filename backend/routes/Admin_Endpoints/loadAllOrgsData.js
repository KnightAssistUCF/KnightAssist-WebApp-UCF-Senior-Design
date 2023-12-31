const express = require('express');
const router = express.Router();
const org = require('../../models/organization');

router.get('/', async (req, res) => {
    try {
        const organizations = await org.find();

        res.json(organizations);
    } catch (error) {
        console.error('Error fetching for the organizations:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;