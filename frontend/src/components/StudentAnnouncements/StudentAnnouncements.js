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
import AnnouncementCard from './AnnouncementsCard';


function StudentAnnouncements() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [updateTitle, setUpdateTitle] = useState('Is my props working');
    const [oldUpdates, setOldUpdates] = useState([]);
    const [newUpdates, setNewUpdates] = useState([]);


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
        const recentUpdates = [];
        
        try {
        
            let response = await fetch(url, {
                method: "GET",
                headers: {"Content-Type": "application/json"},
            });

            let res = JSON.parse(await response.text());

            const weekAgo = new Date();
            console.log(weekAgo);
            weekAgo.setDate(weekAgo.getDate() - 7);
            console.log(weekAgo);

            for(let org of res){
            
                url = buildPath(`api/loadAllOrgAnnouncements?organizationID=${org.organizationID}`);

                response = await fetch(url, {
                method: "GET",
                headers: {"Content-Type": "application/json"},
                });
            
                let orgUpdates = JSON.parse(await response.text());
                console.log(orgUpdates);
            
                if(orgUpdates.title != undefined) {
                    updates.push({organizationID: org.organizationID,Orgname: org.name, Announcement: {title: orgUpdates.title}}); 
                }
                 

                for (let announcement of orgUpdates.announcements) {
                    let updateDate = new Date(announcement.date);
        
                    if (updateDate >= weekAgo) {
                        recentUpdates.push({
                            organizationID: org.organizationID,
                            Orgname: org.name,
                            Announcement: {
                                title: announcement.title,
                                content: announcement.content,
                                date: announcement.date,
                                read: announcement.read
                            },
                        });
                    } else {
                        updates.push({
                            organizationID: org.organizationID,
                            Orgname: org.name,
                            Announcement: {
                                title: announcement.title,
                                content: announcement.content,
                                date: announcement.date,
                                read: announcement.read
                            },
                        });
                    }
                }
                
        
            }
            setOldUpdates(updates);
            setNewUpdates(recentUpdates);
        } catch(e) {
            console.log("nice try");
        }
        console.log(updates);
        console.log(recentUpdates);
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
                        {newUpdates.length > 0 ? (
                        newUpdates.reverse().map((update, index) => (
                            <AnnouncementCard
                                key={index}
                                orgName={update.Orgname}
                                date={new Date(update.Announcement.date).toLocaleDateString()}
                                title={update.Announcement.title}
                                content={update.Announcement.content}
                                organizationID = {update.organizationID}
                                read = {update.read}    
                            />
                            ))
                        ) : (
                            <div className='announcementsMessage'>No Recent Announcements</div>
                        )}
                    </div>
                    <div className="oldAnnouncements">
                        <div class="StudentAnnouncements-subtitle">All</div>
                        {oldUpdates.length > 0 ? (
                            oldUpdates.map((update, index) => (
                            <AnnouncementCard
                                key={index}
                                orgName={update.Orgname}
                                date={new Date(update.Announcement.date).toLocaleDateString()}
                                title={update.Announcement.title}
                                content={update.Announcement.content}
                                organizationID = {update.organizationID}
                                read = {update.read}
                            />
                            ))
                        ) : (
                            <div className='announcementsMessage'>No Announcements Available</div>
                        )}
                    </div>
                </div>
            </div>
            
        </div>
      );
    }

export default StudentAnnouncements;
