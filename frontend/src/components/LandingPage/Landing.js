import * as React from 'react';
import { Grid, Typography, Button, Box } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import PreLoginNavBar from '../../PreLogin/PreLoginNavBar';
import useStyles from '../../PreLogin/PreLoginStyles';
import Footer from '../Footer';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Hero from './HeroSection';
import Features from './FeaturesSection';

const theme = createTheme();

function Landing() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <PreLoginNavBar />
        <Hero />
        <Features />
        <Footer />
      </Box>
    </ThemeProvider>
  );
}
export default Landing;