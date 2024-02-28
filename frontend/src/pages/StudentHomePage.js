import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import StudentHome from '../components/StudentHome/StudentHome';

const StudentHomePage = () =>
{
    return(
      <div className="studenthomepage" style={{backgroundColor: '#FAFAFA'}}>
        <StudentHome />
      </div>
    );
};

export default StudentHomePage;