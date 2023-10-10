import React from 'react';
import LoginBox from './LoginComponents';
import PageTitle from '../PageTitle';
import LoginPic from './loginPic';
import LoginPic2 from './loginPic2';
import Carousel from 'react-bootstrap/Carousel';

function Login()
{

    function LoginSlideshow(){
      return(
        <div className="slideshow">
          <Carousel controls={false} indicators={false}> 
            <Carousel.Item interval={3000}> 
              <LoginPic/>
            </Carousel.Item> 
            <Carousel.Item interval={3000}> 
              <LoginPic2/>
            </Carousel.Item> 
          </Carousel> 
        </div>
      )
    }

    return(
      <div>
        <LoginSlideshow/>
        <div className="contentHalf">
          <div>
            <PageTitle/>
            <LoginBox/>
          </div>
        </div> 
      </div>
    );
};

export default Login;
