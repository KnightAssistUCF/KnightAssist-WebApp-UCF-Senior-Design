const express = require('express');
const router = express.Router();
const UserStudent = require('../../models/userStudent');

router.get('/', async (req, res) => {
    try {
        const userStudents = await UserStudent.find();

        res.json(userStudents);
    } catch (error) {
        console.error('Error fetching for the user students:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;