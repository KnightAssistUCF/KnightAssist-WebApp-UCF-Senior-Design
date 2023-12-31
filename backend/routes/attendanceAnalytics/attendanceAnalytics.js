const express = require('express');
const { ChartJSNodeCanvas } = require('chartjs-node-canvas');
const Organization = require('../../models/organization');
const Event = require('../../models/events');
const router = express.Router();
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
        registeredVolunteers: Array.from({ length: 50 }, mockObjectId),
        checkedInStudents: Array.from({ length: 30 }, mockObjectId),
        date: new Date(),
        sponsoringOrganization: 'someOrgId1',
    },
    {
        _id: mockObjectId(),
        name: 'Beach Cleanup',
        registeredVolunteers: Array.from({ length: 75 }, mockObjectId),
        checkedInStudents: Array.from({ length: 65 }, mockObjectId),
        date: new Date(),
        sponsoringOrganization: 'someOrgId1', 
    },
    {
        _id: mockObjectId(),
        name: 'reatrd',
        registeredVolunteers: Array.from({ length: 58 }, mockObjectId),
        checkedInStudents: Array.from({ length: 22 }, mockObjectId),
        date: new Date(),
        sponsoringOrganization: 'someOrgId1',
    },
    {
        _id: mockObjectId(),
        name: 'ucf jhwl',
        registeredVolunteers: Array.from({ length: 69 }, mockObjectId),
        checkedInStudents: Array.from({ length: 53 }, mockObjectId),
        date: new Date(),
        sponsoringOrganization: 'someOrgId1',
    },
    {
        _id: mockObjectId(),
        name: 'ahhh',
        registeredVolunteers: Array.from({ length: 20 }, mockObjectId),
        checkedInStudents: Array.from({ length: 20 }, mockObjectId),
        date: new Date(),
        sponsoringOrganization: 'someOrgId1',
    }
];

router.get('/', async (req, res) => {
    try {
        /* UNCOMMENT THIS TO USE ACTUAL DATABASE DATA !!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */
        // const { orgId } = req.params;
        // const organization = await Organization.findById(orgId);

        // if (!organization) {
        //     return res.status(404).send('Organization not found in the database');
        // }

        // // Find all events by this org
        // const events = await Event.find({ sponsoringOrganization: mongoose.Types.ObjectId(orgId) });

        // /*
        //     @labels: event names
        //     @rsvpCountData: RSVP count
        //     @checkedInCountData: checked-in count
        // */
        // const labels = []; 
        // const rsvpCountData = []; 
        // const checkedInCountData = []; 

        // // go over each event that this org has and we collect the data
        // for (const event of events) {
        //     labels.push(event.name);
        //     rsvpCountData.push(event.registeredVolunteers.length);
        //     checkedInCountData.push(event.checkedInStudents.length);
        // }

        /* DUMMY DATA !!!!!!!!!!!!!!!!!!!!!*/
        const orgEvents = mockEvents.filter(event => event.sponsoringOrganization === 'someOrgId1');

        const labels = orgEvents.map(event => event.name);
        const rsvpCountData = orgEvents.map(event => event.registeredVolunteers.length);
        const checkedInCountData = orgEvents.map(event => event.checkedInStudents.length);
        /* DUMMY DATA */

        // overall configuration for the chart
        const chartCallback = (ChartJS) => {
            ChartJS.defaults.font.family = 'Arial';
            ChartJS.defaults.font.size = 16;
            ChartJS.defaults.color = '#666';
            ChartJS.defaults.plugins.tooltip.mode = 'index';
            ChartJS.defaults.plugins.tooltip.intersect = false;
        };

        // create an array of adequate 4 color blind colors
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
                datasets: [{
                    label: 'RSVPed',
                    backgroundColor: colorBlindColors[0],
                    borderColor: colorBlindColors[0],
                    borderWidth: 1,
                    data: rsvpCountData,
                }, {
                    label: 'Attended',
                    backgroundColor: colorBlindColors[1],
                    borderColor: colorBlindColors[1],
                    borderWidth: 1,
                    data: checkedInCountData,
                },
                {
                    label: 'No Show',
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    borderColor: 'rgba(255, 99, 132, 0.5)',
                    borderWidth: 1,
                    data: rsvpCountData.map((rsvp, index) => rsvp - checkedInCountData[index]),
                }
            ], 
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    },
                    x: {
                        // none for now
                    }
                },
                responsive: true,
                maintainAspectRatio: true,
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
