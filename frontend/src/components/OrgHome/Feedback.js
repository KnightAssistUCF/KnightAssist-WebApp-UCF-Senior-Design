import { useState, useEffect } from 'react';
import { Divider, List, ListItemButton, ListItemText, ListItem, IconButton, Box, Rating, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { buildPath } from '../../path';

function Feedback() {
  const [modalOpen, setModalOpen] = useState(false);

  const handleClose = () => {
    setModalOpen(false);
  };

  const [items, setItems] = useState([]);
  //   { _id: 1, dateOrg: '10-20-23 Arboretum', feedbackText: 'This event was really cool, I enjoyed the dsfoglj fldfkj lfglsdjkf sd...', rating: 4 },
  //   { _id: 2, dateOrg: '10-20-23 Knight Hacks', feedbackText: 'I wish the jls sd;flkdj flgdfj ;lsjf ;ldsfj ;sljf...', rating: 3 },
  //   { _id: 3, dateOrg: '10-20-23 Another Event', feedbackText: 'sldkfj sdlfj sdlfjsd sfdsdf fsdf fdsfsdfl jdskfjsgfsdfsdf sfd...', rating: 5 },
  //   { _id: 4, dateOrg: '10-20-23 Another Event', feedbackText: 'This event sucked osdflgj fdl;jsda;l jfsldjgd;fgjl;flj...', rating: 1 },
  // ]);

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
      const url = buildPath(`api/retrieveAllFeedback_ForAnOrg?orgId=${"6530608eae2eedf04961794e"}`);

			let response = await fetch(url, {
				method: "GET",
				headers: { "Content-Type": "application/json" },
			});

			let res = JSON.parse(await response.text());

			console.log(res)
      var unreadAnnouncements = [];
      for(let announcement of res) {
        console.log(announcement.eventName);
        if(announcement.wasReadByUser === false) {
          console.log("unread " + announcement._id);
          unreadAnnouncements.push(announcement);
        }
      }

			unreadAnnouncements.sort((a, b) => new Date(b.timeFeedbackSubmitted) - new Date(a.timeFeedbackSubmitted));
      setItems(unreadAnnouncements);

    } catch(e) {
      console.log("API called failed");
    }
  }

  const limitedItems = items.slice(0, 3);

  const handleItemClose = (itemId) => {
    const updatedItems = items.filter((item) => item._id !== itemId);
    setItems(updatedItems);
  };

  useEffect(() => {
		fetchAllFeedback();
	}, []);

  return (
    <Box sx={{ border: 1, borderColor: 'grey.300', width: '100%', minWidth: '600px', height: '250px', display: 'flex', flexDirection: 'column', bgcolor: 'background.paper', color: 'black', borderRadius: '3px' }}>
      <Typography variant="h5" sx={{ paddingLeft: 2, paddingTop: 2, paddingBottom: 1 }}>
        Feedback
      </Typography>
      {limitedItems.length <= 0 ? (
        <div className="StudentHomePage-subtitle" style={{ textAlign: 'center', alignItems: 'center', fontSize: '15px', color: 'darkgray' }}>No feedback available</div>
      ) : (
        <List sx={{ flex: 1 }}>
          {limitedItems.map((item) => (
            <div key={item.id}>
              <ListItem disablePadding sx={{ maxHeight: '60px' }} secondaryAction={<IconButton edge="end" aria-label="close announcement"><CloseIcon onClick={() => handleItemClose(item._id)} /></IconButton>}>
                <ListItemButton sx={{ maxHeight: '60px' }}>
                  <ListItemText primary={formatDate(item.createdAt) + " " + item.eventName} secondary={truncateText(item.feedbackText, 40)} />
                  <Rating value={item.rating} readOnly />
                </ListItemButton>
              </ListItem>
              <Divider variant="middle" />
            </div>
          ))}
        </List>
      )}
    </Box>
  );
}

export default Feedback;
