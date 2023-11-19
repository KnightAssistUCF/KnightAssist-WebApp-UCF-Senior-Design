import React from 'react';
import { Grid, Typography, Card, CardContent, CardMedia } from '@mui/material';
import './Team.css';

const Team = () => {
  const teamMembers = [
    { name: 'First Last', role: 'Team Role', image: require('../Login/loginPic.png') },
    { name: 'First Last', role: 'Team Role', image: require('../Login/loginPic.png') },
    { name: 'First Last', role: 'Team Role', image: require('../Login/loginPic.png') },
    { name: 'First Last', role: 'Team Role', image: require('../Login/loginPic.png') },
    { name: 'First Last', role: 'Team Role', image: require('../Login/loginPic.png') },
    { name: 'First Last', role: 'Team Role', image: require('../Login/loginPic.png') },
  ];

  return (
    <div>
        <div className="teamContainer">
            <div className="teamTitle">Meet The Team</div>
            <Grid container spacing={2} justifyContent="center">
                {teamMembers.map((member, index) => (
                <Grid item key={index} xs={12} sm={6} md={4} lg={4}>
                    <Card variant="none" sx={{backgroundColor:'#F5D6BA'}}>
                    <CardMedia
                        component="img"
                        sx={{
                        width: 100,
                        height: 100,
                        borderRadius: '50%',
                        display: 'flex',
                        justifyContent: 'center',
                        margin: 'auto',
                        }}
                        image={member.image}
                    />
                    <CardContent>
                        <div className='teamName'>
                        {member.name}
                        </div>
                        <div className='teamRole'>
                        {member.role}
                        </div>
                    </CardContent>
                    </Card>
                </Grid>
                ))}
            </Grid>
        </div>
    </div>
  );
};

export default Team;
