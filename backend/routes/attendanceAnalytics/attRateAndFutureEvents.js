const express = require('express');
const router = express.Router();
const Event = require('../../models/events');

router.get('/', async (req, res) => {
    const orgId = req.query;

    if (!orgId) {
        return res.status(400).send('Organization ID is required for this endpoint.');
    } else if (typeof orgId !== 'string') {
        return res.status(400).send('Organization ID must be a string for this endpoint.');
    }

    try {

        let events = await Event.find({
            sponsoringOrganization: orgId
        });

        FutureEvents = events.filter((event) => new Date().toISOString().localeCompare(event.endTime.toISOString()) < 0);

        pastEvents = events.filter((event) => new Date().toISOString().localeCompare(event.endTime.toISOString()) >= 0);

        // get avg attendance rate of events for this org
        const attendanceRates = await Promise.all(pastEvents.map(async (event) => {
            const registeredCount = event.registeredVolunteers.length;
            const checkedInCount = event.checkedInStudents.length;
            const attendanceRate = registeredCount > 0 ? (checkedInCount / registeredCount) * 100 : 0;
            return attendanceRate;
        }));

        // overall att rate across all events for this org
        const averageAttendanceRate = attendanceRates.reduce((acc, rate) => acc + rate, 0) / (attendanceRates.length || 1);

        res.json({averageAttendanceRate: averageAttendanceRate.toFixed(2) + '%', upcomingEvents: FutureEvents});
    } catch (error) {
        console.error('Error fetching attendance rate and upcoming events:', error);
        res.status(500).send('Server error while fetching data.');
    }
});

module.exports = router;
