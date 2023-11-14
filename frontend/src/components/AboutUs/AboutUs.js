import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material';
import { Grid, Typography, Button, Box } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
// import Lottie, {LottieRefCurrentProps} from "lottie-react";
// import animationData from './landingAnimation2';
// import useStyles from '../PreLoginStyles';
import './AboutUs.css';
import PreLoginNavBar from '../PreLoginNavBar';

function AboutUs()
{
	// const classes = useStyles();
	// const theme = createTheme({

	// });


    return(
      <div>
		<PreLoginNavBar />
        <h1>Hello World</h1>
      </div>
    );

};

export default AboutUs;
