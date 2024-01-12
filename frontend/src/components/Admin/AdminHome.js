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
  const [numOrgs, setNumOrgs] = useState(0);
  const [numStudents, setNumStudents] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  // const [studentSearchResults, setStudentSearchResults] = useState('');
  

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
      setNumStudents(res.length);
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
      setNumOrgs(res.length);
    } catch(e) {
      console.log("Failed to fetch all students");
    }
  };

  const searchStudents = (searchTerm) => {
    // Ensure the searchTerm is not empty
    console.log(searchTerm);
    if (searchTerm.trim() !== "") {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
  
      // Filter students based on the search term
      const filteredStudents = students.filter((student) => {
        const studentName = student.firstName ? student.firstName.toLowerCase() : "";
        // Add more fields to search if needed
  
        return studentName.includes(lowerCaseSearchTerm);
      });
  
      // Update the state with the filtered results
      setStudents(filteredStudents);
    } else {
      // If the search term is empty, reset the data to the original state
      getAllStudents();
    }
  };
  



  useEffect(() => {
    getAllStudents();
    getAllOrgs();
  }, []);


    

    return(
      <div>
        <Header/>
        <div className='adminPage'>
            <div className='adminHomeTitle'>Welcome, Admin</div>
            <div className='topFeatures'>
              <SearchBar
                searchTerm = {searchTerm}
                setSearchTerm = {setSearchTerm}
                searchStudents={searchStudents}
              />
              <ToggleButton onToggleChange={handleToggleChange}/>
            </div>
            <div className='toggleTables'>
              {selectedToggle === 'student' && (
                <>
                  <div className='total'>Total Students: {numStudents}</div>
                  <StudentTable students={students} />
                </>
              )}
              {selectedToggle === 'organization' && (
                <>
                  <div className='total'>Total Organizations: {numOrgs}</div>
                  <OrganizationTable orgs={orgs} />
                </>
              )}
            </div>
        </div>
        
      </div>
    );
};

export default AdminHome;