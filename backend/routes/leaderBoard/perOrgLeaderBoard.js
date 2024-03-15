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

        const students = await UserStudent.find({ 'hoursPerOrg': { $exists: true } })
            .select('firstName lastName hoursPerOrg eventsHistory totalVolunteerHours');

        let volunteerDetails = students.filter(student => student.hoursPerOrg.has(orgId))
            .map(student => {
                let orgData = student.hoursPerOrg.get(orgId) || { hours: 0, numEvents: 0 };
                return {
                    _id: student._id,
                    firstName: student.firstName,
                    lastName: student.lastName,
                    eventsHistory: student.eventsHistory,
                    totalVolunteerHours: orgData.hours,
                    numEvents: orgData.numEvents
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
