import React from 'react';
import LoginBox from './LoginComponents';
import PageTitle from '../PageTitle';

function Login()
{

    function BackgroundHalf(){
      return(
        <div></div>
      )
    }

    return(
      <div className="thing">
        <div className="backgroundHalf">
          <BackgroundHalf/>
        </div>
        <div className="contentHalf">
          <PageTitle/>
          <LoginBox/>
        </div>
      </div>
    );
};

export default Login;
