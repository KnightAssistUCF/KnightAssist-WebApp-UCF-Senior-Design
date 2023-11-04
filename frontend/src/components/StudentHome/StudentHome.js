import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form} from 'react-bootstrap';
import Logo from '../Logo';
import './StudentHome.css';
import { Alert, IconButton, Grid, CardMedia, Modal, Dialog, DialogTitle, Box, DialogActions, Button, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Paper from '@mui/material/Paper';
import StudentHeader from './StudentHeader';
import { buildPath } from '../../path';
import CircularProgress from '@mui/joy/CircularProgress';
import { createTheme } from '@mui/material/styles';



function StudentHome()
{
    
    const defaultVol = 15.0;

    const [userData, setUserData] = useState(null);
    useEffect(() => {
      // Call the API when the component mounts
      getStudentInfo();
    }, []);

    const [open, setOpen] = React.useState(true);



    async function getStudentInfo() {
      const email = 'anisharanjan55@gmail.com';
      const url = buildPath(`api/searchUser?email=${email}`);
    
      try {
        const response = await fetch(url, {
          method: "GET", // Use GET request
          headers: { "Content-Type": "application/json" },
        });
        let res = JSON.parse(await response.text());
        console.log(res);
        console.log(res.firstName);
        setUserData(res);
    
        
      } catch (error) {
        console.log("An error has occurred" + error);
      }
    }
    useEffect(() => {
      console.log(userData); // This will log the updated userData
    }, [userData]);

    const eventPic = require("../Login/loginPic.png");


    




  


   return(
    
      <div id='homePage'>
        <StudentHeader/>
        <div className="studHomePage">
          <div class="StudentHomePage-title">Welcome, {userData.firstName} {userData.lastName}</div>
          <div class="StudentHomePage-subtitle">Fall 2023</div>
          
          {/* first row with upcoming shift and announcements */}
          <div className="first-row">
            {/* upcoming shift card */}
            <div className="next-event">
              <div className="StudentHomePage-subtitle">Next Event</div>
              <Card variant="outlined" sx={{ minWidth: 555,  display: 'flex', marginBottom: '0' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', pl: 1 }}>
                  <CardMedia
                    component="img"
                    sx={{width: 155, marginLeft: '15px', borderRadius: '7px', marginBottom: '0'}}
                    image={require('../Login/loginPic.png')}
                  />
                  <CardContent orientation="horizontal" sx={{ flex: '1 0 auto', textAlign: 'left', marginBottom: '0' }}>
                    <div className="card1-text">
                      <div className="card-title"><strong>Arboretum</strong></div>
                      <div className="card-subtitle">October 20th</div>
                      <div className="card-subtitle">10:00am - 12:00pm</div>
                      <div className="card-subtitle">Location</div>
                    </div>
                    <Grid container justifyContent='flex-end' style={{ marginBottom: '0' }}>
                        <Button className='cancel-position' size="small" variant='contained' color="error" justify="flex-end" style={{ marginRight: '15px' }}>Cancel</Button>
                      </Grid>
                  </CardContent>
                </Box>
              </Card>
            </div>
            {/* announcements */}
            <div className="announcement">
              <div className="StudentHomePage-subtitle">Announcements</div>
                <Card>
                  
                </Card>
            </div>
            
          </div>



          {/* second row with calendar and statistics card */}
          <div className="second-row">

            <div className="calendar">
              <div className="StudentHomePage-subtitle">Calendar</div>
                <Card>

                </Card>
            </div>

            <div className="stat-card">
            <div className="StudentHomePage-subtitle">Stats</div>
              <Card>
                <Box sx={{ position: 'relative', display: 'inline-flex', margin: '20px 20px' }}>
                  <div className="progress-1">
                    <CircularProgress determinate value={66.67} sx={{ '--CircularProgress-size': '80px' }}>
                      2 / 3
                    </CircularProgress>
                    <div className="StudentHomePage-paragraph">Semester</div>
                    <div className="StudentHomePage-paragraph2">3 out of 10</div>
                  </div>
                 
                  <div className="progress-2">
                    <CircularProgress determinate value={66.67} sx={{ '--CircularProgress-size': '80px' }}>
                      2 / 3
                    </CircularProgress>
                    <div className="StudentHomePage-paragraph">Cumulative</div>
                    <div className="StudentHomePage-paragraph2">20 hours</div>
                  </div>
                  
                </Box>
                <Box sx={{margin: '0px 15px 0px 15px'}}>
                  <div className="StudentHomePage-subtitle" style={{ textAlign: 'center' }}>You've accumulated<br />124 points!</div>
                </Box>
                
              </Card>
            </div>
          </div>
          
          
          
          {/* <div className="parent-row">

          
            <div class="StudentHomePage-subtitle2">Next Event</div>
          
            // top row: upcoming shift + announcements 
            <div className="content-container">
              <div class="StudentHomePage-card c1">
                <div className="card1-text">
                  <p class="upcoming-shift"><strong>Arboretum</strong></p>
                  <p class="upcoming-shift-time">October 20th<br />12:30pm-3pm</p>
                  <p class="upcoming-shift-time location">Location</p>
                </div>
              </div>
              <div class="StudentHomePage-card c2">
                <div className="card1-text">
                  <p class="upcoming-shift"><strong>Arboretum</strong></p>
                  <p class="upcoming-shift-time">October 20th<br />12:30pm-3pm</p>
                  <p class="upcoming-shift-time location">Location</p>
                </div>
              </div>
            </div>
          </div> */}

          {/* bottom row: calendar + progress bars */}
          {/* <div className="content-container">
            <div className="StudentHomePage-card">
                <p class="upcoming-shift"><strong>Arboretum</strong></p>
                <p class="upcoming-shift-time">October 20th<br />12:30pm-3pm</p>
                <p class="upcoming-shift-time location">Location</p>
            </div>
            <div className="StudentHomePage-card">
                <p class="upcoming-shift"><strong>Arboretum</strong></p>
                <p class="upcoming-shift-time">October 20th<br />12:30pm-3pm</p>
                <p class="upcoming-shift-time location">Location</p>
            </div>
          </div> */}




        </div>
      </div>
   );
};

export default StudentHome;