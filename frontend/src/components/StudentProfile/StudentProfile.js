import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Grid, Box} from '@mui/material';
import Card from '@mui/material/Card';
import StudentHeader from '../StudentHome/StudentHeader';
import Container from '@mui/material/Container';
import { buildPath } from '../../path';
import { MdOutlineMail} from "react-icons/md";
import FavoriteOrganizations from './FavoriteOrganizations';
import RecentEvents from './RecentEvents';
import Avatar from '@mui/material/Avatar';
import EventModal from '../StudentHistory/EventModal';
import './StudentProfile.css'
import StudentBox from './StudentBox'
import StudentTopBar from '../TopBar/StudentTopBar';

const pic = require("./DefaultPic.png");

function StudentProfile(props)
{
      const [firstName, setFirstName] = useState("");
      const [lastName, setLastName] = useState("");
      const [joinDate, setJoinDate] = useState("");
      const [currentHours, setCurrentHours] = useState(0);
      const [hourGoal, setHourGoal] = useState(0);
      const [email, setEmail] = useState("");
      const [tags, setTags] = useState([]);

	  const [eventID, setEventID] = useState(undefined);
	  const [openModal, setOpenModal] = useState(false);

      async function getFields(){
         let url = buildPath(`api/userSearch?userID=${sessionStorage.getItem("ID")}`);

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
         setJoinDate(res.updatedAt);
         setCurrentHours(res.totalVolunteerHours);
         setHourGoal(res.semesterVolunteerHourGoal);
         setEmail(res.email);
         setTags(res.categoryTags);
      }

      function goToEdit(){

      }

      function Name(){
         return (
            <div className='name'>{firstName} {lastName}</div>
         )
      }

      function DateJoined(){
         return (
            <div className='volunteerSince'>Volunteer Since: {joinDate.substring(0, joinDate.indexOf('T'))}</div>
         )
      }

      function VolunteerHours(){
         return (
            <div className='volunteerHours'>Volunteer Hours: {currentHours.toFixed(2)}/{hourGoal}</div>
         )
      }

      function Email(){
         return (
            <div className='email'>
               <MdOutlineMail className='mailIcon'/>
               {email}
            </div>
         )
      }

      function Tag(props){
         return (
            <Grid item>
               <Card className='tag'>
                     {props.tag}
               </Card>
            </Grid>
         )
   }

      function Tags(){
         return (
               <div>
                     <Grid>
                        {tags.map(t => <Tag tag={t}/>)}
                     </Grid>
               </div>
         )
   }

      function Interests(){
         return (
            <div className='interestsBorder'>
               <div className='interestsTitle'>
                  Interests
               </div>
               <Box className="tagBox">
                  <Tags/>
               </Box>
            </div>
         )
      }

      function EditProfileBtn(){
         return (
            <div>
               <button className='editProfileBtn btn btn-primary' onClick={() => goToEdit()}>Edit Profile</button>
            </div>
         )
      }

      useEffect(()=>{
         getFields();
		 // eslint-disable-next-line react-hooks/exhaustive-deps
      },[])

      return(
         <div className='spartan'>
         <StudentHeader/>
         <StudentTopBar/>
         <div className='moveEverything'>
               <StudentBox />

               <div className='cardSections'>
                  <FavoriteOrganizations/>
                  <RecentEvents setOpen={setOpenModal} setEventID={setEventID}/>
               </div>
			   <EventModal eventID={eventID} setEventID={setEventID} open={openModal} setOpen={setOpenModal}/>
            </div>
         </div>
      );
};

export default StudentProfile;