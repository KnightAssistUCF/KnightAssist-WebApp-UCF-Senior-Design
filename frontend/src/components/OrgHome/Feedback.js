import { useState, useEffect } from 'react';
import { Divider, List, ListItemButton, ListItemText, ListItem, IconButton, Box, Rating, Typography, Dialog, DialogTitle, DialogContent } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { buildPath } from '../../path';
import './OrgHome.css';
import { lightBlue } from '@mui/material/colors';

function Feedback() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);

  const handleCloseModal = async () => {
    if (selectedAnnouncement) {
      await readFeedback(selectedAnnouncement);
      fetchAllFeedback();
    }
    setModalOpen(false);
  };

  const handleOpenModal = (announcement) => {
    setSelectedAnnouncement(announcement);
    setModalOpen(true);
  };

  const [items, setItems] = useState([]);

  const truncateText = (text, maxLength) => {
    if (text && text.length > maxLength) {
      return text.substring(0, maxLength) + " ...";
    }
    return text;
  };

  const formatDate = (dateString) => {
    const isValidDate = !isNaN(new Date(dateString).getTime());

    if (isValidDate) {
      const options = { month: "long", day: "numeric" };
      const formattedDate = new Date(dateString).toLocaleDateString(
        undefined,
        options
      );
      return formattedDate;
    } else {
      return dateString;
    }
  };

  const fetchAllFeedback = async () => {
    try {
      let url = buildPath(
        `api/retrieveAllFeedback_ForAnOrg?orgId=${"6530608eae2eedf04961794e"}`
      );

      let response = await fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      let res = JSON.parse(await response.text());

      console.log(res);
      var unreadFeedback = [];
      for (let feedback of res) {
        console.log(feedback.eventName);
        if (feedback.wasReadByUser === false) {
          console.log("unread " + feedback._id);
          unreadFeedback.push(feedback);
        }
      }

      unreadFeedback.sort(
        (a, b) =>
          new Date(b.timeFeedbackSubmitted) - new Date(a.timeFeedbackSubmitted)
      );
      setItems(unreadFeedback);
    } catch (e) {
      console.log("API called failed");
    }
  };

  const readFeedback = async (feedback) => {
    try {
      let url = buildPath(`api/markAsRead`);

      const json = {
        eventId: feedback.eventId,
        feedbackId: feedback._id,
      };

      let response = await fetch(url, {
        body: JSON.stringify(json),
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      let res = await response.text();
      console.log(res);
    } catch (e) {
      console.log("API called failed");
    }
  };

  const limitedItems = items.slice(0, 3);

  const handleItemClose = (itemId) => {
    const updatedItems = items.filter((item) => item._id !== itemId);
    setItems(updatedItems);
  };

  useEffect(() => {
    fetchAllFeedback();
  }, []);

  return (
    <Box
      sx={{
        border: 1,
        borderColor: "grey.300",
        width: "100%",
        minWidth: "600px",
        height: "250px",
        display: "flex",
        flexDirection: "column",
        bgcolor: "background.paper",
        color: "black",
        borderRadius: "3px",
      }}
    >
      <Typography
        variant="h5"
        sx={{ paddingLeft: 2, paddingTop: 2, paddingBottom: 1 }}
      >
        Feedback
      </Typography>
      {limitedItems.length <= 0 ? (
        <div
          className="StudentHomePage-subtitle"
          style={{
            textAlign: "center",
            alignItems: "center",
            fontSize: "15px",
            color: "darkgray",
          }}
        >
          No feedback available
        </div>
      ) : (
        <List sx={{ flex: 1 }}>
          {limitedItems.map((item) => (
            <div key={item.id}>
              <ListItem
                disablePadding
                sx={{ maxHeight: "60px" }}
                secondaryAction={
                  <IconButton
                    edge="end"
                    aria-label="close announcement"
                    onClick={() => handleItemClose(item._id)}
                  >
                    <CloseIcon />
                  </IconButton>
                }
              >

              <ListItemButton
                sx={{ maxHeight: "60px" }}
                onClick={() => handleOpenModal(item)}
              >
                {limitedItems.includes(item) && item.wasReadByUser === false && (
                  <div className='unreadIcon'></div>
                )}
                <ListItemText
                  primary={
                    formatDate(item.createdAt) +
                    " " +
                    item.eventName
                  }
                  secondary={truncateText(item.feedbackText, 40)}
                />
                <Rating value={item.rating} readOnly />
              </ListItemButton>

              </ListItem>
              <Divider variant="middle" />
            </div>
          ))}
        </List>
      )}
      <Dialog open={modalOpen} onClose={handleCloseModal} maxWidth='lg'>
        <DialogTitle>{selectedAnnouncement?.eventName}</DialogTitle>
        <DialogContent style={{ marginTop: '10px' }}>{selectedAnnouncement?.feedbackText}</DialogContent>
      </Dialog>
    </Box>
  );
}

export default Feedback;

