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
            <h3>Announcements</h3>
        </div>
      );
    }

export default StudentAnnouncements;
