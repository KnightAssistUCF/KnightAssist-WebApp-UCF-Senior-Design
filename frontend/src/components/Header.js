import React from 'react';
import PageTitle from './PageTitle';
import {BiMenu, BiHome, BiSearchAlt, BiHistory, BiCog, BiLogOut} from 'react-icons/bi';
import './Header.css';

function Header()
{
    return(
     <div>
        
        <div className="sidebar">
            <div className="logo_content">
                <div className="logo">
                    {/* logo image here */}
                    <div className="logo_name">KnightAssist</div>
                </div>
                <BiMenu className='menuIcon'></BiMenu>
            </div>
            <ul className="nav_list">
                <li>
                    <a href="#">
                    <BiHome className='homeIcon'></BiHome>
                    <span class="links_name">Home</span>
                    </a>
                    {/* <span class="tooltip">Home</span> */}
                </li>
                <li>
                    <a href="#">
                    <BiSearchAlt className='searchIcon'></BiSearchAlt>
                    <span class="links_name">Org Portal</span>
                    </a>
                    {/* <span class="tooltip">Home</span> */}
                </li>
                <li>
                    <a href="#">
                    <BiHistory className='historyIcon'></BiHistory>
                    <span class="links_name">History</span>
                    </a>
                    {/* <span class="tooltip">Home</span> */}
                </li>
                <li>
                    <a href="#">
                    <BiCog className='settingsIcon'></BiCog>
                    <span class="links_name">Settings</span>
                    </a>
                    {/* <span class="tooltip">Home</span> */}
                </li>
            </ul>
            <div className="profile_content">
                <div className="profile">
                    <div className="profile_details">
                        <img src="./logo.svg" alt="" />
                        <div className="name_job">
                            <div className="name">First Last</div>
                            <div className="job">Student User</div>
                        </div>
                    </div>
                    <BiLogOut className='logoutIcon'></BiLogOut>
                </div>
            </div>
        </div>
        
        




     </div>
    );
};

export default Header;