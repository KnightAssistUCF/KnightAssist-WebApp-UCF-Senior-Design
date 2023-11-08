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
import EventModal from './EventModal';
import OrgFavoriteEvents from './OrgFavoriteEvents';
import RecommendedEvents from './RecommendedEvents';
import './StudentExplore.css'
import '../StudentHome/StudentHome.css';

function StudentExplore()
{
    const [searchType, setSearchType] = useState("events");
    const [openEvent, setOpenEvent] = useState(false); 
    const [eventID, setEventID] = useState("");

    return(
      <div id='homePage'>
	<Header/>
	<div className='moveEverything'>
	    <div class="exploreTitle">Explore</div>
	    <SearchSwitch setSearchType={setSearchType}/>
	    <div className='moveSearch'>
		<Search searchType={searchType} setOpenEvent={setOpenEvent} setEventID={setEventID}/>
	    </div>
	    <OrgFavoriteEvents setEventID={setEventID} setOpenEvent={setOpenEvent}/>
	    <EventModal setEventID={setEventID} eventID={eventID} open={openEvent} setOpen={setOpenEvent}/>
	    <RecommendedEvents setEventID={setEventID} eventID={eventID} open={openEvent} setOpen={setOpenEvent}/>
	</div>
      </div>
    );
};

export default StudentExplore;