import * as React from 'react';
import { Grid, Typography, Button, Box } from '@mui/material';
import Lottie from "lottie-react";
import animationData from './landingAnimation2';

function Hero() {
    const handleButtonClick = () => {
        window.location.href = '#/register';
    };

  return (
    <Grid container component="main" sx={{ backgroundColor: '#F5FAF8' }}>
        <Grid container sx={{ margin: '3%', alignItems: 'center', justifyContent: 'center' }}>
            <Grid item xs={12} md={4} align="left" sx={{marginRight: 5 }}>
                <Typography variant="h3" fontWeight={700} sx={{color: '#212121', marginTop: 10}} paddingBottom='20px'>
                    Looking for Volunteer Opportunities?
                </Typography>
                <Typography variant="h6" sx={{color: 'black', opacity: '0.7'}} paddingBottom='30px'>
                    KnightAssist not only makes it simple to explore the organizations across campus and find something you're interested in, but it also makes signing up for shifts and into shifts easy! Just use the app to scan a QR code! Interested?
                </Typography>
                <Button variant="outlined" size="large" onClick={handleButtonClick} sx={{ color: '#593959', borderColor: '#593959', width: '200px', fontSize: '16px', fontWeight: '600', ":hover": {borderColor: "#593959", bgcolor: 'rgba(89, 57, 89, .1)'}}}>
                    Sign Up!
                </Button>
            </Grid>
            <Grid item md={3} sx={{ alignItems: 'center', justifyContent: 'center'}}>
                <Lottie style={{ maxHeight: '400px', maxWidth: '400px' }} animationData={animationData} />
            </Grid>
        </Grid>
    </Grid>
  );
}
export default Hero;