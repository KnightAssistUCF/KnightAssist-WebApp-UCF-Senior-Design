import { useState, useEffect } from 'react';
import { TextField } from '@mui/material';
import './StudentProfile';

function StudentInfo(props) {
  
	const [newFirstName, setNewFirstName] = useState("");
	const [newLastName, setNewLastName] = useState("");
	const [newEmail, setNewEmail] = useState("");
	const [newGoal, setNewGoal] = useState("");

	useEffect(() => {
		if(props.editMode){
			setNewFirstName(props.user.firstName);
			props.editInfo.current.firstName = props.user.firstName;
			setNewLastName(props.user.lastName);
			props.editInfo.current.lastName = props.user.lastName;
			setNewEmail(props.user.email);
			props.editInfo.current.email = props.user.email;
			setNewGoal(props.user.semesterVolunteerHourGoal);
			props.editInfo.current.goal = props.user.semesterVolunteerHourGoal;
		}
	}, [props.editMode])


	return (
			(props.user) ?

			<div>
				<div className='contactBox'>
					{(props.user.firstName) ? 
						<div className='profileEmail'>
							<div className='navContactText'>
								{(props.editMode) 
									?
										<TextField variant="standard" label="First Name" required={false} value={newFirstName} onChange={(e) => {setNewFirstName(e.target.value); props.editInfo.current.firstName = e.target.value;}}/>
									:
										<div>First Name: {props.user.firstName}</div>
								}
							</div>
						</div>
						: ""
					}
					{(props.user.lastName) ? 
						<div className='profileEmail'>
							<div className='navContactText'>
								{(props.editMode) 
									?
										<TextField variant="standard" label="Last Name" required={false} value={newLastName} onChange={(e) => {setNewLastName(e.target.value); props.editInfo.current.lastName = e.target.value;}}/>
									:
										<div>Last Name: {props.user.lastName}</div>
								}
							</div>
						</div>
						: ""
					}
					{(props.user.email) ? 
						<div className='profileEmail'>
							<div className='navContactText'>
								{(props.editMode) 
									?
										<TextField variant="standard" label="Email" required={false} value={newEmail} onChange={(e) => {setNewEmail(e.target.value); props.editInfo.current.email = e.target.value;}}/>
									:
										<div>Email: {props.user.email}</div>
								}
							</div>
						</div>
						: ""
					}
					{(props.user.semesterVolunteerHourGoal) ? 
						<div className='profileEmail'>
							<div className='navContactText'>
								{(props.editMode) 
									?
										<TextField variant="standard" label="Semester Hourly Goal" required={false} value={newGoal} onChange={(e) => {setNewGoal(e.target.value); props.editInfo.current.goal = e.target.value;}}/>
									:
										<div>Volunteer Hours: {props.user.totalVolunteerHours.toFixed(2)}/{props.user.semesterVolunteerHourGoal}</div>
								}
							</div>
						</div>
						: ""
					}
				</div>
			
			</div>

			: ""
	);
}

export default StudentInfo;
