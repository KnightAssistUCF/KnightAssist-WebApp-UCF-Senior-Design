import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './RedoStudentProfile.css';
import { Button, TextField, Avatar, Dialog, DialogContent, DialogTitle, Grid, Chip, Menu, MenuItem } from '@mui/material';
import { buildPath } from '../../path';


function Account({info, fetchStudentInfo})
{
    const [editMode, setEditMode] = useState(false);
    const [picName, setPicName] = useState([]);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [semesterGoal, setSemesterGoal] = useState("");

    function handleEditModeToggle() {
        setEditMode((prevEditMode) => !prevEditMode);
    }
    function handleCancel() {
        setEditMode((prevEditMode) => !prevEditMode);
        setFirstName(info.firstName);
        setLastName(info.lastName);
        setEmail(info.email);
        setSemesterGoal(info.semesterVolunteerHourGoal);
    }

    async function handleSave() {
        setEditMode((prevEditMode) => !prevEditMode);
        
        const json = {
            id: sessionStorage.getItem("ID"),
            firstName: firstName,
            lastName: lastName,
            email: email,
            semesterVolunteerHourGoal: Math.round(Number(semesterGoal)),
            // categoryTags: newSelectedTags
        };

        console.log(json);
        try {
            const url = buildPath("api/editUserProfile");

            const response = await fetch(url, {
                method: "POST",
                body: JSON.stringify(json),
				headers: {"Content-Type": "application/json",         
				"Authorization": `Bearer ${sessionStorage.getItem("token")}`}
			});

            let res = await response.text();
            setFirstName(firstName);
            setLastName(lastName);
            setEmail(email);
            setSemesterGoal(semesterGoal);
        } catch(e) {
            console.log("Failed to save edited information.");
        }




	    //  let formData = new FormData();

		// 	if(picFile){
		// 		formData.append('profilePic', picFile); 
		// 		formData.append('typeOfImage', '3');
		// 		formData.append('id', sessionStorage.getItem("ID"));

		// 		await fetch(buildPath(`api/storeImage`), {
		// 			method: 'POST',
		// 			body: formData
		// 		})
		// 		.then(response => response.json())
		// 		.then(data => console.log(data))
		// 		.catch(error => console.error('Error:', error));
		// 	}

		// 	props.setReset(!props.reset);
        // }catch(err){
        //     console.log("An error has occurred: ", err);
        // }
    }

    async function getProfilePic(){
		let id = sessionStorage.getItem("ID");

		const url = buildPath(`api/retrieveImage?typeOfImage=3&id=${id}`);

		const response = await fetch(url, {
			method: "GET",
			headers: {"Content-Type": "application/json"},
		});

		let pic = JSON.parse(await response.text());

		setPicName(pic.url);
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
        getProfilePic();
        console.log(info);
    }, []);

    useEffect(() => {
        console.log("Received info in Account component:", info);
        // Update component state based on received props
        if (info) {
            setFirstName(info.firstName || "");
            setLastName(info.lastName || "");
            setEmail(info.email || "");
            setSemesterGoal(info.semesterVolunteerHourGoal || 0);
        //     // Additional state updates based on received info
        }
    }, [info]);

    return(
        <>
        <div className='studentAccountTab'>
            <div className='profileAvatarSettings'>
                <Avatar
                    className='defaultPFP addHover'
                    src={(picName !== null) ? picName : "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"}
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
                        defaultValue={firstName}
                        // sx={{backgroundColor: '#F1F1F1'}}
                        />
                        ) : (
                        <div className='accountFirstNameTextfield'>{firstName}</div>
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
                            defaultValue={lastName}
                            // sx={{backgroundColor: '#F1F1F1'}}
                            />
                            ) : (
                            <div className='accountLastNameTextfield'>{lastName}</div>
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
                            onChange={(e) => setEmail(e.target.value)}
                            variant='outlined'
                            defaultValue={email}
                            // sx={{backgroundColor: '#F1F1F1'}}
                            />
                            ) : (
                            <div className='accountEmailTextfield'>{email}</div>
                        )}
                    </div>
                </div>
                <div className='accountSemesterGoal'>
                    <div className='fieldName'>Semester Goal</div>
                    <div className='accountTextfield'>
                        {editMode ? (
                            <TextField
                            size='small'
                            value={semesterGoal}
                            onChange={(e) => setSemesterGoal(e.target.value)}
                            variant='outlined'
                            defaultValue={semesterGoal}
                            // sx={{backgroundColor: '#F1F1F1'}}
                            />
                            ) : (
                            <div className='accountSemesterVolunteerGoalTextfield'>{semesterGoal}</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
        <div className='accountButtons'>
            {editMode ? (
                <div className='accountButtons'>
                    <Button sx={{marginRight: '5px'}} variant="outlined" onClick={handleCancel} disableElevation>Cancel</Button>
                    <Button variant="contained" onClick={handleSave} disableElevation>Save</Button>
                </div>) : (
                    <Button variant="contained" onClick={handleEditModeToggle} disableElevation>Edit</Button>
            )}
            
        </div>
        </>
    );
};

export default Account;
