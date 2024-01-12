import { useState, useEffect } from 'react';
import Header from '../OrgEvents/Header';
import './OrgProfile.css';
import OrgTopBar from '../OrgHome/OrgTopBar';
import Card from '@mui/material/Card';
import { Button, Typography, CardContent } from '@mui/material';
import { buildPath } from '../../path';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Scheduler } from "@aldabil/react-scheduler";


function Map() {
    const schedulerStyle = {
        padding: '1px', // Adjust the padding value as needed
      };

    const myEventsList = [
        {
          id: 1,
          title: 'Event 1',
          start: new Date('2024-01-01T09:30:00'),
          end: new Date('2024-01-02T10:30:00'),
        },
        {
          id: 2,
          title: 'Event 2',
          start: new Date('2021-05-04T10:00:00'),
          end: new Date('2021-05-04T11:00:00'),
        },
      ];
  

  return (
    <div>
        <div style={schedulerStyle}  className='sch'>
<Scheduler
  view="month"
  height={320}
//   width={400}
  events={[
    {
      event_id: 1,
      title: "Event 1",
      start: new Date("2024/1/1 09:30"),
      end: new Date("2024/1/2 10:30"),
    },
    {
      event_id: 2,
      title: "Event 2",
      start: new Date("2021/5/4 10:00"),
      end: new Date("2021/5/4 11:00"),
    },
  ]}
/>
</div>
{/* <div>
<Calendar
      localizer={localizer}
      events={myEventsList}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 500 }}
    />
    </div> */}
      
    </div>
  );
}

export default Map;
