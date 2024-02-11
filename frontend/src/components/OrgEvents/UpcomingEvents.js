import {useState, useEffect} from 'react';
import { buildPath } from '../../path';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import './OrgEvents';

function UpcomingEvents(props)
{

    const [events, setEvents] = useState([]);
    const [eventCards, setEventCards] = useState();
    const [numPages, setNumPages] = useState(0);  
    const [page, setPage] = useState(1);
	const [eventsPerPage, setEventsPerPage] = useState(getInitialPerPage());
	
	// Bug purposes
	const [initiateListener, setInitiateListener] = useState(1);

	function getInitialPerPage(){
		const width = window.innerWidth;

		if(width > 1500){
			return 4;
		}else if(width > 1200){
			return 3;
		}else if(width > 925){
			return 2;
		}else{
			return 1;
		}
	}

    function changePage(e, value, perPage = eventsPerPage){
        setPage(value);
        let content = <div className="cards d-flex flex-row cardWhite card-body">{events.slice(perPage * (value - 1), perPage * (value - 1) + perPage)}</div>
		setEventCards(content);
    }

    function openEventModal(id){
        props.setEventID(id);
        props.setOpenEvent(true);
    }

	// Event has not happened yet or is not over
    function eventIsUpcoming(endTime){
        return new Date().toISOString().localeCompare(endTime) < 0;
	}

    async function getUpcomingEvents(){
        const organizationID = sessionStorage.getItem("ID");
        
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

        for(let event of res){
            if(eventIsUpcoming(event.endTime)){
				url = buildPath(`api/retrieveImage?typeOfImage=1&id=${event._id}`);

				response = await fetch(url, {
					method: "GET",
					headers: {"Content-Type": "application/json"},
				});
		
				let pic = JSON.parse(await response.text());
		
				events.push(<Event name={event.name} pic={pic} date={event.startTime} id={event._id}/>)
			}
        }       

        events.sort(function(a,b){ 
            return a.props.date.localeCompare(b.props.date)
        });

        console.log(events);

        setNumPages(Math.ceil(events.length / eventsPerPage))
        setEvents(events);

		setInitiateListener(initiateListener * -1);

        let extraBack = 0;
        
        // Need to go a page back due to deletion
        if(((page - 1) * eventsPerPage) >= events.length){
            setPage(page - 1);
            extraBack = 1;
        }

        // There were no events prior and now there is one
        if(page === 0 && events.length > 0){
            setPage(1);
            extraBack = -1;
        }

        let content = <div className="cards d-flex flex-row cardWhite card-body">{events.slice((page - 1 - extraBack) * eventsPerPage, (page - 1 - extraBack) * eventsPerPage + eventsPerPage)}</div>
        setEventCards(content);
    }

    function EventHeader(){
        return <h1 className='upcomingEvents spartan'>Your Upcoming Events</h1>
    }

    function Event(props) {      
        return (
            <div className="event spartan">
                <CardActionArea className='test'>
                    <Card className="eventHeight" onClick={() => openEventModal(props.id)}>
                        <CardMedia
                            component="img"
                            height="150"
                            image={props.pic.url}
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
		getUpcomingEvents();
		// eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    useEffect(()=>{
        getUpcomingEvents();
		// eslint-disable-next-line react-hooks/exhaustive-deps
    },[props.reset])

	useEffect(()=>{
		const adjustForSize = () => {
			const width = window.innerWidth;
			
			const oldEventsPerPage = eventsPerPage;

			if(width > 1500){
				setEventsPerPage(4);
				setNumPages(Math.ceil(events.length / 4))
				changePage(null, Math.ceil((((page - 1) * oldEventsPerPage) + 1) / 4), 4);
			}else if(width > 1200){
				setEventsPerPage(3);
				setNumPages(Math.ceil(events.length / 3))
				changePage(null, Math.ceil((((page - 1) * oldEventsPerPage) + 1) / 3), 3);
			}else if(width > 925){
				setEventsPerPage(2);
				setNumPages(Math.ceil(events.length / 2))
				changePage(null, Math.ceil((((page - 1) * oldEventsPerPage) + 1) / 2), 2);
			}else{
				setEventsPerPage(1);
				setNumPages(events.length)
				changePage(null, Math.ceil((((page - 1) * oldEventsPerPage) + 1) / 1), 1);
			}
		}

		window.addEventListener("resize", adjustForSize);
	},[initiateListener])

    return(
     <div className='upcomingEventsSpace'>
        <EventHeader/>
        <div className='centerCards'>
            <Events/>
            <Pagination className="pagination" page={page} count={numPages} onChange={changePage} color="secondary" />
        </div>
     </div>
    );
};

export default UpcomingEvents;