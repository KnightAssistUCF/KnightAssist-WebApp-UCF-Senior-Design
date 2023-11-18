import React, { useState, useEffect } from 'react';
import './StudentAnnouncements.css';
import StudentHeader from '../StudentHeader.js';
import '../Header.css';
import { BiCheckShield } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Logo from '../Logo';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import SearchBar from './Search.js';
import { buildPath } from '../../path';
import {CardMedia, CardContent, Divider } from '@mui/material';


function StudentAnnouncements() {


    const handleSearch = (searchTerm) => {
        // search logic
        console.log('Searching for:', searchTerm);
      };

      async function getEvents(){

        const userID = "6519e4fd7a6fa91cd257bfda"; // John Doe
        let url = buildPath(`api/loadFavoritedOrgsEvents?userID=${userID}`);
        try {

        
            let response = await fetch(url, {
                method: "GET",
                headers: {"Content-Type": "application/json"},
            });

            let res = JSON.parse(await response.text());

            console.log(res);

            const updates = [];

            for(let org of res){
            
                url = buildPath(`api/loadAllOrgAnnouncements?organizationID=${org.organizationID}`);

                response = await fetch(url, {
                method: "GET",
                headers: {"Content-Type": "application/json"},
                });
            
                res = JSON.parse(await response.text());
            
                console.log(res);        
        
        
            }
        } catch(e) {
            console.log("nice try");
        }
    }

        useEffect(() => {
            getEvents();
        }, []);



return (
        <div id='studentAnnouncements'>
            <StudentHeader />
            <div className="studAnnouncementsPage">
                <div class="StudentAnnouncements-title">Announcements</div>
                <div className="search">
                    <SearchBar onSearch={handleSearch}/>
                </div>
                <div className="results">
                    <div className="recentAnnouncements">
                        <div class="StudentAnnouncements-subtitle">Recent</div>
                        <Card variant='outlined' sx={{ display: 'flex'}}>
                            <Box sx={{ display: 'flex', alignItems: 'center',  pl: 1, marginLeft: '6px' }}>
                                <CardMedia
                                component="img"
                                sx={{width: 35, borderRadius: '700px'}}
                                image={require('../Login/loginPic.png')}
                                />
                                <div className="updateOrgTitle">Arboretum</div>
                                <CardContent sx={{display: 'flex', alignItems: 'center', marginLeft: 'auto'}} >
                                    
                                    <div className="date" >
                                        <div className="day">3 days</div>
                                    </div>
                                </CardContent>
                                <Divider />
                            </Box>
                        </Card>
                    </div>
                    <div className="oldAnnouncements">

                    </div>
                </div>
            </div>
            
        </div>
      );
    }

export default StudentAnnouncements;
