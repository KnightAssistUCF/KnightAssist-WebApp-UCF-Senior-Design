import React from 'react';
import Header from './Header';
import UpcomingEvents from './UpcomingEvents';
import Welcome from './Welcome';

function OrgPortal()
{
    return(
      <div>
        <Header/>
        <div className='move'>
          <Welcome/>
          <UpcomingEvents/>
        </div>
      </div>
    );
};

export default OrgPortal;
