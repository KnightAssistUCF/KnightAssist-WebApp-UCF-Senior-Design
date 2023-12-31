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
         let url = buildPath(`api/userSearch?userID=${localStorage.getItem("ID")}`);

         let response = await fetch(url, {
               method: "GET",
               headers: {"Content-Type": "application/json",
                  "Authorization": `Bearer ${localStorage.getItem("token")}`
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
         <div id='homePage'>
         <StudentHeader/>
         <div className='moveEverything'>
               <div className='topInfo'>
                  <Container className='profileContainer'>
                     <Box marginTop={"40px"}>
                        <Grid>
                           <Avatar
                              src={pic}
                              className="profilePic"
                           />
                           <Grid item xs={12} sm={12}>
                              <Name/>
                           </Grid>  
                           <Grid item xs={12} sm={12}>
                              <DateJoined/>
                           </Grid>  
                           <Grid item xs={12} sm={12} marginTop={"40px"}>
                              <VolunteerHours/>
                           </Grid> 
                           <Grid item xs={12} sm={12} marginTop={"20px"}>
                              <Email/>
                           </Grid>   
                           <Grid item xs={12} sm={12} marginTop={"20px"}>
                              {EditProfileBtn()}
                           </Grid>   
                        </Grid>                           
                     </Box>
                  </Container>
               </div>
               <div className='interests'>
                  <Interests/>
               </div>
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