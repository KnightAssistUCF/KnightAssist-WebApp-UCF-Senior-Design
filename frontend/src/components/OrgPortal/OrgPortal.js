import {useState} from 'react';
import Header from '../Header';
import UpcomingEvents from './UpcomingEvents';
import Welcome from './Welcome';
import SearchOrg from './SearchOrg';
import AddEventModal from './AddEventModal';
import './OrgPortal.css';

function OrgPortal()
{

    const [openModal, setOpenModal] = useState(false);

    return(
      <div>
        <Header/>
        <div className='move'>
          <Welcome/>
          <SearchOrg/>
          <button type="button" class="addEventBtn btn btn-primary" onClick={() => setOpenModal(true)}>Add New Event</button>
          <AddEventModal open={openModal} setOpen={setOpenModal}/>
          <UpcomingEvents/>
        </div>
      </div>
    );
};

export default OrgPortal;
