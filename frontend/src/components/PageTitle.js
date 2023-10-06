import React from 'react';
import Logo from './Logo';

function PageTitle(props)
{
   return(
      <div className={props.mainStyle}>
        <Logo theStyle={props.logoStyle}/>
        <h1 id="title" className={props.titleStyle + ' title center'}>Knight Assist</h1>
      </div>
   );
};

export default PageTitle;
