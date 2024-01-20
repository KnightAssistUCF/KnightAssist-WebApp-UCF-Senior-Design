import { useState, useEffect } from 'react';
import Header from '../OrgEvents/Header';
import './OrgProfile.css';
import OrgTopBar from '../OrgHome/OrgTopBar';
import Card from '@mui/material/Card';
import { Button, Typography, CardContent, TextField } from '@mui/material';
import { buildPath } from '../../path';
import NavTabs from './NavTabs';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { BiGlobe } from 'react-icons/bi';

function Contact(props) {
  
	const [newEmail, setNewEmail] = useState("");
	const [newPhone, setNewPhone] = useState("");
	const [newWebsite, setNewWebsite] = useState("");

	useEffect(() => {
		if(props.editMode){
			setNewEmail(props.org.email);
			if(props.org.contact){
				setNewPhone(props.org.contact.phone);
				setNewWebsite(props.org.contact.website);
			}
		}
	}, [props.editMode])

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
									<TextField variant="standard" label="Email" required={false} value={newEmail} onChange={(e) => setNewEmail(e.target.value)}/>
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
									<TextField variant="standard" label="Phone Number" required={false} value={newPhone} onChange={(e) => setNewPhone(e.target.value)}/>
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
									<TextField variant="standard" label="Website" required={false} value={newWebsite} onChange={(e) => setNewWebsite(e.target.value)}/>
								:
									props.org.contact.website
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
