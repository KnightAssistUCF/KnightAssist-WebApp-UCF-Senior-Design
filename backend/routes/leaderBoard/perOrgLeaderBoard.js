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
        const students = await UserStudent.find({ 'hoursPerOrg': { $exists: true } })
            .select('firstName lastName hoursPerOrg totalVolunteerHours');

        let volunteerDetails = students.filter(student => student.hoursPerOrg.get(orgId))
            .map(student => {
                return {
                    _id: student._id,
                    firstName: student.firstName,
                    lastName: student.lastName,
                    totalVolunteerHours: student.hoursPerOrg.get(orgId),
                };
            });

        // Sort the array based on hours volunteered in descending order
        volunteerDetails.sort((a, b) => b.totalVolunteerHours - a.totalVolunteerHours);

        res.json({
            success: true,
            message: 'Students ranked by total volunteer hours for the organization',
            data: volunteerDetails
        });
    } catch (error) {
        console.error('Internal error: ', error);
        res.status(500).send('Internal server error while making the per org leaderboard.');
    }
});

module.exports = router;
