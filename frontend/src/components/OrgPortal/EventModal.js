import { Modal } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import {Button} from '@mui/material';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Logo from '../Logo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import CloseIcon from '@mui/icons-material/Close';
import './OrgPortal.css';
import { buildPath } from '../../path';
import { useEffect, useState } from 'react';
import UpcomingEvents from './UpcomingEvents';
import PastEvents from './PastEvents';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CancelIcon from '@mui/icons-material/Cancel';
import CardMedia from '@mui/material/CardMedia';

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
    const [maxVolunteers, setMaxVolunteers] = useState(0);
    const [tags, setTags] = useState([]);
 

    async function setInfo(){
        const eventID = "12345";
        
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
        setMaxVolunteers(event.maxAttendees);
        setTags(event.tagNames);
    }

    function GridTextField(props){
        return (
            <Grid item sx={(props.sx != null) ? props.sx : {}} xs={props.xs} sm={props.sm}>
                <TextField
                    name={props.name}
                    fullWidth
                    required={props.required}
                    label={props.label}
                    autoFocus
                    multiline={props.multiline}
                    minRows={props.minRows}
                    onChange={props.onChange}
                    value={props.value}
                />
            </Grid>
        )
    }

    function DateSelector(props){
        return(
            <Grid item xs={props.xs} sm={props.sm}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker label={props.label} onChange={props.onChange}/>
                </LocalizationProvider>                                      
            </Grid>    
        )
    }

    function TimeSelector(props){
        return (
            <Grid item xs={props.xs} sm={props.sm}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <TimePicker label={props.label} defaultValue={dayjs('2022-04-17T15:30')} onChange={props.onChange}/>
                </LocalizationProvider>                                      
            </Grid>      
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

    function EventName(){
        return (
            <div className='bigName'>
                {name}
            </div>
        )
    }

    function Description(props){
        return (
            <div className='description'>
                {description}
            </div>
        )
    }

    //This is the dialog for when editing moda;
    {
        /*
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
			<Button sx={{color:"red"}} onClick={handleCloseAlert} autoFocus>Delete</Button>
			</DialogActions>
		</Dialog>*/
    }
    
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
                            </Box>
                        </Container>
                    </CardContent>   
                </Card>
            </div>
	
        </Modal>
    );
};

export default EventModal;
