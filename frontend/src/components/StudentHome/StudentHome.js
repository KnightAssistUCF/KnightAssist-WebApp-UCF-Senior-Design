import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form} from 'react-bootstrap';
import Logo from '../Logo';
import './StudentHome.css';
import { Divider, List, ListItemButton, ListItemText, Alert, IconButton, Grid, CardMedia, Modal, Dialog, DialogTitle, Box, DialogActions, Button, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Paper from '@mui/material/Paper';
import StudentHeader from './StudentHeader';
import { buildPath } from '../../path';
import CircularProgress from '@mui/joy/CircularProgress';
import { createTheme } from '@mui/material/styles';
import ListItem from '@mui/material/ListItem';



function StudentHome()
{
    
    const defaultVol = 15.0;

    const [userData, setUserData] = useState(null);
    useEffect(() => {
      getStudentInfo();
    }, []);

    const [open, setModalOpen] = useState(false);



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
    
        
      } catch (error) {
        console.log("An error has occurred" + error);
      }
    }

    const eventPic = require("../Login/loginPic.png");


    




  


   return(
    
      <div id='homePage'>
        <StudentHeader/>
        <div className="studHomePage">
          <div class="StudentHomePage-title">Welcome, First Last</div>
          <div class="StudentHomePage-subtitle">Fall 2023</div>
          
          {/* first row with upcoming shift and announcements */}
          <div className="first-row">
            {/* upcoming shift card */}
            <div className="next-event">
              <div className="StudentHomePage-subtitle">Next Event</div>
              <Card variant="outlined" sx={{ minWidth: 555,  display: 'flex', marginBottom: '0', maxHeight: 235 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', pl: 1 }}>
                  <CardMedia
                    component="img"
                    sx={{width: 155, marginLeft: '15px', borderRadius: '7px', marginBottom: '0'}}
                    image={require('../Login/loginPic.png')}
                  />
                  <CardContent orientation="horizontal" sx={{ flex: '1 0 auto', textAlign: 'left', marginTop: '20px' }}>
                    <div className="card1-text">
                      <div className="card-title"><strong>Arboretum</strong></div>
                      <div className="card-subtitle">October 20th</div>
                      <div className="card-subtitle">10:00am - 12:00pm</div>
                      <div className="card-subtitle">Location</div>
                    </div>
                    <Grid container justifyContent='flex-end' style={{ marginBottom: '0' }}>
                        <Button className='cancel-position' size="small" variant='contained' color="error" justify="flex-end" style={{ marginRight: '15px' }} onClick={() => setModalOpen(true)}>Cancel</Button>
                      </Grid>
                  </CardContent>
                </Box>
              </Card>
            </div>
            {/* announcements */}
            <div className="announcement">
              <div className="StudentHomePage-subtitle">Announcements</div>
                <Box sx={{ border: 1, borderColor: 'grey.300', width: '100%', minWidth: '600px', bgcolor: 'background.paper', color: 'black', borderRadius: '3px' }}>
                  <List >
                    <ListItem disablePadding secondaryAction={ <IconButton edge="end" aria-label="close announcement"><CloseIcon /></IconButton>}>
                      <ListItemButton>
                        <ListItemText primary="10-20-23 Arboretum"
                        secondary="sldkfj sdlfjsdlfj sdlfjsdlfjd skfjsgfs sdf dskfhkd kdf fdgdfgjhkdfh sdfd sfdf..." />
                      </ListItemButton>
                    </ListItem>
                    <Divider variant="middle" />
                    <ListItem disablePadding secondaryAction={ <IconButton edge="end" aria-label="close announcement"><CloseIcon /></IconButton>}>
                      <ListItemButton>
                      <ListItemText primary="10-20-23 Knight Hacks"
                        secondary="sldkfjsd lfjsdlfjsdlfjsdl fjdskfj sgfsdf asdfsdf sfdsfsdfsfd..." />
                      </ListItemButton>
                    </ListItem>
                    <Divider variant="middle" />
                    <ListItem disablePadding secondaryAction={ <IconButton edge="end" aria-label="close announcement"><CloseIcon /></IconButton>}>
                      <ListItemButton>
                      <ListItemText primary="10-20-23 Arboretum"
                        secondary="sldkfj sdlfj sdlfjsd sfdsdf fsdf fdsfsdfl jdskfjsgfsdfsdf sfd..." />
                      </ListItemButton>
                    </ListItem>

                  </List>
                </Box>
            </div>
            
          </div>



          {/* second row with calendar and statistics card */}
          <div className="second-row">

            <div className="calendar">
                <Card variant="outlined" sx={{ minWidth: 900,  display: 'flex', marginBottom: '0', maxHeight: 850 }}>

                </Card>
            </div>

            <div className="stat-card">
              <Card variant="outlined" sx={{minWidth: 255}} >
                <Box sx={{ position: 'relative', display: 'inline-flex', margin: '30px 20px' }}>
                  <div className="progress-1">
                    <CircularProgress determinate value={(3/10)*100} sx={{ '--CircularProgress-size': '80px' }}>
                      3 / 10
                    </CircularProgress>
                    <div className="StudentHomePage-paragraph">Semester</div>
                    <div className="StudentHomePage-paragraph2">3 out of 10</div>
                  </div>
                 
                  <div className="progress-2">
                    <CircularProgress determinate value={100} sx={{ '--CircularProgress-size': '80px' }}>
                      20
                    </CircularProgress>
                    <div className="StudentHomePage-paragraph">Cumulative</div>
                    <div className="StudentHomePage-paragraph2">20 hours</div>
                  </div>
                  
                </Box>
                <Box sx={{margin: '0px 15px 35px 15px'}}>
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