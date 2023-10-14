import {useState, useEffect} from 'react';
import { buildPath } from '../../path';
const logo = require("../Login/loginPic.png");


function UpcomingEvents()
{

    const [eventCards, setEventCards] = useState();

    const events = []

    function makeEvent(){
        
    }

    async function getUpcomingEvents(){
        //STEPS
        // 1. API Call to get upcoming event information
        // 2. For everything that it returns, make an array of Event components
        // 3. setEventCards(events)

        const json = {
            email: "fooEvents@example.com"
         };

        const url = buildPath(`api/searchOrganization?email=${json.email}`);

        const response = await fetch(url, {
            method: "GET",
            headers: {"Content-Type": "application/json"},
        });
    
        let resp = await response.text();

        console.log(resp);

        let res = <div className="cards d-flex flex-row cardWhite card-body">{events}</div>
        setEventCards(res);
    }

    function EventHeader(){
        return <h1 className='upcomingEvents spartan'>Your Upcoming Events</h1>
    }

    function EventPhoto(imgSrc){
        return <img className="eventPhoto" src={imgSrc} />
    }

    function EventDescription(){
        return (
            <div>
                <div className='eventName'>Event</div>
                <div className='eventDate'>July 8th</div>
            </div>
        )
    }

    function Event(){
        return (
            <div className="event card">
                <div className="innerEvent eventHeight">
                    {EventPhoto(logo)}
                    <EventDescription/>
                </div>
            </div>
        )
    }

    function Events(){
        return (
            <div className="eventsCard card">       
                {eventCards}
            </div>
        )
    }

    useEffect(()=>{
        getUpcomingEvents();
    },[])

    return(
     <div>
        <EventHeader/>
        <div>
            <Events/>
        </div>
     </div>
    );
};

export default UpcomingEvents;
