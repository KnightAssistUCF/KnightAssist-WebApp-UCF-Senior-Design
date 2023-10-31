import React, { useState, useCallback } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form} from 'react-bootstrap';
import Logo from '../Logo';
import './StudentHome.css';
import { Modal, Dialog, DialogTitle, Box, DialogActions, Button } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Paper from '@mui/material/Paper';
import StudentHeader from './StudentHeader';



function StudentHome()
{
    
    const defaultVol = 15.0;
    const [open, setModalOpen] = useState(false);
    const [volunteerGoal, setVolunteerGoal] = useState(defaultVol);
    const handleVolunteerGoalChange = (e) => {
        setVolunteerGoal(e.target.value);
    };

   return(
    
      <div id='homePage'>

        <StudentHeader/>
        <div className='moveEverything'>
          <div class="StudentHomePage-title">Welcome, First Last</div>
          <div class="StudentHomePage-subtitle">Fall 2023</div>
          
          <div className="content-container">
            <div class="StudentHomePage-card">
              <p class="upcoming-shift">Next Shift: <strong>Arboretum</strong></p>
              <p class="upcoming-shift-time">October 20th, 12:30pm-3pm</p>
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
          </div>

          <div className="table-group">

          
            <div class="titlesub">Upcoming Volunteer Shifts</div>
            <div class="my-table table-responsive">
              <table className="table table-hover text-nowrap">
              <thead className="thead-dark" class="table-bordered table-light">
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
                        <Button className="cancelButton" variant="contained" color="error" onClick={() => setModalOpen(true)}>Cancel</Button>
                      </td>
                    </tr>
                    <tr>
                      <td>Knight Hacks</td>
                      <td>10/20/23</td>
                      <td>2.5 hours</td>
                      <td>12:30pm</td>
                      <td>3:00pm</td>
                      <td className="text-center">
                        <Button className="cancelButton" variant="contained" color="error" onClick={() => setModalOpen(true)} >Cancel</Button>
                      </td>
                    </tr>
                    <tr>
                      <td>UCF Volunteer</td>
                      <td>10/20/23</td>
                      <td>2.5 hours</td>
                      <td>12:30pm</td>
                      <td>3:00pm</td>
                      <td>
                        <Button className="cancelButton" variant="contained" color="error" onClick={() => setModalOpen(true)}>Cancel</Button>
                      </td>
                    </tr>
              </tbody>
            </table>
        </div>
        </div>

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