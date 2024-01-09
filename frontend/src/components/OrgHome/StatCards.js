import {useState, useEffect} from 'react';
import Card from '@mui/material/Card';
import './OrgHome.css';
import { buildPath } from '../../path';

function StatCards() {

    
  const [numUpcomingEvents, setNumUpcomingEvents] = useState(0);

  function eventIsUpcoming(endTime){
    return new Date().toISOString().localeCompare(endTime) < 0;
 }

  async function getUpcomingEvents() {
    const organizationID = "6530608eae2eedf04961794e";
  
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
  getUpcomingEvents();
}, []);

  return (
      <div>
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
                    73%
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