import { useState, useEffect } from 'react';
import { Card, CardContent, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Button from "@mui/material/Button";
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
	const [selectedFeedback, setSelectedFeedback] = useState(null);

	const [averageRating, setAverageRating] = useState(0);
	const [num5s, setNum5s] = useState(0);
	const [num4s, setNum4s] = useState(0);
	const [num3s, setNum3s] = useState(0);
	const [num2s, setNum2s] = useState(0);
	const [num1s, setNum1s] = useState(0);


    const handleCardClick = (feedback) => {
      setModalOpen(true);
	  setSelectedFeedback(feedback)
    };
  
    const handleCloseModal = () => {
      setModalOpen(false);
	  setSelectedFeedback(null);
    };

	async function getFeedback(org){
		let url = buildPath(`api/retrieveAllFeedback_ForAnOrg?orgId=${org._id}`);

        let response = await fetch(url, {
            method: "GET",
            headers: {"Content-Type": "application/json"},
        });
    
        let res = JSON.parse(await response.text());

		let sum = 0;
		const freq = [0, 0, 0, 0, 0];

		for(let f of res){
			sum += f.rating;
			freq[f.rating - 1]++;
		}

		setFeedback(res);

		if(res.length === 0){
			setAverageRating("No Ratings Found");
		}else{
			setAverageRating((sum / res.length).toFixed(1));
		}

		setNum5s(freq[4]);
		setNum4s(freq[3]);
		setNum3s(freq[2]);
		setNum2s(freq[1]);
		setNum1s(freq[0]);
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
							{averageRating}
						</div>
						<Rating value={averageRating} precision={0.1} readOnly sx={{ fontSize: '1.5em' }} />
					</Card>
		
					<Card variant='none' sx={{ width: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
						<RatingLinear variant="determinate" value={(num5s / feedback.length) * 100} sx={{ width: '60%', margin: '8px 0' }} />
						<RatingLinear variant="determinate" value={(num4s / feedback.length) * 100} sx={{ width: '60%', margin: '8px 0' }} />
						<RatingLinear variant="determinate" value={(num3s / feedback.length) * 100} sx={{ width: '60%', margin: '8px 0' }} />
						<RatingLinear variant="determinate" value={(num2s / feedback.length) * 100} sx={{ width: '60%', margin: '8px 0' }} />
						<RatingLinear variant="determinate" value={(num1s / feedback.length) * 100} sx={{ width: '60%', margin: '8px 0' }} />
					</Card>
				</Box>
			</div>
			<div className='ratingsBottomRow' style={{ height: '50%' }}>
			<Box display="flex" justifyContent="space-between" alignItems="stretch" height="100%">
				{(feedback.length > 0) 
					?
					<Card variant='outlined' sx={{ width: '32.5%', minHeight: '30vh', display: 'flex', alignItems: 'center', flexDirection: 'column', margin: '15px 0', '&:hover': { backgroundColor: '#e0e0e0', cursor: 'pointer' } } }onClick={() => handleCardClick(feedback[0])}>
						<CardContent>
							<div className='feedbackEvent'>{feedback[0].eventName.slice(0, 20)}{(feedback[0].eventName.length > 20) ? "..." : ""}</div>
							<Rating value={feedback[0].rating} readOnly size='medium' />
							<div className='navParagraphText'>{feedback[0].feedbackText.slice(0, 120)}{(feedback[0].feedbackText.length > 120) ? "..." : ""}</div>
						</CardContent>
					</Card>
					: ""
				}
				{(feedback.length > 1) 
					?
					<Card variant='outlined' sx={{ width: '32.5%', minHeight: '30vh', display: 'flex', alignItems: 'center', flexDirection: 'column', margin: '15px 0', '&:hover': { backgroundColor: '#e0e0e0', cursor: 'pointer' } } }onClick={() => handleCardClick(feedback[1])}>
						<CardContent className='theContent'>
							<div className='feedbackEvent'>{feedback[1].eventName.slice(0, 20)}{(feedback[1].eventName.length > 20) ? "..." : ""}</div>
							<Rating value={feedback[1].rating} readOnly size='medium' />
							<div className='navParagraphText'>{feedback[1].feedbackText.slice(0, 120)}{(feedback[1].feedbackText.length > 120) ? "..." : ""}</div>
						</CardContent>
					</Card>
					: ""
				}
				{(feedback.length > 2) 
					?
					<Card variant='outlined' sx={{ width: '32.5%', minHeight: '30vh', display: 'flex', alignItems: 'center', flexDirection: 'column', margin: '15px 0', '&:hover': { backgroundColor: '#e0e0e0', cursor: 'pointer' } } }onClick={() => handleCardClick(feedback[2])}>
						<CardContent>
							<div className='feedbackEvent'>{feedback[2].eventName.slice(0, 20)}{(feedback[2].eventName.length > 20) ? "..." : ""}</div>
							<Rating value={feedback[2].rating} readOnly size='medium' />
							<div className='navParagraphText'>{feedback[2].feedbackText.slice(0, 120)}{(feedback[2].feedbackText.length > 120) ? "..." : ""}</div>
						</CardContent>
					</Card>
					:	""
				}
			</Box>
			</div>
			{(selectedFeedback !== null)
				?
					<Dialog className="hideScroll" open={isModalOpen} onClose={handleCloseModal}>
						<DialogContent className='feedbackModal'>
							<DialogTitle className='feedbackTitle'>
								{selectedFeedback.eventName}
							</DialogTitle>
							<Rating
								value={selectedFeedback.rating}
								readOnly
							/>
							<DialogContentText className='feedbackTxt' style={{ color: 'black', marginTop: '10px', marginBottom: '10px'}}>{selectedFeedback.feedbackText}</DialogContentText>
							<DialogActions className='closeFeedbackBtn'>
								<Button onClick={handleCloseModal}>Close</Button>
							</DialogActions>
						</DialogContent>
					</Dialog>
				:
					""
			}
		</div>
	  : 
		""
  );
}

export default RatingBox;
