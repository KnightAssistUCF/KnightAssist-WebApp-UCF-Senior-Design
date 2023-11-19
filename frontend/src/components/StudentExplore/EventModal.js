import { Modal } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import {Button} from '@mui/material';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import dayjs from 'dayjs';
import CloseIcon from '@mui/icons-material/Close';
import '../OrgPortal/OrgPortal.css';
import { buildPath } from '../../path';
import { useEffect, useState } from 'react';
import EventIcon from '@mui/icons-material/Event';
import PlaceIcon from '@mui/icons-material/Place';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import Alert from '@mui/material/Alert';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const eventPic = require("../Login/loginPic.png");

function EventModal(props)
{
    const handleCloseModal = () => {setIsRSVP(false); setShowMSG(false); props.setEventID(""); props.setOpen(false);}

    const [openAlert, setOpenAlert] = useState(false);
    const tagNames = [];

    const [name, setName] = useState("");
    const [id, setID] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [location, setLocation] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [curVolunteers, setVolunteers] = useState(0);
    const [maxVolunteers, setMaxVolunteers] = useState(0);
    const [tags, setTags] = useState([]);
    const [isRSVP, setIsRSVP] = useState(false);
    const [showMSG, setShowMSG] = useState(false);
    const [disabled, setDisabled] = useState(false);

    async function setInfo(){        
        let url = buildPath(`api/searchOneEvent?eventID=${props.eventID}`);

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
            setDate(event.date);
            setLocation(event.location);
            setStartTime(event.startTime);
            setEndTime(event.endTime);
            setVolunteers(event.attendees.length);
            setMaxVolunteers(event.maxAttendees);
            setTags(event.eventTags);
            
            const json = {
                eventID: event._id,
                eventName: event.name,
                userID: "6519e4fd7a6fa91cd257bfda", // Temporary, will be id of logged in volunteer
                userEmail: "johndoe@example.com",
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

            if(res.RSVPStatus == 1)
                setIsRSVP(true);
            else
                setIsRSVP(false);

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
                userID: localStorage.getItem("token"), 
                userEmail: "johndoe@example.com",
            };

            const url = buildPath(`api/cancelRSVP`);

            const response = await fetch(url, {
                body: JSON.stringify(json),
                method: "DELETE",
                headers: {"Content-Type": "application/json"},
            });
        
            const res = await response.text();

            console.log(res);
        }else{
            const json = {
                eventID: id,
                eventName: name,
                userID: "6519e4fd7a6fa91cd257bfda", // Temporary, will be id of logged in volunteer
                userEmail: "johndoe@example.com",
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

    function RSVPMessage(){
        
        return (
            <div>
                {(showMSG) == true
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
            <button type="button" class="RSVPbtn btn btn-primary" disabled={disabled} onClick={() => doRSVP()}>{(isRSVP) ? "Undo RSVP" : "RSVP"}</button>
        )
    }

    useEffect(()=>{
        console.log("event id called here")
        setInfo();
    },[props.eventID])

    return(
        <Modal sx={{display:'flex', alignItems:'center', justifyContent:'center'}} open={props.open} onClose={handleCloseModal}>
            <div className='center'>
                <Card className='eventModalCard spartan'>
                    <CardContent>
                        <button className='closeAddEvent'>
                            <CloseIcon onClick={() => handleCloseModal()}/>
                        </button>
                        <img className='boxImg' src={eventPic}></img>
                        <Container component="main" maxWidth="md">
                            <Box sx={{justifyContent:'center'}} spacing={2} marginTop={"40px"}>
                                <EventName/>

                                <Description/>

                                <Grid container marginLeft={"30%"} marginTop={"40px"}>
                                    <GridIcon icon={<EventIcon/>}/>
                                    <GridInfo info={date.substring(0, date.indexOf('T'))}/>

                                    <GridIcon icon={<PlaceIcon/>}/>
                                    <GridInfo info={location}/>
                                </Grid>                            

                                <Grid container marginLeft={"30%"} marginTop={"30px"} marginBottom={"40px"}>
                                    <GridIcon icon={<PlayArrowIcon/>}/>
                                    <GridInfo info={dayjs(startTime).format('hh:mm a')}/>

                                    <GridIcon icon={<StopIcon/>}/>
                                    <GridInfo info={dayjs(endTime).format('hh:mm a')}/>
                                </Grid>

                                <Volunteers/>
                                
                                <Tags/>

                                <Grid container marginLeft={"42%"} marginTop={"10px"} marginBottom={"20px"}>
                                    <RSVPButton/>
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
