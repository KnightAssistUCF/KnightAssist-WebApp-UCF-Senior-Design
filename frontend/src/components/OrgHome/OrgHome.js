import { useState, useEffect } from 'react';
import AddAnnouncementModal from './AddAnnouncementModal';
import Header from '../OrgEvents/Header';
import './OrgHome.css';
import NextEventCard from './NextEvent';
import OrgTopBar from './OrgTopBar';
import Feedback from './Feedback';
import StatCards from './StatCards';
import Analytics from './Analytics';
import Card from '@mui/material/Card';
import { Button, Typography, CardContent } from '@mui/material';
import { buildPath } from '../../path';

function OrgHome() {
  const [openAnnouncement, setOpenAnnouncement] = useState(false);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [numUpcomingEvents, setNumUpcomingEvents] = useState(0);
  const [eventDataURL, setEventDataURL] = useState(null);

  function eventIsUpcoming(endTime){
    return new Date().toISOString().localeCompare(endTime) < 0;
 }

 async function fetchEventData() {
   const organizationID = sessionStorage.getItem("ID");
   try {
     let url = buildPath(`api/attendanceAnalytics?orgId=${organizationID}`);

     const response = await fetch(url, {
       method: "GET",
       headers: { "Accept": "image/png" },
     });

     if (!response.ok) {
       throw new Error('Network response was not ok');
     }

     let pic = await response.blob();

     // Create a local URL for the image
     const objectURL = URL.createObjectURL(pic);
     setEventDataURL(objectURL);
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

    return () => {
      if (eventDataURL) {
        URL.revokeObjectURL(eventDataURL);
      }
    };
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
          {eventDataURL && <img src={eventDataURL} alt="Event Data Chart" />}
          <Analytics className="analytics" />
        </div>
      </div>
    </div>
  );
}

export default OrgHome;
