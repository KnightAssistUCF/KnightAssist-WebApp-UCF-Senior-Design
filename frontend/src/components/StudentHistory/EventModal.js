import { Modal } from '@mui/material';
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
import Tooltip from '@mui/material/Tooltip';

function EventModal(props)
{
    const handleCloseModal = () => {props.setEventID(undefined); props.setOpen(false);}

    const [name, setName] = useState("");
    //const [id, setID] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [picLink, setPicLink] = useState(null);
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [curVolunteers, setVolunteers] = useState(0);
    const [maxVolunteers, setMaxVolunteers] = useState(0);
    const [tags, setTags] = useState([]);

	const [hasEndDate, sethasEndDate] = useState(false);


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
            //setID(event._id);
            setDescription(event.description);
            setLocation(event.location);
            setPicLink(event.picLink);
            setStartTime(event.startTime);
            setEndTime(event.endTime);
            setVolunteers(event.attendees.length);
            setMaxVolunteers(event.maxAttendees);
            setTags(event.eventTags);

			url = buildPath(`api/retrieveImage?entityType=event&id=${event._id}`);

			response = await fetch(url, {
				method: "GET",
				headers: {"Content-Type": "application/json"},
			});
	
			let pic = await response.blob();

			setPicLink(URL.createObjectURL(pic));

            console.log(event);
        } else {
            console.log("Event undefined or not found");
        }
    }

    function EventName(){
        return (
            <div className='bigName'>
                {name}
            </div>
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
                <p className='lessSpace'>Total Volunteers:</p>
                <p>{curVolunteers}/{maxVolunteers}</p>
            </div>
        )
    }

    function Tag(props){
        return (
            <Grid item>
                <Card className='tag'>
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

    useEffect(()=>{
		if(props.eventID !== undefined)
        	setInfo();
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

                                <Volunteers/>
                                
								{(tags.length > 0) ? <Tags/> : null}
                            </Box>
                        </Container>
                    </CardContent>   
                </Card>
            </div>
	
        </Modal>
    );
};

export default EventModal;
