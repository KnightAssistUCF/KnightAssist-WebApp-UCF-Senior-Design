import * as React from 'react';
import { Grid, Typography, Button, Box} from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CssBaseline from '@mui/material/CssBaseline';
import Lottie from "lottie-react";
import PreLoginNavBar from '../../PreLogin/PreLoginNavBar';
import useStyles from '../../PreLogin/PreLoginStyles';
import Footer from '../Footer';
import './Contact.css';
import UserInput from './UserInput';
import Details from './Details';

function Contact() {
  const classes = useStyles();

  return (
    <>
      <CssBaseline />
      <PreLoginNavBar />
      <Box className="wholePage" sx={{ flexGrow: 1, padding: 20, justifyContent: 'center', alignItems: 'center'}}>
		<Card className='contactCard spartan'>
			<CardContent>
				<UserInput/>
				<Details/>
			</CardContent>   
		</Card>
      </Box>
      <Footer />
    </>
  );
}
export default Contact;