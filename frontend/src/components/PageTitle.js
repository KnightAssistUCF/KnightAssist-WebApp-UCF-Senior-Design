import React from 'react';
import Logo from './Logo';

function PageTitle()
{
   return(
      <div className='titleLogo'>
        <h1 id="title" className='title center'>Knight Assist</h1>
        <Logo/>
      </div>
   );
};

export default PageTitle;
