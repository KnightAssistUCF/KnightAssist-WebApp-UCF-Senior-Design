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
import Grid from '@mui/material/Grid';
import AnnouncementModal from './AnnouncementModal';


function StudentAnnouncements() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [updateTitle, setUpdateTitle] = useState('Is my props working');

    const handleClick = () => {
        console.log("click!");
        setIsModalOpen(true);
    };
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleSearch = (searchTerm) => {
        // search logic
        console.log('Searching for:', searchTerm);
      };

      async function getEvents(){

        const userID = "6519e4fd7a6fa91cd257bfda"; // John Doe
        let url = buildPath(`api/loadFavoritedOrgsEvents?userID=${userID}`);
        const updates = [];
        try {

        
            let response = await fetch(url, {
                method: "GET",
                headers: {"Content-Type": "application/json"},
            });

            let res = JSON.parse(await response.text());

            console.log(res);

            for(let org of res){
            
                url = buildPath(`api/loadAllOrgAnnouncements?organizationID=${org.organizationID}`);

                response = await fetch(url, {
                method: "GET",
                headers: {"Content-Type": "application/json"},
                });
            
                res = JSON.parse(await response.text());
            
                console.log(res);
                updates.push({Orgname: org.name, res});     
        
        
            }
        } catch(e) {
            console.log("nice try");
        }
        console.log(updates);
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
                        
                        <Card variant='outlined' className='cardResult' onClick={handleClick}>
                            <CardContent>
                                <Grid container alignItems='center'>
                                    <Grid item>
                                        <CardMedia
                                        component="img"
                                        sx={{width: 35, borderRadius: '700px'}}
                                        image={require('../Login/loginPic.png')}
                                        />
                                    </Grid>
                                    <div className='updateOrgTitle'>Arboretum</div>
                                    <Grid marginLeft="auto">
                                        <div className='date'>3 days ago</div>
                                    </Grid>
                                </Grid>
                                <div className="divider"></div>
                                <div className="updateTitle">{updateTitle}</div>
                                <div className='updateDescription'>sdlfj flsdfjlsdjf ;slfj;lsdkf j;lsd fsl;d dlfj flsdfjlsdjf ;slfj;lsdkf j;lsd fsl;d dlfj flsdfjlsdjf ;slfj;lsdkf j;lsd fsl;d </div>
                            </CardContent>
                        </Card>
                        <AnnouncementModal open={isModalOpen} onClose={handleCloseModal} title={updateTitle} />
                    </div>
                    <div className="oldAnnouncements">

                    </div>
                </div>
            </div>
            
        </div>
      );
    }

export default StudentAnnouncements;
