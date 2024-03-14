const express = require('express');
const router = express.Router();
const UserStudent = require('../../models/userStudent');
const Organization = require('../../models/organization');

router.get('/', async (req, res) => {
    try {
        const orgId = req.query.orgId;

        const organization = await Organization.findById(orgId);
        if (!organization) {
            return res.status(404).send('Organization not found in the database.');
        }

        // Fetch all students who have volunteered for the organization
        const students = await UserStudent.find({ 'hoursPerOrg': { $exists: true } }).select('firstName lastName hoursPerOrg');

        let volunteerDetails = students.map(student => {
            const totalHours = student.hoursPerOrg.get(orgId) || 0;
            return {
                student: {
                    firstName: student.firstName,
                    lastName: student.lastName
                },
                hoursVolunteered: totalHours
            };
        });

        // Sort the array based on hours volunteered in descending order
        volunteerDetails.sort((a, b) => b.hoursVolunteered - a.hoursVolunteered);

        res.json({ data: volunteerDetails });
    } catch (error) {
        console.error('Internal error: ', error);
        res.status(500).send('Internal server error while making the per org leaderboard.');
    }
});

module.exports = router;
