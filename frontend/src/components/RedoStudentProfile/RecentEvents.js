import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './RedoStudentProfile.css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CalendarIcon } from '@mui/x-date-pickers';
import { CardActionArea, Grid } from '@mui/material';
import { buildPath } from '../../path';
import '../OrgEvents/OrgEvents.css'

function RecentEvents() {
    const [events, setEvents] = useState([]);
    const [pastEvents, setPastEvents] = useState([]);

    function openEventModal() {
        console.log("Open event modal");
    }

    async function fetchHistory() {
        try {
            var pastEvents = [];

            let url = buildPath(`api/historyOfEvents_User?studentId=${sessionStorage.getItem("ID")}`);

            let response = await fetch(url, {
                method: "GET",
                headers: {"Content-Type": "application/json"},
            });
            let res = await response.json();

            // Sort events by time if date is equal, date otherwise
            res.sort((a, b) => {
                return Date.parse(a.checkIn[0] + " " + a.checkIn[1]) - Date.parse(b.checkIn[0] + " " + b.checkIn[1]);
            });

            // Set the first 9 events to state
            setEvents(res.slice(0, 12));
            pastEvents = res.map(event => event.ID);
            console.log(res);
            // setEventID(pastEvents);
            let eventList = getEventInfo(pastEvents);
            // getEventPics(eventList)
            // console.log(pastEvents);
        } catch(e) {
            console.log("Failed to fetch event history");
        }
    }

    async function getEventInfo(pastEvents) {
        try {
            let eventList = [];
            for(let pastEvent of pastEvents) {
                let url = buildPath(`api/searchOneEvent?eventID=${pastEvent}`);

                let response = await fetch(url, {
                    method: "GET",
                    headers: {"Content-Type": "application/json"},
                });
            
                let res = JSON.parse(await response.text());
        
                let event = res[0];
        
                console.log(event);
                let eventAndPic = await getEventPics(event);
                console.log(eventAndPic);
                eventList.push(eventAndPic);
            }
            console.log(eventList);
            setPastEvents(eventList);
            return eventList;
        } catch(e) {
            console.log("Failed to search event");
        }
    }

    async function getEventPics(singleEvent) {
        let populatingEvent = singleEvent;
        try {
            console.log(singleEvent);
            let url = buildPath(`api/retrieveImage?typeOfImage=1&id=${singleEvent._id}`);

            let response = await fetch(url, {
                method: "GET",
                headers: {"Content-Type": "application/json"},
            });
    
            let pic = JSON.parse(await response.text());
            console.log(pic);
            populatingEvent.pic = pic;
            console.log(populatingEvent);
            return populatingEvent;
            // events.push(<Event name={event.name} pic={pic} startTime={event.startTime} endTime={event.endTime} id={event._id}/>)
    
        }catch(e) {
            console.log("Failed to retrieve picture");
        }
    }


    useEffect(() => {
        fetchHistory();
    }, []);

    return(
        <div className='studentRecentEventsTab'>
                {pastEvents.map(event => (
                    <div className="event spartan">
                        <CardActionArea className='test' onClick={() => openEventModal(event.ID)}>
                            <Card sx={{maxWidth: '275px', minWidth: '275px'}} className="eventHeight">
                                <CardMedia
                                    component="img"
                                    height="150"
                                    image={event.pic.url}
                                />
                                <CardContent>
                                    <Typography className='eventName' gutterBottom variant="h6" component="div">
                                        {event.name.length >= 40 ? `${event.name.substring(0, 40)}...` : event.name}
                                    </Typography>
                                    <Typography className="eventDate" variant="body2" color="text.secondary">
                                        <CalendarIcon className='cardCalendar'/>
                                        {/* {event.startDay + (event.hasEndDate ? ` - ${event.endDay}` : '')} */}
                                        {event.startTime + "-" + event.endTime}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </CardActionArea>
                    </div>
                ))}
        </div>
    );
};

export default RecentEvents;
