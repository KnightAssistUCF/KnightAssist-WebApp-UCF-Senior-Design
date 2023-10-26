import {useState} from 'react';
import Header from '../Header';
import UpcomingEvents from './UpcomingEvents';
import PastEvents from './PastEvents';
import Welcome from './Welcome';
import SearchOrg from './SearchOrg';
import AddEventModal from './AddEventModal';
import EventModal from './EventModal';
import './OrgPortal.css';

function OrgPortal()
{

    const [openModal, setOpenModal] = useState(false);
    const [openEvent, setOpenEvent] = useState(false);
    const [eventID, setEventID] = useState("");
    const [resetUpcoming, setResetUpcoming] = useState(1);
    
    return(
      <div>
        <Header/>
        <div className='move'>
          <Welcome/>
          <SearchOrg/>
          <button type="button" class="addEventBtn btn btn-primary" onClick={() => setOpenModal(true)}>Add New Event</button>
          <AddEventModal setReset={setResetUpcoming} reset={resetUpcoming} open={openModal} setOpen={setOpenModal}/>
          <EventModal setReset={setResetUpcoming} reset={resetUpcoming} eventID={eventID} open={openEvent} setOpen={setOpenEvent}/>
          <UpcomingEvents setEventID={setEventID} setOpenEvent={setOpenEvent} reset={resetUpcoming}/>
          <PastEvents setEventID={setEventID} setOpenEvent={setOpenEvent}/>
        </div>
      </div>
    );
};

export default OrgPortal;
