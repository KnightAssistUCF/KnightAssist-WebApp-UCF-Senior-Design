import { useState, useEffect } from 'react';
import './OrgProfile.css';
import { Button, Typography, CardContent } from '@mui/material';
import { Scheduler } from "@aldabil/react-scheduler";
import { buildPath } from '../../path';


function Calendar(props) {
  const [upcomingEvents, setUpcomingEvents] = useState([]);

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

      const events = [];
      for(let event of res){
        if(eventIsUpcoming(event.endTime)){
          events.push({
            event_id: event._id,
            title: event.name,
            start: new Date(event.startTime),
            end: new Date(event.endTime),
          });
        }
      }  
      console.log(events);
      setUpcomingEvents(events);
    }

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
          events={upcomingEvents}
        />
      </div>
    
    </div>
  );
}

export default Calendar;
