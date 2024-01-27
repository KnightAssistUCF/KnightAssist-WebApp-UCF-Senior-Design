import {useState, useEffect} from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { buildPath } from '../../../path.js';
import AdminHeader from '../AdminHeader';
import './StudentDetails.css';
import AdminTopBar from '../AdminTopBar';

function StudentDetails({ studentID })
{
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');

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
            setEmail(res.email);

            // get profile pic

        } catch(e) {
            console.log("failed to fetch student info: "+ e);
        }
    }


    useEffect(() => {
        fetchStudentInfo();
      }, []);

    return(
      <div>
        <div className='studentDetailsOutline'>
          <AdminHeader/>
          <AdminTopBar/>
        </div>
        <div className='studentDetailsContent'>
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/">
              Home
            </Link>
            <Typography color="text.primary">{firstName + " " + lastName}</Typography>
          </Breadcrumbs>
          {firstName}
          {lastName}
          {email}
        </div>
      </div>
    );
};

export default StudentDetails;