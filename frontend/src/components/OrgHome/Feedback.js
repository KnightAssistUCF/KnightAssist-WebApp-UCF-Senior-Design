import { useState } from 'react';
import { Divider, List, ListItemButton, ListItemText, ListItem, IconButton, Box, Dialog, DialogTitle, DialogActions, Button, Typography, Rating } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

function Feedback() {
  const [modalOpen, setModalOpen] = useState(false);

  const handleClose = () => {
    setModalOpen(false);
  };

  const [items, setItems] = useState([
    { id: 1, primary: '10-20-23 Arboretum', secondary: 'This event was really cool, I enjoyed the dsfoglj fldfkj lfglsdjkf sd...', rating: 4 },
    { id: 2, primary: '10-20-23 Knight Hacks', secondary: 'I wish the jls sd;flkdj flgdfj ;lsjf ;ldsfj ;sljf...', rating: 3 },
    { id: 3, primary: '10-20-23 Another Event', secondary: 'sldkfj sdlfj sdlfjsd sfdsdf fsdf fdsfsdfl jdskfjsgfsdfsdf sfd...', rating: 5 },
    { id: 4, primary: '10-20-23 Another Event', secondary: 'This event sucked osdflgj fdl;jsda;l jfsldjgd;fgjl;flj...', rating: 1 },
  ]);

  const limitedItems = items.slice(0, 3);

  const handleItemClose = (itemId) => {
    // Filter the items to remove the one with the given itemId
    const updatedItems = items.filter((item) => item.id !== itemId);
    setItems(updatedItems);
  };

  return (
    <div>
      <Box sx={{ border: 1, borderColor: 'grey.300', width: '100%', minWidth: '600px', minHeight: '200px', bgcolor: 'background.paper', color: 'black', borderRadius: '3px' }}>
        {limitedItems.length <= 0 ? (
          <div className="StudentHomePage-subtitle" style={{ textAlign: 'center', alignItems: 'center', fontSize: '15px', color: 'darkgray' }}>No feedback available</div>
        ) : (
          <List>
            {limitedItems.map((item) => (
              <div key={item.id}>
                <ListItem disablePadding sx={{ maxHeight: '60px' }} secondaryAction={<IconButton edge="end" aria-label="close announcement"><CloseIcon onClick={() => handleItemClose(item.id)} /></IconButton>}>
                  <ListItemButton sx={{ maxHeight: '60px' }}>
                    <ListItemText primary={item.primary} secondary={item.secondary} />
                    <Rating value={item.rating} readOnly />
                  </ListItemButton>
                </ListItem>
                <Divider variant="middle" />
              </div>
            ))}
          </List>
        )}
      </Box>
    </div>
  );
}

export default Feedback;
