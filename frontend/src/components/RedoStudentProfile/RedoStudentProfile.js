import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './RedoStudentProfile.css';
import StudentHeader from '../StudentHome/StudentHeader';
import StudentTopBar from '../TopBar/StudentTopBar';
import StudentProfileTabs from './StudentProfileTabs';


function RedoStudentProfile()
{

    return(
        <div className='fontFamily'>
            <div className='redoStudentProfile'>
            <StudentHeader/>
            <StudentTopBar title="Profile"/>
            <div className="redoStudentProfileContent">
                
                <StudentProfileTabs/>





            </div>
            </div>
        </div>
    );
};

export default RedoStudentProfile;