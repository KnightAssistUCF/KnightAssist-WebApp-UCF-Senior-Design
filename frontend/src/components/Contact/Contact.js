import * as React from 'react';
import { Grid, Typography, Button, Box, Link} from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CssBaseline from '@mui/material/CssBaseline';
import PreLoginNavBar from '../../PreLogin/PreLoginNavBar';
import useStyles from '../../PreLogin/PreLoginStyles';
import './Contact.css';
import UserInput from './UserInput';
import Details from './Details';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme();

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
		<ThemeProvider theme={theme}>
		<CssBaseline />
		<PreLoginNavBar />
		<Box className="wholePage" sx={{ flexGrow: 1, padding: 10, justifyContent: 'center', alignItems: 'center'}}>
			<Card className='contactCard spartan'>
				<CardContent>
					<Details/>
					<UserInput/>
				</CardContent>   
			</Card>
		</Box>
		</ThemeProvider>
      </div>
  );
}
export default Contact;