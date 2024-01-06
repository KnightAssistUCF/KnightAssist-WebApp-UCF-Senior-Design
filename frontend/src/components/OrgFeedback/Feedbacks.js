import React, { useState } from 'react';
import Card from "@mui/material/Card";
import { Grid } from "@mui/material";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Rating from '@mui/material/Rating';
import { buildPath } from '../../path';

const truncateText = (text, maxLength) => {
  if (text && text.length > maxLength) {
    return text.substring(0, maxLength) + " ...";
  }
  return text;
};

const formatDate = (dateString) => {
	const isValidDate = !isNaN(new Date(dateString).getTime());

	if (isValidDate) {
		const options = { year: "numeric", month: "long", day: "numeric" };
		const formattedDate = new Date(dateString).toLocaleDateString(
		undefined,
		options
		);
		return formattedDate;
	} else {
		return dateString;
	}
};

const Feedbacks = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState(null);

  const handleClick = async (feedback) => {
    setSelectedFeedback(feedback);
    setIsModalOpen(true);

	const json = {
		eventId: feedback.eventId,
		feedbackId: feedback._id
	};

	let url = buildPath(`api/markAsRead`);

	let response = await fetch(url, {
		body: JSON.stringify(json),
		method: "POST",
		headers: { "Content-Type": "application/json" },
	});

	let res = await response.text();

	console.log(res);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="announcementCardList">
      <Grid
        container
        spacing={2}
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
      >
        {props.feedback.map(feedback => 
            <Grid item xs={12}>
              <Card variant="outlined" onClick={() => handleClick(feedback)}>
                <CardActionArea>
                  <CardContent className="content">
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="h2"
                      className="title"
                    >
                      {feedback.eventName}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                      style={{ color: 'black'}}
                    >
                      {feedback.studentName}
					  <Rating
						value={feedback.rating}
						readOnly
						className='cardRating'
					/>
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                      style={{ position: 'absolute', top: 0, right: 0, margin: '15px' }}
                    >
                      {formatDate(feedback.timeFeedbackSubmitted)}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                      style={{ marginTop: '6px' }}
                    >
                      <i>{truncateText(feedback.feedbackText, 320)}</i>
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
        )}
      </Grid>

      {/* Modal */}
	  	{(selectedFeedback != null) ?
			<Dialog open={isModalOpen} onClose={handleCloseModal}>
				<DialogTitle>{selectedFeedback.eventName}</DialogTitle>
				<DialogContent>
					<DialogContentText style={{ position: 'absolute', top: 0, right: 0, margin: '15px' }}>{formatDate(selectedFeedback.timeFeedbackSubmitted)}</DialogContentText>
					<DialogContentText style={{ color: 'black'}}>
						{selectedFeedback.studentName} 				
						<Rating
							value={selectedFeedback.rating}
							readOnly
							className='cardRatingModal'
						/>
					</DialogContentText>
					<DialogContentText style={{ color: 'black', marginTop: '10px' }}>{selectedFeedback.feedbackText}</DialogContentText>
				</DialogContent>
				<DialogActions>
				<Button onClick={handleCloseModal}>Close</Button>
				</DialogActions>
			</Dialog>
			: null
		}
    </div>
  );
};

export default Feedbacks;
