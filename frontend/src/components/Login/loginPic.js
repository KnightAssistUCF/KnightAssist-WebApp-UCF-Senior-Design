import React from 'react';

const logo = require("./loginPic.png");

function LoginPic()
{
   return(
     <img className="loginPhoto" src={logo} alt="login page slideshow"/>
   );
};

export default LoginPic;
