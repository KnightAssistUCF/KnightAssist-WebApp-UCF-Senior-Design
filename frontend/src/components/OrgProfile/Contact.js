import { useState, useEffect } from 'react';
import Header from '../OrgEvents/Header';
import './OrgProfile.css';
import OrgTopBar from '../OrgHome/OrgTopBar';
import Card from '@mui/material/Card';
import { Button, Typography, CardContent, TextField } from '@mui/material';
import { buildPath } from '../../path';
import NavTabs from './NavTabs';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PlaceIcon from '@mui/icons-material/Place';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { BiGlobe } from 'react-icons/bi';

function Contact(props) {
  
	const [newEmail, setNewEmail] = useState("");
	const [newPhone, setNewPhone] = useState("");
	const [newWebsite, setNewWebsite] = useState("");
	const [newLocation, setNewLocation] = useState("");
	const [newHours, setNewHours] = useState(undefined);

	const [daysArr, setDaysArr] = useState([]);

	useEffect(() => {
		if(props.editMode){
			setNewEmail(props.org.email);
			props.editInfo.current.email = props.org.email;
			if(props.org.contact){
				setNewPhone(props.org.contact.phone);
				props.editInfo.current.phone = props.org.contact.phone;
				setNewWebsite(props.org.contact.website);
				props.editInfo.current.website = props.org.contact.website;
			}
			setNewLocation(props.org.location);
			props.editInfo.current.location = props.org.location;
			setNewHours(props.org.workingHoursPerWeek);
			props.editInfo.current.hours = props.org.workingHoursPerWeek;
		}
	}, [props.editMode])

	useEffect(() => {
		if(props.org){
			const days = [];
			for(let day in props.org.workingHoursPerWeek)
				days.push([day, props.org.workingHoursPerWeek[day].start, props.org.workingHoursPerWeek[day].end]);
	
			console.log(days);
			setDaysArr(days);
		}
	}, [props.org])

	return (
		<div>
			<div className='contactBox'>
				<div className='navSubTitle'>Contact</div>
				{(props.org.email) ? 
					<div className='profileEmail'>
						<MailOutlineIcon/>
						<div className='navContactText'>
							{(props.editMode) 
								?
									<TextField variant="standard" label="Email" required={false} value={newEmail} onChange={(e) => {setNewEmail(e.target.value); props.editInfo.current.email = e.target.value;}}/>
								:
									<a href='mailto:organizationemail@email.org'>{props.org.email}</a>
							}
						</div>
					</div>
					: ""
				}
				{props.org.contact && props.org.contact.phone ?
					<div className='profileEmail'>
						<PhoneIcon/>
						<div className='navContactText'>
							{(props.editMode) 
								?
									<TextField variant="standard" label="Phone Number" required={false} value={newPhone} onChange={(e) => {setNewPhone(e.target.value); props.editInfo.current.phone = e.target.value;}}/>
								:
									props.org.contact.phone
							}
						</div>
					</div>
					: ""
				}
				{props.org.contact && props.org.contact.website ?
					<div className='profileEmail'>
						<BiGlobe/>
						<div className='navContactText'>
							{(props.editMode)
								?
									<TextField variant="standard" label="Website" required={false} value={newWebsite} onChange={(e) => {setNewWebsite(e.target.value); props.editInfo.current.website = e.target.value;}}/>
								:
									props.org.contact.website
							}
						</div>
					</div>
					: ""
				}
				{props.org.location ?
					<div className='profileEmail'>
						<PlaceIcon/>
						<div className='navContactText'>
							{(props.editMode)
								?
									<TextField variant="standard" label="Location" required={false} value={newLocation} onChange={(e) => {setNewLocation(e.target.value); props.editInfo.current.location = e.target.value;}}/>
								:
									props.org.location
							}
						</div>
					</div>
					: ""
				}
				{props.org.workingHoursPerWeek ?
					<div className='profileEmail'>
						<div className='navContactText'>
							{(props.editMode)
								?
									null
								:
									
									daysArr.map(day => <div>{(day[0].substring(0, 1).toUpperCase() + day[0].substring(1)) + ": " + new Date(day[1]).toLocaleTimeString() + "-" + new Date(day[2]).toLocaleTimeString()}</div>)
									
							}
						</div>
					</div>
					: ""
				}

			</div>
		
		</div>
	);
}

export default Contact;
