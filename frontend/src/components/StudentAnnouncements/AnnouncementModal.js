// MyDialog.js
import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

const AnnouncementModal = ({ open, onClose, title }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex dolorem inventore neque consectetur, asperiores sint voluptates! Quis, laudantium dicta in delectus officia hic assumenda quasi veritatis accusantium, expedita maxime unde ducimus possimus ab quae sit alias a suscipit obcaecati nostrum aperiam? Provident et, dignissimos nam quos nulla in laborum sapiente amet labore iure magnam qui consequuntur a voluptate nobis tempore? Nostrum dolore, adipisci corrupti et laborum, aliquam impedit voluptas, nulla quas omnis asperiores consequuntur nesciunt doloribus laboriosam quae aliquid dolor. Nam, facere provident.</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AnnouncementModal;
