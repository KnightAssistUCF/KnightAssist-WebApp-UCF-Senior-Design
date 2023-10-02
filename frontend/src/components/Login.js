import React from 'react';
import LoginModal from './LoginBox';
import LoginBox from './LoginBox';
import PageTitle from './PageTitle';

function Login()
{

    const doLogin = async event => 
    {
        event.preventDefault();

        alert('doIt()');
    };

    function BackgroundHalf(){
      return(
        <div class="backgroundHalf"></div>
      )
    }

    return(
      <div>
        <BackgroundHalf/>
        <div className="contentHalf">
          <PageTitle/>
          <LoginBox/>
        </div>
      </div>
    );
};

export default Login;
