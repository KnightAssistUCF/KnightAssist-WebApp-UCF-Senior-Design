import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import StudentSettings from '../components/StudentSettings/StudentSettings';

function StudentSettingsPage()
{
    return(
      <div className="studentProfilePage">
        <StudentSettings/>
      </div>
    );
}

export default StudentSettingsPage;
