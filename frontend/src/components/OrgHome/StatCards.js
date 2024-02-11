import {useState, useEffect} from 'react';
import Card from '@mui/material/Card';
import './OrgHome.css';
import { buildPath } from '../../path';

function StatCards() {

    
  const [numUpcomingEvents, setNumUpcomingEvents] = useState(0);
  const [attendanceRate, setAttendanceRate] = useState(0);

	function eventIsUpcoming(endTime){
		return new Date().toISOString().localeCompare(endTime) < 0;
	}

	async function getAttendanceRate(){
		const organizationID = sessionStorage.getItem("ID");

		try {
			let url = buildPath(`api/attRateAndFutureEvents?orgId=${organizationID}`);
			let response = await fetch(url, {
				method: "GET",
				headers: { "Content-Type": "application/json" },
			});
		
			let res = JSON.parse(await response.text());
		
			setAttendanceRate(res.averageAttendanceRate);
		
		} catch (error) {
			console.error("Error fetching upcoming events:", error);
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
			setNumUpcomingEvents(upcomingEvents.length);
	
		} catch (error) {
			console.error("Error fetching upcoming events:", error);
		}
	}


	useEffect(() => {
		getAttendanceRate();
		getUpcomingEvents();
	}, []);

	return (
		<div className='moveCards'>
			<div className='statCards'>
				<Card variant='contained' sx={{ borderRadius: '14px', maxWidth: 255,  display: 'flex', marginBottom: '0',marginTop: '10px', paddingLeft: '6px', minHeight: 120, textAlign: 'left',  background: 'linear-gradient( 109.6deg,  #65B891 11.2%, #65B891 91.1% )', color: 'white' }}>
					<div className="stat">
						{numUpcomingEvents}
					</div>
					{numUpcomingEvents > 1 ? (
					<div className="statTitle">
						Upcoming Events
					</div>
					) : (
					<div className="statTitle">
						Upcoming Event
					</div>
					)}
				</Card>
				<Card variant='contained' sx={{ borderRadius: '14px', maxWidth: 255,  display: 'flex', marginTop: '10px', paddingLeft: '6px', minHeight: 120, textAlign: 'left',  background: 'linear-gradient( 109.6deg,  #65B891 11.2%, #65B891 91.1% )', color: 'white' }}>
					<div className="stat">
						{attendanceRate}
					</div>
					<div className="statTitle">
						Attendance Rate
					</div>
				</Card>
			</div>
		</div>
	);
}

export default StatCards;