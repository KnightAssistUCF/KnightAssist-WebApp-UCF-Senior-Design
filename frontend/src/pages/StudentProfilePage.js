import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import StudentProfile from '../components/StudentProfile/StudentProfile';

function StudentProfilePage()
{
    return(
      <div className="studentProfilePage">
        <StudentProfile volunteerMode={1}/>
      </div>
    );
}

export default StudentProfilePage;
