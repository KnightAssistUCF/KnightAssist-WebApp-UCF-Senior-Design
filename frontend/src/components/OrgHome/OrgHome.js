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
import CloseIcon from '@mui/icons-material/Close';
import Chart from 'chart.js/auto';
import { Button, Typography, CardContent, Dialog, DialogContent, Grid, DialogTitle, Tooltip } from '@mui/material';
import { Bar } from "react-chartjs-2";
import { buildPath } from '../../path';

function OrgHome() {
	const [openAnnouncement, setOpenAnnouncement] = useState(false);
	const [upcomingEvents, setUpcomingEvents] = useState([]);
	const [numUpcomingEvents, setNumUpcomingEvents] = useState(0);
	const [chartData, setChartData] = useState(undefined);
	const [fullChartData, setFullChartData] = useState(undefined);
	const [hoverImage, setHoverImage] = useState(false);

	const [openChartModal, setOpenChartModal] = useState(false);

	const closeChartModal = () => {setOpenChartModal(false)};

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

	async function getChartData() {
		const chartUrl = buildPath(`api/attendanceAnalytics?orgId=${sessionStorage.getItem("ID")}&limit=true`);
		try {
			const response = await fetch(chartUrl);
			const jsonData = await response.json();
			console.log(jsonData);
			setChartData(jsonData)
		} catch (error) {
			console.error('Error fetching chart data:', error);
		}
	}

  	async function openPopup(){
		const chartUrl = buildPath(`api/attendanceAnalytics?orgId=${sessionStorage.getItem("ID")}`);
		try {
			const response = await fetch(chartUrl);
			const jsonData = await response.json();
			console.log(jsonData);
			setFullChartData(jsonData);
			setOpenChartModal(true)
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
			<div className={'defaultChart' + ((hoverImage) ? " blurChart" : "")} onClick={() => openPopup()} onMouseOver={() => setHoverImage(true)} onMouseLeave={() => setHoverImage(false)}>
				{(chartData) ? 
						<Bar
							type='bar'
							data={chartData.data}
							options={
								{
									scales: {
										y: {
											beginAtZero: true,
											title: {
												display: true,
												text: 'Number of Attendees',
												font: {
													size: 20
												}
											}
										},
										x: {
											title: {
												display: true,
												text: 'Event Names',
												font: {
													size: 20
												}
											}
										}
									},
									responsive: true,
									maintainAspectRatio: false,
									plugins: {
										title: {
											display: true,
											text: 'Event Attendance Analysis',
											font: {
												size: 25
											}
										},
										subtitle: {
											display: true,
											text: (hoverImage) ? '(Click anywhere to view all past event data)' : '           '
										}
									}
								}
							}						
							/>
				: null}
			</div>
        </div>

		<Dialog maxWidth={"xl"} sx={{marginLeft: 10}} open={openChartModal} onClose={() => closeChartModal()}>
			<DialogContent className='spartan chartModal'>
				<button className='chartClose'>
					<CloseIcon onClick={() => closeChartModal()}/>
				</button>
				{(fullChartData) ? 
						<Bar
							type='bar'
							data={fullChartData.data}
							options={
								{
									scales: {
										y: {
											beginAtZero: true,
											title: {
												display: true,
												text: 'Number of Attendees',
												font: {
													size: 20
												}
											}
										},
										x: {
											title: {
												display: true,
												text: 'Event Names',
												font: {
													size: 20
												}
											}
										}
									},
									responsive: true,
									maintainAspectRatio: false,
									plugins: {
										title: {
											display: true,
											text: 'Event Attendance Analysis',
											font: {
												size: 25
											}
										}
									}
								}
							}
							className='addChartSpace'
						/> 
					: null}				
			</DialogContent>
		</Dialog>
      </div>
    </div>
  );
}

export default OrgHome;
