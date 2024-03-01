import * as React from 'react';
import { Grid, Typography, Button, Box } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Lottie from "lottie-react";
import animationData from './landingAnimation2';
import PreLoginNavBar from '../../PreLogin/PreLoginNavBar';
import useStyles from '../../PreLogin/PreLoginStyles';
import Footer from '../Footer';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme();

function Landing() {
  const classes = useStyles();

  const handleButtonClick = () => {
    window.location.href = '#/register';
  };

  return (
    <>
      <ThemeProvider theme={theme}>
      <CssBaseline />
      <PreLoginNavBar />
      <Box className={classes.heroBox} sx={{ flexGrow: 1, padding: 20, justifyContent: 'center'}}>
        <Grid container spacing={6} sx={{ alignItems: 'center', justifyContent: 'center'}}>
          <Grid item xs={12} md={7}>
            <Grid container direction="row" sx={{display: 'flex', justifyContent: 'center'}} >
              <Grid item sx={{display: 'flex', textAlign:'center', alignItems: 'center', justifyContent: 'center'}}>
                <Typography variant="h3" fontWeight={700} sx={{color: 'black'}} paddingBottom='20px'>
                  Looking for&nbsp;
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="h3" fontWeight={700} sx={{color: '#593959'}} paddingBottom='20px'>
                  Volunteer Opportunities?
                </Typography>
              </Grid>
            </Grid>

            <Typography variant="h6" className={classes.subtitle} sx={{color: 'black', opacity: '0.7'}} paddingBottom='30px'>
              KnightAssist not only makes it simple to explore the organizations across campus and find something you're interested in, but it also makes signing up for shifts and into shifts easy! Just use the app to scan a QR code! Interested?
            </Typography>

            <Button
              variant="contained" onClick={handleButtonClick} sx={{ bgcolor: '#F5D6BA', color: 'black', width: '200px', fontSize: '16px', fontWeight: '600', ":hover": {bgcolor: '#65B891'} }}
            >
              Sign Up!
            </Button>
          </Grid>
          <Grid item xs={10} md={5} xl={3} sx={{ backgroundColor:'white', alignItems: 'center', justifyContent: 'center'}}>
            <Lottie style={{ maxHeight: '400px', maxWidth: '400px' }} animationData={animationData} />
          </Grid>
        </Grid>
      </Box>
      <Footer />
      </ThemeProvider>
    </>
  );
}
export default Landing;