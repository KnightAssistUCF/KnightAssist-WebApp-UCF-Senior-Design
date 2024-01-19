import { useState, useEffect } from 'react';
import AddAnnouncementModal from './AddAnnouncementModal';
import Header from '../OrgEvents/Header';
import './OrgHome.css';
import NextEventCard from './NextEvent';
import OrgTopBar from './OrgTopBar';
import Feedback from './Feedback';
import StatCards from './StatCards';
import Analytics from './Analytics';
import { BarChart } from '@mui/x-charts';
import Card from '@mui/material/Card';
import { Button, Typography, CardContent } from '@mui/material';
import { buildPath } from '../../path';

function OrgHome() {
  const [openAnnouncement, setOpenAnnouncement] = useState(false);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [numUpcomingEvents, setNumUpcomingEvents] = useState(0);
  const [eventData, setEventData] = useState({
    labels: [],
    rsvpCountData: [],
    checkedInCountData: [],
    noShowData: [],
  });

  function eventIsUpcoming(endTime){
    return new Date().toISOString().localeCompare(endTime) < 0;
 }

 async function fetchEventData() {
  const organizationID = sessionStorage.getItem("ID");
   // Fetch event data similar to your backend logic
   let eventsUrl = buildPath(`TODO`); // [ANISHA TODO]
   try {
     let response = await fetch(eventsUrl);
     let events = await response.json();

     const labels = events.map(event => event.name);
     const rsvpCountData = events.map(event => event.attendees.length);
     const checkedInCountData = events.map(event => event.checkedInStudents.length);
     const noShowData = rsvpCountData.map((rsvp, index) => Math.max(0, rsvp - checkedInCountData[index]));

     setEventData({
       labels,
       rsvpCountData,
       checkedInCountData,
       noShowData,
     });

   } catch (error) {
     console.error("Error getting the events data:", error);
   }
  }

  async function getUpcomingEvents() {
    const organizationID = sessionStorage.getItem("ID");
  
    try {
      let eventsUrl = buildPath(`api/searchEvent?organizationID=${organizationID}`);
      let eventsResponse = await fetch(eventsUrl, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
  
      let eventsData = JSON.parse(await eventsResponse.text());
  
      const upcomingEvents = eventsData.filter((event) => eventIsUpcoming(event.endTime));
  
      console.log("Upcoming Events:", upcomingEvents);
      setUpcomingEvents(upcomingEvents);
      setNumUpcomingEvents(upcomingEvents.length);
  
    } catch (error) {
      console.error("Error fetching upcoming events:", error);
    }
  }


  useEffect(() => {
    getUpcomingEvents();
    fetchEventData();
  }, []);

  return (
    <div>
      <OrgTopBar />
      <Header />
      <div className='move'>
        <div className="orgPortalTop">
          <Card variant='contained' sx={{ marginRight: '5%' }}>
            <CardContent className='cardContent' sx={{ display: 'flex', justifyContent: 'space-between'}}>
              <Typography variant="h5">
                Welcome, Organization
              </Typography>
              <Button variant="contained" sx={{backgroundColor: '#5B4E77'}} className="addEventBtn" onClick={() => setOpenAnnouncement(true)}>
                Add Announcement
              </Button>
              <AddAnnouncementModal open={openAnnouncement} setOpen={setOpenAnnouncement} />
            </CardContent>
          </Card>
        </div>
        <div className="orgHomeTopRow">
          <div className="nextEvent">
            <NextEventCard upcomingEvents={upcomingEvents[0]} />
          </div>
          <div className="feedback">
            <Feedback />
          </div>
        </div>
        <div className="orgHomeBottomRow">
          <StatCards />
          <BarChart
            sx={{ rx: 15 }}
            series={[
              {
                name: 'RSVPed',
                type: 'bar',
                data: eventData.rsvpCountData.map(value => ({ value })),
                color: 'rgba(0, 158, 115, 0.5)',
              },
              {
                name: 'Attended',
                type: 'bar',
                data: eventData.checkedInCountData.map(value => ({ value })),
                color: 'rgba(0, 115, 179, 0.5)',
              },
              {
                name: 'No Show',
                type: 'bar',
                data: eventData.noShowData.map(value => ({ value })),
                color: 'rgba(213, 94, 0, 0.5)',
              },
              {
                name: 'No Show Trend',
                type: 'line',
                data: eventData.noShowData.map(value => ({ value })),
                color: 'rgba(213, 94, 0, 1)',
              },
            ]}
            labels={eventData.labels}
            width={1000}
            height={310}
            options={{
              scales: {
                y: {
                  beginAtZero: true,
                  title: 'Number of Attendees',
                },
                x: {
                  title: 'Event Names',
                }
              },
              responsive: true,
              maintainAspectRatio: false,
              title: {
                display: true,
                text: 'Event Attendance Analysis',
              },
              legend: {
                display: true,
                position: 'bottom',
              }
            }}
          />
        </div>
        <Analytics />
      </div>
    </div>
  );
}

export default OrgHome;
