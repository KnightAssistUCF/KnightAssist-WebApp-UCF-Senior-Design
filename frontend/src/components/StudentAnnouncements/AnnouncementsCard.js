// AnnouncementCard.js
import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import AnnouncementModal from './AnnouncementModal';
import { buildPath } from '../../path';

const AnnouncementCard = ({ orgName, date, title, content, organizationID }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = () => {
    setIsModalOpen(true);
    markRead();
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  async function markRead() {
        try {
                const userID = "6519e4fd7a6fa91cd257bfda"; // John Doe
                let url = buildPath(`api/readAnnouncement?userID=${userID}`);
          
                // Send the organization ID and title as part of the request body
                const requestBody = {
                  orgID: organizationID,
                  oldTitle: title,
                };
          
                let response = await fetch(url, {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(requestBody),
                });
          
                let res = await response.text();
                console.log(res);
              } catch (e) {
                console.log("read failed", e);
              }
    }

  return (
    <>
      <Card variant='outlined' className='cardResult' onClick={handleClick}>
        <CardContent>
          <Grid container alignItems='center'>
            <Grid item>
              <CardMedia
                component='img'
                sx={{ width: 35, borderRadius: '700px' }}
                image={require('../Login/loginPic.png')}
              />
            </Grid>
            <div className='updateOrgTitle'>{orgName}</div>
            <Grid marginLeft='auto'>
              <div className='date'>{date}</div>
            </Grid>
          </Grid>
          <div className='divider'></div>
          <div className='updateTitle'>{title}</div>
          <div className='updateDescription'>
            <i>{content}</i>
          </div>
        </CardContent>
      </Card>
      <AnnouncementModal open={isModalOpen} onClose={handleCloseModal} title={title} content={content} date={date} orgID={organizationID} />
    </>
  );
};

export default AnnouncementCard;
