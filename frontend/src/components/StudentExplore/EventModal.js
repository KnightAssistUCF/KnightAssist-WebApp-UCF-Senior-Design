import { Avatar, Button, Modal } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import dayjs from 'dayjs';
import CloseIcon from '@mui/icons-material/Close';
import '../OrgEvents/OrgEvents';
import { buildPath } from '../../path';
import { useEffect, useState } from 'react';
import EventIcon from '@mui/icons-material/Event';
import PlaceIcon from '@mui/icons-material/Place';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import Alert from '@mui/material/Alert';
import Tooltip from '@mui/material/Tooltip';
import MapContainer from '../MapContainer/MapContainer';

function EventModal(props)
{
    const handleCloseModal = () => {setIsRSVP(false); setShowMSG(false); setMap(undefined); props.setEventID(undefined); props.setOpen(false);}

    const [name, setName] = useState("");
	const [orgName, setOrgName] = useState("");
	const [orgPic, setOrgPic] = useState(undefined);
    const [id, setID] = useState("");
	const [orgID, setOrgID] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [picLink, setPicLink] = useState(null);
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [curVolunteers, setVolunteers] = useState(0);
    const [maxVolunteers, setMaxVolunteers] = useState(0);
    const [tags, setTags] = useState([]);
    const [isRSVP, setIsRSVP] = useState(false);
    const [showMSG, setShowMSG] = useState(false);
    const [disabled, setDisabled] = useState(false);
	const [hasEndDate, sethasEndDate] = useState(false);
	const [isPast, setIsPast] = useState(false);
	const [map, setMap] = useState(undefined);


	// Event has not happened yet or is not over
	function eventIsUpcoming(endTime){
		return new Date().toISOString().localeCompare(endTime) < 0;
	}

	function openOrgPage(id){
		sessionStorage.setItem("viewingPageID", id);
		window.location.href="/#/orgprofile";    
	}

    async function setInfo(){        
        let url = buildPath(`api/searchOneEvent?eventID=${props.eventID}`);

		console.log(props.eventID);

        let response = await fetch(url, {
            method: "GET",
            headers: {"Content-Type": "application/json"},
        });
    
        let res = JSON.parse(await response.text());

        let event = res[0];

        console.log(event);

        if(event) {
            setName(event.name);
            setID(event._id);
            setDescription(event.description);
            setLocation(event.location);
            setPicLink(event.picLink);
            setStartTime(event.startTime);
            setEndTime(event.endTime);
            setVolunteers(event.registeredVolunteers.length);
            setMaxVolunteers(event.maxAttendees);
            setTags(event.eventTags);

			url = buildPath(`api/organizationSearch?organizationID=${event.sponsoringOrganization}`);

			response = await fetch(url, {
				method: "GET",
				headers: {"Content-Type": "application/json"},
			});

			let org = JSON.parse(await response.text());

			setOrgName(org.name);
			setOrgID(org._id);
			
			url = buildPath(`api/retrieveImage?typeOfImage=2&id=${event.sponsoringOrganization}`);

			response = await fetch(url, {
				method: "GET",
				headers: {"Content-Type": "application/json"},
			});
	
			let orgPic = JSON.parse(await response.text());

			setOrgPic(orgPic.url);

			setIsPast(!eventIsUpcoming(event.endTime));

			const startDay = event.startTime.substring(0, event.startTime.indexOf("T"));
			const endDay = event.endTime.substring(0, event.endTime.indexOf("T"));

			// If the event goes on for more than a day,
			if(startDay !== endDay) sethasEndDate(true);

			url = buildPath(`api/retrieveImage?typeOfImage=1&id=${event._id}`);

			response = await fetch(url, {
				method: "GET",
				headers: {"Content-Type": "application/json"},
			});
	
			let pic = JSON.parse(await response.text());

			setPicLink(pic.url);

			url = buildPath(`api/mapsAPI?address=${event.location}`);

			response = await fetch(url, {
				method: "GET",
				headers: {"Content-Type": "application/json"},
			});
	
			let res = JSON.parse(await response.text());

			if(res['lat'] && res['lng']){
				setMap(<MapContainer title={event.location} lat={res['lat']} lng={res['lng']}/>)
			}else{
				setMap(undefined);
			}

            const json = {
                eventID: event._id,
                eventName: event.name,
                userID: sessionStorage.getItem("ID"),
                check: 1
            };

            url = buildPath(`api/RSVPForEvent`);

            response = await fetch(url, {
                body: JSON.stringify(json),
                method: "POST",
                headers: {"Content-Type": "application/json"},
            });
        
            res = JSON.parse(await response.text());

            console.log("Result: ", res);

            if(res.RSVPStatus === 1){
                setIsRSVP(true);
			}else{
				// Cannot rsvp if event is full
				if(event.registeredVolunteers.length >= event.maxAttendees){
					setIsRSVP(false);
					setDisabled(true);
					setMaxVolunteers(event.maxAttendees + " (FULL)");
				}else{
					setIsRSVP(false);
				}
			}

            console.log(event);
        } else {
            console.log("Event undefined or not found");
        }
    }

    async function doRSVP(){
        if(isRSVP){
            const json = {
                eventID: id,
                eventName: name,
                userID: sessionStorage.getItem("ID"), 
            };

            const url = buildPath(`api/cancelRSVP`);

            const response = await fetch(url, {
                body: JSON.stringify(json),
                method: "DELETE",
                headers: {"Content-Type": "application/json"},
            });
        
            const res = await response.text();

            console.log(res);
			
			setVolunteers(curVolunteers - 1);
        }else{
            const json = {
                eventID: id,
                eventName: name,
                userID: sessionStorage.getItem("ID"),
                check: 0
            };

            const url = buildPath(`api/RSVPForEvent`);

            const response = await fetch(url, {
                body: JSON.stringify(json),
                method: "POST",
                headers: {"Content-Type": "application/json"},
            });
        
            const res = JSON.parse(await response.text());

            console.log("Result: ", res);

			setVolunteers(curVolunteers + 1);
        }

        setIsRSVP(!isRSVP);
        
        setShowMSG(true);
        setDisabled(true);

        props.setResetFavorite(props.resetFavorite * -1);
        props.setResetRecEvents(props.resetRecEvents * -1);
        
        // Remove message after 2 seconds
        setTimeout(() => {
            setShowMSG(false);
            setDisabled(false);
        }, 3000);
    }

    function EventName(){
        return (
            <div className='bigName'>
                {name}
            </div>
        )
    }

	function OrgName(){
		return (
			<Grid container direction="row" sx={{display: 'flex', justifyContent: 'center', marginBottom: 3}}><Avatar className="orgPicModal" src={orgPic}/><a className='hoverOrgName' onClick={() => openOrgPage(orgID)}><b>{orgName}</b></a></Grid>
		)
	}

    function Description(){
        return (
            <div className='description'>
                {description}
            </div>
        )
    }

    function GridIcon(props){
        return (
            <Grid item xs={1}>
                {props.icon}                                 
            </Grid>    
        )
    }

    function GridInfo(props){
        return (
            <Grid item xs={0}>
                {props.info}                             
            </Grid>   
        ) 
    }

    function Volunteers(){
        return (
            <div>
                <p className='lessSpace'>Registered Volunteers:</p>
                <p>{curVolunteers}/{maxVolunteers}</p>
            </div>
        )
    }

    function Tag(props){
        return (
            <Grid item>
                <Card className='eventInterest'>
                    {props.tag}
                </Card>
            </Grid>
        )
    }

    function Tags(){
        return (
                <div>
                    <p>Tags:</p>
                    <Grid marginLeft={"200px"} marginRight={"100px"} marginBottom={"55px"}>
                        {tags.map(t => <Tag tag={t}/>)}
                    </Grid>
                </div>
        )
    }

    function RSVPMessage(){
        
        return (
            <div>
                {(showMSG) === true
                    ?
                        <div>
                            {(isRSVP) ? <Alert severity="success">Event RSVP successful. Check for email confirmation.</Alert> : 
                                        <Alert severity="info">Your RSVP has been cancelled.</Alert>}
                        </div>
                    :
                        null
                }
            </div>
        )
    }

    function RSVPButton(){
        return (
            <Button type="button" sx={{ mt: 6, mr: 1, width: 125, borderRadius: 5, backgroundColor: "#5f5395", "&:hover": {backgroundColor: "#7566b4"}}} variant="contained" disabled={disabled} onClick={() => doRSVP()}>{(isRSVP) ? "Undo RSVP" : "RSVP"}</Button>
        )
    }

    useEffect(()=>{
		if(props.eventID !== undefined){
			setDisabled(false);
        	setInfo();
			if("notoEventId" in sessionStorage){
				props.setOpen(true);
				sessionStorage.removeItem("notoEventId");
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
    },[props.eventID])

    return(
        <Modal sx={{display:'flex', alignItems:'center', justifyContent:'center'}} open={props.open} onClose={handleCloseModal}>
            <div className='center'>
                <Card className='eventModalCard spartan'>
                    <CardContent>
                        <button className='closeAddEvent'>
                            <CloseIcon onClick={() => handleCloseModal()}/>
                        </button>
                        <img className='boxImg' src={picLink} alt=""></img>
        
                        <Container component="main" maxWidth="md">
                            <Box sx={{justifyContent:'center'}} spacing={2} marginTop={"40px"}>
                                <EventName/>

								<OrgName/>

                                <Description/>

                                <Grid container sx={{justifyContent:'center', whiteSpace: 'pre-wrap' }} marginTop={"30px"} marginBottom={"20px"}>
                                    <Grid item width={"20%"}>
                                        <div className='anIcon'>
                                            <Tooltip title="Date" placement="top">
                                                <div>
                                                    <GridIcon icon={<EventIcon/>}/>
                                                </div>
                                            </Tooltip>
                                        </div>
                                        <GridInfo info={startTime.substring(0, startTime.indexOf('T')) + ((hasEndDate) ? ("\n-\n      " + endTime.substring(0, endTime.indexOf('T')))  : "")}/>
                                    </Grid>                 

                                    <Grid item width={"20%"}>
                                        <div className='anIcon'>
                                            <Tooltip title="Location" placement="top">
                                                <div>
                                                    <GridIcon icon={<PlaceIcon/>}/>
                                                </div>
                                            </Tooltip>
                                        </div>
                                        <GridInfo info={location}/>
                                    </Grid>
                                </Grid>

                                <Grid container sx={{justifyContent:'center'}} marginBottom={"30px"}>
                                    <Grid item width={"20%"}>
                                        <div className='anIcon'>
                                            <Tooltip title="Start Time" placement="bottom">
                                                <div>
                                                    <GridIcon icon={<PlayArrowIcon/>}/>
                                                </div>
                                            </Tooltip>
                                        </div>
                                        <GridInfo info={dayjs(startTime).format('hh:mm a')}/>
                                    </Grid>

                                    <Grid item width={"20%"}>
                                        <div className='anIcon'>
                                            <Tooltip title="End Time" placement="bottom">
                                                <div>
                                                    <GridIcon icon={<StopIcon/>}/>
                                                </div>
                                            </Tooltip>
                                        </div>
                                        <GridInfo info={dayjs(endTime).format('hh:mm a')}/>
                                    </Grid>
                                </Grid>

								{(map) ? 
									<Grid container sx={{marginLeft: "30%"}} marginBottom={"30px"}>
										{map}
									</Grid>
									: null
								}

                                <Volunteers/>
                                
								{(tags.length > 0) ? <Tags/> : null}

								<Grid container marginLeft={"42%"} marginTop={"10px"} marginBottom={"20px"}>
									{(!isPast) 
										? 
											<RSVPButton/>
										: null
									}
								</Grid>  

                                <RSVPMessage/>
                            </Box>
                        </Container>
                    </CardContent>   
                </Card>
            </div>
	
        </Modal>
    );
};

export default EventModal;
