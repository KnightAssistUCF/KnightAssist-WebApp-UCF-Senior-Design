import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './StudentHome.css';
import { Typography, Avatar, CardHeader, Divider, List, ListItemButton, ListItemText, IconButton, Grid, CardMedia, Dialog, DialogTitle, Box, DialogActions, Button} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import StudentHeader from './StudentHeader';
import { buildPath } from '../../path';
import CircularProgress from '@mui/joy/CircularProgress';
import ListItem from '@mui/material/ListItem';
import StudentTopBar from '../TopBar/StudentTopBar';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import TimelapseIcon from '@mui/icons-material/Timelapse';
import StudentHomeTabs from './StudentHomeTabs.js';

function StudentHome()
{
    
    useEffect(() => {
	  console.log(sessionStorage)
      getStudentInfo();
	  // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [open, setModalOpen] = useState(false);
    const [tabSelected, setTabSelected] = useState('Events');

    async function getStudentInfo() {
      const email = '';
      const url = buildPath(`api/searchUser?email=${email}`);
    
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        let res = JSON.parse(await response.text());
        console.log(res);
        console.log(res.firstName);
    
        
      } catch (error) {
        console.log("An error has occurred" + error);
      }
    }
    
    const [items, setItems] = useState([
      { id: 1, primary: '10-20-23 Arboretum', secondary: 'sldkfj sdlfjsdlfj sdlfjsdlfjd skfjsgfs sdf dskfhkd kdf fdgdfgjhkdfh sdfd sfdf...' },
      { id: 2, primary: '10-20-23 Knight Hacks', secondary: 'sldkfjsd lfjsdlfjsdlfjsdl fjdskfj sgfsdf asdfsdf sfdsfsdfsfd...' },
      { id: 3, primary: '10-20-23 Another Event', secondary: 'sldkfj sdlfj sdlfjsd sfdsdf fsdf fdsfsdfl jdskfjsgfsdfsdf sfd...' },
      { id: 4, primary: '10-20-23 Another Event', secondary: 'sldkfj sdlfj sdlfjsd sfdsdf fsdf jdskfjsgfsdfsdf sfd...' },
    ]);
    const limitedItems = items.slice(0, 3);
  
    const handleItemClose = (itemId) => {
      const updatedItems = items.filter((item) => item.id !== itemId);
      setItems(updatedItems);
    };

    const handleTabChange = (newValue) => {
      console.log(newValue);
      setTabSelected(newValue);
    };

   return(
    
      <div className='spartan' id='homePage'>
        <StudentHeader/>
        <StudentTopBar/>
        <div className="studHomePage">
          
          <div className='card-row'>
          <Card variant='outlined' className='home-card'>
              <CardContent>
                <Grid container spacing={3} alignItems="center">
                  <Grid item>
                    <Avatar aria-label="icon" style={{ backgroundColor: '#A4C5D0' }}><TimelapseIcon style={{ color: 'black' }}/></Avatar>
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle1" color="textSecondary" style={{ textAlign: 'left' }}>Goal</Typography>
                    <Typography variant="h6" style={{ textAlign: 'left' }}>Card Title</Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
            <Card variant='outlined' className='home-card'>
              <CardContent>
                <Grid container spacing={3} alignItems="center">
                  <Grid item>
                    <Avatar aria-label="icon" style={{ backgroundColor: '#A4D0AE' }}><TaskAltIcon style={{ color: 'black' }}/></Avatar>
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle1" color="textSecondary" style={{ textAlign: 'left' }}>Total hours</Typography>
                    <Typography variant="h6" style={{ textAlign: 'left' }}>Card Title</Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
            <Card variant='outlined' className='home-card'>
              <CardContent>
                <Grid container spacing={3} alignItems="center">
                  <Grid item>
                    <Avatar aria-label="icon" style={{ backgroundColor: '#B99EE6' }}><CalendarTodayIcon style={{ color: 'black' }}/></Avatar>
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle1" color="textSecondary" style={{ textAlign: 'left' }}>Events</Typography>
                    <Typography variant="h6" style={{ textAlign: 'left' }}>Card Title</Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
            <Card variant='outlined' className='home-card'>
              <CardContent>
                <Grid container spacing={3} alignItems="center">
                  <Grid item>
                    <Avatar aria-label="icon" style={{ backgroundColor: '#F9AFAF' }}><FavoriteBorderIcon style={{ color: 'black' }}/></Avatar>
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle1" color="textSecondary" style={{ textAlign: 'left' }}>Organizations</Typography>
                    <Typography variant="h6" style={{ textAlign: 'left' }}>Card Title</Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </div>
          <StudentHomeTabs onTabChange={handleTabChange}/>


        <Dialog open={open} onClose={() => setModalOpen(false)}>
          <DialogTitle>Are you sure you want to cancel your RSVP?</DialogTitle>
          <DialogActions>
            <Button onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button onClick={() => setModalOpen(false)}>Yes</Button>
          </DialogActions>
        </Dialog>




        </div>
      </div>
   );
};

export default StudentHome;
