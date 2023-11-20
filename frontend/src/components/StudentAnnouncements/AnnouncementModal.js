// MyDialog.js
import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

const AnnouncementModal = ({ open, onClose, title }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perferendis odit aperiam veniam repudiandae deserunt consequuntur, sequi voluptate est tempora vero saepe id quod a suscipit numquam incidunt adipisci eos explicabo.</p>
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
