import React, { useState, useCallback } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form} from 'react-bootstrap';
import Logo from '../Logo';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './StudentHome.css';
import { Modal, Dialog, DialogTitle, Box, DialogActions, Button } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Paper from '@mui/material/Paper';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  DayView,
  WeekView,
  MonthView,
  Appointments,
  Toolbar,
  ViewSwitcher
} from '@devexpress/dx-react-scheduler-material-ui';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';


function StudentHome()
{
  const [open, setModalOpen] = useState(false);

  const defaultVol = 15.0;
  const [volunteerGoal, setVolunteerGoal] = useState(defaultVol);
  const [currentViewName, setCurrentViewName] = useState('month-view');
  const handleVolunteerGoalChange = (e) => {
    setVolunteerGoal(e.target.value);
  };




  


   return(
    
      <div id='homePage'>
        <div class="StudentHomePage-title">Welcome, First Last</div>
        <div class="StudentHomePage-subtitle">Fall 2023</div>
        <div className="StudentHomePage-subtitle">Next Event</div>
        <div className="content-container">
          <div class="StudentHomePage-card">
            {/* upcoming shift */}
            <p class="upcoming-shift">Next Shift: <strong>Arboretum</strong></p>
            <p class="upcoming-shift-time">October 20th, 12:30pm-3pm</p>
            <div class="progress-bar" style={{ height: 110 }}><CircularProgressbar value={(13.0/volunteerGoal)*100} text={'13/'+volunteerGoal} /></div>
            <div class="volunteer-goal">
              <label for="volunteerGoal">Volunteer Hour Goal:</label>
              <input
                // type="number"
                id="volunteerGoal"
                value={volunteerGoal}
                onChange={handleVolunteerGoalChange}
              />
            </div>
          </div>


          {/* Notifications */}
          <div className="notifications">
            <p className="not-title">Notifications</p>
              <Stack sx={{ width: '100%' }} spacing={1}>
                <Alert onClose={() => {}}>This is a success alert — check it out!</Alert>
                <Alert onClose={() => {}}>This is a success alert — check it out!</Alert>
                <Alert onClose={() => {}}>This is a success alert — check it out!</Alert>
            </Stack>
                
          </div>
        </div>

        <div className="content-container">
          <div className="StudentHomePage-card">
            CALENDAR
          </div>
          <div className="StudentHomePage-card">
            <div class="progress-bar" style={{ height: 110 }}><CircularProgressbar value={(13.0/volunteerGoal)*100} text={'13/'+volunteerGoal} /></div>
              <div class="volunteer-goal">
                <label for="volunteerGoal">Volunteer Hour Goal: 15</label>

              </div>
            </div>
        </div>

        




      </div>
   );
};

export default StudentHome;

// 1 minute manager
