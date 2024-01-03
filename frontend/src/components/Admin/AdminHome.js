import {useState} from 'react';

import Header from '../OrgEvents/Header';
import './AdminHome.css';
import ToggleButton from './Toggle';
import SearchBar from './SearchBar';
import StudentTable from './StudentTable';
import OrganizationTable from './OrgTable';

function AdminHome()
{

  const [selectedToggle, setSelectedToggle] = useState('student');

  const handleToggleChange = (newToggleValue) => {
    setSelectedToggle(newToggleValue);
    console.log(newToggleValue);
  };

    

    return(
      <div>
        <Header/>
        <div className='adminPage'>
            <div className='adminHomeTitle'>Welcome, Admin</div>
            <div className='topFeatures'>
              <SearchBar/>
              <ToggleButton onToggleChange={handleToggleChange}/>
            </div>
            <div className='toggleTables'>
              {selectedToggle === 'student' && <StudentTable/>}
              {selectedToggle === 'organization' && <OrganizationTable/>}
            </div>
        </div>
        
      </div>
    );
};

export default AdminHome;