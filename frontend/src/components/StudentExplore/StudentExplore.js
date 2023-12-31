import React, { useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../StudentHome/StudentHeader';
import SearchSwitch from './SearchSwitch';
import Search from './Search';
import EventModal from './EventModal';
import OrgFavoriteEvents from './OrgFavoriteEvents';
import RecommendedEvents from './RecommendedEvents';
import RecommendedOrganizations from './RecommendedOrganizations';
import './StudentExplore.css'
import '../StudentHome/StudentHome.css';

function StudentExplore()
{
    const [searchType, setSearchType] = useState("events");
    const [openEvent, setOpenEvent] = useState(false); 
    const [eventID, setEventID] = useState(undefined)
    const [resetFavorite, setResetFavorite] = useState(1);
    const [resetRecEvents, setResetRecEvents] = useState(1);

    return(
      <div id='homePage'>
		<Header/>
		<div className='moveEverything'>
			<div class="exploreTitle">Explore</div>
			<SearchSwitch setSearchType={setSearchType}/>
			<div className='moveSearch'>
			<Search searchType={searchType} setOpenEvent={setOpenEvent} setEventID={setEventID}/>
			</div>
			<EventModal setEventID={setEventID} eventID={eventID} open={openEvent} setOpen={setOpenEvent} resetFavorite={resetFavorite} setResetFavorite={setResetFavorite} resetRecEvents={resetRecEvents} setResetRecEvents={setResetRecEvents}/>
			<OrgFavoriteEvents setEventID={setEventID} eventID={eventID} open={openEvent} setOpen={setOpenEvent} reset={resetFavorite}/>
			<RecommendedEvents setEventID={setEventID} eventID={eventID} open={openEvent} setOpen={setOpenEvent} reset={resetRecEvents}/>
			<RecommendedOrganizations setEventID={setEventID} eventID={eventID} open={openEvent} setOpen={setOpenEvent}/>
			</div>
      </div>
    );
};

export default StudentExplore;