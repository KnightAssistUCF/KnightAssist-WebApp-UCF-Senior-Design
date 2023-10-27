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
import CloseIcon from '@mui/icons-material/Close';
import './OrgPortal.css';
import { buildPath } from '../../path';
import { useEffect, useState } from 'react';

function AddEventModal(props)
{
    const handleClose = () => {resetValues(); props.setEditMode(0); props.setOpen(false);}

    const [modalType, setModalType] = useState("Add");
    const [buttonText, setButtonText] = useState("Add");

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("")
    const [date, setDate] = useState(new Date());
    const [picLink, setPicLink] = useState("");
    const [startTime, setStartTime] = useState(dayjs('2022-04-17T15:30'));
    const [endTime, setEndTime] = useState(dayjs('2022-04-17T15:30'));
    const semester = "Fall 2023" //This will be implemented some other way later
    const [maxVolunteers, setMaxVolunteers] = useState();
    const [currentTag, setCurrentTag] = useState("");
    const [tags, setTags] = useState([]);
    const [tagNames, setTagNames] = useState([]);

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

    function eventIsUpcoming(date){
        return new Date().toISOString() < new Date(date).toISOString();
    }

    function resetValues(){
        setModalType("Add");
        setButtonText("Add");

        setName("");
        setDescription("");
        setLocation("");
        setDate(new Date());
        setPicLink("");
        setStartTime(dayjs('2022-04-17T15:30'));
        setEndTime(dayjs('2022-04-17T15:30'));
        setMaxVolunteers();
        setCurrentTag("");
        setTags([]);
        setTagNames([]);
    }
    
    async function submitEvent(){
        console.log(tagNames);

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

            if(eventIsUpcoming(date))
                props.setReset(props.reset * -1);
            else
                props.setResetPast(props.resetPast * -1);

            handleClose();
        }catch{
            console.log("An error has occurred");
        }
    }

    async function editEvent(){
        const json = {
            eventID: props.eventID,
            name: name,
            description: description,
            location: location,
            date: date,
            organizationID: "12345",
            attendees: [],
            registeredVolunteers: [],
            startTime: startTime,
            endTime: endTime,
            eventTags: tagNames,
            semester: semester,
            maxAttendees: maxVolunteers
        };

        console.log(json);

        const url = buildPath("api/editEvent");

        try {
            const response = await fetch(url, {
                method: "POST",
                body: JSON.stringify(json),
                headers: {"Content-Type": "application/json"},
            });

            let res = await response.text();
            console.log(res);
            
            props.setEditMode(0);

            if(eventIsUpcoming(date))
                props.setReset(props.reset * -1);
            else
                props.setResetPast(props.resetPast * -1);            
            
            props.openEvent(true);

            resetValues();
            handleClose();
        }catch (err){
            console.log("An error has occurred: ", err);
        }
    }

    function buttonEvent(){
        if(modalType == "Add")
            submitEvent();
        else
            editEvent();
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
        const taggy = tags;
        setTags([...taggy, <Tag tag={currentTag}/>]);
        const taggyNames = tagNames;
        setTagNames([...taggyNames, currentTag]);
        setCurrentTag("");
    }

    useEffect(()=>{
        const addFields = async () => {
            let url = buildPath(`api/searchOneEvent?eventID=${props.eventID}`);

            let response = await fetch(url, {
                method: "GET",
                headers: {"Content-Type": "application/json"},
            });
        
            let res = JSON.parse(await response.text());

            let event = res[0];

            console.log(event);

            setModalType("Edit");
            setButtonText("Save Changes");
            
            setName(event.name);
            setDescription(event.description);
            setDate(new Date(event.date));
            setLocation(event.location);
            setStartTime(dayjs(event.startTime));
            setEndTime(dayjs(event.endTime));
            setMaxVolunteers(event.maxAttendees);

            console.log(date, startTime, endTime);

            const taggy = [];
            const taggyNames = [];

            for(let tagName of event.eventTags){
                taggy.push(<Tag tag={tagName}/>)
                taggyNames.push(tagName);
            }
            
            setTags(taggy);
            setTagNames(taggyNames);
        }

        if(props.editMode == 1)
            addFields();
    },[props.editMode])

    return(
        <Modal sx={{display:'flex', alignItems:'center', justifyContent:'center'}} open={props.open} onClose={handleClose}>
            <div className='center'>
                <Card className='addEventModalCard spartan'>
                    <CardContent>
                        <button className='closeAddEvent'>
                            <CloseIcon onClick={() => handleClose()}/>
                        </button>
                        <Container component="main" maxWidth="xs">
                            <Box className="boxStyle">
                            <Logo theStyle="logoHeader"/>
                            <Typography component="h1" variant="h5">
                                {modalType} Event
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
                                    onClick={() => buttonEvent()}
                                    >
                                    {buttonText}
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
