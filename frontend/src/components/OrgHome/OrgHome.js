import {useState} from 'react';

import AddAnnouncementModal from './AddAnnouncementModal';
import Header from '../OrgEvents/Header';
import './OrgHome.css';
import NextEventCard from './NextEvent';
import OrgTopBar from './OrgTopBar';
import Feedback from './Feedback';
import StatCards from './StatCards';
import { BarChart } from '@mui/x-charts/BarChart';

function OrgHome() {
  const [openAnnouncement, setOpenAnnouncement] = useState(false);

  return (
      <div>
          <OrgTopBar />
          <Header />
          <div className='move'>
              <div className="title">Welcome, Organization</div>
              <div className="orgPortalTop">
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
              <div className="orgHomeBottomRow">
                <StatCards/>
                <BarChart 
                  sx={{ rx: 15 }}
                  xAxis={[{ scaleType: 'band', data: ['Event 1', 'Event 2', 'Event 3'] }]}
                  series={[{ data: [4, 3, 5] }, { data: [1, 6, 3] }, { data: [2, 5, 6] }]}
                  width={1000}
                  height={310}
                />
              </div>
          </div>
      </div>
  );
}

export default OrgHome;