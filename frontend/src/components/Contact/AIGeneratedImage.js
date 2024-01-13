import React from 'react';
import './OrgPortal/Header';

const image = require("./aiimage.png");

function AIGeneratedImage()
{
   return(
     <img className="aiImage" src={image}/>
   );
};

export default AIGeneratedImage;
