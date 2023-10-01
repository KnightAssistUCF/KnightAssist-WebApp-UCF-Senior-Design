import React from 'react';
import LoginModal from './LoginBox';
import LoginBox from './LoginBox';

function Login()
{

    const doLogin = async event => 
    {
        event.preventDefault();

        alert('doIt()');
    };

    return(
      <div>
        <LoginBox/>
      </div>
    );
};

export default Login;
