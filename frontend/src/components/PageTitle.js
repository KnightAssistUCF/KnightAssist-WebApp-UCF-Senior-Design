import React from 'react';
import Logo from './Logo';
import './Header.css';

function PageTitle(props)
{
   return(
      <div onClick={(props.onClick) ? props.onClick : null} className={props.mainStyle}>
        <Logo theStyle={props.logoStyle}/>
        <h1 id="title" className={props.titleStyle + ' title center'}>Knight Assist</h1>
      </div>
   );
};

export default PageTitle;
