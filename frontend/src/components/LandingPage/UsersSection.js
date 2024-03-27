import * as React from 'react';
import { Card, CardContent, Button, Typography, Grid, CardMedia, Box } from '@mui/material';

const Users = () => {
    const cards = [
        { title: "For Students", description: "Sign up for events, track hours, and sign in with ease using a QR code.", imageUrl: "https://cdn-icons-png.flaticon.com/512/3462/3462157.png" },
        { title: "For Organizations", description: "Recruit volunteers, manage volunteer details, and create and organize events.", imageUrl: "https://cdn-icons-png.flaticon.com/512/7000/7000644.png" },
        { title: "For Admins", description: "Monitor organization and volunteer activity, ensuring certain criteria and guidelines are met. ", imageUrl: "https://cdn-icons-png.flaticon.com/512/78/78948.png" }
    ];

    const handleClick = () => {
        window.location.href = '#/register';
    };

  return (
    <Box sx={{ bgcolor: '#F5FAF8' }}>
        <Box sx={{ marginX: '5%'}}>
        <Typography variant="h4" sx={{ marginTop: 5, marginBottom: 2, color: '#212121'}}>
            The Ultimate Volunteering Platform
        </Typography>
        <Typography variant="subtitle1" sx={{color: 'black', opacity: '0.7'}} paddingBottom='30px'>
            Empowering Change: Crafted by Students, for Students. A Volunteering Community for All.
        </Typography>
        <Grid container spacing={3} sx={{ marginBottom: 3, alignItems: 'center', justifyContent: 'center' }}>
        {/* Map over the array of cards to render each one */}
        {cards.map((card, index) => (
            <Grid item xs={12} sm={6} md={3} key={index} sx={{ marginBottom: 5, justifyContent: 'center', display: 'flex' }}>
                <Card sx={{ width: 300, height: 375 }}>
                    <CardMedia
                    component="img"
                    height="200"
                    image={card.imageUrl}
                    alt={card.title}
                    />
                    <CardContent>
                    <Typography variant="subtitle1" component="h2" fontWeight={700}>
                        {card.title} {/* Render the title for the current card */}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p" sx={{ marginY: 1 }}>
                        {card.description} {/* Render the description for the current card */}
                    </Typography>
                    <Button variant="contained" onClick={() => handleClick()} sx={{  bgcolor: '#593959', ":hover": {bgcolor: '#322032'}, marginTop: ((index < 2) ? 2 : 0)}}>
                        Sign up
                    </Button>
                    </CardContent>
                </Card>
            </Grid>
        ))}
        </Grid>
        </Box>
    </Box>
  );
};

export default Users;
