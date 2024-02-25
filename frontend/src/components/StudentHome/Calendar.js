import { useState, useEffect } from 'react';
import { Alert, Dialog, Box, Button, Typography, CardContent } from '@mui/material';
import { Scheduler } from "@aldabil/react-scheduler";
import { buildPath } from '../../path';
import Snackbar from '@mui/joy/Snackbar';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';


function Calendar() {
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [rsvpEvents, setRSVPEvents] = useState([]);
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);



  return (
    <div>
      <div className='sch'>
        <Scheduler
          view="month"
          height={450}
          //width={400}
          editable={false}
          events={upcomingEvents}
        />
      </div>
    </div>
  );
}

export default Calendar;