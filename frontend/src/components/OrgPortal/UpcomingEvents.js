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

        const email = "fooEvents@example.com"
        

        const url = buildPath(`api/searchOrganization?email=${email}`);

        const response = await fetch(url, {
            method: "GET",
            headers: {"Content-Type": "application/json"},
        });
    
        let res = JSON.parse(await response.text());

        for(let event of res.events)
            events.push(<Event name={event.name} date={event.date}/>)
            
        let content = <div className="cards d-flex flex-row cardWhite card-body">{events}</div>
        setEventCards(content);
    }

    function EventHeader(){
        return <h1 className='upcomingEvents spartan'>Your Upcoming Events</h1>
    }

    function EventPhoto(imgSrc){
        return <img className="eventPhoto" src={imgSrc} />
    }

    function EventDescription(name, date){
        return (
            <div>
                <div className='eventName'>{name}</div>
                <div className='eventDate'>{new Date(date).toISOString().split("T")[0]}</div>
            </div>
        )
    }

    function Event(props){
        return (
            <div className="event card">
                <div className="innerEvent eventHeight">
                    {EventPhoto(logo)}
                    {EventDescription(props.name, props.date)}
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
