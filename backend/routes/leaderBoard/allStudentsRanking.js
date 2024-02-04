const express = require('express');
const router = express.Router();
const UserStudent = require('../../models/userStudent');

router.get('/', async (req, res) => {
    try {
        const rankedStudents = await UserStudent.find({})
            .sort({ totalVolunteerHours: -1 }) // follow a descending order from highest volunteering guy to least
            .select('firstName lastName totalVolunteerHours -_id') // these are the fields we will show
            .exec();

        res.json({
            success: true,
            message: 'Students ranked by total volunteer hours',
            data: rankedStudents
        });
    } catch (error) {
        console.error('Error ranking students by total volunteering hours:', error);
        res.status(500).send('Server error while fetching and ranking students.');
    }
});

module.exports = router;
