import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import OrgPortal from '../components/OrgPortal/OrgPortal';
import UpcomingEvents from '../components/OrgPortal/UpcomingEvents';

const OrgPortalPage = () =>
{
    return(
      <div className="orgPortal">
        <OrgPortal />
      </div>
    );
};

export default OrgPortalPage;
