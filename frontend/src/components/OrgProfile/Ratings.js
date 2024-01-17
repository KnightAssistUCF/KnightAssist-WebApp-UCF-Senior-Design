import { useState, useEffect } from 'react';
import { Card, CardContent, Dialog } from '@mui/material';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { buildPath } from '../../path';

const RatingLinear = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 3,
  backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 3,
    backgroundColor: theme.palette.mode === 'light' ? '#ffd700' : '#308fe8',
  },
}));

function RatingBox(props) {
    const [isModalOpen, setModalOpen] = useState(false);
	const [feedback, setFeedback] = useState(null);

    const handleCardClick = () => {
      setModalOpen(true);
    };
  
    const handleCloseModal = () => {
      setModalOpen(false);
    };

	async function getFeedback(org){
		let url = buildPath(`api/retrieveAllFeedback_ForAnOrg?orgId=${org._id}`);

        let response = await fetch(url, {
            method: "GET",
            headers: {"Content-Type": "application/json"},
        });
    
        let res = JSON.parse(await response.text());

		setFeedback(res);
	}

	useEffect(() => {
		getFeedback(props.org);
	}, [props.org]);

  return (
	(feedback !== null)
		?
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
				{(feedback.length > 0) 
					?
					<CardContent>
						{feedback[0].eventName}
						<Rating value={feedback[0].rating} readOnly size='medium' />
						<div className='navParagraphText'>{feedback[0].feedbackText.slice(0, 120)}...</div>
						</CardContent>
					:
					""
				}
				</Card>
				<Card variant='outlined' sx={{ width: '32.5%', minHeight: '30vh', display: 'flex', alignItems: 'center', flexDirection: 'column', margin: '15px 0', '&:hover': { backgroundColor: '#e0e0e0', cursor: 'pointer' } } }onClick={handleCardClick}>
				{(feedback.length > 1) 
					?
					<CardContent>
						{feedback[1].eventName}
						<Rating value={feedback[1].rating} readOnly size='medium' />
						<div className='navParagraphText'>{feedback[1].feedbackText.slice(0, 120)}...</div>
					</CardContent>
					:
					""
				}
				</Card>
				<Card variant='outlined' sx={{ width: '32.5%', minHeight: '30vh', display: 'flex', alignItems: 'center', flexDirection: 'column', margin: '15px 0', '&:hover': { backgroundColor: '#e0e0e0', cursor: 'pointer' } } }onClick={handleCardClick}>
				{(feedback.length > 2) 
					?
					<CardContent>
						{feedback[2].eventName}
						<Rating value={feedback[2].rating} readOnly size='medium' />
						<div className='navParagraphText'>{feedback[2].feedbackText.slice(0, 120)}...</div>
					</CardContent>
					:
					""
				}
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
	  : 
		""
  );
}

export default RatingBox;
