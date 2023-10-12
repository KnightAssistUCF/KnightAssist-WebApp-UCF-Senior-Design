import React from 'react';
import PageTitle from '../PageTitle';

function Header()
{
    return(
     <div>
        <div className="orgNav">
            <nav className="navbar navbar-expand-lg navbar-light">
                <PageTitle mainStyle="headerTitleLogo" logoStyle="logoHeader" titleStyle="titleHeader"/>
                <a className="headerLink" href="">profile</a>
                <a className="headerLink" href="">home</a>
                <a className="headerLink" href="">about us</a>
                <a className="headerLink" href="">contact</a>
            </nav>
        </div>
     </div>
    );
};

export default Header;
