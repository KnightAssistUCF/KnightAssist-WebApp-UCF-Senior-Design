import React from 'react';

const logo = require("./loginPic.png");

function LoginPic()
{
   return(
     <img className="loginPhoto" src={logo}/>
   );
};

export default LoginPic;
