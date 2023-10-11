import React from 'react';
import PageTitle from '../PageTitle';

function Header()
{
    return(
     <div>
        <div className='top'>
            <nav className="centerHeader navbar navbar-expand-lg navbar-light">
                <a className="headerLink" href="">profile</a>
                <a className="headerLink" href="">home</a>
                <PageTitle mainStyle="headerTitleLogo" logoStyle="logoHeader" titleStyle="titleHeader"/>
                <a className="headerLink" href="">about us</a>
                <a className="headerLink" href="">contact</a>
            </nav>
        </div>
     </div>
    );
};

export default Header;
