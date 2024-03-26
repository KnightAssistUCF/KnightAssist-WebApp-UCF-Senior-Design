import * as React from 'react';
import './Contact.css';
import { CiLocationOn, CiMail, CiPhone } from 'react-icons/ci';
import { Box, Typography } from '@mui/material';

const ContactItem = ({ icon, label, text }) => (
	<Typography display="inline" alignItems="center" style={{ fontSize: '18px' }}>
		{icon && React.cloneElement(icon, { style: { fontSize: 24 } })}
		<span style={{ fontWeight: 'bold', marginLeft: 10 }}>{label}:</span> {text}
	</Typography>
  );

function Details() {
	return (
		<Box align="left" sx={{ color: '#212121', marginRight: 10, display: 'flex', flexDirection: 'column'}}>
			<ContactItem icon={<CiLocationOn />} label="Address" text="4000 Central Florida Blvd. Orlando, FL 32816" />
			<ContactItem icon={<CiPhone />} label="Phone" text="(321) 415-2583" />
			<ContactItem icon={<CiMail />} label="Email" text="knightassist33@gmail.com" />
		</Box>
	);
}
export default Details;