
const express = require('express');
const router = express.Router();
const Organization = require('../../models/organization');
const Event = require('../../models/events');

router.get('/', async (req, res) => {
        try {
                const organization = await Organization.findOne({ organizationID: req.params.organizationID })
                        .populate('eventsArray')
                        .exec();

                if (!organization) {
                        return res.status(404).send({ message: 'Organization not found' });
                }

                // If organization is found but there are no events
                if (organization.eventsArray.length === 0) {
                        return res.status(200).send({ message: 'No events found for this organization' });
                }

                
                return res.status(200).json(organization.eventsArray);

        } catch (error) {
                console.error(error);
                res.status(500).send({ message: 'Internal Server Error' });
        }
});

module.exports = router;
