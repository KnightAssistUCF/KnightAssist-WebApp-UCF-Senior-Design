import {useState} from 'react';

import AddAnnouncementModal from './AddAnnouncementModal';
import Header from '../OrgEvents/Header';
import '.OrgHome.css';

function OrgHome()
{

    const [openAnnouncement, setOpenAnnouncement] = useState(false);
    
    function Title(){
      return(
        <div className='yourEvents spartan'>
           <h1>Home</h1>
        </div>
      )
    }

    return(
      <div>
        <Header/>
        <div className='move'>
          <div className="orgPortalTop">
            <Title/>
          </div>
          <button type="button" class="addEventBtn btn btn-primary" onClick={() => setOpenAnnouncement(true)}>Add Announcement</button>
        </div>
      </div>
    );
};

export default OrgHome;