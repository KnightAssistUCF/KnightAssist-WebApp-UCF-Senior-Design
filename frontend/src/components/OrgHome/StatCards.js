import {useState} from 'react';
import Card from '@mui/material/Card';
import './OrgHome.css';

function StatCards() {
  const [openAnnouncement, setOpenAnnouncement] = useState(false);

  return (
      <div>
        <div className='statCards'>
            <Card sx={{ maxWidth: 255,  display: 'flex', marginBottom: '0',marginTop: '10px', minHeight: 120, textAlign: 'left',  background: 'linear-gradient( 109.6deg,  #4E878C 11.2%, #65B891 91.1% )', color: 'white' }}>
                <div className="stat">
                    12
                </div>
                <div className="statTitle">
                    Upcoming Events
                </div>
            </Card>
            <Card sx={{ maxWidth: 255,  display: 'flex', marginTop: '10px', minHeight: 120, textAlign: 'left',  background: 'linear-gradient( 109.6deg,  #4E878C 11.2%, #65B891 91.1% )', color: 'white' }}>
                <div className="stat">
                    73%
                </div>
                <div className="statTitle">
                    Attendance Rate
                </div>
            </Card>
        </div>
      </div>
  );
}

export default StatCards;