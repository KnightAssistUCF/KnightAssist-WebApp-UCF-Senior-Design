import React, { useState, useEffect } from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import EditIcon from '@mui/icons-material/Edit';
import { TextField, Button, Alert, Snackbar } from '@mui/material';
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
  const [id, setId] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [message, setMessage] = useState('')
  const [openAlert, setOpenAlert] = useState(true);

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
      setTotalHours(res.totalVolunteerHours);
      setGoal(res.semesterVolunteerHourGoal);
      setId(res._id);
      // get profile pic
    } catch (e) {
      console.log('failed to fetch student info: ' + e);
    }
  };

  async function submitVolunteer(){
		try{
			// Store picture
			// if(picFile !== null && typeof picFile.name === "string"){
			// 	let formData = new FormData();
			// 	formData.append('profilePic', picFile); 
			// 	formData.append('entityType', 'volunteer');
			// 	formData.append('id', sessionStorage.getItem("ID"));
			// 	formData.append('profilePicOrBackGround', '0');

			// 	// Store the picture selected to be associated with the event
			// 	await fetch(buildPath(`api/storeImage`), {
			// 		method: 'POST',
			// 		body: formData
			// 	})
			// 	.then(response => response.json())
			// 	.then(data => console.log(data))
			// 	.catch(error => console.error('Error:', error));
			// }

			const json = 
			{
        _id: id,
				email: email, // use old email to find correct student
				semesterVolunteerHourGoal: goal,
        totalVolunteerHours: totalHours,
        firstName: firstName,
        lastName: lastName,

				// categoryTags: selectedTags
			}
      // saving semesterVolHourGoal + totalVolHours are switched

			const url = buildPath(`api/editUserProfile`);
      //buildPath(`api/userSearch?userID=${sessionStorage.getItem("ID")}`);

            const response = await fetch(url, {
                method: "POST",
                body: JSON.stringify(json),
                headers: {"Content-Type": "application/json",         
				        "Authorization": `Bearer ${sessionStorage.getItem("token")}`}
            });
            if (response.status == 404) {
              setMessage("Error occured, could not save information");
              fetchStudentInfo();

            } else {
              setMessage("Information saved successfully");
            }
            let res = await response.text();
            console.log(res);

		}catch(e){
			console.log(e);
		}
	}

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  useEffect(() => {
    fetchStudentInfo();
  }, []);

  const handleCancel = () => {
    // Reset form values to their initial state
    fetchStudentInfo();
    setEditMode(false);
  };

  const handleEditModeToggle = () => {
    if (editMode) {
      setMessage('');
      setOpenAlert(true);
      submitVolunteer();
    }
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
          <div className='studentDetailsFirst' style={{ marginBottom: editMode ? '4px' : '15px' }}>
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
          <div className='studentDetailsLast' style={{ marginBottom: editMode ? '4px' : '15px' }}>
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
          <div className='studentDetailsEmail' style={{ marginBottom: editMode ? '4px' : '15px' }}>
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
          <div className='studentDetailsInterests' style={{ marginBottom: editMode ? '4px' : '15px' }}>
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
          <div className='studentDetailsTotal' style={{ marginBottom: editMode ? '4px' : '15px' }}>
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
          <div className='studentDetailsGoal' style={{ marginBottom: editMode ? '4px' : '15px' }}>
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
          {editMode && (
            <Button variant='contained' disableElevation   sx={{
              backgroundColor: editMode ? '#808080' : '',
              color: editMode ? 'white' : '',
              '&:hover': {
                backgroundColor: editMode ? '#666666' : '',
              },
              marginRight: '10px',
            }} onClick={handleCancel}>
              Cancel
            </Button>
          )}
          <Button variant='contained' disableElevation onClick={handleEditModeToggle} sx={{backgroundColor: editMode ? '#45a049' : '', '&:hover': {backgroundColor: editMode ? '#3f8e41' : ''} }}>{editMode ? 'Save' : 'Edit'}</Button>
          {message.length !== 0 && (
            <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} open={openAlert} autoHideDuration={3000} onClose={handleCloseAlert}>
              {message.includes("Error") ? (
                <Alert severity="error" onClose={handleCloseAlert}>
                  {message}
                </Alert>
              ) : (
                <Alert severity="success" onClose={handleCloseAlert}>
                  {message}
                </Alert>
              )}
            </Snackbar>
          )}
        </div>
      </div>
    </div>
  );
}

export default StudentDetails;
