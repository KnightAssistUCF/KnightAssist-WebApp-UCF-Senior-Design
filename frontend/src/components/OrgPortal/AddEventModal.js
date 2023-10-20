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
import { useNavigate, useState } from 'react';
import UpcomingEvents from './UpcomingEvents';
import PastEvents from './PastEvents';

function AddEventModal(props)
{
    console.log("hello");
    const handleClose = () => {setTags([]); props.setOpen(false);}

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("")
    const [date, setDate] = useState(new Date());
    const [picLink, setPicLink] = useState("");
    const [startTime, setStartTime] = useState(dayjs('2022-04-17T15:30'));
    const [endTime, setEndTime] = useState(dayjs('2022-04-17T15:30'));
    const [fbLink, setFBLink] = useState("");
    const [twitterLink, setTwitterLink] = useState("");
    const [igLink, setIGLink] = useState("");
    const [ytLink, setYTLink] = useState("");
    const [webLink, setWebLink] = useState("");
    const semester = "Fall 2023" //This will be implemented some other way later
    const [maxVolunteers, setMaxVolunteers] = useState();
    const [currentTag, setCurrentTag] = useState("");
    const [tags, setTags] = useState([]);

    const tagNames = [];

    /*
    eventID: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    description: String,
    location: String,
    date: Date,
    sponsoringOrganization: {
        type: String,
        required: true
    },
    attendees: [{
        type: Schema.Types.ObjectId,
        ref: 'userStudent',
    }],
    registeredVolunteers: [{
        type: Schema.Types.ObjectId,
        ref: 'userStudent',
    }],
    startTime: Date,
    endTime: Date,
    eventLinks: {
        facebook: String,
        twitter: String,
        instagram: String,
        website: String
    },
    eventTags: [String],
    semester: String,
    maxAttendees: {
        type: Number,
    },
    */
    
    async function submitEvent(){
        const json = {
            eventID: "1234" + name,
            name: name,
            description: description,
            location: location,
            date: date,
            sponsoringOrganization: "12345",
            attendees: [],
            registeredVolunteers: [],
            startTime: startTime,
            endTime: endTime,
            eventLinks: {
                facebook: fbLink,
                twitter: twitterLink,
                instagram: igLink,
                // Youtube will go here when added
                website: webLink,
            },
            eventTags: tagNames,
            semester: semester,
            maxAttendees: maxVolunteers
        };

        console.log(json);

        const url = buildPath("api/addEvent");

        try {
            const response = await fetch(url, {
                method: "POST",
                body: JSON.stringify(json),
                headers: {"Content-Type": "application/json"},
            });

            let res = await response.text();
            console.log(res);
            props.setReset(1);
            handleClose();
        }catch{
            console.log("An error has occurred");
        }
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

    function createTag(){
        tagNames.push(currentTag);
        const taggy = tags;
        setTags([...taggy, <Tag tag={currentTag}/>]);
        setCurrentTag("");
    }

    return(
        <Modal sx={{display:'flex', alignItems:'center', justifyContent:'center'}} open={props.open} onClose={handleClose}>
            <div className='center'>
                <Card className='addEventCard spartan'>
                    <CardContent>
                        <button className='closeAddEvent'>
                            <CloseIcon className='closeHeight' onClick={() => handleClose()}/>
                        </button>
                        <Container component="main" maxWidth="xs">
                            <Box className="boxStyle">
                            <Logo theStyle="logoHeader"/>
                            <Typography component="h1" variant="h5">
                                Add Event
                            </Typography>

                            <Box component="form" noValidate sx={{ mt: 3 }}>
                                <div className='addEventHeader'>Event Info</div>
                                <Grid container spacing={2} marginBottom={"40px"}>
                                    {GridTextField({xm:12, sm:12, name:"Name", label:"Name", required:true, multiline:false, value:name, onChange:(e) => setName(e.target.value)})}
                                    {GridTextField({xm:12, sm:12, name:"Description", label:"Description", require:false, multiline:true, minRows:4, value:description, onChange:(e) => setDescription(e.target.value)})}                                
                                    {GridTextField({xm:12, sm:12, name:"Location", label:"Location", required:false, multiline:true, value:location, onChange:(e) => setLocation(e.target.value)})}

                                    {DateSelector({xm:12, sm:6, label:"Date", value:date, onChange:(e) => setDate(e)})}

                                    {GridTextField({xm:12, sm:6, name:"Picture Link", label:"Picture Link", required:false, multiline:false, value:picLink, onChange:(e) => setPicLink(e.target.value)})}

                                    {TimeSelector({xm:12, sm:6, label:"Start Time", value:startTime, onChange:(e) => setStartTime(e)})}  
                                    {TimeSelector({xm:12, sm:6, label:"End Time", value:endTime, onChange:(e) => setEndTime(e)})}  

                                    {GridTextField({sx:{marginLeft: 15}, xm:12, sm:5, name:"Max Volunteers", label:"Max Volunteers", required:false, multiline:true, type:"number", value:maxVolunteers, onChange:(e) => {e.currentTarget.value = e.target.value.replace(/[\D\s]/, ''); setMaxVolunteers(e.target.value)}})}
                                </Grid>

                                <div className='addEventHeader'>Social Media</div>
                                <Grid container spacing={2} marginBottom={"30px"}>
                                    {GridTextField({xm:12, sm:6, name:"Facebook", label:<FacebookIcon/>, required:false, multiline:false, value:fbLink, onChange:(e) => setFBLink(e.target.value)})}
                                    {GridTextField({xm:12, sm:6, name:"Twitter", label:<TwitterIcon/>, required:false, multiline:false, value:twitterLink, onChange:(e) => setTwitterLink(e.target.value)})}
                                    {GridTextField({xm:12, sm:6, name:"Instagram", label:<InstagramIcon/>, required:false, multiline:false, value:igLink, onChange:(e) => setIGLink(e.target.value)})}
                                    {GridTextField({xm:12, sm:6, name:"Youtube", label:<YouTubeIcon/>, required:false, multiline:false, value:ytLink, onChange:(e) => setYTLink(e.target.value)})}

                                    {GridTextField({xm:12, sm:12, name:"Website", label:"Website", required:false, value:webLink, onChange:(e) => setWebLink(e.target.value)})}
                                </Grid>

                                <div className='addEventHeader'>Tags</div>
                                <Grid container spacing={2} marginTop={"50px"} marginBottom={"10px"}>
                                    {GridTextField({xm:12, sm:6, name:"Tag", label:"Tag", value:currentTag, required:false, onChange:(e) => setCurrentTag(e.target.value)})}
                                    <Button sx={{ mt: 3, mb: 4, ml: 3.5, width: 175, backgroundColor: "#5f5395", "&:hover": {backgroundColor: "#7566b4"}}} variant="contained" onClick={() => createTag()}>Add Tag</Button>
                                    {tags}
                                </Grid>

                                <Button
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2, backgroundColor: "#5f5395", "&:hover": {
                                        backgroundColor: "#7566b4"
                                      }}}
                                    onClick={() => submitEvent()}
                                    >
                                    Add
                                </Button>

                            </Box>
                            </Box>
                        </Container>
                    </CardContent>   
                </Card>
            </div>
        </Modal>
    );
};

export default AddEventModal;
