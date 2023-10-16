import React from 'react';
const logo = require("../KAlogo.png");

function Logo(props)
{
   return(
     <img className={"spartan " + props.theStyle} src={logo}/>
   );
};

export default Logo;
