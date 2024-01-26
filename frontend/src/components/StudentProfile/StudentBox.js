import { useState, useEffect, useRef } from 'react';
import Header from '../StudentHome/StudentHeader';
import Card from '@mui/material/Card';
import {Box, Button, Typography, CardContent, Avatar, TextField, Dialog, DialogContent, DialogTitle, DialogContentText, DialogActions, Grid, Chip } from '@mui/material';
import { buildPath } from '../../path';
import { Facebook, Instagram, LinkedIn, Star, StarOutline } from '@mui/icons-material';
import { RiTwitterXFill } from 'react-icons/ri';
import './StudentProfile.css'
import EditIcon from '@mui/icons-material/Edit';

function StudentBox(props) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [joinDate, setJoinDate] = useState("");
    const [currentHours, setCurrentHours] = useState(0);
    const [hourGoal, setHourGoal] = useState(0);
    const [email, setEmail] = useState("");
    const [tags, setTags] = useState([]);

    const pic = require("./DefaultPic.png");

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

     function DateJoined() {
        // Parse the ISO date string
        const joinedDate = new Date(joinDate);
      
        // Format the date using toLocaleDateString
        const formattedDate = joinedDate.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        });
      
        return (
          <div className='volunteerSince'>Volunteering since {formattedDate}</div>
        );
      }

      function Tag(props){
        return (
           <Grid item>
              <Card variant='outlined' className='tag' sx={{padding: '3px', backgroundColor: '#5f5395'}}>
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
      

	
     useEffect(()=>{
        getFields();
        // eslint-disable-next-line react-hooks/exhaustive-deps
     },[])

	return (
        <div className='studentProfilePageContent'>
            <div className='studentBoxe'>
                <div className='studentBox'>
                    <Avatar
                        src={pic}
                        className="avatarPic"
                        style={{ width: '200px', height: '200px' }}
                    />
                    <DateJoined/>
                    <Button variant='outlined' color="error" size="large" disableElevation startIcon={<EditIcon />} sx={{margin: '10px'}}>Edit Profile</Button>
                </div>
                <Interests/>
            </div>
            <div className='studentProfileFields'>
                <div className='studentFirst'>
                    First Name
                </div>
                <div className='studentLast'>
                    Last Name
                </div>
            </div>
        </div>
	);
}

export default StudentBox;
