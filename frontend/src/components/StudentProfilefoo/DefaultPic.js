import React from 'react';
const pic = require("./DefaultPic.png");

function DefaultPic(props)
{
   return(
     <img className={"spartan " + props.theStyle} src={pic}/>
   );
};

export default DefaultPic;
