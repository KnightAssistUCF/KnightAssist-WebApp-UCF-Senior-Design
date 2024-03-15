import * as React from 'react';
import { Grid, Typography, Button, Box } from '@mui/material';
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
import QrCodeScannerOutlinedIcon from '@mui/icons-material/QrCodeScannerOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';

function Features() {
    const iconColor = '#593959';

    const featuresData = [
        {
          icon: <ExploreOutlinedIcon style={{ color: iconColor, fontSize: '40px' }}/>,
          title: 'Explore Opportunities',
          description: 'Discover meaningful volunteering opportunities and connect with diverse organizations.',
        },
        {
          icon: <QrCodeScannerOutlinedIcon style={{ color: iconColor, fontSize: '40px' }}/>,
          title: 'QR Code Integration',
          description: 'Easily check into volunteering events with the simple scan of a QR code, conveniently found on the mobile app.',
        },
        {
          icon: <AssignmentOutlinedIcon style={{ color: iconColor, fontSize: '40px' }}/>,
          title: 'Volunteer Tracking',
          description: 'Effortlessly track your volunteer hours, stay organized with a built-in calendar, never missing an upcoming event.',
        },
      ];

  return (
    <Box sx={{ marginTop: 5, marginBottom: 5, marginRight: '15%', marginLeft: '15%'}}>
        <Typography variant="h4" sx={{ color: '#212121'}}>
            Our Features
        </Typography>
        <Grid container spacing={3} sx={{ marginTop: 3, marginBottom: 5}}>
            {featuresData.map((column, index) => (
                <Grid item xs={12} sm={4} key={index}>
                    <Box textAlign="center">
                        {column.icon}
                        <Typography variant="h6" fontWeight="bold" mt={1} style={{ color: '#212121' }}>
                        {column.title}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" sx={{ maxWidth: '275px', margin: '0 auto' }}>
                        {column.description}
                        </Typography>
                    </Box>
                </Grid>
            ))}
        </Grid>
    </Box>
  );
}
export default Features;