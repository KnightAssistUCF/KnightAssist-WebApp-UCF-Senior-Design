import React, { useState, useEffect } from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import EditIcon from '@mui/icons-material/Edit';
import { TextField, Button } from '@mui/material';
import { buildPath } from '../../../path.js';
import AdminHeader from '../AdminHeader';
import './StudentDetails.css';
import AdminTopBar from '../AdminTopBar';

function StudentDetails({ studentID }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [tags, setTags] = useState([]);
  const [totalHours, setTotalHours] = useState('');
  const [goal, setGoal] = useState('');
  const [editMode, setEditMode] = useState(false);

  const fetchStudentInfo = async () => {
    console.log(studentID);
    try {
      let url = buildPath(`api/userSearch?userID=${studentID}`);

      let response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
      });

      let res = JSON.parse(await response.text());

      console.log(res);
      setFirstName(res.firstName);
      setLastName(res.lastName);
      setEmail(res.email);
      setTags(res.categoryTags);
      setTotalHours(res.semesterVolunteerHourGoal);
      setGoal(res.totalVolunteerHours);

      // get profile pic
    } catch (e) {
      console.log('failed to fetch student info: ' + e);
    }
  };

  useEffect(() => {
    fetchStudentInfo();
  }, []);

  const handleEditModeToggle = () => {
    setEditMode((prevEditMode) => !prevEditMode);
  };

  return (
    <div>
      <div className='studentDetailsOutline'>
        <AdminHeader />
        <AdminTopBar />
      </div>
      <div className='studentDetailsContent'>
        <Breadcrumbs aria-label='breadcrumb'>
          <Link underline='hover' color='inherit' href='/'>
            Home
          </Link>
          <Typography color='text.primary'>{firstName + ' ' + lastName}</Typography>
        </Breadcrumbs>
        <div className='studentDetailsFields'>
          <div className='studentDetailsFirst' style={{ marginTop: editMode ? '16px' : '0' }}>
            <div className='studentDetailsFirstText'>First Name</div>
            {editMode ? (
              <TextField
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              variant='outlined'
              />
            ) : (
              <div className='studentDetailsFirstText'>{firstName}</div>
            )}
          </div>
          <div className='studentDetailsLast' style={{ marginTop: editMode ? '4px' : '0' }}>
            <div className='studentDetailsLastText'>Last Name</div>
            {editMode ? (
              <TextField
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              variant='outlined'
              />
            ) : (
              <div className='studentDetailsLastText'>{lastName}</div>
            )}
          </div>
          <div className='studentDetailsEmail' style={{ marginTop: editMode ? '4px' : '0' }}>
            <div className='studentDetailsEmailText'>Email</div>
            {editMode ? (
              <TextField
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              variant='outlined'
              />
            ) : (
              <div className='studentDetailsEmailText'>{email}</div>
            )}
          </div>
          <div className='studentDetailsInterests' style={{ marginTop: editMode ? '4px' : '0' }}>
            <div className='studentDetailsInterestsText'>Interests</div>
            <div className='studentDetailsInterestsText'>
              {tags.map((tag, index) => (
                <Chip
                  key={index}
                  label={tag}
                  sx={{ margin: '4px', fontSize: '16px', padding: '10px', color: 'white', backgroundColor: '#5f5395' }}
                />
              ))}
              {editMode && <EditIcon sx={{ marginLeft: '8px', cursor: 'pointer' }} />}
            </div>
          </div>
          <div className='studentDetailsTotal' style={{ marginTop: editMode ? '4px' : '0' }}>
            <div className='studentDetailsTotalText'>Total Volunteer Hours</div>
            {editMode ? (
              <TextField
              value={totalHours}
              onChange={(e) => setTotalHours(e.target.value)}
              variant='outlined'
              />
            ) : (
              <div className='studentDetailsTotalText'>{totalHours}</div>
            )}
          </div>
          <div className='studentDetailsGoal' style={{ marginTop: editMode ? '4px' : '0' }}>
            <div className='studentDetailsGoalText'>Hour Goal</div>
            {editMode ? (
              <TextField
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              variant='outlined'
              />
            ) : (
              <div className='studentDetailsGoalText'>{goal}</div>
            )}
          </div>
        </div>
        <Button variant='contained' disableElevation onClick={handleEditModeToggle}>{editMode ? 'Save' : 'Edit'}</Button>
      </div>
    </div>
  );
}

export default StudentDetails;
