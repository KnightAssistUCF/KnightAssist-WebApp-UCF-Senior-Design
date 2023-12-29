import { Modal } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import {Button} from '@mui/material';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import Logo from '../Logo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Alert from '@mui/material/Alert';
import dayjs from 'dayjs';
import CloseIcon from '@mui/icons-material/Close';
import './OrgEvents';
import { buildPath } from '../../path';
import { useEffect, useState, useRef} from 'react';

function AddEventModal(props)
{
    const handleClose = () => {resetValues(); props.setEditMode(0); props.setOpen(false);}

    const fileSelect = useRef();

    const [modalType, setModalType] = useState("Add");
    const [buttonText, setButtonText] = useState("Add");

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("")
    const [date, setDate] = useState(new Date());
    const [startTime, setStartTime] = useState(dayjs('2022-04-17T15:30'));
    const [endTime, setEndTime] = useState(dayjs('2022-04-17T15:30'));
    const semester = "Fall 2023" //This will be implemented some other way later
    const [maxVolunteers, setMaxVolunteers] = useState();
    const [currentTag, setCurrentTag] = useState("");
    const [tags, setTags] = useState([]);
    const [tagNames, setTagNames] = useState([]);

	const [picName, setPicName] = useState(null);
	const [picFile, setPicFile] = useState(null);

    const [redoTags, setRedoTags] = useState(1);
    const [showError, setShowError] = useState(false);

    // Will eventually be an API call to get the tags of an org
    const [definedTags, setDefinedTags] = useState([]);

    function eventIsUpcoming(date){
        date = String(date);
        date = date.substring(0, date.indexOf("T"));
        let today = new Date().toISOString();
        today = today.substring(0, today.indexOf("T"));
        console.log(date, today)
        return date.localeCompare(today) >= 0;
    }

    async function resetValues(){
        setModalType("Add");
        setButtonText("Add");

        setName("");
        setDescription("");
        setLocation("");
        setDate(new Date());
		setPicName(null);
        setPicFile(null);
        setStartTime(dayjs('2022-04-17T15:30'));
        setEndTime(dayjs('2022-04-17T15:30'));
        setMaxVolunteers();
        setCurrentTag("");
        setTags([]);
        setTagNames([]);
        setShowError(false);

        setDefinedTags(await getOrgTags());
    }
    
    async function submitEvent(){
        console.log(tagNames);

        const json = {
            name: name,
            description: description,
            location: location,
            date: date,
            sponsoringOrganization: "6530608eae2eedf04961794e", //ID of organization Y, will be changed to local storage
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

            let res = JSON.parse(await response.text());
            console.log(res);

			const formData = new FormData();
			formData.append('profilePic', picFile); 
			formData.append('entityType', 'event');
			formData.append('id', res.ID);

			// Store the picture selected to be associated with the event
			await fetch(buildPath(`api/storeImage`), {
				method: 'POST',
				body: formData
			})
			.then(response => response.json())
			.then(data => console.log(data))
			.catch(error => console.error('Error:', error));

            if(eventIsUpcoming(date.toISOString()))
                props.setReset(props.reset * -1);
            else
                props.setResetPast(props.resetPast * -1);

            props.setResetSearch(props.resetSearch * -1);

            handleClose();
        }catch(err){
            console.log("An error has occurred: ", err);
        }
    }

    async function editEvent(){
        const json = {
            eventID: props.eventID,
            name: name,
            description: description,
            location: location,
            date: date,
            organizationID: "6530608eae2eedf04961794e",
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

            let res = JSON.parse(await response.text());
            console.log(res);

			// For issue where images are blobs
			if(typeof picFile.name == "string"){
				const formData = new FormData();
				formData.append('profilePic', picFile); 
				formData.append('entityType', 'event');
				formData.append('id', res.ID);
				formData.append('profilePicOrBackGround', '0');

				// Store the picture selected to be associated with the event
				await fetch(buildPath(`api/storeImage`), {
					method: 'POST',
					body: formData
				})
				.then(response => response.json())
				.then(data => console.log(data))
				.catch(error => console.error('Error:', error));
			}
            
            props.setEditMode(0);

            if(eventIsUpcoming(date.toISOString()))
                props.setReset(props.reset * -1);
            else
                props.setResetPast(props.resetPast * -1);
            
            props.setResetSearch(props.resetSearch * -1);
            
            props.openEvent(true);

            resetValues();
            handleClose();
        }catch (err){
            console.log("An error has occurred: ", err);
        }
    }

    function validInput(){
        // The errors are set automatically, this just
        // checks that at least one of them would be set
        if(name == "" || description == "" || location == "" || maxVolunteers == ""){
            setShowError(true);
            return false;
        }

        return true;
    }

    function buttonEvent(){
        if(!validInput()){
            setShowError(true);
            return;
        }

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
                    error={showError && props.required && props.value == ""}
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

	function validateImgSelection(fileSelect){
		// No files selected
		if(fileSelect.current.files.length == 0) return false;
		
		const file = fileSelect.current.files[0].name;
		console.log(file)

		const fileType = file.substring(file.lastIndexOf(".") + 1);

		return fileType == "png" || fileType == "gif" || fileType == "jpg" || fileType == "jpeg";
	}

    function PhotoInput(props){
        return (
            <Grid item xs={props.xs} sm={props.sm}>
				<label for="upload" className="picBtn btn btn-primary">Select Pic</label>
				<div className='imgDemo'>
					{(picName != null) ? <img className="imgDemo" src={URL.createObjectURL(picName)}/> : ""}
				</div>
                <input ref={fileSelect} id="upload" type="file" accept="image/png, image/gif, image/jpg image/jpeg" style={{display:"none"}} onChange={() => {if(validateImgSelection(fileSelect)){setPicName(fileSelect.current.files[0]); setPicFile(fileSelect.current.files[0])}}}/>
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
                    <CloseIcon onClick={() => deleteTag(props.tag)}/>
                    {props.tag}
                </Card>
            </Grid>
        )
    }

    function ErrorMessage(){
        return (
            <div>
                {(showError) == true
                    ?
                        <div>
                            <Alert severity="error">Several fields are empty!</Alert>
                        </div>
                    :
                        null
                }
            </div>
        )
    }

    function deleteTag(tag){        
        console.log(tagNames);
        let idx = tagNames.indexOf(tag);
        const taggy = tags.slice(0, idx).concat(tags.slice(idx + 1));
        setTags([...taggy]);
        const taggyNames = tagNames.slice(0, idx).concat(tagNames.slice(idx + 1));
        console.log(taggyNames)
        setTagNames([...taggyNames]);

        setDefinedTags(definedTags.concat(tag));

        setRedoTags(redoTags * -1);
    }   

    const createTag = () => {

        setTags(tags.concat(<div>
            {Tag({"tag": currentTag})}
        </div>));

        setTagNames(tagNames.concat(currentTag));

        setCurrentTag("");
        let idx = definedTags.indexOf(currentTag);
        setDefinedTags(definedTags.slice(0, idx).concat(definedTags.slice(idx + 1)));

        setRedoTags(redoTags * -1);
    }

    const getOrgTags = async () => {
        const organizationID = "6530608eae2eedf04961794e";
        const url = buildPath(`api/returnSingleOrgTags?organizationID=${organizationID}`);

        try {
            const response = await fetch(url, {
                method: "GET",
                headers: {"Content-Type": "application/json"},
            });

            let res = JSON.parse(await response.text());
            console.log(res);

            return res;
            
        }catch (err){
            console.log("An error has occurred: ", err);
        }
    }

    useEffect(()=>{
        const setTags = async () => {
			setDefinedTags(await getOrgTags());
		}

		setTags();
    }, []);

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
			
			url = buildPath(`api/retrieveImage?entityType=event&id=${event._id}`);

			response = await fetch(url, {
				method: "GET",
				headers: {"Content-Type": "application/json"},
			});
	
			let pic = await response.blob();

			setPicName(pic);
			setPicFile(pic);

            console.log(date, startTime, endTime);

            const taggy = [];
            const taggyNames = [];

            const unusedTags = definedTags;

            for(let tagName of event.eventTags){
                taggy.push(Tag({"tag": tagName}));
                taggyNames.push(tagName);

                // Make sure the available options are of tags not selected
                // for the event already
                unusedTags.splice(unusedTags.indexOf(tagName), 1);
            }
            
            setTags(taggy);
            setTagNames(taggyNames);

            setRedoTags(redoTags * -1);
        }

        if(props.editMode == 1)
            addFields();
    },[props.editMode]);

    // This is due to a bug that occurs when
    // deleting a tag, remakes all of the tags
    useEffect(() => {
        const updatedTags = [];
        const updatedTagNames = [];
 
        for(let str of tagNames){
            updatedTags.push(Tag({"tag": str}));
            updatedTagNames.push(str);
        }

        setTags(updatedTags);
        setTagNames(updatedTagNames);
    }, [redoTags])

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
                                    {GridTextField({xm:12, sm:12, name:"Description", label:"Description", required:true, multiline:true, minRows:4, value:description, onChange:(e) => setDescription(e.target.value)})}                                
                                    {GridTextField({xm:12, sm:12, name:"Location", label:"Location", required:true, multiline:true, value:location, onChange:(e) => setLocation(e.target.value)})}

                                    {DateSelector({xm:12, sm:6, label:"Date", value:date, onChange:(e) => setDate(e)})}

                                    {PhotoInput({xm:12, sm:6})}
            
                                    {TimeSelector({xm:12, sm:6, label:"Start Time", value:startTime, onChange:(e) => setStartTime(e)})}  
                                    {TimeSelector({xm:12, sm:6, label:"End Time", value:endTime, onChange:(e) => setEndTime(e)})}  

                                    {GridTextField({sx:{marginLeft: 15}, xm:12, sm:5, name:"Max Volunteers", label:"Max Volunteers", required:true, multiline:true, type:"number", value:maxVolunteers, onChange:(e) => {e.currentTarget.value = e.target.value.replace(/[\D\s]/, ''); setMaxVolunteers(e.target.value)}})}
                                </Grid>

                                <div className='addEventHeader'>Tags</div>
                                <Grid container spacing={2} marginTop={"65px"} marginBottom={"10px"}>
                                    <Grid item xs={12} sm={6}>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-select-small-label">Select Tag</InputLabel>
                                            <Select
                                                value={currentTag}
                                                label="Select Tag"
                                                onChange={(e) => {console.log(e); setCurrentTag(e.target.value)}}
                                                sx={{fontSize:'large'}}

                                            >
                                                {definedTags.map((tag) => (
                                                    <MenuItem
                                                        key={tag}
                                                        value={tag}
                                                        size
                                                    >
                                                    {tag}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Grid>
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

                                <ErrorMessage/>

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