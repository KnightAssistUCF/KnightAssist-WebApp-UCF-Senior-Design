import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import RedoStudentProfile from '../components/RedoStudentProfile/RedoStudentProfile';

function RedoStudentProfilePage(props)
{
    return(
        <div className='redoStudentProfilePage'>
            <RedoStudentProfile setTheme={props.setTheme}/>
        </div>
    );
}

export default RedoStudentProfile;
