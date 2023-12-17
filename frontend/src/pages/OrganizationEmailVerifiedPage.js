import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import OrganizationEmailVerified from '../components/EmailVerified/OrganizationEmailVerified';

const OrganizationEmailVerifiedPage = () =>
{
    return(
        <div className="emailVerifiedPage">
           <OrganizationEmailVerified />     
        </div>
        
    );
};

export default OrganizationEmailVerifiedPage;
