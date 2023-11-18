import React, { useState, useEffect } from 'react';
import './StudentAnnouncements.css';
import StudentHeader from '../StudentHeader.js';
import '../Header.css';
import { BiCheckShield } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Logo from '../Logo';

function StudentAnnouncements() {


return (
        <div id='studentAnnouncements'>
            <StudentHeader />
            <div className="studAnnouncementsPage">
                <div class="StudentAnnouncements-title">Announcements</div>
                <div class="StudentAnnouncements-subtitle">Fall 2023</div>
            </div>
            
        </div>
      );
    }

export default StudentAnnouncements;
