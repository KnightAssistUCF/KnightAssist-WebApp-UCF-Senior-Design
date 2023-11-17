import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import StudentAnnouncements from '../components/StudentAnnouncements/StudentAnnouncements';

const StudentAnnouncementsPage = () =>
{
    return(
        <div className="studentAnnouncementsPage">
           <StudentAnnouncements />     
        </div>
        
    );
};

export default StudentAnnouncementsPage;
