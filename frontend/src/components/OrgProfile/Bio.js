import { useState, useEffect } from 'react';
import Header from '../OrgEvents/Header';
import './OrgProfile.css';
import OrgTopBar from '../OrgHome/OrgTopBar';
import Card from '@mui/material/Card';
import { Button, Typography, CardContent, Box } from '@mui/material';
import { buildPath } from '../../path';
import NavTabs from './NavTabs';

function Bio() {
  

  return (
    <div>
        <div className='bio'>
            <div className='about'>
                {/* <div className='navSubTitle'>About</div> */}
                <Box>
                    <div className='navParagraphText'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Justo donec enim diam vulputate. Adipiscing elit ut aliquam purus sit amet luctus venenatis. Enim tortor at auctor urna nunc. Tellus id interdum velit laoreet id donec ultrices tincidunt. Egestas congue quisque egestas diam in. Eu lobortis elementum nibh tellus. Ullamcorper a lacus vestibulum sed arcu non odio. Cras pulvinar mattis nunc sed blandit libero. Gravida cum sociis natoque penatibus et magnis. Velit sed ullamcorper morbi tincidunt ornare. Sapien et ligula ullamcorper malesuada proin libero nunc. Enim eu turpis egestas pretium aenean.</div>
                </Box>
            </div>
        </div>
      
    </div>
  );
}

export default Bio;
