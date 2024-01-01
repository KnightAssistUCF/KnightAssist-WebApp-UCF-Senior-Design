import {useState, useEffect} from 'react';
import { buildPath } from '../../path';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import '../OrgEvents/OrgEvents';

function OrgFavoriteEvents(props)
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
        props.setEventID(id);
        props.setOpen(true);
    }

    function eventIsUpcoming(date){
        date = String(date);
        date = date.substring(0, date.indexOf("T"));
        let today = new Date().toISOString();
        today = today.substring(0, today.indexOf("T"));
        console.log(date, today)
        return date.localeCompare(today) >= 0;
    }

    async function getEvents(){
        let url = buildPath(`api/loadFavoritedOrgsEvents?userID=${localStorage.getItem("ID")}`);

        let response = await fetch(url, {
            method: "GET",
            headers: {"Content-Type": "application/json"},
        });

        let res = JSON.parse(await response.text());

        console.log(res);    

	    const events = [];

        for(let org of res){
            url = buildPath(`api/searchEvent?organizationID=${org._id}`);

            response = await fetch(url, {
                method: "GET",
                headers: {"Content-Type": "application/json"},
            });
        
            res = JSON.parse(await response.text());
        
            console.log(res);    
            
            for(let event of res){
                let json = {
                    eventID: event._id,
                    eventName: event.name,
                    userID: localStorage.getItem("ID"),
                    check: 1
                };
    
                let url = buildPath(`api/RSVPForEvent`);
    
                let response = await fetch(url, {
                    body: JSON.stringify(json),
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                });
            
                let res = JSON.parse(await response.text());
    
                // Don't show event if user already RSVP'd
                if(res.RSVPStatus !== 1 && eventIsUpcoming(event.date)){
					url = buildPath(`api/retrieveImage?entityType=event&id=${event._id}`);

					response = await fetch(url, {
						method: "GET",
						headers: {"Content-Type": "application/json"},
					});
			
					let pic = await response.blob();

					events.push(<Event eventName={event.name} pic={pic} orgName={org.name} date={event.date} id={event._id}/>)
				}
            }
        }       

        events.sort(function(a,b){ 
            return a.props.date.localeCompare(b.props.date)
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

        // There were no events prior and now there is one
        if(page === 0 && events.length > 0){
            setPage(1);
            extraBack = -1;
        }

        console.log(page);

        let content = <div className="cards d-flex flex-row cardWhite card-body">{events.slice((page - 1 - extraBack) * 4, (page - 1 - extraBack) * 4 + 4)}</div>
        setEventCards(content);
    }

    function EventHeader(){
        return <h1 className='upcomingEvents spartan'>Favorited Organization Events</h1>
    }

    function Event(props) {      
        return (
            <div className="event spartan">
                <CardActionArea className='test'>
                    <Card className="eventHeight" onClick={() => openEventModal(props.id)}>
                        <CardMedia
                            component="img"
                            height="150"
                            image={URL.createObjectURL(props.pic)}
                        />
                        <CardContent>
                            <Typography className='eventName' clagutterBottom variant="h6" component="div">
                                {props.eventName}
                            </Typography>
                            <Typography className="eventDate" variant="body2" color="text.secondary">
                                {props.orgName} - {new Date(props.date).toISOString().split("T")[0]}
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
		// eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    useEffect(()=>{
        console.log("its working!")
        getEvents();
		// eslint-disable-next-line react-hooks/exhaustive-deps
    },[props.reset])

    return(
     <div className='upcomingEventsSpace'>
        <EventHeader/>
        <div>
            <Events/>
            <Pagination className="pagination" page={page} count={numPages} onChange={changePage} color="secondary" />
        </div>
     </div>
    );
};

export default OrgFavoriteEvents;
