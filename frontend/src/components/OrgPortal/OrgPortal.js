import React from 'react';
import Header from '../Header';
import UpcomingEvents from './UpcomingEvents';
import Welcome from './Welcome';
import SearchOrg from './SearchOrg';
import './OrgPortal.css';

function OrgPortal()
{
    return(
      <div>
        <Header/>
        <div className='move'>
          <Welcome/>
          <SearchOrg/>
          <UpcomingEvents/>
        </div>
      </div>
    );
};

export default OrgPortal;
