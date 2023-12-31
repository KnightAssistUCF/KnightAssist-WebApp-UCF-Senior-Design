import {useState} from 'react';

import Header from '../OrgEvents/Header';
import './AdminHome.css';
import ToggleButton from './Toggle';
import SearchBar from './SearchBar';

function AdminHome()
{

    

    return(
      <div>
        <Header/>
        <div className='adminPage'>
            <div className='adminHomeTitle'>Welcome, Admin</div>
            <div className='topFeatures'>
                <SearchBar/>
                <ToggleButton/>
            </div>
            
        </div>
        
      </div>
    );
};

export default AdminHome;