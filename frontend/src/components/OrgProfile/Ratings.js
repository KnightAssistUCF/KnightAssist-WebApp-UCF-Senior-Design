import { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';

function RatingBox() {
  return (
    <div>
      <div className='ratingsTopRow'>
        <Box display="flex" justifyContent="space-between" width="100%">
          <Card variant='outlined' sx={{ width: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
            <div className='ratingNum'>
              4.3
            </div>
            <Rating value={4.3} precision={0.1} readOnly sx={{ fontSize: '2em' }} />
          </Card>

          <Card variant='outlined' sx={{ width: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
            <div className='ratingNum'>
              4.3
            </div>
            <Rating value={4.3} precision={0.1} readOnly sx={{ fontSize: '2em' }} />
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
