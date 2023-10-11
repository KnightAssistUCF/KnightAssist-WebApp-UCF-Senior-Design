import React from 'react';
import PageTitle from '../PageTitle';

function Header()
{
    return(
     <div>
        <div className='top'>
            <nav className="navbar navbar-expand-lg navbar-light">
                <PageTitle mainStyle="headerTitleLogo" logoStyle="logoHeader" titleStyle="titleHeader"/>
                <div className='tabs'>
                    <a className="headerLink" href="">profile</a>
                    <a className="headerLink" href="">about us</a>
                    <a className="headerLink" href="">contact</a>
                </div>
            </nav>
        </div>
     </div>
    );
};

export default Header;
