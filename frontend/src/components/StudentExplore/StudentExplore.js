import React, { useState, useCallback } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form} from 'react-bootstrap';
import Logo from '../Logo';
import { Modal, Dialog, DialogTitle, Box, DialogActions, Button } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Paper from '@mui/material/Paper';
import Header from '../StudentHome/StudentHeader';
import SearchSwitch from './SearchSwitch';
import Search from './Search';
import './StudentExplore.css'
import '../StudentHome/StudentHome.css';



function StudentExplore()
{
    const [searchType, setSearchType] = useState();

    return(
      <div id='homePage'>
	<Header/>
	<div className='moveEverything'>
	    <div class="exploreTitle StudentHomePage-title">Explore</div>
	    <SearchSwitch setSearchType={setSearchType}/>
	    <div className='moveSearch'>
		<Search searchType={searchType}/>
	    </div>
	</div>
      </div>
    );
};

export default StudentExplore;