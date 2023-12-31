import {useState, useEffect} from 'react';
import { buildPath } from '../../path';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import '../OrgEvents/OrgEvents';

function RecentEvents(props)
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
    
	// Event has not happened yet or is not over
    function eventIsUpcoming(endTime){
        return new Date().toISOString().localeCompare(endTime) < 0;
	}

    async function getOrgName(id){
        let url = buildPath(`api/organizationSearch?organizationID=${id}`);

        let response = await fetch(url, {
            method: "GET",
            headers: {"Content-Type": "application/json"},
        });
    
        let res = JSON.parse(await response.text());

        return res.name;
    }

    async function getEvents(){
        let url = buildPath(`api/searchUserRSVPedEvents?studentID=${sessionStorage.getItem("ID")}`);

        let response = await fetch(url, {
            method: "GET",
            headers: {"Content-Type": "application/json"},
        });

        let res = JSON.parse(await response.text());

        console.log(res);    

	    const events = [];

        for(let event of res){
            if(!eventIsUpcoming(event.endTime)){
				console.log(event)
				url = buildPath(`api/retrieveImage?entityType=event&id=${event._id}`);

				response = await fetch(url, {
					method: "GET",
					headers: {"Content-Type": "application/json"},
				});
		
				let pic = await response.blob();

                const orgName = await getOrgName(event.sponsoringOrganization);
                events.push(<Event eventName={event.name} pic={pic} orgName={orgName} date={event.startTime} id={event._id}/>)  
            }
        }

        events.sort(function(a,b){ 
            return a.props.date.localeCompare(b.props.date)
        });

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
        return <h1 className='favHeader spartan'>Recent Events</h1>
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

export default RecentEvents;
