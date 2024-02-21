import {useState, useEffect} from 'react';
import { buildPath } from '../../path';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Avatar, CardActionArea, CircularProgress } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import './OrgEvents';
import { CalendarIcon } from '@mui/x-date-pickers';

function SearchResults(props)
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
			return 12;
		}else if(width > 1200){
			return 9;
		}else if(width > 1045){
			return 6;
		}else{
			return 3;
		}
	}

    function changePage(e, value, perPage = eventsPerPage){
        setPage(value);
        let content = <div className="rowCards cards d-flex flex-row cardWhite card-body">{events.slice(perPage * (value - 1), (perPage * (value - 1) + perPage))}</div>
		setEventCards(content);
    }

    function openEventModal(id){
        props.setEventID(id);
        props.setOpenEvent(true);
    }

	function openOrgPage(id){
		sessionStorage.setItem("viewingPageID", id);
		window.location.href="/#/orgprofile";
	}

	async function getOrgs(){
		const orgs = [];

        for(let i of props.results.current){
			let url = buildPath(`api/organizationSearch?organizationID=${i.id}`);

			let response = await fetch(url, {
				method: "GET",
				headers: {"Content-Type": "application/json"},
			});

			let org = JSON.parse(await response.text());

			url = buildPath(`api/retrieveImage?typeOfImage=2&id=${org._id}`);

			response = await fetch(url, {
				method: "GET",
				headers: {"Content-Type": "application/json"},
			});
	
			let profilePic = JSON.parse(await response.text());

			// Gets background pic of org
			url = buildPath(`api/retrieveImage?typeOfImage=4&id=${org._id}`);

			response = await fetch(url, {
				method: "GET",
				headers: {"Content-Type": "application/json"},
			});
	
			let background = JSON.parse(await response.text());

            orgs.push(<Org name={org.name} profilePic={profilePic} background={background} description={org.description} id={org._id}/>) 
        }    

		setNumPages(Math.ceil(orgs.length / eventsPerPage))
        setEvents(orgs);

		setInitiateListener(initiateListener * -1);

        let extraBack = 0;
        
        // Need to go a page back due to deletion
        if(((page - 1) * eventsPerPage) >= orgs.length){
            setPage(page - 1);
            extraBack = 1;
        }

        // There were no events prior and now there is one
        if(page === 0 && orgs.length > 0){
            setPage(1);
            extraBack = -1;
        }

        let content = <div className="rowCards cards d-flex flex-row cardWhite card-body">{orgs.slice((page - 1 - extraBack) * eventsPerPage, ((page - 1 - extraBack) * eventsPerPage + eventsPerPage))}</div>
        setEventCards(content);   
	}

    async function getEvents(){
        let events = [];

        for(let i of props.results.current){
			let url = buildPath(`api/searchOneEvent?eventID=${i.id}`);

			let response = await fetch(url, {
				method: "GET",
				headers: {"Content-Type": "application/json"},
			});

			let event = JSON.parse(await response.text());

			// Not found
			if(event.length < 1) continue

			event = event[0];

			url = buildPath(`api/retrieveImage?typeOfImage=1&id=${event._id}`);

			response = await fetch(url, {
				method: "GET",
				headers: {"Content-Type": "application/json"},
			});
	
			let pic = JSON.parse(await response.text());
	
			events.push(<Event name={event.name} pic={pic} startTime={event.startTime} endTime={event.endTime} id={event._id}/>)
        }       

		events.sort(function(a,b){ 
            return b.props.startTime.localeCompare(a.props.startTime)
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

        let content = <div className="rowCards cards d-flex flex-row cardWhite card-body">{events.slice((page - 1 - extraBack) * eventsPerPage, ((page - 1 - extraBack) * eventsPerPage + eventsPerPage))}</div>
        setEventCards(content);
    }

    function EventHeader(){
        return <h1 className='upcomingEvents spartan'>Search Results</h1>
    }
	
    function Event(props) {     
		const startDay = props.startTime.substring(0, props.startTime.indexOf("T"));
		const endDay = props.endTime.substring(0, props.endTime.indexOf("T"));

		let hasEndDate = (startDay !== endDay);

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
								{((props.name.length >= 80) ? (props.name.substring(0, 80) + "...") : props.name)}
                            </Typography>
                            <Typography className="eventDate" variant="body2" color="text.secondary">
								<CalendarIcon className='cardCalendar'/>
								{startDay + ((hasEndDate) ? ("\n-\n      " + endDay)  : "")}
                            </Typography>
                        </CardContent>
                    </Card>
                </CardActionArea>
            </div>
        )
    }

	function Org(props) {      
        return (
            <div className="event spartan">
                <CardActionArea className='test'>
                    <Card className="eventHeight" onClick={() => openOrgPage(props.id)}>
						<div className='logoandbg'>
							<CardMedia
								component="img"
								className='cardBg'
								height="125"
								image={props.background.url}
							/>
							<Avatar
								className='cardLogo'
                              	src={props.profilePic.url}
								sx={{zIndex: 2, position: "absolute", width: 100, height: 100, marginTop: -7, borderStyle: "solid", borderColor: "white"}}
                           />
						</div>
                        <CardContent>
                            <Typography className='eventName' clagutterBottom variant="h6" component="div">
                                {props.name}
                            </Typography>
                            <Typography>
                                {(props.description !== undefined) ? ((props.description.length >= 80) ? (props.description.substring(0, 80) + "...") : props.description) : ""}
                            </Typography>
                        </CardContent>
                    </Card>
                </CardActionArea>
            </div>
        )
    }

    function Events(){
        return (
            <div className="">       
                {eventCards}
            </div>
        )
    }

    useEffect(()=>{
		if(props.searchType === "events")
			getEvents();
		else
			getOrgs();
		// eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    useEffect(()=>{
		if(props.searchType === "events")
			getEvents();
		else
			getOrgs();		
		// eslint-disable-next-line react-hooks/exhaustive-deps
    },[props.reset])

	useEffect(()=>{
		const adjustForSize = () => {
			if(!eventCards) return;
			const width = window.innerWidth;
			
			const oldEventsPerPage = eventsPerPage;

			if(width > 1500){
				setEventsPerPage(12);
				setNumPages(Math.ceil(events.length / 12))
				changePage(null, Math.ceil((((page - 1) * oldEventsPerPage) + 1) / 12), 12);
			}else if(width > 1290){
				setEventsPerPage(9);
				setNumPages(Math.ceil(events.length / 9))
				changePage(null, Math.ceil((((page - 1) * oldEventsPerPage) + 1) / 9), 9);
			}else if(width > 1045){
				setEventsPerPage(6);
				setNumPages(Math.ceil(events.length / 6))
				changePage(null, Math.ceil((((page - 1) * oldEventsPerPage) + 1) / 6), 6);
			}else{
				setEventsPerPage(3);
				setNumPages(Math.ceil(events.length / 3))
				changePage(null, Math.ceil((((page - 1) * oldEventsPerPage) + 1) / 3), 3);
			}
		}

		window.addEventListener("resize", adjustForSize);
	},[initiateListener])

    return(
     <div className='upcomingEventsSpace centerCards'>
        <EventHeader/>
		{(eventCards) ?
		    <div>
				<Events/>
				<Pagination className="pagination" page={page} count={numPages} onChange={changePage} color="secondary" />
			</div>
			: <CircularProgress/>
		}
     </div>
    );
};

export default SearchResults;