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
        date: new Date(),
        sponsoringOrganization: 'someOrgId1',
    },
    {
        _id: mockObjectId(),
        name: 'Beach Cleanup',
        attendees: Array.from({ length: 75 }, mockObjectId),
        checkedInStudents: Array.from({ length: 65 }, mockObjectId),
        date: new Date(),
        sponsoringOrganization: 'someOrgId1', 
    },
    {
        _id: mockObjectId(),
        name: 'reatrd',
        attendees: Array.from({ length: 58 }, mockObjectId),
        checkedInStudents: Array.from({ length: 22 }, mockObjectId),
        date: new Date(),
        sponsoringOrganization: 'someOrgId1',
    },
    {
        _id: mockObjectId(),
        name: 'ucf jhwl',
        attendees: Array.from({ length: 69 }, mockObjectId),
        checkedInStudents: Array.from({ length: 53 }, mockObjectId),
        date: new Date(),
        sponsoringOrganization: 'someOrgId1',
    },
    {
        _id: mockObjectId(),
        name: 'ahhh',
        attendees: Array.from({ length: 20 }, mockObjectId),
        checkedInStudents: Array.from({ length: 20 }, mockObjectId),
        date: new Date(),
        sponsoringOrganization: 'someOrgId1',
    }
];

router.get('/', async (req, res) => {
    try {
        // TO USE DUMMY DATA COMMENT THIS SECTION OUT AND UNCOMMENT THE DUMMY DATA ONE
        /* UNCOMMENT THIS TO USE ACTUAL DATABASE DATA !!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */
        const { orgId } = req.query;
        const organization = await Organization.findById(orgId);

        if (!organization) {
            return res.status(404).send('Organization not found in the database');
        }

        // Find all events by this org
        const events = await Event.find({ sponsoringOrganization: new mongoose.Types.ObjectId(orgId) });

        /*
            @labels: event names
            @rsvpCountData: RSVP count
            @checkedInCountData: checked-in count
        */
        const labels = []; 
        const rsvpCountData = []; 
        const checkedInCountData = []; 

        // go over each event that this org has and we collect the data
        for (const event of events) {
            labels.push(event.name);
            rsvpCountData.push(event.attendees.length);
            checkedInCountData.push(event.checkedInStudents.length);
        }

        /* DUMMY DATA !!!!!!!!!!!!!!!!!!!!!*/
        // const orgEvents = mockEvents.filter(event => event.sponsoringOrganization === 'someOrgId1');

        // const labels = orgEvents.map(event => event.name);
        // const rsvpCountData = orgEvents.map(event => event.attendees.length);
        // const checkedInCountData = orgEvents.map(event => event.checkedInStudents.length);
        /* DUMMY DATA */

        // we get the no show data 
        const noShowData = rsvpCountData.map((rsvp, index) => rsvp - checkedInCountData[index]);


        const chartCallback = (ChartJS) => {
            ChartJS.defaults.font.family = 'Arial';
            ChartJS.defaults.font.size = 16;
            ChartJS.defaults.color = '#666';
            ChartJS.defaults.plugins.tooltip.mode = 'index';
            ChartJS.defaults.plugins.tooltip.intersect = false;
        };

        
        const colorBlindColors = [
            'rgba(0, 158, 115, 0.5)',    // Sky Blue
            'rgba(0, 115, 179, 0.5)',    // Bluish Green
            'rgba(213, 94, 0, 0.5)',     // Vermilion
            'rgba(204, 121, 167, 0.5)'   // Orange-Pink
        ];

        const chartJSNodeCanvas = new ChartJSNodeCanvas({ width, height, chartCallback });
        const configuration = {
            type: 'bar', 
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'RSVPed',
                        backgroundColor: 'rgba(0, 158, 115, 0.5)',
                        borderColor: 'rgba(0, 158, 115, 1)',
                        barPercentage: 0.7,
                        categoryPercentage: 0.5,
                        borderWidth: 1,
                        data: rsvpCountData,
                    },
                    {
                        label: 'Attended',
                        backgroundColor: 'rgba(0, 115, 179, 0.5)',
                        borderColor: 'rgba(0, 115, 179, 1)',
                        barPercentage: 0.7,
                        categoryPercentage: 0.5,
                        borderWidth: 1,
                        data: checkedInCountData,
                    },
                    {
                        label: 'No Show',
                        backgroundColor: 'rgba(213, 94, 0, 0.5)',
                        borderColor: 'rgba(213, 94, 0, 1)',
                        barPercentage: 0.7,
                        categoryPercentage: 0.5,
                        borderWidth: 1,
                        data: noShowData,
                    },
                    {
                        label: 'No Show Trend',
                        data: noShowData,
                        type: 'line', 
                        borderColor: 'rgba(213, 94, 0, 1)',
                        backgroundColor: 'transparent',
                        fill: false,
                        tension: 0.4, 
                        borderWidth: 2,
                        pointRadius: 3,
                        pointBackgroundColor: 'rgba(213, 94, 0, 1)'
                    }
                ]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Number of Attendees'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Event Names'
                        }
                    }
                },
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'Event Attendance Analysis'
                    }
                }
            }
        };


        const imageBuffer = await chartJSNodeCanvas.renderToBuffer(configuration);

      
        res.setHeader('Content-Type', 'image/png');

        
        res.send(imageBuffer);

    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
