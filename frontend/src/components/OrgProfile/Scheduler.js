import { useState, useEffect } from 'react';
import './OrgProfile.css';
import { Dialog, Box, Button, Typography, CardContent } from '@mui/material';
import { Scheduler } from "@aldabil/react-scheduler";
import { buildPath } from '../../path';


function Calendar(props) {
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [customFields, setCustomFields] = useState([]);

  const handleEventClick = (event) => {
    // Show your custom modal for editing the event
    // You can pass the customFields array to your modal
    console.log("Clicked event:", event);
  };

    function eventIsUpcoming(endTime){
      return new Date().toISOString().localeCompare(endTime) < 0;
   }

    async function getUpcomingEvents(org){
      console.log(org);

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
          });
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
          <p style={{ margin: '0', lineHeight: '0.7' }}>{"Capacity: "+event.numRegistered + '/' + event.maxAttendees}</p>
          <p style={{marginTop: '8px'}}>{"Location: "+event.location}</p>
          <p>{`${event.description}`}</p>
        </div>
        <div>
          <Box sx={{display: "flex", justifyContent: "flex-end" }}>
          <Button onClick={close} variant="outlined" sx={{marginRight: "5px" }}>
            Close
          </Button>
          <Button onClick={close} variant="contained">
            RSVP
          </Button>
          </Box>
        </div>
      </Box>
    </Box>
  );
};


    useEffect(() => {
      getUpcomingEvents(props.org);
    }, []);

  return (
    <div>
      <div className='sch'>
        <Scheduler
          view="month"
          height={430}
          //width={400}
          editable={false}
          events={upcomingEvents}
          customViewer={customViewer}
        />
      </div>
    
    </div>
  );
}

export default Calendar;
