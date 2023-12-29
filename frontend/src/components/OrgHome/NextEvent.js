import {useState} from 'react';
import {Dialog, DialogTitle, DialogActions, Box, CardMedia, CardContent, Grid, Button, Card} from '@mui/material';

function NextEvent()
{
    const [modalOpen, setModalOpen] = useState(false);

    const handleClose = () => {
      setModalOpen(false);
    };

    return(
        <div>
            <Card variant="outlined" sx={{ maxWidth: 555,  display: 'flex', marginBottom: '0', maxHeight: 200 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', pl: 1 }}>
                  <CardMedia
                    component="img"
                    sx={{width: 155, marginLeft: '15px', borderRadius: '7px', marginBottom: '0'}}
                    image={require('../Login/loginPic.png')}
                  />
                  <CardContent orientation="horizontal" sx={{ flex: '1 0 auto', textAlign: 'left'}}>
                  <div className="card-title"><strong>Event Title Name</strong></div>
                    <div className="card1-text">
                      <div className="card-subtitle">October 20th</div>
                      <div className="card-subtitle">10:00am - 12:00pm</div>
                      <div className="card-subtitle">Location</div>
                    </div>
                    <Grid container justifyContent='flex-end' style={{ marginBottom: '0' }}>
                        <Button className='create-qr-code' size="small" variant='outlined' justify="flex-end" style={{ marginRight: '15px',  color: '#5f5395', borderColor: '#968dbf', '&:hover': {
                        borderColor: '#5f5395', color: '#7566b4'  }  }} onClick={() => setModalOpen(true)}>Generate QR Code</Button>
                      </Grid>
                  </CardContent>
                </Box>
            </Card>

            <Dialog open={modalOpen} onClose={handleClose} maxWidth="lg" fullWidth >
                <DialogTitle>Put QR Code Here Maybe?</DialogTitle>
                <DialogActions>
                <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </div>

    );






};

export default NextEvent;