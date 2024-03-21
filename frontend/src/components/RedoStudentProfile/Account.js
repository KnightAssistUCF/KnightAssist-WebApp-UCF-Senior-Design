import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './RedoStudentProfile.css';
import { Button, TextField, Avatar, Dialog, DialogContent, DialogTitle, Grid, Chip, Menu, MenuItem } from '@mui/material';


function Account({info})
{
    const [editMode, setEditMode] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [semesterVolunteerGoal, setSemesterVolunteerGoal] = useState(-1);

    function handleEditModeToggle() {
        setEditMode((prevEditMode) => !prevEditMode);
    }

    function CreatedDate(){
        var date = new Date(info.createdAt);const options = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        const formattedDate = date.toLocaleDateString('en-US', options);

		return (
            <div className='startedVolunteeringDate'><em>Volunteering Since {formattedDate}</em></div>
		)
	}

    useEffect(() => {
        if (info.firstName) {
            setFirstName(info.firstName);
        }
        if (info.lastName) {
            setLastName(info.lastName);
        }
        if (info.email) {
            setEmail(info.email);
        }
        if (info.semesterVolunteerHourGoal) {
            setSemesterVolunteerGoal(info.semesterVolunteerHourGoal);
        }
    }, [info]);

    return(
        <>
        <div className='studentAccountTab'>
            <div className='profileAvatarSettings'>
                <Avatar
                    className='defaultPFP addHover'
                />
                <CreatedDate />
            </div>
            <div className='tabHeader'>Account Information</div>
            <div className='studentAccountFields'>
                <div className='accountFirstName'>
                    <div className='fieldName'>First Name</div>
                    <div className='accountTextfield'>
                    {editMode ? (
                        <TextField
                        size='small'
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        variant='outlined'
                        defaultValue={info.firstName}
                        // sx={{backgroundColor: '#F1F1F1'}}
                        />
                        ) : (
                        <div className='accountFirstNameTextfield'>{info.firstName}</div>
                    )}
                    </div>
                    
                </div>
                <div className='accountLastName'>
                    <div className='fieldName'>Last Name</div>
                    <div className='accountTextfield'>
                        {editMode ? (
                            <TextField
                            size='small'
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            variant='outlined'
                            defaultValue={info.lastName}
                            // sx={{backgroundColor: '#F1F1F1'}}
                            />
                            ) : (
                            <div className='accountLastNameTextfield'>{info.lastName}</div>
                        )}
                    </div>
                </div>
                <div className='accountEmail'>
                    <div className='fieldName'>Email</div>
                    <div className='accountTextfield'>
                        {editMode ? (
                            <TextField
                            size='small'
                            value={email}
                            onChange={(e) => setLastName(e.target.value)}
                            variant='outlined'
                            defaultValue={info.email}
                            // sx={{backgroundColor: '#F1F1F1'}}
                            />
                            ) : (
                            <div className='accountEmailTextfield'>{info.email}</div>
                        )}
                    </div>
                </div>
                <div className='accountSemesterGoal'>
                    <div className='fieldName'>Semester Goal</div>
                    <div className='accountTextfield'>
                        {editMode ? (
                            <TextField
                            size='small'
                            value={semesterVolunteerGoal}
                            onChange={(e) => setSemesterVolunteerGoal(e.target.value)}
                            variant='outlined'
                            defaultValue={info.semesterVolunteerHourGoal}
                            // sx={{backgroundColor: '#F1F1F1'}}
                            />
                            ) : (
                            <div className='accountSemesterVolunteerGoalTextfield'>{info.semesterVolunteerHourGoal}</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
        <div className='accountButtons'>
            <Button variant="contained" onClick={handleEditModeToggle} disableElevation>Edit</Button>
        </div>
        </>
    );
};

export default Account;
