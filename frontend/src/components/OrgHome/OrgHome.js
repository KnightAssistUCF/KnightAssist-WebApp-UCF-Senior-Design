import {useState} from 'react';

import AddAnnouncementModal from './AddAnnouncementModal';
import Header from '../OrgEvents/Header';
import './OrgHome.css';
import {Box, CardMedia, CardContent, Grid, Button, Card} from '@mui/material';
import NextEventCard from './NextEvent';
import OrgTopBar from './OrgTopBar';

function OrgHome()
{

    const [openAnnouncement, setOpenAnnouncement] = useState(false);
    const [setModalOpen, setModalClose] = useState(false);
    
    function Title(){
      return(
        <div className='yourEvents spartan'>
           <h1>Welcome, Organization</h1>
        </div>
      )
    }

    return(
      <div>
        <OrgTopBar/>
        <Header/>
        <div className='move'>
          <div className="orgPortalTop">
            <div className="orgHomeTitle">Welcome, Organization</div>
            <button type="button" class="addEventBtn btn btn-primary" onClick={() => setOpenAnnouncement(true)}>Add Announcement</button>
		        <AddAnnouncementModal open={openAnnouncement} setOpen={setOpenAnnouncement}/>
          </div>
          <div className="orgHomeTopRow">
            <div className="next-event">
              <div className="StudentHomePage-subtitle">Next Event</div>
              <NextEventCard />
            </div>
          </div>
          
		    </div>
      </div>
    );
};

export default OrgHome;