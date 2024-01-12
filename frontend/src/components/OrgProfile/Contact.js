import { useState, useEffect } from 'react';
import Header from '../OrgEvents/Header';
import './OrgProfile.css';
import OrgTopBar from '../OrgHome/OrgTopBar';
import Card from '@mui/material/Card';
import { Button, Typography, CardContent } from '@mui/material';
import { buildPath } from '../../path';
import NavTabs from './NavTabs';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';

function Contact() {
  

  return (
    <div>
        <div className='contactBox'>
            <div className='navSubTitle'>Contact</div>
            <div className='profileEmail'>
                <MailOutlineIcon/>
                <div className='navContactText'>
                    <a href='mailto:organizationemail@email.org'>OrganizationEmail@email.org</a></div>
            </div>
            <div className='profileEmail'>
                <PhoneIcon/>
                <div className='navContactText'>555-555-5555</div>
            </div>
            <div className='profileEmail'>
                <LocationOnIcon/>
                <div className='navContactText'>4000 Central Florida Blvd</div>
            </div>
        </div>
      
    </div>
  );
}

export default Contact;
