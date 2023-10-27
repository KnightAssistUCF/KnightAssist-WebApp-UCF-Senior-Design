import { Modal } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import {Button} from '@mui/material';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import dayjs from 'dayjs';
import CloseIcon from '@mui/icons-material/Close';
import './OrgPortal.css';
import { buildPath } from '../../path';
import { useEffect, useState } from 'react';
import EventIcon from '@mui/icons-material/Event';
import PlaceIcon from '@mui/icons-material/Place';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const eventPic = require("../Login/loginPic.png");

function EventModal(props)
{
    const handleCloseModal = () => {props.setOpen(false);}
    const handleCloseAlert = () => {setOpenAlert(false);}

    const [openAlert, setOpenAlert] = useState(false);
    const tagNames = [];

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [location, setLocation] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [curVolunteers, setVolunteers] = useState(0);
    const [maxVolunteers, setMaxVolunteers] = useState(0);
    const [tags, setTags] = useState([]);
 

    async function setInfo(){        
        let url = buildPath(`api/searchOneEvent?eventID=${props.eventID}`);

        let response = await fetch(url, {
            method: "GET",
            headers: {"Content-Type": "application/json"},
        });
    
        let res = JSON.parse(await response.text());

        let event = res[0];

        console.log(event);
        
        setName(event.name);
        setDescription(event.description);
        setDate(event.date);
        setLocation(event.location);
        setStartTime(event.startTime);
        setEndTime(event.endTime);
        setVolunteers(event.registeredVolunteers.length)
        setMaxVolunteers(event.maxAttendees);
        setTags(event.eventTags);
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
                    <Grid marginLeft={"200px"} marginRight={"100px"}>
                        {tags.map(t => <Tag tag={t}/>)}
                    </Grid>
                </div>
        )
    }

    function edit(){
        handleCloseModal();
        props.setEditMode(1);
        props.setOpenAdd(true);
    }

    async function deleteEvent(){
        const organizationID = "12345";

        const json = {
            eventID: props.eventID,
            organizationID: organizationID
        };

        console.log(json);

        let url = buildPath(`api/deleteSingleEvent`);

        let response = await fetch(url, {
            method: "DELETE",
            body: JSON.stringify(json),
            headers: {"Content-Type": "application/json"},
        });
    
        let res = await response.text();

        console.log(res);

        props.setReset(props.reset * -1);
        handleCloseAlert();
        handleCloseModal();
    }

    // For when edit finishes, so the most recently
    // open event's changes are reflected
    useEffect(()=>{
        if(props.eventID != undefined)
            setInfo();
    }, [props.editMode])
    
    useEffect(()=>{
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
      
                                <Grid container marginLeft={"30%"} marginTop={"150px"}>
                                    <Grid item xs={3}>
                                        Edit: <button className='editEventBtn' onClick={() => edit()}><EditIcon/></button>
                                    </Grid>
                                    <Grid item xs={0}>
                                        Delete: <button className='deleteEventBtn' onClick={() => setOpenAlert(true)}><DeleteForeverIcon/></button>
                                    </Grid>
                                </Grid>   

                                        <Dialog
                                            open={openAlert}
                                            onClose={handleCloseAlert}
                                            aria-labelledby="alert-dialog-title"
                                            aria-describedby="alert-dialog-description"
                                            >
                                                <DialogTitle id="alert-dialog-title">
                                                {"Delete Event?"}
                                                </DialogTitle>
                                                <DialogContent>
                                                <DialogContentText id="alert-dialog-description">
                                                Doing so will remove this event from all volunteer's past and future history. 
                                                </DialogContentText>
                                                </DialogContent>
                                                <DialogActions>
                                                <Button onClick={handleCloseAlert}>Undo</Button>
                                                <Button sx={{color:"red"}} onClick={() => deleteEvent()} autoFocus>Delete</Button>
                                                </DialogActions>
                                        </Dialog> 
                            </Box>
                        </Container>
                    </CardContent>   
                </Card>
            </div>
	
        </Modal>
    );
};

export default EventModal;
