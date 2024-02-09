const express = require('express');
const router = express.Router();
const UserStudent = require('../../models/userStudent');
const Organization = require('../../models/organization');

router.get('/', async (req, res) => {

    try {
        
        const orgId = req.query.orgId;

        const organization = await Organization.findById(orgId)
        .populate({
            path: 'favorites', model: 'userStudent',
            select: 'firstName lastName eventsHistory totalVolunteerHours', 
            options: { sort: { 'totalVolunteerHours': -1 } } // follow a descending order from highest vol person to least
        });

        if (!organization) {
            return res.status(404).send('Organization not found in the database.');
        }

        const result = organization.favorites;
        res.json({data: result});

    } catch(error) {
        console.error('Internal error: ', error);
        res.status(500).send('Internal server error while making the per org leaderboard.');
    }

});

module.exports = router;
