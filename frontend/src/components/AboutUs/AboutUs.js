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
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laboriosam nostrum fugiat sed voluptatem nulla earum, fugit aspernatur. Delectus quos amet eum quidem eveniet dolore dolores repellat sit nisi aperiam? Nobis eligendi ullam ex natus quibusdam deleniti quaerat corrupti ab aspernatur voluptatum, nam beatae dolore similique numquam distinctio iste fugiat id culpa sed ea aliquid architecto. Deserunt possimus natus impedit adipisci asperiores consectetur fugit iusto, sunt quo officia! Cupiditate pariatur natus libero?
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
