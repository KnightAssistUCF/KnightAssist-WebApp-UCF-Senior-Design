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

const Announcements = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [announcements, setAnnouncements] = useState(null);
  const [numPages, setNumPages] = useState(0);  
  const [perPage, setPerPage] = useState(7);
  const [page, setPage] = useState(1);

  const handleClick = (announcement) => {
    setSelectedAnnouncement(announcement);
    setIsModalOpen(true);
  };

  function changePage(e, value){
		setPage(value);
		console.log(props.announcements)
		setAnnouncements(props.announcements.slice(perPage * (value - 1), perPage * (value - 1) + perPage).map((announcement) => {
			const { updateID, title, content, date, name } = announcement;
  
			return (
			  <Grid item xs={7} key={updateID} marginTop={"5px"} marginLeft={"18%"}>
				<Card variant="outlined" onClick={() => handleClick(announcement)}>
				  <CardActionArea>
					<CardContent className="content">
					  <Typography
						gutterBottom
						variant="h5"
						component="h2"
						className="title"
					  >
						{truncateText(title, 35)}
					  </Typography>
					  <Typography
						variant="body2"
						color="textSecondary"
						component="p"
						style={{ color: 'black'}}
					  >
						{name}
					  </Typography>
					  <Typography
						variant="body2"
						color="textSecondary"
						component="p"
						style={{ position: 'absolute', top: 0, right: 0, margin: '15px' }}
					  >
						{formatDate(date)}
					  </Typography>
					  <Typography
						variant="body2"
						color="textSecondary"
						component="p"
						style={{ marginTop: '6px' }}
					  >
						<i>{truncateText(content, 320)}</i>
					  </Typography>
					</CardContent>
				  </CardActionArea>
				</Card>
			  </Grid>
			);
		  }));
	}

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
	if(props.announcements){	
		setNumPages(Math.ceil(props.announcements.length / perPage));
		changePage(null, 1);
	}
  }, [props.announcements]);

  return (
    <div className="announcementCardList">
      <Grid
        container
        spacing={2}
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
      >
        {announcements}
      </Grid>
	  <Pagination className="pagination" page={page} count={numPages} onChange={changePage} color="secondary" />

      	<Dialog open={isModalOpen} onClose={handleCloseModal}>
			<DialogContent className='feedbackModal'>
				<DialogContentText className='contentWrap' style={{ color: 'black', fontSize: 25, marginBottom: 10}}>{selectedAnnouncement?.title}</DialogContentText>
				<DialogContentText style={{ marginBottom: 10}}>{formatDate(selectedAnnouncement?.date)}</DialogContentText>
				<DialogContentText style={{ color: 'black' }}>{selectedAnnouncement?.organizationName}</DialogContentText>
				<DialogContentText style={{ color: 'black', marginBottom: 5}}>{selectedAnnouncement?.organizationName}</DialogContentText>
				<DialogContentText className='contentWrap' style={{ color: 'black', marginTop: '10px' }}>{selectedAnnouncement?.content}</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleCloseModal}>Close</Button>
			</DialogActions>
		</Dialog>
    </div>
  );
};

export default Announcements;
