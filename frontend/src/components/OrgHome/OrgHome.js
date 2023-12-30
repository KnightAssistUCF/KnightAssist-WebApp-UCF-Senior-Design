import {useState} from 'react';

import AddAnnouncementModal from './AddAnnouncementModal';
import Header from '../OrgEvents/Header';
import './OrgHome.css';
import NextEventCard from './NextEvent';
import OrgTopBar from './OrgTopBar';
import Feedback from './Feedback';

function OrgHome() {
  const [openAnnouncement, setOpenAnnouncement] = useState(false);

  function Title() {
      return (
          <div className='yourEvents spartan'>
              <h1>Welcome, Organization</h1>
          </div>
      );
  }

  return (
      <div>
          <OrgTopBar />
          <Header />
          <div className='move'>
              <div className="orgPortalTop">
                  <div className="orgHomeTitle">Welcome, Organization</div>
                  <button type="button" className="addEventBtn btn btn-primary" onClick={() => setOpenAnnouncement(true)}>Add Announcement</button>
                  <AddAnnouncementModal open={openAnnouncement} setOpen={setOpenAnnouncement} />
              </div>
              <div className="orgHomeTopRow">
                  <div className="nextEvent">
                      <div className="subtitle">Next Event</div>
                      <NextEventCard />
                  </div>
                  <div className="feedback">
                      <div className="subtitle">Feedback</div>
                      <Feedback />
                  </div>
              </div>
          </div>
      </div>
  );
}

export default OrgHome;