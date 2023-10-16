import {useState, useEffect} from 'react';
import { buildPath } from '../../path';
import './OrgPortal.css';

const logo = require("../Login/loginPic.png");


function UpcomingEvents()
{

    const [eventCards, setEventCards] = useState();

    let events = []

    function makeEvent(){
        
    }

    async function getUpcomingEvents(){
        const email = "fooEvents@example.com"
        
        const url = buildPath(`api/searchOrganization?email=${email}`);

        const response = await fetch(url, {
            method: "GET",
            headers: {"Content-Type": "application/json"},
        });
    
        let res = JSON.parse(await response.text());

        events = [];

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
                <div className="spartan innerEvent eventHeight">
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
