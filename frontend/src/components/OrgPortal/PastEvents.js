import {useState, useEffect} from 'react';
import { buildPath } from '../../path';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import { CardActionArea } from '@mui/material';
import './OrgPortal.css';

const logo = require("../Login/loginPic.png");


function PastEvents(props)
{

    const [events, setEvents] = useState([]);
    const [eventCards, setEventCards] = useState();
    const [numPages, setNumPages] = useState(0);  
    const [page, setPage] = useState(1);

    function changePage(e, value){
        setPage(value);
        let content = <div className="cards d-flex flex-row cardWhite card-body">{events.slice(4 * (value - 1), 4 * (value - 1) + 4)}</div>
        setEventCards(content);
    }

    function openEventModal(id){
        console.log("ID:", id);
        props.setEventID(id);
        props.setOpenEvent(true);
    }

    function eventIsPast(date){
        date = String(date);
        date = date.substring(0, date.indexOf("T"));
        let today = new Date().toISOString();
        today = today.substring(0, today.indexOf("T"));
        return date.localeCompare(today) < 0;
    }

    async function getPastEvents(){
        const organizationID = "12345";
        
        let url = buildPath(`api/organizationSearch?organizationID=${organizationID}`);

        let response = await fetch(url, {
            method: "GET",
            headers: {"Content-Type": "application/json"},
        });
    
        let res = JSON.parse(await response.text());

        console.log(res);

        url = buildPath(`api/searchEvent?organizationID=${organizationID}`);

        response = await fetch(url, {
            method: "GET",
            headers: {"Content-Type": "application/json"},
        });

        res = JSON.parse(await response.text());

        console.log(res);    

        const events = [];

        for(let event of res)
            if(eventIsPast(event.date))
                events.push(<Event name={event.name} date={event.date} id={event.eventID}/>)   
                
        events.sort(function(a,b){ 
            return b.props.date.localeCompare(a.props.date)
        });

        console.log(events);

        setNumPages(Math.ceil(events.length / 4))

        setEvents(events);

        let extraBack = 0;
        
        // Need to go a page back due to deletion
        if(((page - 1) * 4) >= events.length){
            setPage(page - 1);
            extraBack = 1;
        }

        let content = <div className="cards d-flex flex-row cardWhite card-body">{events.slice((page - 1 - extraBack) * 4, (page - 1 - extraBack) * 4 + 4)}</div>
        setEventCards(content);
    }

    function EventHeader(){
        return <h1 className='upcomingEvents spartan'>Your Past Events</h1>
    }

    function Event(props){
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
            <div className="belowSpace eventsCard card">       
                {eventCards}
            </div>
        )
    }

    useEffect(()=>{
        getPastEvents();
    },[])

    useEffect(()=>{
        getPastEvents();
    },[props.reset])

    return(
     <div>
        <EventHeader/>
        <div>
            <Events/>
            <Pagination className="pagination" page={page} count={numPages} onChange={changePage} color="secondary" />
        </div>
     </div>
    );
};

export default PastEvents;