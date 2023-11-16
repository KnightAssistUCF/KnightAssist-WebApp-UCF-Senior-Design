import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import StudentProfile from '../components/StudentProfile/StudentProfile';

function StudentExplorePage()
{
    return(
      <div className="studentProfilePage">
        <StudentProfile volunteerMode={1}/>
      </div>
    );
}

export default StudentExplorePage;
