import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import StudentProfile from '../components/StudentProfile/StudentProfile';

function StudentProfilePage()
{
    return(
        <StudentProfile volunteerMode={1}/>
    );
}

export default StudentProfilePage;
