import {useState, useEffect} from 'react';
const logo = require("../Login/loginPic.png");


function UpcomingEvents()
{

    const [eventCards, setEventCards] = useState();

    const events = [<Event/>, <Event/>, <Event/>]

    function makeEvent(){
        
    }

    function getUpcomingEvents(){
        //STEPS
        // 1. API Call to get upcoming event information
        // 2. For everything that it returns, make an array of Event components
        // 3. setEventCards(events)
        
        let res = <div class="cards d-flex flex-row cardWhite card-body">{events}</div>
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
            <div class="event card">
                <div class="innerEvent eventHeight">
                    {EventPhoto(logo)}
                    <EventDescription/>
                </div>
            </div>
        )
    }

    function Events(){
        return (
            <div class="eventsCard card">       
                {eventCards}
            </div>
        )
    }

    useEffect(()=>{
        console.log("Im called")
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
