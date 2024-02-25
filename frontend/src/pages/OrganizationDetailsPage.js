import {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import OrganizationDetails from '../components/Admin/Views/OrganizationDetails/OrganizationDetails';
import { useParams } from 'react-router-dom';

const OrganizationDetailsPage = () => {
    const { organizationID } = useParams();
  return(
    <div className='studentDetailsPage'>
      <OrganizationDetails organizationID={organizationID} />
    </div>
  );
};

export default OrganizationDetailsPage