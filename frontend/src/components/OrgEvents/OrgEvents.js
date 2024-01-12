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

	const [searchMode, setSearchMode] = useState(false)
	const results = useRef([]);
    
    function Title(){
      return(
        <div className='yourEvents spartan'>
           <h1>Events</h1>
        </div>
      )
    }

    return(
      <div>
        <Header/>
        <div className='move'>
			<div className="orgPortalTop">
			<Title/>
			<SearchSwitch setSearchType={setSearchType}/>
			<div className='moveSearch'>
				<Search results={results} searchType={searchType} resetEventSearch={resetSearch} setEventID={setEventID} setOpenEvent={setOpenEvent}/>
			</div>
			</div>
			<button type="button" class="addEventBtn btn btn-primary" onClick={() => setOpenModal(true)}>Add New Event</button>
			<AddEventModal setReset={setResetUpcoming} reset={resetUpcoming} setResetPast={setResetPast} resetPast={resetPast} resetSearch={resetSearch} setResetSearch={setResetSearch}  open={openModal} setOpen={setOpenModal} editMode={editMode} setEditMode={setEditMode} eventID={eventID} openEvent={setOpenEvent}/>
			<EventModal setReset={setResetUpcoming} reset={resetUpcoming} setResetPast={setResetPast} resetPast={resetPast} resetSearch={resetSearch} setResetSearch={setResetSearch} eventID={eventID} open={openEvent} setOpen={setOpenEvent} setOpenAdd={setOpenModal} editMode={editMode} setEditMode={setEditMode}/>
			
			{(searchMode) ? <SearchResults results={results} searchMode={searchMode} setSearchMode={setSearchMode}/> 
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
