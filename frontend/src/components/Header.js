import React from 'react';
import PageTitle from './PageTitle';
import {BiMenu, BiHome, BiSearch, BiBell, BiHistory, BiCog, BiLogOut} from 'react-icons/bi';
import './Header.css';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import Zoom from '@mui/material/Zoom';
import Button from '@mui/material/Button';
import { purple } from '@mui/material/colors';
import IconButton from '@mui/material/IconButton';

function Header()
{

    // customizing tooltip appearance
    const LightTooltip = styled(({ className, ...props }) => (
        <Tooltip {...props} classes={{ popper: className }} />
      ))(({ theme }) => ({
        [`& .${tooltipClasses.tooltip}`]: {
          backgroundColor: theme.palette.common.white,
          color: 'rgba(0, 0, 0, 0.87)',
          fontSize: 15,
          border: '1px solid #8C8C8C',
        },
      }));

      //customizing log out button
      const LogOutButton = styled(Button)(({ theme }) => ({
        color: theme.palette.getContrastText(purple[500]),
        background: 'linear-gradient(45deg, #5e548b 30%, #4f457a 90%)',
        '&:hover': {
          background: 'linear-gradient(45deg, #7266a9 30%, #4f457a 90%)',
        },
      }));
      const SmallLogOutButton = styled(IconButton)(({ theme }) => ({
        color: theme.palette.getContrastText(purple[500]),
        background: 'linear-gradient(45deg, #5e548b 30%, #4f457a 90%)',
        '&:hover': {
          background: 'linear-gradient(45deg, #7266a9 30%, #4f457a 90%)',
        },
      }));

      

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
                    <LightTooltip title="Home" placement="right" className="custom-tooltip">
                        <a href="#">
                            <BiHome className='homeIcon'></BiHome>
                            <span class="links_name">Home</span>
                        </a>
                    </LightTooltip>
                </li>
                <li>
                    <LightTooltip title="Events" placement="right" className="custom-tooltip">
                        <a href="#">
                            <BiSearch className='searchIcon'></BiSearch>
                            <span class="links_name">Events</span>
                        </a>
                    </LightTooltip>
                </li>
                <li>
                    <LightTooltip title="Notifications" placement="right" className="custom-tooltip">
                        <a href="#">
                            <BiBell className='notificationIcon'></BiBell>
                            <span class="links_name">Notifications</span>
                        </a>
                    </LightTooltip>
                </li>
                <li>
                    <LightTooltip title="History" placement="right" className="custom-tooltip">
                        <a href="#">
                            <BiHistory className='historyIcon'></BiHistory>
                            <span class="links_name">History</span>
                        </a>
                    </LightTooltip>
                </li>
                <li>
                    <LightTooltip title="Settings" placement="right" className="custom-tooltip">
                        <a href="#">
                            <BiCog className='settingsIcon'></BiCog>
                            <span class="links_name">Settings</span>
                        </a>
                    </LightTooltip>
                </li>
            </ul>
            <div className="profile_content">
                <div className="profile">
                    <LogOutButton className="bigLogOut" endIcon={<BiLogOut />}>
                        Log Out
                    </LogOutButton>
                    <SmallLogOutButton className="smallLogOut" style={{borderRadius: 5}} ><BiLogOut className="sLogOutIcon" />
                    </SmallLogOutButton>
                </div>
            </div>
        </div>
 




     </div>
    );
};

export default Header;