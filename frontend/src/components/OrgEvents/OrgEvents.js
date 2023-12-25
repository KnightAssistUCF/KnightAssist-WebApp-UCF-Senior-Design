import {useState} from 'react';

import UpcomingEvents from './UpcomingEvents';
import PastEvents from './PastEvents';
import Search from './Search';
import AddEventModal from './AddEventModal';
import EventModal from './EventModal';
import SearchSwitch from './SearchSwitch';
import Header from './Header';
import './OrgEvents.css';
import CheckIn from '../QRCode/CheckIn';
import CheckOut from '../QRCode/CheckOut';

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
              <Search searchType={searchType} resetEventSearch={resetSearch} setEventID={setEventID} setOpenEvent={setOpenEvent}/>
            </div>
          </div>
          <button type="button" class="addEventBtn btn btn-primary" onClick={() => setOpenModal(true)}>Add New Event</button>
          <AddEventModal setReset={setResetUpcoming} reset={resetUpcoming} setResetPast={setResetPast} resetPast={resetPast} resetSearch={resetSearch} setResetSearch={setResetSearch}  open={openModal} setOpen={setOpenModal} editMode={editMode} setEditMode={setEditMode} eventID={eventID} openEvent={setOpenEvent}/>
          <EventModal setReset={setResetUpcoming} reset={resetUpcoming} setResetPast={setResetPast} resetPast={resetPast} resetSearch={resetSearch} setResetSearch={setResetSearch} eventID={eventID} open={openEvent} setOpen={setOpenEvent} setOpenAdd={setOpenModal} editMode={editMode} setEditMode={setEditMode}/>
          <UpcomingEvents setEventID={setEventID} setOpenEvent={setOpenEvent} reset={resetUpcoming}/>
          <PastEvents setEventID={setEventID} setOpenEvent={setOpenEvent} reset={resetPast}/>
		  <CheckOut/>
		  <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIQAAACECAYAAABRRIOnAAAAAklEQVR4AewaftIAAAN+SURBVO3BQY7kSAIDQfdA/v/L3DrMgScBgpQ13bM0Mz+Y+cdhphxmymGmHGbKYaYcZsphphxmymGmHGbKYaYcZsphphxmymGmfHhI5Tcloam0JDSVJ5JwRaUloan8piQ8cZgph5lymCkfXpaEN6ncodKS8E1JuCMJb1J502GmHGbKYaZ8+DKVO5LwJpWWhCdUriThDpU7kvBNh5lymCmHmfLhL5eEKypNpSWhqbQktCQ0lf+Sw0w5zJTDTPnwl1NpSbhD5YpKS0JLwn/JYaYcZsphpnz4siR8UxKaypUkNJWWhDtUWhLuSMKf5DBTDjPlMFM+vEzlN6m0JDSVJ1RaEp5Q+ZMdZsphphxmivnB/zGVK0m4otKS8Dc7zJTDTDnMFPODB1RaEq6o/KYk3KFyJQlN5UoSrqi0JDSVO5LwxGGmHGbKYaaYH7xI5Y4k3KHSktBUriShqbQkNJWWhCdUriTh33SYKYeZcpgpHx5SuZKEptJU7khCU2lJuKJyReVNKi0JV1RaEppKS8KbDjPlMFMOM8X84AGVloSm8kQSmkpLwhMqV5LQVN6UhCsqLQnfdJgph5lymCkfHkrCHUloKldU7lB5IglNpSWhqbQkNJUrKi0Jd6i0JDxxmCmHmXKYKR8eUmlJuKLSktBUWhKaSlNpSbhDpam8KQnflIQ3HWbKYaYcZsqHl6m0JDSVpnJFpSXhikpLwhNJuEPlN6m0JDxxmCmHmXKYKR9eloSm0pLQVFoS/k1JaCpXkvCEypUkNJVvOsyUw0w5zJQPX5aEJ1SuJOEOlSsqd6j8m5LwpsNMOcyUw0wxP/iLqbQk3KHSknCHSkvCHSpPJOFNh5lymCmHmfLhIZXflIQ7VFoSWhKuqDyh0pLwRBKaSkvCE4eZcpgph5ny4WVJeJPKHSotCU3ljiQ0lTuS8CaVbzrMlMNMOcyUD1+mckcS/mRJaCpN5ZuS0FTedJgph5lymCkf/mOS8JuS0FSuJOFPdpgph5lymCkf/nJJuKLSknBFpam0JNyRhKZyRxKayjcdZsphphxmyocvS8KfTKUloalcUWlJuJKEKypXktBU3nSYKYeZcpgpH16m8ptUriThShKuJOFKEprKlSTcofKbDjPlMFMOM8X8YOYfh5lymCmHmXKYKYeZcpgph5lymCmHmXKYKYeZcpgph5lymCmHmfI/Oth5KUY0o4wAAAAASUVORK5CYII="/>
		</div>
		</div>
    );
};

export default OrgPortal;
