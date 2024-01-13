import {useState, useEffect} from 'react';

import AdminHeader from './AdminHeader';
import './AdminHome.css';
import ToggleButton from './Toggle';
import SearchBar from './SearchBar';
import StudentTable from './StudentTable';
import AdminTopBar from './AdminTopBar';
import OrganizationTable from './OrgTable';
import { buildPath } from '../../path.js';

function AdminHome()
{

  const [selectedToggle, setSelectedToggle] = useState('student');
  const [allStudents, setAllStudents] = useState([]);
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
      setAllStudents(res);
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

  const searchUsers = (term) => {
    const lowerCaseSearchTerm = term.toLowerCase();
  
    if (term.trim() !== "") {
      const filteredStudents = students.filter((student) => {
        const studentFirstName = student.firstName ? student.firstName.toLowerCase() : "";
        const studentLastName = student.lastName ? student.lastName.toLowerCase() : "";
  
        return (
          studentFirstName.includes(lowerCaseSearchTerm) ||
          studentLastName.includes(lowerCaseSearchTerm)
        );
      });
  
      setStudents(filteredStudents);
    } else {
      setStudents(allStudents);
    }
  };
  
  



  useEffect(() => {
    getAllStudents();
    getAllOrgs();
  }, []);


    

    return(
      <div>
        <AdminTopBar/>
        <AdminHeader/>
        <div className='adminPage'>
            <div className='topFeatures'>
              <SearchBar
                searchTerm = {searchTerm}
                setSearchTerm = {setSearchTerm}
                searchUsers={searchUsers}
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