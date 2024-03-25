import { useState, useEffect } from 'react';
import './OrgProfile.css';
import { Scheduler } from "@aldabil/react-scheduler";
import { buildPath } from '../../path';
import EventModal from '../StudentExplore/EventModal';

function Calendar(props) {
	const [upcomingEvents, setUpcomingEvents] = useState([]);
	const [eventID, setEventID] = useState(undefined);
	const [open, setOpen] = useState(false);

	function eventIsUpcoming(endTime){
		return new Date().toISOString().localeCompare(endTime) < 0;
	}

	async function getUpcomingEvents(org){
		var url = buildPath(`api/searchEvent?organizationID=${org._id}`);

		var response = await fetch(url, {
			method: "GET",
			headers: {"Content-Type": "application/json"},
		});

		var res = JSON.parse(await response.text());

		const events = [];
		for (let event of res) {
			if (eventIsUpcoming(event.endTime)) {
			console.log(event);

			events.push({
				_id: event._id,
				title: event.name,
				start: new Date(event.startTime),
				end: new Date(event.endTime),
				editable: false,
				deletable: false,
				draggable: false,
			});
			}
		}
		setUpcomingEvents(events);
		console.log(events);
	}
	
	// Close extra tab upon click
	const customViewer = (event, close) => {
		return (
			<div><script type="text/javascript">{close()}</script></div>
		)
	};


	useEffect(() => {
		getUpcomingEvents(props.org);
	}, [props.org]);

	return (
		<div>
			<div className='sch'>
				<Scheduler
					view="month"
					height={450}
					editable={false}
					events={upcomingEvents}
					customViewer={customViewer}
					onEventClick={(event) => {setOpen(true); setEventID(event._id);}}
				/>
			</div>
			<EventModal setEventID={setEventID} eventID={eventID} open={open} setOpen={setOpen}/>
		</div>
	);
}

export default Calendar;
