import { useState, useEffect } from 'react';
import { Card, CardContent, Dialog } from '@mui/material';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

const RatingLinear = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 3,
  backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 3,
    backgroundColor: theme.palette.mode === 'light' ? '#ffd700' : '#308fe8',
  },
}));

const loremIpsumText =
'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Justo donec enim diam vulputate. Adipiscing elit ut aliquam purus sit amet luctus venenatis. Enim tortor at auctor urna nunc. Tellus id interdum velit laoreet id donec ultrices tincidunt. Egestas congue quisque egestas diam in. Eu lobortis elementum nibh tellus. Ullamcorper a lacus vestibulum sed arcu non odio. Cras pulvinar mattis nunc sed blandit libero. Gravida cum sociis natoque penatibus et magnis. Velit sed ullamcorper morbi tincidunt ornare. Sapien et ligula ullamcorper malesuada proin libero nunc. Enim eu turpis egestas pretium aenean.is. Velit sed ullamcorper morbi tincidunt ornare. Sapien et ligula ullamcorper malesuada proin libero nunc. Enim eu turpis egestas pretium aenean.is. Velit sed ullamcorper morbi tincidunt ornare. Sapien et ligula ullamcorper malesuada proin libero nunc. Enim eu turpis egestas pretium aenean.is. Velit sed ullamcorper morbi tincidunt ornare. Sapien et ligula ullamcorper malesuada proin libero nunc. Enim eu turpis egestas pretium aenean.is. Velit sed ullamcorper morbi tincidunt ornare. Sapien et ligula ullamcorper malesuada proin libero nunc. Enim eu turpis egestas pretium aenean.'; // Your long text here


function RatingBox() {
    const [isModalOpen, setModalOpen] = useState(false);

    const handleCardClick = () => {
      setModalOpen(true);
    };
  
    const handleCloseModal = () => {
      setModalOpen(false);
    };

  return (
    <div>
      <div className='ratingsTopRow'>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start" width="100%">
          <Card variant='none' sx={{ width: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
            <div className='ratingNum'>
              4.3
            </div>
            <Rating value={4.3} precision={0.1} readOnly sx={{ fontSize: '1.5em' }} />
          </Card>

          <Card variant='none' sx={{ width: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
            <RatingLinear variant="determinate" value={70} sx={{ width: '60%', margin: '8px 0' }} />
            <RatingLinear variant="determinate" value={20} sx={{ width: '60%', margin: '8px 0' }} />
            <RatingLinear variant="determinate" value={4} sx={{ width: '60%', margin: '8px 0' }} />
            <RatingLinear variant="determinate" value={4} sx={{ width: '60%', margin: '8px 0' }} />
            <RatingLinear variant="determinate" value={0} sx={{ width: '60%', margin: '8px 0' }} />
          </Card>
        </Box>
      </div>
      <div className='ratingsBottomRow' style={{ height: '50%' }}>
        <Box display="flex" justifyContent="space-between" alignItems="stretch" height="100%">
          <Card variant='outlined' sx={{ width: '32.5%', minHeight: '30vh', display: 'flex', alignItems: 'center', flexDirection: 'column', margin: '15px 0', '&:hover': { backgroundColor: '#e0e0e0', cursor: 'pointer' } } }onClick={handleCardClick}>
            <CardContent>
                Event Title Name
                <Rating value={4} readOnly size='medium' />
                <div className='navParagraphText'>{loremIpsumText.slice(0, 120)}...</div>
            </CardContent>
          </Card>
          <Card variant='outlined' sx={{ width: '32.5%', minHeight: '30vh', display: 'flex', alignItems: 'center', flexDirection: 'column', margin: '15px 0', '&:hover': { backgroundColor: '#e0e0e0', cursor: 'pointer' } } }onClick={handleCardClick}>
            <CardContent>
                Event Title Name
                <Rating value={4} readOnly size='medium' />
                <div className='navParagraphText'>{loremIpsumText.slice(0, 120)}...</div>
            </CardContent>
          </Card>
          <Card variant='outlined' sx={{ width: '32.5%', minHeight: '30vh', display: 'flex', alignItems: 'center', flexDirection: 'column', margin: '15px 0', '&:hover': { backgroundColor: '#e0e0e0', cursor: 'pointer' } } }onClick={handleCardClick}>
            <CardContent>
                Event Title Name
                <Rating value={4} readOnly size='medium' />
                <div className='navParagraphText'>{loremIpsumText.slice(0, 120)}...</div>
            </CardContent>
          </Card>
        </Box>
      </div>
      <Dialog open={isModalOpen} onClose={handleCloseModal}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Modal Title
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            This is the modal content.
          </Typography>
      </Dialog>
    </div>
  );
}

export default RatingBox;
