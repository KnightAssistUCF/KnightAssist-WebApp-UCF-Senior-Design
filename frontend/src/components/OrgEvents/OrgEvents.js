import {useState, useRef, useEffect} from 'react';

import UpcomingEvents from './UpcomingEvents';
import PastEvents from './PastEvents';
import Search from './Search';
import AddEventModal from './AddEventModal';
import EventModal from './EventModal';
import SearchSwitch from './SearchSwitch';
import Header from './Header';
import './OrgEvents.css';
import SearchResults from './SearchResults';
import { Grid } from '@mui/material';
import OrgTopBar from '../OrgHome/OrgTopBar';

function OrgPortal()
{

    const [openModal, setOpenModal] = useState(false);
    const [openEvent, setOpenEvent] = useState(false);
    const [editMode, setEditMode] = useState(0);
    const [eventID, setEventID] = useState(undefined);
    const [resetUpcoming, setResetUpcoming] = useState(1);
    const [resetPast, setResetPast] = useState(1);
    const [resetSearch, setResetSearch] = useState(1);
    const [searchType, setSearchType] = useState("events");

	const [searchMode, setSearchMode] = useState(false);
	const [resetSearchCards, setResetSearchCards] = useState(1);
	const results = useRef([]);
    
    function Title(){
      return(
        <div className='yourEvents spartan'>
           <h1>Events</h1>
        </div>
      )
    }

    return(
     	<div className='spartan'>
			<Header/>
			<OrgTopBar/>
			<div className='move'>
				<div>
					<Grid container layout={'row'} width={"100%"} style={{ gap: "0 24px" }}>
						<Grid item>
							<Title/>
						</Grid>						
						<Grid item>
							<SearchSwitch setSearchType={setSearchType}/>
						</Grid>
						<Grid item>
							<Search results={results} searchType={searchType} resetEventSearch={resetSearch} setEventID={setEventID} setOpenEvent={setOpenEvent} searchMode={searchMode} resetSearchCards={resetSearchCards} setResetSearchCards={setResetSearchCards}/>
						</Grid>
						<Grid item>
							<button type="button" class="addEventBtn btn btn-primary" onClick={() => {setSearchMode(true); setResetSearchCards(resetSearchCards * -1)}}>Search</button>
						</Grid>
						<Grid item>
							{(searchMode) ? <button type="button" class="addEventBtn btn btn-primary" onClick={() => setSearchMode(false)}>Exit Search</button> : ""}
						</Grid>
					</Grid>
				</div>
				{(!searchMode) ? <button type="button" class="addEventBtn btn btn-primary" onClick={() => setOpenModal(true)}>Add New Event</button> : ""}
				<AddEventModal setReset={setResetUpcoming} reset={resetUpcoming} setResetPast={setResetPast} resetPast={resetPast} resetSearch={resetSearch} setResetSearch={setResetSearch} resetSearchCards={resetSearchCards} setResetSearchCards={setResetSearchCards} open={openModal} setOpen={setOpenModal} editMode={editMode} setEditMode={setEditMode} eventID={eventID} openEvent={setOpenEvent}/>
				<EventModal setReset={setResetUpcoming} reset={resetUpcoming} setResetPast={setResetPast} resetPast={resetPast} resetSearch={resetSearch} setResetSearch={setResetSearch} resetSearchCards={resetSearchCards} setResetSearchCards={setResetSearchCards} eventID={eventID} open={openEvent} setOpen={setOpenEvent} setOpenAdd={setOpenModal} editMode={editMode} setEditMode={setEditMode}/>
				
				{(searchMode) ? <SearchResults results={results} setEventID={setEventID} setOpenEvent={setOpenEvent} reset={resetSearchCards} searchMode={searchMode} searchType={searchType}/> 
				:
				<div>
					<UpcomingEvents setEventID={setEventID} setOpenEvent={setOpenEvent} reset={resetUpcoming}/>
					<PastEvents setEventID={setEventID} setOpenEvent={setOpenEvent} reset={resetPast}/>
				</div>
				}
			</div>
		</div>
    );
};

export default OrgPortal;
