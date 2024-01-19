import { useState, useEffect } from 'react';
import './OrgProfile.css';
import { Alert, Dialog, Box, Button, Typography, CardContent } from '@mui/material';
import { Scheduler } from "@aldabil/react-scheduler";
import { buildPath } from '../../path';
import Snackbar from '@mui/joy/Snackbar';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';


function Calendar(props) {
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [rsvpEvents, setRSVPEvents] = useState([]);
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);

    function eventIsUpcoming(endTime){
      return new Date().toISOString().localeCompare(endTime) < 0;
    }

    async function getRSVPEvents() {
      if (sessionStorage.getItem("role") === "volunteer") {
        try {
          // replace with user email
          var email = "anisharanjan55@gmail.com"
          var url = buildPath(`api/searchUserRSVPedEvents?email=${email}`);
    
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

      const events = [];
      for (let event of res) {
        if (eventIsUpcoming(event.endTime)) {
          var hasRSVP = "undefined value";
          var booleanHasRSVP = rsvpEvents.some((rsvpEvent) => rsvpEvent._id === event._id);
          console.log(event);
          if(booleanHasRSVP === false) {
            if(event.maxAttendees == event.attendees.length) {
              hasRSVP = "Full Capacity";
            } else {
              hasRSVP = "RSVP";
            }
            
          } else if(booleanHasRSVP === true) {
            hasRSVP = "Undo RSVP";
          }
          events.push({
            _id: event._id,
            title: event.name,
            start: new Date(event.startTime),
            end: new Date(event.endTime),
            editable: false,
            deletable: false,
            draggable: false,
            description: event.description,
            location: event.location,
            maxAttendees: event.maxAttendees,
            numRegistered: event.attendees.length,
            rsvpStatus: hasRSVP, // 0 - no RSVP, 1 - RSVP, 2 - Full capacity
          });
        }
      }
      setUpcomingEvents(events);
      console.log(events);
      
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

  async function unrsvpEvent(event){
    try {
      var url = buildPath(`api/cancelRSVP`);
      var studentID = sessionStorage.getItem("ID");
      var json = {
        eventID: event._id,
        eventName: event.title,
        userID: studentID
      }
      console.log(json);
      var response = await fetch(url, {
        body: JSON.stringify(json),
        method: "DELETE",
        headers: {"Content-Type": "application/json"},
      });
      
      var res = await response.text();
      console.log(res);
      setRSVPEvents(prevRSVPEvents => prevRSVPEvents.filter(e => e._id !== event._id));
    } catch(e) {
      console.log("unrsvp failed");
    }
  }

  async function rsvpEvent(event){
    console.log(event);
    try {
      var url = buildPath(`api/RSVPForEvent`);

      var studentID = sessionStorage.getItem("ID");
      console.log("rsvp Event try");
      var json = {
        eventID: event._id,
        eventName: event.title,
        userID: studentID,
        check: 0
      }
      console.log(json);
      var response = await fetch(url, {
        body: JSON.stringify(json),
        method: "POST",
        headers: {"Content-Type": "application/json"},
      });
      
      var res = await response.text();

      console.log(res);
      setRSVPEvents(prevRSVPEvents => [...prevRSVPEvents, event]);
    } catch(e) {
      console.log("rsvp API call failed: " + e);
    }
  }

  const handleButtonClick = (event) => {
    if (event.rsvpStatus === "Full Capacity") {
      console.log("Full");
    } else if (event.rsvpStatus === "RSVP") {
      rsvpEvent(event);
      setMessage("RSVP Successful")
      setOpen(true);
    } else if (event.rsvpStatus === "Undo RSVP") {
      unrsvpEvent(event);
      setMessage("Cancelled RSVP")
      setOpen(true);
    }

    close();
  };
  return (
    <Box sx={{maxWidth: '500px'}}>
      <Box sx={{ margin: "20px" }}>
        <div>
        <p>{`${event._id}`}</p>
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
          <Button onClick={() => handleButtonClick(event)} disabled={event.rsvpStatus === "Full Capacity"} variant="contained">
            {event.rsvpStatus === "Full Capacity" ? "Full Capacity" : event.rsvpStatus}
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
  getUpcomingEvents(props.org);
}, [props.org, rsvpEvents]);


  return (
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
      <Snackbar
        autoHideDuration={2000}
        open={open}
        variant="outlined"
        color="primary"
        onClose={(event, reason) => {
          if (reason === 'clickaway') {
            return;
          }
          setOpen(false);
        }}
        startDecorator={<CheckCircleOutlineIcon />}
      >
        {message}
      </Snackbar>
    </div>
  );
}

export default Calendar;
