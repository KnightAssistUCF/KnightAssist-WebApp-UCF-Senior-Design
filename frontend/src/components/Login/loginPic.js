import React from 'react';
import './Login.css';

const logo = require("./loginPic.png");

function LoginPic()
{
   return(
     <img className="loginPhoto" src={logo}/>
   );
};

export default LoginPic;
