import * as React from 'react';
import { Grid, Typography, Button, Box, Link} from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CssBaseline from '@mui/material/CssBaseline';
import Lottie from "lottie-react";
import PreLoginNavBar from '../../PreLogin/PreLoginNavBar';
import useStyles from '../../PreLogin/PreLoginStyles';
import './Contact.css';
import UserInput from './UserInput';
import Details from './Details';

function Contact() {
  const classes = useStyles();

  // Make a custom footer based on 
  // the existing one for styling purposes
  function Footer(){
      return (
		<div className='contactFooter'>
			{"Copyright © "}
			<Link color="inherit" href="https://knightassist-43ab3aeaada9.herokuapp.com/">
				KnightAssist
			</Link>{" "}
			{new Date().getFullYear()}
			{"."}
		</div>
	  )
  }

  return (
      <div className='contactUs'>
		<CssBaseline />
		<PreLoginNavBar />
		<Box className="wholePage" sx={{ flexGrow: 1, padding: 10, justifyContent: 'center', alignItems: 'center'}}>
			<Card className='contactCard spartan'>
				<CardContent>
					<UserInput/>
					<Details/>
					<Footer/>
				</CardContent>   
			</Card>
		</Box>
      </div>
  );
}
export default Contact;