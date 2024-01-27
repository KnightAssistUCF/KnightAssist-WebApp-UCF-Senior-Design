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
    const [tags, setTags] = useState('');

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
            setTags(res.categoryTags);
            console.log(tags);

            // get profile pic

        } catch(e) {
            console.log("failed to fetch student info: "+ e);
        }
    }

    // function Tag(props){
    //   return (
    //     <Card className='tag'>
    //       <div className='addSpace'>
    //         {props.tag}
    //       </div>
    //     </Card>
    //   )
    // }

    // function Interests(){
    //   return (
    //     <div className='interests'>
    //       <div className='interestsName'>Interests</div>
    //       <div className='tags'>
    //         {props.org.categoryTags.map(t => <Tag tag={t}/>)}
    //       </div>
    //     </div>
    //   )
    // }


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
          <div className='studentDetailsFields'>
            <div className='studentDetailsFirst'>
              <div className='studentDetailsFirstText'>First Name</div>
              <div className='studentDetailsFirstText'>{firstName}</div>
            </div>
            <div className='studentDetailsLast'>
              <div className='studentDetailsLastText'>Last Name</div>
              <div className='studentDetailsLastText'>{lastName}</div>
            </div>
            <div className='studentDetailsEmail'>
              <div className='studentDetailsEmailText'>Email</div>
              <div className='studentDetailsEmailText'>{email}</div>
            </div>
            <div className='studentDetailsInterests'>
              <div className='studentDetailsInterestsText'>Interests</div>
              <div className='studentDetailsInterestsText'>{tags}</div>
            </div>
          </div>
        </div>
      </div>
    );
};

export default StudentDetails;