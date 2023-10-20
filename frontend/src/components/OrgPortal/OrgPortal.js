import {useState} from 'react';
import Header from '../Header';
import UpcomingEvents from './UpcomingEvents';
import PastEvents from './PastEvents';
import Welcome from './Welcome';
import SearchOrg from './SearchOrg';
import AddEventModal from './AddEventModal';
import './OrgPortal.css';

function OrgPortal()
{

    const [openModal, setOpenModal] = useState(false);
    const [resetUpcoming, setResetUpcoming] = useState(0);
    
    return(
      <div>
        <Header/>
        <div className='move'>
          <Welcome/>
          <SearchOrg/>
          <button type="button" class="addEventBtn btn btn-primary" onClick={() => setOpenModal(true)}>Add New Event</button>
          <AddEventModal setReset={setResetUpcoming} open={openModal} setOpen={setOpenModal}/>
          <UpcomingEvents reset={resetUpcoming}/>
          <PastEvents/>
        </div>
      </div>
    );
};

export default OrgPortal;
