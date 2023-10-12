import React from 'react';
const logo = require("../Login/loginPic.png");


function UpcomingEvents()
{
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
                <div class="cards d-flex flex-row cardWhite card-body">
                    <Event/>
                    <Event/>
                    <Event/>
                    <Event/>
                </div>
            </div>
        )
    }

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
