import React from 'react';
import PageTitle from '../PageTitle';

function Header()
{
    return(
     <div>
        <div className='top'>
            <nav className="navbar navbar-expand-lg navbar-light">
                <PageTitle mainStyle="headerTitleLogo" logoStyle="logoHeader" titleStyle="titleHeader"/>
            </nav>
        </div>
     </div>
    );
};

export default Header;
