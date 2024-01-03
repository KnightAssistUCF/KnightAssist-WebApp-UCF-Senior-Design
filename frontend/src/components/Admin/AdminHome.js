import {useState, useEffect} from 'react';

import Header from '../OrgEvents/Header';
import './AdminHome.css';
import ToggleButton from './Toggle';
import SearchBar from './SearchBar';
import StudentTable from './StudentTable';
import OrganizationTable from './OrgTable';
import { buildPath } from '../../path.js';

function AdminHome()
{

  const [selectedToggle, setSelectedToggle] = useState('student');
  const [students, setStudents] = useState([]);
  const [orgs, setOrgs] = useState([]);

  const handleToggleChange = (newToggleValue) => {
    setSelectedToggle(newToggleValue);
    console.log(newToggleValue);
  };

  const getAllStudents = async () => {
    console.log("loading students");
    var url = buildPath(`api/loadAllStudentsData`);

    try {
      let response = await fetch(url, {
        method: "GET",
        headers: {"Content-Type": "application/json",
        // "Authorization": `Bearer ${authToken}`
      },
      });
      let res = await response.json();
      setStudents(res);
    } catch(e) {
      console.log("Failed to fetch all students");
    }
  };

  const getAllOrgs = async () => {
    console.log("loading organizations");
    var url = buildPath(`api/loadAllOrganizationsData`);

    try {
      let response = await fetch(url, {
        method: "GET",
        headers: {"Content-Type": "application/json",
        // "Authorization": `Bearer ${authToken}`
      },
      });
      let res = await response.json();
      setOrgs(res);
    } catch(e) {
      console.log("Failed to fetch all students");
    }
  };



  useEffect(() => {
    getAllStudents();
    getAllOrgs();
  }, []);

  useEffect(() => {
    console.log(orgs);
  }, [orgs]);

    

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
              {selectedToggle === 'student' && <StudentTable students={students}/>}
              {selectedToggle === 'organization' && <OrganizationTable orgs={orgs}/>}
            </div>
        </div>
        
      </div>
    );
};

export default AdminHome;