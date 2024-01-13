import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import StudentEmailVerified from '../components/EmailVerified/StudentEmailVerified';

const EmailVerifiedPage = () =>
{
    return(
        <div className="emailVerifiedPage">
           <StudentEmailVerified />     
        </div>
        
    );
};

export default EmailVerifiedPage;
