import React from 'react';
import Logo from './Logo';

function PageTitle()
{
   return(
      <div className='titleLogo'>
        <Logo/>
        <h1 id="title" className='title center'>Knight Assist</h1>
      </div>
   );
};

export default PageTitle;
