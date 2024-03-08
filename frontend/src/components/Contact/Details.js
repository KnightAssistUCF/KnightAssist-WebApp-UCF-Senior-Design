import * as React from 'react';
import Lottie from "lottie-react";
import animationData from './contactPageAnimation';
import useStyles from '../../PreLogin/PreLoginStyles';
import './Contact.css';
import { CiLocationOn, CiMail, CiPhone } from 'react-icons/ci';
import { Box, Typography } from '@mui/material';

function Details() {
	const classes = useStyles();

	function Location(){
		return (
			<div className='contactUsInfo'>
				<span style={{ fontWeight: 'bold', marginLeft: 10}}> Address:</span> 4000 Central Florida Blvd. Orlando, FL 32816
			</div>
		)
	}

	function Phone(){
		return (
			<div className='contactUsInfo'>
				<span style={{ fontWeight: 'bold', marginLeft: 10}}> Phone:</span> (321) 415-2583
			</div>
		)
	}

	function Email(){
		return (
			<div className='contactUsInfo'>
				<span style={{ fontWeight: 'bold', marginLeft: 10 }}> Email:</span> knightassist33@gmail.com
			</div>
		)
	}

	return (
		<Box align="left" sx={{ color: '#212121', marginRight: 10 }}>
			<Box display="flex" alignItems="center">
				<CiLocationOn /> 
				<Location />
			</Box>
			<Box display="flex" alignItems="center">
				<CiPhone/> 
				<Phone />
			</Box>
			<Box display="flex" alignItems="center">
				<CiMail/> 
				<Email/>
			</Box>
		</Box>
	);
}
export default Details;