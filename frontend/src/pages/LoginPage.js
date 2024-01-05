import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from '../components/Login/Login';

const LoginPage = (props) =>
{
    return(
      <div className="login">
        <Login markLogin={props.markLogin}/>
      </div>
    );
};

export default LoginPage;
