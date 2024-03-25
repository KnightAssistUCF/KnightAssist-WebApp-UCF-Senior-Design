import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Settings from '../components/Settings/Settings';

function SettingsPage(props)
{
    return(
       	<Settings setTheme={props.setTheme}/>
    );
}

export default SettingsPage;
