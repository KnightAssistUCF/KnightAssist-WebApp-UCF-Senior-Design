// AnnouncementCard.js
import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import AnnouncementModal from './AnnouncementModal';

const AnnouncementCard = ({ orgName, date, title, content }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

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
      <AnnouncementModal open={isModalOpen} onClose={handleCloseModal} title={title} content={content} date={date} />
    </>
  );
};

export default AnnouncementCard;
