import React, { useState, useEffect } from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import EditIcon from '@mui/icons-material/Edit';
import { TextField, Button, Alert, Snackbar, Dialog, IconButton } from '@mui/material';
import { buildPath } from '../../../../path.js';
import AdminHeader from '../../AdminHeader.js';
import './StudentDetails.css';
import AdminTopBar from '../../AdminTopBar.js';
import StudentDetailsTable from './StudentDetailsTable.js';
import CancelIcon from '@mui/icons-material/Cancel';

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
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);
  const [allTags, setAllTags] = useState([]);
  const [prevSelectedTags, setPrevSelectedTags] = useState([]);


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
      setUpcomingEvents(res.eventsRSVP);
      setPrevSelectedTags(res.categoryTags);

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

// ...

async function handleEditTags() {
  setOpenModal(true);

  try {
    let url = buildPath(`api/getAllAvailableTags`);

    let response = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    let res = JSON.parse(await response.text());
    console.log(res);

    setAllTags(res);
  } catch (e) {
    console.log('failed to fetch available tags: ' + e);
  }
}






function AllTags({ tags }) {
  return (
    <div>
      <p className='tagQuestion'></p>
      <div className='allTagsBox'>
        {tags.map((name, idx) => (
          <Chip
            key={idx}
            label={name}
            className='tagChip'
            onClick={() => handleTagSelect(name)}
            sx={{
              backgroundColor: prevSelectedTags.includes(name) ? '#5f5395' : 'default',
              color: prevSelectedTags.includes(name) ? 'white' : 'black',
              '&:hover': {
                backgroundColor: prevSelectedTags.includes(name) ? '#5f5395' : 'default',
                color: prevSelectedTags.includes(name) ? 'white' : 'black',
              },
            }}
          />
        ))}
      </div>
    </div>
  );
}


  












// ...


  
  

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  const handleTagSelect = (tag) => {
    if (prevSelectedTags.includes(tag)) {
      setPrevSelectedTags((prevSelectedTags) => {
        // Remove the tag from the array
        return prevSelectedTags.filter((selectedTag) => selectedTag !== tag);
      });
    } else if (selectedTags.includes(tag)) {
      // Check if the tag is already selected in selectedTags
      setSelectedTags((prevSelectedTags) => {
        // Remove the tag from the array
        return prevSelectedTags.filter((selectedTag) => selectedTag !== tag);
      });
    } else {
      // If the tag is not selected, check the total count
      const totalSelectedCount = prevSelectedTags.length + selectedTags.length;
      console.log(totalSelectedCount);
      console.log(prevSelectedTags);
      console.log(selectedTags);
  
      if (totalSelectedCount <= 10) {
        // If the total count is less than 10, add the tag to the arrays
        setPrevSelectedTags((prevSelectedTags) => [...prevSelectedTags, tag]);
        setSelectedTags((prevSelectedTags) => [...prevSelectedTags, tag]);
      } else {
        // Otherwise, do not add more tags
        // You can also show a message or handle this case as needed
      }
    }
  };
  
  
  
  
  

  
  
  
  
  

  // const handleClickOpenModal = () => {
  //   setOpenModal(true);
  // };

  const handleCloseModal = () => {
    setOpenModal(false);
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

  const handleSaveTags = async () => {
    try {
      // Implement logic to save selected tags
      const json = {
        _id: id,
        categoryTags: selectedTags,
      };
  
      const url = buildPath(`api/editUserProfileTags`);
  
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(json),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });
  
      if (response.status === 404) {
        setMessage("Error occurred, could not save tags");
      } else {
        setMessage("Tags saved successfully");
      }
  
      setOpenModal(false);
    } catch (e) {
      console.log("Error saving tags: ", e);
    }
  };
  

  return (
    <div>
      <div className='studentDetailsOutline'>
        <AdminHeader />
        <AdminTopBar />
      </div>
      <div className='studentDetailsContent'>
        <Breadcrumbs aria-label='breadcrumb'>
          <Link underline='hover' color='inherit' href='/#/adminhome'>
            Home
          </Link>
          <Typography color='text.primary'>{firstName + ' ' + lastName}</Typography>
        </Breadcrumbs>
        <div className='studentDetailsFields'>
          <div className='studentDetailsFirst' style={{ marginBottom: editMode ? '10px' : '15px' }}>
            <div className='studentDetailsFirstText'>First Name</div>
            {editMode ? (
              <TextField
              size='small'
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              variant='outlined'
              />
            ) : (
              <div className='studentDetailsFirstText'>{firstName}</div>
            )}
          </div>
          <div className='studentDetailsLast' style={{ marginBottom: editMode ? '10px' : '15px' }}>
            <div className='studentDetailsLastText'>Last Name</div>
            {editMode ? (
              <TextField
              size='small'
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              variant='outlined'
              />
            ) : (
              <div className='studentDetailsLastText'>{lastName}</div>
            )}
          </div>
          <div className='studentDetailsEmail' style={{ marginBottom: editMode ? '10px' : '15px' }}>
            <div className='studentDetailsEmailText'>Email</div>
            {editMode ? (
              <TextField
              size='small'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              variant='outlined'
              />
            ) : (
              <div className='studentDetailsEmailText'>{email}</div>
            )}
          </div>
          <div className='studentDetailsInterests' style={{ marginBottom: editMode ? '10px' : '15px' }}>
            <div className='studentDetailsInterestsText'>Interests</div>
            {tags.length > 0 && (
              <div className='studentDetailsInterestsField'>
                <div className='studentDetailsInterestsTags'>
                  {tags.map((tag, index) => (
                    <Chip
                      key={index}
                      label={tag}
                      sx={{ margin: '4px', fontSize: '16px', padding: '10px', color: 'white', backgroundColor: '#5f5395' }}
                    />
                  ))}
                </div>
                {editMode && <EditIcon sx={{ marginLeft: '8px', cursor: 'pointer' }} onClick={handleEditTags} />}
              </div>
            )}
          </div>
          <div className='studentDetailsTotal' style={{ marginBottom: editMode ? '10px' : '15px' }}>
            <div className='studentDetailsTotalText'>Total Volunteer Hours</div>
            {editMode ? (
              <TextField
              size='small'
              value={totalHours}
              onChange={(e) => setTotalHours(e.target.value)}
              variant='outlined'
              />
            ) : (
              <div className='studentDetailsTotalText'>{totalHours}</div>
            )}
          </div>
          <div className='studentDetailsGoal' style={{ marginBottom: editMode ? '10px' : '15px' }}>
            <div className='studentDetailsGoalText'>Hour Goal</div>
            {editMode ? (
              <TextField
              size='small'
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              variant='outlined'
              />
            ) : (
              <div className='studentDetailsGoalText'>{goal}</div>
            )}
          </div>
          {editMode && (
            <Button variant='outlined' disableElevation   sx={{
              borderColor: editMode ? '#808080' : '',
              color: editMode ? '#666666' : '',
              '&:hover': {
                borderColor: editMode ? '#777777' : '',
                backgroundColor: editMode ? '#f0f0f0' : '',
                // color: editMode ? '#ffffff' : '',
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
        <Dialog
          open={openModal}
          onClose={handleCloseModal}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
                  <IconButton
          aria-label="close"
          onClick={handleCloseModal}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            fontSize: 20,
          }}
        >
          <CancelIcon />
        </IconButton>
                  <div className='modalContent'>
          <AllTags tags={allTags} />
          <Button variant='contained' disableElevation color='success' onClick={handleSaveTags} sx={{marginBottom: '10px', backgroundColor: '#45a049', '&:hover': { backgroundColor: '#3f8e41' }}}>Save</Button>
        </div>
        </Dialog>
        <StudentDetailsTable upcomingEvents={upcomingEvents} />
      </div>
    </div>
  );
}

export default StudentDetails;
