import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form} from 'react-bootstrap';
import Logo from '../Logo';
import { Divider, List, ListItemButton, ListItemText, Alert, IconButton, Grid, CardMedia, Modal, Dialog, DialogTitle, Box, DialogActions, Button, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Paper from '@mui/material/Paper';
import StudentHeader from '../StudentHome/StudentHeader';
import DefaultPic from './DefaultPic';
import Container from '@mui/material/Container';
import { buildPath } from '../../path';
import CircularProgress from '@mui/joy/CircularProgress';
import { createTheme } from '@mui/material/styles';
import ListItem from '@mui/material/ListItem';
import { MdOutlineMail } from "react-icons/md";
import './StudentProfile.css'

function StudentProfile()
{
   const [tags, setTags] = useState(["Stuff", "Environffffffffffffffffffffment","Stuff", "Environment","Stuff", "Environment","Stuff", "Environment"]);

   function Name(){
      return (
         <div className='name'>FirstName LastName</div>
      )
   }

   function DateJoined(){
      return (
         <div className='volunteerSince'>Volunteer Since: 2023-10-15</div>
      )
   }

   function VolunteerHours(){
      return (
         <div className='volunteerHours'>Volunteer Hours: 10/50</div>
      )
   }

   function Email(){
      return (
         <div className='email'>
            <MdOutlineMail className='mailIcon'/>
            stufflotsofstufflotsofstuff@gmail.com
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

   return(
      <div id='homePage'>
        <StudentHeader/>
        <div className='moveEverything'>
            <div className='topInfo'>
               <DefaultPic theStyle="profilePic"/>
               <Container component="main">
                  <Box spacing={2} marginTop={"40px"}>
                     <Grid>
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
                     </Grid>                           
                  </Box>
               </Container>
            </div>
            <div className='interests'>
               <Interests/>
            </div>
	      </div>
      </div>
   );
};

export default StudentProfile;