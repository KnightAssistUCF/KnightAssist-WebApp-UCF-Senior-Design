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
import Calendar from './Calendar.js';

function StudentHome()
{
  const [open, setModalOpen] = useState(false);
  const [tabSelected, setTabSelected] = useState('Events');
  const [goal, setGoal] = useState(0);
  const [totalHours, setTotalHours] = useState(0);
  const [favOrgs, setFavOrgs] = useState([]);
  const [upcomingRSVPdEvents, setUpcomingRSVPdEvents] = useState([]);
    
    useEffect(() => {
      getStudentInfo();
	  // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    async function getStudentInfo() {
      const email = '';
      const url = buildPath(`api/userSearch?userID=${sessionStorage.getItem("ID")}`);
    
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        let res = JSON.parse(await response.text());
        console.log(res);
        setGoal(res.semesterVolunteerHourGoal);
        setTotalHours(res.totalVolunteerHours);
        setFavOrgs(res.favoritedOrganizations);

        fetchUpcomingEvents(res.eventsRSVP);
    
        
      } catch (error) {
        console.log("An error has occurred" + error);
      }
    }

    function eventIsUpcoming(endTime){
      return new Date().toISOString().localeCompare(endTime) < 0;
    }

    async function fetchUpcomingEvents(allEvents) {
      var upcomingRSVPEvents = [];
      try {
        for(const event of allEvents) {
          var url = buildPath(`api/searchOneEvent?eventID=${event}`);
          const response = await fetch(url, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          });
          let result = JSON.parse(await response.text());
          if (result.length > 0 && result[0].hasOwnProperty('endTime')) {
            if(eventIsUpcoming(result[0].endTime)) {
              upcomingRSVPEvents.push(result[0]);
            }
          }
        }
        setUpcomingRSVPdEvents(upcomingRSVPEvents);
        console.log(upcomingRSVPEvents);
      } catch(e) {
        console.log("fetch upcoming events failed");
      }
    }
    
    

    const handleTabChange = (newValue) => {
      console.log(newValue);
      setTabSelected(newValue);
    };

    useEffect(() => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [upcomingRSVPdEvents]);

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
                    <Typography variant="h6" style={{ textAlign: 'left' }}>{goal}</Typography>
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
                    <Typography variant="h6" style={{ textAlign: 'left' }}>{totalHours}</Typography>
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
                    <Typography variant="h6" style={{ textAlign: 'left' }}>{favOrgs.length}</Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </div>
          <StudentHomeTabs onTabChange={handleTabChange}/>
          {tabSelected === 'Events' && (
            <>
              <Calendar upcomingRSVPdEvents={upcomingRSVPdEvents}/>
            </>
          )}
          {tabSelected === 'FavoritedOrgs' && (
            <>
              sd
            </>
          )}


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
