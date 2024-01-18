import { useState, useEffect } from 'react';
import './OrgProfile.css';
import { Dialog, Box, Button, Typography, CardContent } from '@mui/material';
import { Scheduler } from "@aldabil/react-scheduler";
import { buildPath } from '../../path';
import dayjs from 'dayjs';


function Calendar(props) {
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [rsvpEvents, setRSVPEvents] = useState([]);

    function eventIsUpcoming(endTime){
      return new Date().toISOString().localeCompare(endTime) < 0;
    }

    async function getRSVPEvents() {
      if (sessionStorage.getItem("role") === "volunteer") {
        try {
          var url = buildPath(`api/searchUserRSVPedEvents?studentID=${sessionStorage.getItem("ID")}`);
    
          var response = await fetch(url, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          });
    
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
    
          var res = JSON.parse(await response.text());
          // setRSVPEvents(res);
          console.log(res);
          const rsvpUpcomingEvents = [];
          for(let event of res) {
            if (eventIsUpcoming(event.startTime)) {
              rsvpUpcomingEvents.push(event);
            }
          }
          setRSVPEvents(rsvpUpcomingEvents);
        } catch (e) {
          console.log("get RSVP events API call failed:", e.message);
        }
      }
    }
    

    async function getUpcomingEvents(org){

      var url = buildPath(`api/searchEvent?organizationID=${org._id}`);

      var response = await fetch(url, {
          method: "GET",
          headers: {"Content-Type": "application/json"},
      });

      var res = JSON.parse(await response.text());
      console.log(res);

      const events = [];
      for (let event of res) {
        if (eventIsUpcoming(event.endTime)) {
          var hasRSVP = "undefined value";
          console.log(event.maxAttendees, event.checkedInStudents.length);
          if(event.maxAttendees === event.checkedInStudents.length) {
            hasRSVP = "Full Capacity";
          } else {
            var booleanHasRSVP = rsvpEvents.some((rsvpEvent) => rsvpEvent._id === event._id);
            console.log(booleanHasRSVP);
            if(booleanHasRSVP === false) {
              console.log("it is false");
              hasRSVP = "RSVP";
            } else {
              hasRSVP = "Undo RSVP";
            }
          }

		  if(new Date(event.startTime).toISOString().localeCompare(event.endTime) < 0){
				events.push({
					event_id: event._id,
					title: event.name,
					start: new Date(event.startTime),
					end: new Date(event.endTime),
					editable: false,
					deletable: false,
					draggable: false,
					description: event.description,
					location: event.location,
					maxAttendees: event.maxAttendees,
					numRegistered: event.checkedInStudents.length,
					rsvpStatus: hasRSVP, // 0 - no RSVP, 1 - RSVP, 2 - Full capacity
				});
		  }
        }
      }
      console.log(events);
      setUpcomingEvents(events);
      
    }

	const customViewer = (event, close) => {
		const formatDateTimeRange = (start, end) => {
			const optionsDate = {
			month: 'numeric',
			day: 'numeric',
			year: '2-digit',
			};

			const optionsTime = {
			hour: 'numeric',
			minute: 'numeric',
			hour12: true,
			};

			const formattedDate = start.toLocaleString(undefined, optionsDate);
			const formattedStartTime = start.toLocaleString(undefined, optionsTime);
			const formattedEndTime = end.toLocaleString(undefined, optionsTime);

			return (
			<div>
				<p style={{ margin: '0', lineHeight: '0.7' }}>{formattedDate}</p>
				<p style={{ marginTop: '8px' }}>
				{formattedStartTime} - {formattedEndTime}
				</p>
			</div>
			);
		};

		return (
			<Box sx={{maxWidth: '500px'}}>
			<Box sx={{ margin: "20px" }}>
				<div>
				<h3>{event.title}</h3>
				<p>{formatDateTimeRange(event.start, event.end)}</p>
				<p style={{ margin: '0', lineHeight: '0.7' }}>{"Capacity: " + event.numRegistered + '/' + event.maxAttendees}</p>
				<p style={{marginTop: '8px'}}>{"Location: "+event.location}</p>
				<p>{`${event.rsvpStatus}`}</p>
				<p>{`${event.description}`}</p>
				</div>
				<div>
				<Box sx={{display: "flex", justifyContent: "flex-end" }}>
				<Button onClick={close} variant="outlined" sx={{marginRight: "5px" }}>
					Close
				</Button>
				<Button onClick={close} variant="contained">
					{event.rsvpStatus}
				</Button>
				</Box>
				</div>
			</Box>
			</Box>
		);
	};


	useEffect(() => {
	const fetchData = async () => {
		await getRSVPEvents();
	};

	fetchData();
	}, []);

	useEffect(() => {
	if(props.org)
		getUpcomingEvents(props.org);
	}, [props.org, rsvpEvents]);


  return (
	(props.org)
	?
    <div>
      <div className='sch'>
        <Scheduler
          view="month"
          height={450}
          //width={400}
          editable={false}
          events={upcomingEvents}
          customViewer={customViewer}
        />
      </div>
    </div>
	: ""
  );
}

export default Calendar;
