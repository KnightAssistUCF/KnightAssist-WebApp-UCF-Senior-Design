import { useState, useEffect } from 'react';
import { Alert, Dialog, Box, Button, Typography, CardContent } from '@mui/material';
import { Scheduler } from "@aldabil/react-scheduler";
import { buildPath } from '../../path';
import Snackbar from '@mui/joy/Snackbar';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import EventModal from '../StudentExplore/EventModal';


function Calendar({upcomingRSVPdEvents, updateEventsLength}) {
	const [eventID, setEventID] = useState(undefined);
	const [RSVPID, setRSVPID] = useState(undefined);
    const [RSVPdEvents, setRSVPdEvents] = useState([]);
	const [redoEvents, setRedoEvents] = useState(false);
	const [open, setOpen] = useState(false);

    async function getStudentInfo() {
        const upcomingEvents = [];
        if(upcomingRSVPdEvents.length > 0) {
            for(const event of upcomingRSVPdEvents) {
                console.log(event._id);
                console.log(event.startTime);
                console.log(new Date(event.startTime));
                upcomingEvents.push({
                    _id: event._id,
                    title: event.name,
                    start: new Date(event.startTime),
                    end: new Date(event.endTime),
                    editable: false,
                    deletable: false,
                    draggable: false,
                });
                console.log(upcomingEvents)
            }
            setRSVPdEvents(upcomingEvents);
        } else {
            console.log("Empty RSVP array");
        }

    }

	// Close extra tab upon click
	const customViewer = (event, close) => {
		return (
			<div><script type="text/javascript">{close()}</script></div>
		)
	};

	async function addEvent(id){
		let url = buildPath(`api/searchOneEvent?eventID=${id}`);

		let response = await fetch(url, {
			method: "GET",
			headers: {"Content-Type": "application/json"},
		});
	
		let res = JSON.parse(await response.text());

		let event = res[0];

		const events = RSVPdEvents.slice();

		events.push({
			_id: event._id,
			title: event.name,
			start: new Date(event.startTime),
			end: new Date(event.endTime),
			editable: false,
			deletable: false,
			draggable: false,
		});

		console.log(events);

		setRSVPdEvents(events);
	}

	useEffect(() => {
		if(RSVPID){
			const undidRSVP = RSVPdEvents.some(event => event._id === RSVPID);

			// Remove the event from the calendar
			if(undidRSVP){
				setRSVPdEvents(RSVPdEvents => RSVPdEvents.filter(e => e._id !== RSVPID));
			}else{
				addEvent(RSVPID);
			}

			setRSVPID(undefined);
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [RSVPID]);

    useEffect(() => {
        getStudentInfo();
        console.log(upcomingRSVPdEvents.length);
        updateEventsLength(upcomingRSVPdEvents.length);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [upcomingRSVPdEvents]);

	return (
		<div style={{marginBottom: '20px'}}>
			<Scheduler
				view="month"
				height={520}
				editable={false}
				events={RSVPdEvents}
				customViewer={customViewer}
				onEventClick={(event) => {setOpen(true); setEventID(event._id);}}
			/>
			<EventModal eventID={eventID} setEventID={setEventID} open={open} setOpen={setOpen} setRSVPID={setRSVPID}/>
		</div>
	);
}

export default Calendar;