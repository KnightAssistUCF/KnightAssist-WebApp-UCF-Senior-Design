import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material';
import { Grid, Typography, Button, Box, Card, CardMedia, CardContent } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
// import Lottie, {LottieRefCurrentProps} from "lottie-react";
// import animationData from './landingAnimation2';
// import useStyles from '../PreLoginStyles';
import './AboutUs.css';
import PreLoginNavBar from '../../PreLogin/PreLoginNavBar';
import Team from './Team';
import Lottie from "lottie-react";
import animationData from './aboutUsAnimation';

function AboutUs()
{



    return(
      <div>
		    <PreLoginNavBar />
        <div className="aboutContainer">
          <div className='aboutTitle'>About Us</div>
          <div className="aboutTopRow">
            <div className="lottieImage">
              <Lottie animationData={animationData} />
            </div>
            <div className="aboutParagraph">
              KnightAssist is on a mission to improve how universities manage volunteering processes, offering a secure and user-centric digital platform to simplify authentication, 
              legitimacy verification, and the collection of volunteer hours, eliminating tedious administrative tasks and paperwork. KnigtAssist is made by students and for students,
              our vision is to enhance the university experience by fostering community, civic engagement, skill development, and well-being among students, while also connecting them
              with campus organizations seeking volunteers. KnightAssist streamlines the volunteering experience for students, organizations, and university administrators, powered by new approaches and
              a robust technology stack. With KnightAssist we hope to create a more connected and engaged university community.
            </div>
          </div>
          </div>
          <div className="teamColor">
            <Team></Team>
          </div>
      </div>
    );

};

export default AboutUs;
