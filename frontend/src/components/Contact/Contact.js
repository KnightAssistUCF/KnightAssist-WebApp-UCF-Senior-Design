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
import Footer from '../Footer';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';

const theme = createTheme();

function Contact() {
  const classes = useStyles();

  // Make a custom footer based on 
  // the existing one for styling purposes
  {/*function Footer(){
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
  }*/}

  return (
	<ThemeProvider theme={theme}>
		<CssBaseline />
		<Box sx={{ background: 'linear-gradient(to right, #F5FAF9, #E4D9FB)', minHeight: '100%', flexGrow: 1, padding: 10, justifyContent: 'center', alignItems: 'center'}}>
			<PreLoginNavBar />
			<Box sx={{ marginTop: 10, marginRight: '15%', marginLeft: '15%', display: 'flex', flexDirection: 'column' }} >
				<Typography component="h1" variant="h3" align="left" fontWeight={700} sx={{ marginTop: 5, color: '#212121' }}>
					Contact Us
				</Typography>
				<Grid container component="main" sx={{ flex: 1, display: 'flex', flexdirection: 'column' }}>
					<Grid Item
						xs={false}
						sm={4}
						md={6}
						flexDirection="column"
						align="left"
					>
						<Typography component="h1" variant="h4" sx={{ marginTop: 5, marginRight: 10, color: '#00522B' }}>
							Got questions? We are here to help.
						</Typography>
						<Typography component="h6" variant="h6" sx={{ marginTop: 5, marginBottom: 5, marginRight: 10, color: '#212121' }}>
							If you need to reach our team with inquires, pleaase fill out the form below with any questions or concerns, and our team will get back to you as soon as possible!
						</Typography>
						<Details />
					</Grid>
					<Grid container xs={12} sm={8} md={6} elevation={1} square>
						<UserInput />
					</Grid>
				</Grid>
			</Box>
		</Box>
		<Footer />
	</ThemeProvider>
  );
}
export default Contact;