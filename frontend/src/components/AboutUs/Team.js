import React from 'react';
import { Grid, Typography, Card, CardContent, CardMedia } from '@mui/material';
import './Team.css';

const Team = () => {
  const teamMembers = [
    { name: 'Anisha Ranjan', role: 'Project Manager, Frontend', image: require('./TeamPics/Anisha.png') },
    { name: 'Melanie Ehrlich', role: 'Project Manager, Backend, Artist, Mobile', image: require('./TeamPics/Melanie.webp') },
    { name: 'Yohan Hmaiti', role: 'Backend, Database', image: require('./TeamPics/Yohan.webp') },
    { name: 'Noah Seligson', role: 'Frontend/Backend, Web', image: require('./TeamPics/Noah.webp') },
    { name: 'Rebecca Baker', role: 'Mobile', image: require('./TeamPics/Rebecca.webp') },
    { name: 'Alyssa Yee-Kee', role: 'Frontend, Web', image: require('./TeamPics/Aly.webp') },
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
                        width: 120,
                        height: 120,
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
