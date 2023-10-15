import React, { useState, useCallback } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button} from 'react-bootstrap';
import Logo from '../Logo';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './StudentHome.css';


function StudentHome()
{
   return(
      <div className='homePage'>
        <div class="StudentHomePage-title">Welcome, First Last</div>
        <div class="progress-bar" style={{ width: 460, height: 150 }}><CircularProgressbar value={86} text={`13/15`} /></div>
        <div class="titlesub">Upcoming Volunteer Shifts</div>
        <div class="my-table">
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
                    <Button className="btn-danger" >Cancel RSVP</Button>
                  </td>
                </tr>
                <tr>
                  <td>Knight Hacks</td>
                  <td>10/20/23</td>
                  <td>2.5 hours</td>
                  <td>12:30pm</td>
                  <td>3:00pm</td>
                  <td className="text-center">
                    <Button className="btn-danger" >Cancel RSVP</Button>
                  </td>
                </tr>
                <tr>
                  <td>UCF Volunteer</td>
                  <td>10/20/23</td>
                  <td>2.5 hours</td>
                  <td>12:30pm</td>
                  <td>3:00pm</td>
                  <td>
                    <Button className="btn-danger" >Cancel RSVP</Button>
                  </td>
                </tr>
              
            
          </tbody>
        </table>
      </div>
      </div>
   );
};

export default StudentHome;
