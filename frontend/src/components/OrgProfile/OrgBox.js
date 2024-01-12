import { useState, useEffect } from 'react';
import Header from '../OrgEvents/Header';
import './OrgProfile.css';
import OrgTopBar from '../OrgHome/OrgTopBar';
import Card from '@mui/material/Card';
import { Button, Typography, CardContent, Avatar } from '@mui/material';
import { buildPath } from '../../path';
import NavTabs from './NavTabs';

function OrgBox() {
  

  return (
    <div>
        <div className='orgBox'>
            <Avatar alt="User Avatar" src="/path/to/avatar-image.jpg" sx={{ width: 150, height: 150, marginTop: '20px' }} />
        </div>
      
    </div>
  );
}

export default OrgBox;
