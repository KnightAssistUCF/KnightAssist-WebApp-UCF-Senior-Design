import {useState, useEffect} from 'react';
import { buildPath } from '../../path';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import '../OrgPortal/OrgPortal.css';

const logo = require("../Login/loginPic.png");


function RecommendedEvents(props)
{

    const [eventCards, setEventCards] = useState();

    function openEventModal(id){
        props.setEventID(id);
        props.setOpenEvent(true);
    }

    function eventIsUpcoming(date){
        date = String(date);
        date = date.substring(0, date.indexOf("T"));
        let today = new Date().toISOString();
        today = today.substring(0, today.indexOf("T"));
        console.log(date, today)
        return today <= date;
    }

    async function getEvents(){
        const userID = "6519e4fd7a6fa91cd257bfda";

        let url = buildPath(`api/loadFavoritedOrgsEvents?userID=${userID}`);

        let response = await fetch(url, {
            method: "GET",
            headers: {"Content-Type": "application/json"},
        });

        let res = JSON.parse(await response.text());

        console.log(res);    

	    const events = [];

        for(let org of res){
		
	    url = buildPath(`api/searchEvent?organizationID=${org.organizationID}`);

	    response = await fetch(url, {
		method: "GET",
		headers: {"Content-Type": "application/json"},
	    });
	
	    res = JSON.parse(await response.text());
	
	    console.log(res);    
		
	    for(let event of res){
            if(eventIsUpcoming(event.date))
                events.push(<Event name={event.name} date={event.date} id={event.eventID}/>)
            }   
        }       

        events.sort(function(a,b){ 
            return a.props.date.localeCompare(b.props.date)
        });

        let content = <div className="cards d-flex flex-row cardWhite card-body">{events}</div>
        setEventCards(content);
    }

    function EventHeader(){
        return <h1 className='upcomingEvents spartan'>Recommended Events</h1>
    }

    function Event(props) {
        const date = new Date(props.date);
      
        return (
            <div className="event spartan">
                <CardActionArea className='test'>
                    <Card className="eventHeight" onClick={() => openEventModal(props.id)}>
                        <CardMedia
                            component="img"
                            height="150"
                            image={logo}
                        />
                        <CardContent>
                            <Typography className='eventName' clagutterBottom variant="h6" component="div">
                                {props.name}
                            </Typography>
                            <Typography className="eventDate" variant="body2" color="text.secondary">
                                {new Date(props.date).toISOString().split("T")[0]}
                            </Typography>
                        </CardContent>
                    </Card>
                </CardActionArea>
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
        getEvents();
    },[])

    useEffect(()=>{
        console.log("its working!")
        getEvents();
    },[props.reset])

    return(
     <div className='upcomingEventsSpace'>
        <EventHeader/>
        <div>
            <Events/>
        </div>
     </div>
    );
};

export default RecommendedEvents;
