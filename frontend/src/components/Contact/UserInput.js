import * as React from 'react';
import { Grid, Typography, Button, Box } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Lottie from "lottie-react";
import PreLoginNavBar from '../../PreLogin/PreLoginNavBar';
import useStyles from '../../PreLogin/PreLoginStyles';
import Footer from '../Footer';
import './Contact.css';
import PageTitle from '../PageTitle';

function UserInput() {
	const classes = useStyles();

	function WelcomeText(){
		return (
			<div className='welcomeText'>We are here for you! How can we help?</div>
		)
	}
	return (
		<div className='userInput'>
			<PageTitle mainStyle="cardTitleLogo" logoStyle="logoSize" titleStyle="cardTitle center"/>
			<WelcomeText/>
		</div>
	);
}

export default UserInput;