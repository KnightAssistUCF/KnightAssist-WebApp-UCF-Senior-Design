import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import NewAnn from '../components/NewAnn/NewAnn';

const NewAnnPage = () =>
{
    return(
        <div className="studentAnnouncementsPage">
           <NewAnn />     
        </div>
        
    );
};

export default NewAnnPage;
