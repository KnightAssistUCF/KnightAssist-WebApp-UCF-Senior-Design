const express = require('express');
const { ChartJSNodeCanvas } = require('chartjs-node-canvas');
const Organization = require('../../models/organization');
const Event = require('../../models/events');
const router = express.Router();
const mongoose = require('mongoose');
// GRAPH Dimensions
const width = 800; 
const height = 600; 

// Mock ObjectId generator
const mockObjectId = () => Math.random().toString(16).substring(2, 14) + Math.random().toString(16).substring(2, 14);

// Mock data for testing
const mockEvents = [
    {
        _id: mockObjectId(),
        name: 'Charity Run',
        attendees: Array.from({ length: 50 }, mockObjectId),
        checkedInStudents: Array.from({ length: 30 }, mockObjectId),
        sponsoringOrganization: 'someOrgId1',
    },
    {
        _id: mockObjectId(),
        name: 'Beach Cleanup',
        attendees: Array.from({ length: 75 }, mockObjectId),
        checkedInStudents: Array.from({ length: 65 }, mockObjectId),
        sponsoringOrganization: 'someOrgId1', 
    },
    {
        _id: mockObjectId(),
        name: 'random event',
        attendees: Array.from({ length: 58 }, mockObjectId),
        checkedInStudents: Array.from({ length: 22 }, mockObjectId),
        sponsoringOrganization: 'someOrgId1',
    },
    {
        _id: mockObjectId(),
        name: 'random event 2',
        attendees: Array.from({ length: 69 }, mockObjectId),
        checkedInStudents: Array.from({ length: 53 }, mockObjectId),
        sponsoringOrganization: 'someOrgId1',
    },
    {
        _id: mockObjectId(),
        name: 'ahhh',
        attendees: Array.from({ length: 20 }, mockObjectId),
        checkedInStudents: Array.from({ length: 20 }, mockObjectId),
        sponsoringOrganization: 'someOrgId1',
    }
];

router.get('/', async (req, res) => {
    try {
        // TO USE DUMMY DATA move the code at the bottom upward
        const { orgId } = req.query;
        const organization = await Organization.findById(orgId);

        if (!organization) {
            return res.status(404).send('Organization not found in the database');
        }

        // Find all events by this org
        const events = await Event.find({ sponsoringOrganization: new mongoose.Types.ObjectId(orgId) });


        const chartData = events.map(event => {
            return {
                name: event.name,
                RSVPed: event.attendees.length,
                Attended: event.checkedInStudents.length,
                NoShow: Math.max(0, event.attendees.length - event.checkedInStudents.length)
            };
        });

        res.json(chartData);

        /* DUMMY DATA !!!!!!!!!!!!!!!!!!!!!*/
        // const orgEvents = mockEvents.filter(event => event.sponsoringOrganization === 'someOrgId1');

        // const labels = orgEvents.map(event => event.name);
        // const rsvpCountData = orgEvents.map(event => event.attendees.length);
        // const checkedInCountData = orgEvents.map(event => event.checkedInStudents.length);
        /* DUMMY DATA */

        // we get the no show data 
        //const noShowData = rsvpCountData.map((rsvp, index) => Math.max(0, rsvp - checkedInCountData[index]));

    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
