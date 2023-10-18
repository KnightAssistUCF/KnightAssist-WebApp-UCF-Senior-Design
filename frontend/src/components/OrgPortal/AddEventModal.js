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
import { useState } from 'react';

function AddEventModal(props)
{
    const handleClose = () => props.setOpen(false);

    const [startDate, setStartDate] = useState(new Date());
    const [maxVolunteers, setMaxVolunteers] = useState(0);

    
    /*
    name: String
    description: String,
    location: String,
    date: Date,
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
    __v: {
        type: String,
        required: true,
        default: 0,
        select: false
    }
    */

    function GridTextField(props){
        const event = (props.onChange != undefined) ? props.onChange : () => console.log('test');

        return (
            <Grid item sx={props.sx} xs={props.xs} sm={props.sm}>
                <TextField
                    name={props.name}
                    fullWidth
                    required={props.required}
                    label={props.label}
                    autoFocus
                    multiline={props.multiline}
                    minRows={props.minRows}
                    onChange={event}
                />
            </Grid>
        )
    }

    function DateSelector(props){
        return(
            <Grid item xs={props.xs} sm={props.sm}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker label={props.label} />
                </LocalizationProvider>                                      
            </Grid>    
        )
    }

    function TimeSelector(props){
        return (
            <Grid item xs={props.xs} sm={props.sm}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <TimePicker label={props.label} defaultValue={dayjs('2022-04-17T15:30')} />
                </LocalizationProvider>                                      
            </Grid>      
        )
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
                                    <GridTextField xm={12} sm={12} name="Name" label="Name" required={true} multiline={false}/>
                                    <GridTextField xm={12} sm={12} name="Description" label="Description" require={false} multiline={true} minRows={4}/>                                 
                                    <GridTextField xm={12} sm={12} name="Location" label="Location" required={false} multiline={true}/>

                                    <DateSelector xm={12} sm={6} label="Date"/>

                                    <GridTextField xm={12} sm={6} name="Picture Link" label="Picture Link" required={false} multiline={false}/>

                                    <TimeSelector xm={12} sm={6} label="Start Time"/>  
                                    <TimeSelector xm={12} sm={6} label="End Time"/>  

                                    <GridTextField sx={{marginLeft: 15}} xm={12} sm={5} name="Max Volunteers" label="Max Volunteers" required={false} multiline={true} type={"number"} onChange={(e) => {e.currentTarget.value = e.target.value.replace(/[\D\s]/, '')}}/>
                                </Grid>

                                <div className='addEventHeader'>Social Media</div>
                                <Grid container spacing={2} marginBottom={"30px"}>
                                    <GridTextField xm={12} sm={6} name="Facebook" label={<FacebookIcon/>} required={false} multiline={false}/>
                                    <GridTextField xm={12} sm={6} name="Twitter" label={<TwitterIcon/>} required={false} multiline={false}/>
                                    <GridTextField xm={12} sm={6} name="Instagram" label={<InstagramIcon/>} required={false} multiline={false}/>
                                    <GridTextField xm={12} sm={6} name="Youtube" label={<YouTubeIcon/>} required={false} multiline={false}/>

                                    <GridTextField xm={12} sm={12} name="Website" label="Website" required={false}/>
                                </Grid>

                                <Grid container spacing={2} marginBottom={"30px"}>
                                    <GridTextField xm={12} sm={12} name="Tags" label="Tags" required={false}/>
                                </Grid>

                                <Button
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2, backgroundColor: "#5f5395" }}
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
