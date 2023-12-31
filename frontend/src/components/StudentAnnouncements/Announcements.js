import React, { useState, useEffect } from 'react';
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

  const handleClick = (announcement) => {
    setSelectedAnnouncement(announcement);
    setIsModalOpen(true);
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
        {props.announcements.map((announcement) => {
          const { updateID, title, content, date, organizationName } =
            announcement;

          return (
            <Grid item xs={12} key={updateID}>
              <Card variant="outlined" onClick={() => handleClick(announcement)}>
                <CardActionArea>
                  <CardContent className="content">
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="h2"
                      className="title"
                    >
                      {title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                      style={{ color: 'black'}}
                    >
                      {organizationName}
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
        })}
      </Grid>

      {/* Modal */}
      <Dialog open={isModalOpen} onClose={handleCloseModal}>
        <DialogTitle>{selectedAnnouncement?.title}</DialogTitle>
        <DialogContent>
        <DialogContentText style={{ color: 'black' }}>{selectedAnnouncement?.organizationName}</DialogContentText>
        <DialogContentText style={{ marginTop: '10px' }}>{formatDate(selectedAnnouncement?.date)}</DialogContentText>
        <DialogContentText style={{ color: 'black', marginTop: '10px' }}>{selectedAnnouncement?.content}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Announcements;
