import React, { useState, useEffect, useContext } from 'react';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Logo from '../Logo';
import { styled } from '@mui/material/styles';
import { withStyles } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import { buildPath } from '../../path';
import Header from '../StudentHome/StudentHeader';
import 'bootstrap/dist/css/bootstrap.min.css';

function StudentHistory()
{

    return(
      <div id='homePage'>
		<Header/>
		<div className='moveEverything'>
			
		</div>
      </div>
    );
};

export default StudentHistory;
