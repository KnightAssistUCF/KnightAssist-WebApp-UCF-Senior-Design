import { useState, useEffect } from 'react';
import Header from '../OrgEvents/Header';
import '../OrgHome/OrgHome.css';
import OrgTopBar from '../OrgHome/OrgTopBar';
import Card from '@mui/material/Card';
import { Button, Typography, CardContent } from '@mui/material';
import { buildPath } from '../../path';

function OrgProfile() {
  

  return (
    <div>
      <OrgTopBar />
      <Header />
      
    </div>
  );
}

export default OrgProfile;
