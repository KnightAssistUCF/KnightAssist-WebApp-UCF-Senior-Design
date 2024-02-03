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
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label } from 'recharts';

function OrgHome() {
  const [openAnnouncement, setOpenAnnouncement] = useState(false);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [numUpcomingEvents, setNumUpcomingEvents] = useState(0);
  const [chartData, setChartData] = useState(undefined);
  const [hoverImage, setHoverImage] = useState(false);

  function eventIsUpcoming(endTime){
    return new Date().toISOString().localeCompare(endTime) < 0;
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

  async function openPopup(){

  }

  async function getChartData() {
    const chartUrl = buildPath(`api/attendanceAnalytics?orgId=${sessionStorage.getItem("ID")}&numEvents=5`);
    try {
      const response = await fetch(chartUrl);
      const jsonData = await response.blob();
	  console.log(jsonData);
      setChartData(jsonData);
    } catch (error) {
      console.error('Error fetching chart data:', error);
    }
  }
  useEffect(() => {
    getUpcomingEvents();
    getChartData();
  }, []);

  return (
    <div className='spartan'>
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
			{(chartData) ? 
				<div className='txtOverImg'>
					<img className='chartImage' src={URL.createObjectURL(chartData)} onClick={() => openPopup()} onMouseOver={() => setHoverImage(true)} onMouseLeave={() => setHoverImage(false)}></img>
					{(hoverImage) ? <div className='centerImgTxt' onMouseOver={() => setHoverImage(true)}>View All Event Data</div> : null}
				</div> 
			: null}
        </div>
      </div>
    </div>
  );
}

export default OrgHome;
