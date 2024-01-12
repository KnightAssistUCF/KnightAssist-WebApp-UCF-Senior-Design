import React from 'react';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

const RatingLinear = styled(LinearProgress)(({ theme }) => ({
  height: 15,
  borderRadius: 3,
  backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 3,
    backgroundColor: theme.palette.mode === 'light' ? '#ffd700' : '#308fe8',
  },
}));

function RatingBox() {
  return (
    <div>
      <div className='ratingsTopRow'>
        <Box display="flex" justifyContent="space-between" alignItems="flex-end" width="100%">
          <Card variant='none' sx={{ width: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
            <div className='ratingNum'>
              4.3
            </div>
            <Rating value={4.3} precision={0.1} readOnly sx={{ fontSize: '2em' }} />
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
      <div className='ratingsBottomRow'>
        {/* Content for the bottom row */}
      </div>
    </div>
  );
}

export default RatingBox;
