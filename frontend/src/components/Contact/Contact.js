import * as React from 'react';
import { Grid, Typography, Box } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import PreLoginNavBar from '../../PreLogin/PreLoginNavBar';
import './Contact.css';
import UserInput from './UserInput';
import Details from './Details';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Footer from '../Footer';

const theme = createTheme();

function Contact() {
  return (
	<ThemeProvider theme={theme}>
		<CssBaseline />
		<Box sx={{ display: 'flex', flexDirection: 'column', background: 'linear-gradient(to right, #F5FAF9, #E4D9FB)', minHeight: '100vh', justifyContent: 'center', alignItems: 'center'}}>
			<PreLoginNavBar />
			<Box sx={{ marginRight: '12%', marginLeft: '12%', display: 'flex', flexDirection: 'column', mt:5 }} >
				<Typography component="h1" variant="h3" align="left" fontWeight={700} sx={{ color: '#212121' }}>
					Contact Us
				</Typography>
				<Grid container component="main" sx={{ flex: 1, display: 'flex', flexdirection: 'column' }}>
					<Grid Item xs={false} lg={5} flexDirection="column" align="left" sx={{ marginBottom: 3}}>
						<Typography component="h1" variant="h4" sx={{ marginTop: 5, marginRight: 10, color: '#00522B' }}>
							Got questions? We are here to help.
						</Typography>
						<Typography component="h6" variant="h6" sx={{ marginTop: 5, marginBottom: 5, marginRight: 10, color: '#212121' }}>
							If you need to reach our team with inquires, please fill out the form below with any questions or concerns, and our team will get back to you as soon as possible!
						</Typography>
						<Details />
					</Grid>
					<Grid container sm={12} lg={7} elevation={1} square>
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