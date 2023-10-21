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


function StudentHome()
{
  const [open, setModalOpen] = useState(false);

  const defaultVol = 15.0;
  const [volunteerGoal, setVolunteerGoal] = useState(defaultVol);
  const [currentViewName, setCurrentViewName] = useState('month-view');
  const handleVolunteerGoalChange = (e) => {
    setVolunteerGoal(e.target.value);
  };

  const currentDate = '2018-11-01';
  const schedulerData = [
  { startDate: '2023-11-01T09:45', endDate: '2023-11-01T11:00', title: 'Meeting' },
  { startDate: '2023-11-01T12:00', endDate: '2023-11-01T13:30', title: 'Go to a gym' },
];

const handleCurrentViewNameChange = (newViewName) => {
  setCurrentViewName(newViewName);
};  

  


   return(
    
      <div id='homePage'>
        <div class="StudentHomePage-title">Welcome, First Last</div>
        <div className="calendar">
          <Paper>
            <Scheduler
              data={schedulerData}
              height={660}
            >
              <ViewState
                defaultCurrentDate={currentDate}
                currentViewName={currentViewName}
                onCurrentViewNameChange={handleCurrentViewNameChange}
              />
              <MonthView name="month-view" displayName="Month" />
              <WeekView
                startDayHour={10}
                endDayHour={19}
              />
              <DayView />
              <Toolbar />
              <ViewSwitcher />
              <Appointments />
            </Scheduler>
          </Paper>
        </div>
        <div class="content-container">
        
          <div class="progress-bar" style={{ width: 460, height: 150 }}><CircularProgressbar value={(13.0/volunteerGoal)*100} text={'13/'+volunteerGoal} /></div>
          <div class="StudentHomePage-card">
            <p><strong>Fall 2023</strong></p>

            <div class="volunteer-goal">
              <label for="volunteerGoal">Volunteer Hour Goal:</label>
              <input
                type="number"
                id="volunteerGoal"
                value={volunteerGoal}
                onChange={handleVolunteerGoalChange}
              />
            </div>

            <p class="upcoming-shift">Upcoming Shift: <strong>Arboretum</strong></p>
            <p class="upcoming-shift-time">October 20th, 12:30pm-3pm</p>
            
          </div>
        </div>
        <div class="titlesub">Upcoming Volunteer Shifts</div>
        <div class="my-table table-responsive">
          <table className="table table-hover text-nowrap">
          <thead className="thead-dark" class="table-dark">
            <tr>
              <th className="col-2">Organization Name</th>
              <th className="col-1">Date</th>
              <th className="col-1">Duration</th>
              <th className="col-1">Check In</th>
              <th className="col-1">Check Out</th>
              <th className="col-1">Cancel RSVP</th>
            </tr>
          </thead>
          <tbody>
                <tr>
                  <td>Arboretum</td>
                  <td>10/20/23</td>
                  <td>2.5 hours</td>
                  <td>12:30pm</td>
                  <td>3:00pm</td>
                  <td className="text-center">
                    <Button className="cancelButton" variant="outlined" color="error" onClick={() => setModalOpen(true)}>Cancel RSVP</Button>
                  </td>
                </tr>
                <tr>
                  <td>Knight Hacks</td>
                  <td>10/20/23</td>
                  <td>2.5 hours</td>
                  <td>12:30pm</td>
                  <td>3:00pm</td>
                  <td className="text-center">
                    <Button className="cancelButton" variant="outlined" color="error" onClick={() => setModalOpen(true)} >Cancel RSVP</Button>
                  </td>
                </tr>
                <tr>
                  <td>UCF Volunteer</td>
                  <td>10/20/23</td>
                  <td>2.5 hours</td>
                  <td>12:30pm</td>
                  <td>3:00pm</td>
                  <td>
                    <Button className="cancelButton" variant="outlined" color="error" onClick={() => setModalOpen(true)}>Cancel RSVP</Button>
                  </td>
                </tr>
          </tbody>
        </table>
      </div>

        <Dialog open={open} onClose={() => setModalOpen(false)}>
          <DialogTitle>Are you sure you want to cancel your RSVP?</DialogTitle>
          <DialogActions>
            <Button onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button onClick={() => setModalOpen(false)}>Yes</Button>
          </DialogActions>
        </Dialog>



      </div>
   );
};

export default StudentHome;
