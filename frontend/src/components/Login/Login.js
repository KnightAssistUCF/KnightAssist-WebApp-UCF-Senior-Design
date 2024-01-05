import React from 'react';
import LoginBox from './LoginComponents';
import PageTitle from '../PageTitle';
import LoginPic from './loginPic';
import LoginPic2 from './loginPic2';
import Carousel from 'react-bootstrap/Carousel';
import './Login.css';

function Login(props)
{

    function LoginSlideshow(){
      return(
        <div className="slideshow">
          <Carousel indicators={false}> 
            <Carousel.Item interval={10000}> 
              <LoginPic/>
            </Carousel.Item> 
            <Carousel.Item interval={10000}> 
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
            <PageTitle mainStyle="titleLogo" logoStyle="logo" titleStyle="title center"/>
            <LoginBox markLogin={props.markLogin}/>
          </div>
        </div> 
      </div>
    );
};

export default Login;
