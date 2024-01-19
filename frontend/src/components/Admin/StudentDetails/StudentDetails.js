import {useState, useEffect} from 'react';

import { buildPath } from '../../../path.js';

function StudentDetails({ studentID })
{
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const fetchStudentInfo = async () => {
        console.log(studentID);
        try {
            let url = buildPath(`api/userSearch?userID=${studentID}`);

            let response = await fetch(url, {
                  method: "GET",
                  headers: {"Content-Type": "application/json",
                     "Authorization": `Bearer ${sessionStorage.getItem("token")}`
                  }
            });
            
            let res = JSON.parse(await response.text());
   
            console.log(res);
            setFirstName(res.firstName);
            setLastName(res.lastName);

        } catch(e) {
            console.log("failed to fetch student info: "+ e);
        }
    }


    useEffect(() => {
        fetchStudentInfo();
      }, []);

    return(
      <div>
        {firstName}
        {lastName}
      </div>
    );
};

export default StudentDetails;