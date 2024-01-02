import { Modal } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import {Button} from '@mui/material';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import dayjs from 'dayjs';
import CloseIcon from '@mui/icons-material/Close';
import './OrgEvents';
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
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';

const avatarPic = require("./DefaultPic.png");

function EventModal(props)
{
    const handleCloseModal = () => {props.setOpen(false);}
    const handleCloseAlert = () => {setOpenAlert(false);}

    const [openAlert, setOpenAlert] = useState(false);
    const [openVolunteers, setOpenVolunteers] = useState(false);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [picLink, setPicLink] = useState(null);
    const [location, setLocation] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [curVolunteers, setCurVolunteers] = useState(0);
    const [maxVolunteers, setMaxVolunteers] = useState(0);
    const [volunteerInfo, setVolunteerInfo] = useState([]);
    const [tags, setTags] = useState([]);

	// If the event has started, you can generateACode
	const [canGenerateCodes, setCanGenerateCodes] = useState(false);
 
    function eventIsUpcoming(date){
        date = String(date);
        date = date.substring(0, date.indexOf("T"));
        let today = new Date().toISOString();
        today = today.substring(0, today.indexOf("T"));
        return date.localeCompare(today) >= 0;
    }

	// Codes can be made if the currently occuring,
	// with some buffer
	function eventIsOccuring(date){
		date = String(date);
        date = date.substring(0, date.indexOf("T"));

        let today = new Date().toISOString();
        today = today.substring(0, today.indexOf("T"));

		let yesterday = new Date(new Date().setDate(new Date().getDate() - 1)).toISOString();
		yesterday = yesterday.substring(0, yesterday.indexOf("T"));
		
		let tomorrow = new Date(new Date().setDate(new Date().getDate() + 1)).toISOString();
		tomorrow = tomorrow.substring(0, tomorrow.indexOf("T"));

        return date.localeCompare(today) == 0 || date.localeCompare(yesterday) == 0 || date.localeCompare(tomorrow) == 0;
	}

    async function getVolunteerInfo(id){

        console.log(localStorage.getItem("token"))
        let url = buildPath(`api/userSearch?userID=${id}`);

        let response = await fetch(url, {
            method: "GET",
            headers: {"Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
            }        
        });
    
        let res = JSON.parse(await response.text());

        console.log(res);
        
        return {"name": res.firstName + " " + res.lastName, "profilePic": res.profilePic, "userID": res._id};
    }

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
                setDescription(event.description);
                setDate(event.date);
                setLocation(event.location);
                setStartTime(event.startTime);
                setEndTime(event.endTime);
                setCurVolunteers(event.attendees.length)
                setMaxVolunteers(event.maxAttendees);
                setTags(event.eventTags);

				url = buildPath(`api/retrieveImage?entityType=event&id=${event._id}`);

				response = await fetch(url, {
					method: "GET",
					headers: {"Content-Type": "application/json"},
				});
		
				let pic = await response.blob();

				setPicLink(URL.createObjectURL(pic));

                const volunteers = [];

                for(let id of event.attendees)
                    volunteers.push(await getVolunteerInfo(id));

                setVolunteerInfo(volunteers);

				setCanGenerateCodes(eventIsOccuring(event.date));
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

    function VolunteerItem(props){
        console.log(props.info);
        return (
            <ListItemButton className='volunteerItem'>
                <Avatar
                    src={avatarPic}
                    className="volunteerPic"
                />
                <ListItemText className="volunteerName" primary={props.info.name} />
            </ListItemButton>
        )
    }


    function Volunteers(){
        return (
            <div>
                <button className="volunteersBtn" onClick={() => {if(curVolunteers > 0) setOpenVolunteers(!openVolunteers)}}>
                    <p className='lessSpace'>Registered Volunteers:</p>
                    <p>{curVolunteers}/{maxVolunteers}</p>
                </button>

                <Collapse in={openVolunteers} timeout="auto" unmountOnExit>
                    <List className="volunteerList" component="div" disablePadding>
                        {volunteerInfo.map(info => <VolunteerItem info={info}/>)}
                    </List>
                </Collapse>
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
        const organizationID = "6530608eae2eedf04961794e";

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

        if(eventIsUpcoming(date))
            props.setReset(props.reset * -1);
        else
            props.setResetPast(props.resetPast * -1);  

        props.setResetSearch(props.resetSearch * -1);
    
        handleCloseAlert();
        handleCloseModal();
    }

    // For when edit finishes, so the most recently
    // open event's changes are reflected
    useEffect(()=>{
        if(props.eventID !== undefined)
            setInfo();

		// eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.editMode])
    
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

                                <Grid container sx={{justifyContent:'center'}} marginTop={"30px"} marginBottom={"20px"}>
                                    <Grid item width={"20%"}>
                                        <div className='anIcon'>
                                            <Tooltip title="Date" placement="top">
                                                <div>
                                                    <GridIcon icon={<EventIcon/>}/>
                                                </div>
                                            </Tooltip>
                                        </div>
                                        <GridInfo info={date.substring(0, date.indexOf('T'))}/>
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

                                {Volunteers()}

								{(tags.length > 0) ? <Tags/> : null}

								<Grid container sx={{justifyContent:'center'}} marginTop={"15%"} marginLeft={"1%"}>
									<Grid item xs={4}>
										<Button disabled={!canGenerateCodes} sx={{ mt: 3, width: 165, borderRadius: 8, backgroundColor: "#5f5395", "&:hover": {backgroundColor: "#7566b4"}}} variant="contained" onClick={null}>Generate Check-In Code</Button>

									</Grid>
									<Grid item xs={4}>
										<Button disabled={!canGenerateCodes} sx={{ mt: 3, width: 165, borderRadius: 8, backgroundColor: "#5f5395", "&:hover": {backgroundColor: "#7566b4"}}} variant="contained" onClick={null}>Generate Check-Out Code</Button>
									</Grid>
								</Grid>   
      
                                <Grid container marginLeft={"30%"} marginTop={"50px"}>
                                    <Grid item xs={3}>
                                        <Tooltip title="Edit" placement="top">
                                            <button className='editEventBtn' onClick={() => edit()}><EditIcon/></button>
                                        </Tooltip>
                                    </Grid>
                                    <Grid item xs={0}>
                                        <Tooltip title="Delete" placement="top">
                                            <button className='deleteEventBtn' onClick={() => setOpenAlert(true)}><DeleteForeverIcon/></button>
                                        </Tooltip>
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
