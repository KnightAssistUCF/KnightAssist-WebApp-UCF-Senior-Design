import React from 'react';
import { Grid, Typography, Card, CardContent, CardMedia } from '@mui/material';
import './Team.css';

const Team = () => {
  // Sample data for demonstration purposes
  const teamMembers = [
    { name: 'First Last 1', role: 'Team Role 1', image: require('../Login/loginPic.png') },
    { name: 'First Last 2', role: 'Team Role 2', image: require('../Login/loginPic.png') },
    { name: 'First Last 3', role: 'Team Role 3', image: require('../Login/loginPic.png') },
    { name: 'First Last 3', role: 'Team Role 3', image: require('../Login/loginPic.png') },
    { name: 'First Last 3', role: 'Team Role 3', image: require('../Login/loginPic.png') },
    { name: 'First Last 3', role: 'Team Role 3', image: require('../Login/loginPic.png') },
    // Add more team members as needed
  ];

  return (
    <div>
        <div className="teamTitle">Meet The Team</div>
      <Grid container spacing={2} justifyContent="center">
        {teamMembers.map((member, index) => (
          <Grid item key={index} xs={12} sm={6} md={4} lg={4}>
            <Card variant="none">
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
  );
};

export default Team;
