import { useState } from 'react';
import { Divider, List, ListItemButton, ListItemText, ListItem, IconButton, Box, Rating, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

function Feedback() {
  const [modalOpen, setModalOpen] = useState(false);

  const handleClose = () => {
    setModalOpen(false);
  };

  const [items, setItems] = useState([
    { id: 1, dateOrg: '10-20-23 Arboretum', content: 'This event was really cool, I enjoyed the dsfoglj fldfkj lfglsdjkf sd...', rating: 4 },
    { id: 2, dateOrg: '10-20-23 Knight Hacks', content: 'I wish the jls sd;flkdj flgdfj ;lsjf ;ldsfj ;sljf...', rating: 3 },
    { id: 3, dateOrg: '10-20-23 Another Event', content: 'sldkfj sdlfj sdlfjsd sfdsdf fsdf fdsfsdfl jdskfjsgfsdfsdf sfd...', rating: 5 },
    { id: 4, dateOrg: '10-20-23 Another Event', content: 'This event sucked osdflgj fdl;jsda;l jfsldjgd;fgjl;flj...', rating: 1 },
  ]);

  const limitedItems = items.slice(0, 3);

  const handleItemClose = (itemId) => {
    const updatedItems = items.filter((item) => item.id !== itemId);
    setItems(updatedItems);
  };

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
              <ListItem disablePadding sx={{ maxHeight: '60px' }} secondaryAction={<IconButton edge="end" aria-label="close announcement"><CloseIcon onClick={() => handleItemClose(item.id)} /></IconButton>}>
                <ListItemButton sx={{ maxHeight: '60px' }}>
                  <ListItemText primary={item.dateOrg} secondary={item.content} />
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
