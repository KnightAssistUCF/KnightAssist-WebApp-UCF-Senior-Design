import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material';
import { Grid, Typography, Button, Box } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Lottie, {LottieRefCurrentProps} from "lottie-react";
import animationData from './landingAnimation2';
import PreLoginNavBar from '../PreLoginNavBar';
import useStyles from '../PreLoginStyles';

function Landing() {
  const classes = useStyles();
  const theme = createTheme({
   
  });

  return (
    <>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <PreLoginNavBar />
      <Box className={classes.heroBox}>
      <Grid container spacing={6} className={classes.gridContainer}>
        <Grid item xs={12} md={7}>
          <Typography variant="h3" fontWeight={700} className={classes.title} sx={{color: 'black'}} paddingBottom='20px'>
            Looking for Volunteer Opportunities?
          </Typography>
          <Typography variant="h6" className={classes.subtitle} sx={{color: 'black', opacity: '0.7'}} paddingBottom='30px'>
          KnightAssist has your back! Find campus organizations you’re interested in and start volunteering today! Interested?
          </Typography>
          <Button
            variant="contained" sx={{ bgcolor: '#F5D6BA', color: 'black', width: '200px', fontSize: '16px', fontWeight: '600' }}
          >
            Sign Up!
          </Button>
        </Grid>
        <Grid item xs={12} md={5}>
          <Lottie style={{ backgroundColor:'white', maxHeight: '400px', maxWidth: '400px' }} animationData={animationData} />
        </Grid>
      </Grid>
    </Box>
    </ThemeProvider>
    </>
  );
}
export default Landing;