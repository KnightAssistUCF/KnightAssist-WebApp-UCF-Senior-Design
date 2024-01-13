import * as React from 'react';
import { Grid, Typography, Button, Box } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Lottie from "lottie-react";
import PreLoginNavBar from '../../PreLogin/PreLoginNavBar';
import useStyles from '../../PreLogin/PreLoginStyles';
import Footer from '../Footer';

function Contact() {
  const classes = useStyles();

  return (
    <>
      <CssBaseline />
      <PreLoginNavBar />
      <Box className={classes.heroBox} sx={{ flexGrow: 1, padding: 20, justifyContent: 'center'}}>
        
      </Box>
      <Footer />
    </>
  );
}
export default Contact;