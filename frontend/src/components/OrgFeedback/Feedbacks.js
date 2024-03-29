import React, { useEffect, useState } from 'react';
import Card from "@mui/material/Card";
import { Box, Grid, Pagination } from "@mui/material";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import CloseIcon from '@mui/icons-material/Close';
import Rating from '@mui/material/Rating';
import { CiUnread } from "react-icons/ci";
import { CiRead } from "react-icons/ci";
import { buildPath } from '../../path';
import { SettingsPowerRounded } from '@mui/icons-material';

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

  function openStudentPage(id){
	sessionStorage.setItem("viewingStudentPageID", id);
	window.location.href="/#/studentprofile";
  }

  function changePage(e, value){
	setPage(value);
	console.log(props.feedback)
	setTheFeedbacks(props.feedback.slice(perPage * (value - 1), perPage * (value - 1) + perPage).map((feedback) => {
		return (
			<Grid item xs={10} marginTop={"5px"}>
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
							>
								<Rating
									value={feedback.rating}
									readOnly
									className='cardRating'
								/>
								<h6>{feedback.studentName}<span className='emailSize'>{((feedback.studentEmail) ? " - " + feedback.studentEmail : "")}</span></h6>
	
							</Typography>

							<Typography
								variant="body2"
								component="p"
								style={{ position: 'absolute', top: 0, right: 0, margin: '12px' }}
							>
								{(feedback.wasReadByUser) ? <CiRead className='spaceRead'/> : <CiUnread className='spaceRead'/>}
								<span className='showDate'>{formatDate(feedback.timeFeedbackSubmitted)}</span>
							</Typography>
							<Typography
								variant="body2"
								component="p"
								style={{ marginTop: '15px'}}
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
		// This useEffect was called due to
		// clicking an announcemnt
		if(props.readChange === true){
			props.setReadChange(false);
			setNumPages(Math.ceil(props.feedback.length / perPage));
			if(Math.ceil(props.feedback.length / perPage) < page){
				changePage(null, page - 1);
			}else{
				changePage(null, page);
			}
		}else{
			setNumPages(Math.ceil(props.feedback.length / perPage));
			changePage(null, 1);
		}
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

	  <Box my={3} display="flex" justifyContent="center">
	  	<Pagination className="feedbackPagination" page={page} count={numPages} onChange={changePage} shape="rounded" />
	  </Box>

	  	{(selectedFeedback !== null) ?
			<Dialog open={isModalOpen} onClose={handleCloseModal}>
				<DialogContent className='feedbackModal'>
					<button className='closeFeedback'>
						<CloseIcon onClick={handleCloseModal}/>
					</button>
					<DialogContentText color="textPrimary" style={{ marginBottom: 10}}>{formatDate(selectedFeedback.timeFeedbackSubmitted)}</DialogContentText>
					<DialogContentText color="textPrimary" className='contentWrap' style={{fontSize: 25, marginBottom: 10}}>{selectedFeedback.eventName}</DialogContentText>
					<DialogContentText color="textPrimary" style={{marginBottom: 5}}>
						<a className='hoverOrgName' style={{color: (sessionStorage.getItem("theme") === "light") ? "black" : "white"}} onClick={() => openStudentPage(selectedFeedback.studentId)}><b>{selectedFeedback.studentName}</b></a>
						<span className='emailSize'>{((selectedFeedback.studentEmail) ? " - " + selectedFeedback.studentEmail : "")}</span>		
						<Rating
							value={selectedFeedback.rating}
							readOnly
							className='cardRating'
						/>		
					</DialogContentText>
					<DialogContentText color="textPrimary" className='contentWrap' style={{ marginTop: '10px' }}>{selectedFeedback.feedbackText}</DialogContentText>
				</DialogContent>
			</Dialog>
			: null
		}
    </div>
  );
};

export default Feedbacks;
