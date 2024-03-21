import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './RedoStudentProfile.css';
import { Button, Avatar, Dialog, DialogContent, DialogTitle, Grid, Chip, Menu, MenuItem } from '@mui/material';


function TabProfile()
{

    return(
        <div className='studentAccountTab'>
            <div className='profileAvatarSettings'>
                <Avatar
                    className='defaultPFP addHover'
                />
                <div className='startedVolunteeringDate'><em>Volunteering Since </em></div>
            </div>
            <div className='tabHeader'>Account Information</div>
            <div className='studentAccountFields'>
                <div className='accountFirstName'>
                    <div className='fieldName'>First Name</div>
                </div>
            </div>
        </div>
    );
};

export default TabProfile;
