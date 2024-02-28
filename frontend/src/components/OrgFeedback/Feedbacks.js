import React, { useEffect, useState } from 'react';
import Card from "@mui/material/Card";
import { Grid, Pagination } from "@mui/material";
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
import { CiUnread } from "react-icons/ci";
import { CiRead } from "react-icons/ci";
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
  const [numPages, setNumPages] = useState(0);  
  const [perPage, setPerPage] = useState(7);
  const [page, setPage] = useState(1);
  const [theFeedbacks, setTheFeedbacks] = useState([]);

  function changePage(e, value){
	setPage(value);
	console.log(props.feedback)
	setTheFeedbacks(props.feedback.slice(perPage * (value - 1), perPage * (value - 1) + perPage).map((feedback) => {
		return (
			<Grid item xs={7} marginTop={"5px"} marginLeft={"18%"}>
				<Card variant="outlined" onClick={() => handleClick(feedback)}>
					<CardActionArea>
						<CardContent className="content">
							<Typography
								gutterBottom
								variant="h5"
								component="h2"
								className="title"
							>
								{truncateText(feedback.eventName, 35)}
							</Typography>
							<Typography
								variant="body2"
								color="textSecondary"
								component="p"
								style={{ color: 'black'}}
							>
								<h6>{feedback.studentName}<span className='emailSize'>{((feedback.studentEmail) ? " - " + feedback.studentEmail : "")}</span></h6>
							</Typography>
							<Typography
								variant="body2"
								color="textSecondary"
								component="p"
								style={{ position: 'absolute', top: 0, right: 0, margin: '12px' }}
							>
								{(feedback.wasReadByUser) ? <CiRead className='spaceRead'/> : <CiUnread className='spaceRead'/>}
								<span className='showDate'>{formatDate(feedback.timeFeedbackSubmitted)}</span>
							</Typography>
							<Rating
								value={feedback.rating}
								readOnly
								className='cardRating'
							/>
							<Typography
								variant="body2"
								color="textSecondary"
								component="p"
								style={{ marginTop: '6px'}}
							>
								<i>{truncateText(feedback.feedbackText, 300)}</i>
							</Typography>
						</CardContent>
					</CardActionArea>
				</Card>
			</Grid>
		);
	  }));
}

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

	props.setMarkRead(feedback._id);

	console.log(res);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
	if(props.feedback){	
		setNumPages(Math.ceil(props.feedback.length / perPage));
		changePage(null, 1);
	}
  }, [props.feedback]);

  return (
    <div className="announcementCardList">
      <Grid
        container
        spacing={2}
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
      >
        {theFeedbacks}
      </Grid>
	  <Pagination className="pagination" page={page} count={numPages} onChange={changePage} color="secondary" />

	  	{(selectedFeedback !== null) ?
			<Dialog open={isModalOpen} onClose={handleCloseModal}>
				<DialogContent className='feedbackModal'>
					<DialogContentText style={{ color: 'black', fontSize: 25, marginBottom: 10}}>{selectedFeedback.eventName}</DialogContentText>
					<DialogContentText style={{ marginBottom: 10}}>{formatDate(selectedFeedback.timeFeedbackSubmitted)}</DialogContentText>
					<DialogContentText style={{ color: 'black', marginBottom: 5}}>
						{selectedFeedback.studentName} 
						<span className='emailSize'>{((selectedFeedback.studentEmail) ? " - " + selectedFeedback.studentEmail : "")}</span>				
					</DialogContentText>
					<Rating
						value={selectedFeedback.rating}
						readOnly
					/>
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
