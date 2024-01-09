import {useState, useEffect} from 'react';
import {Typography, Dialog, DialogTitle, DialogActions, Box, CardMedia, CardContent, Grid, Button, Card} from '@mui/material';

function NextEvent({upcomingEvents})
{
    const [modalOpen, setModalOpen] = useState(false);

    const handleClose = () => {
      setModalOpen(false);
    };

    const nextEvent = upcomingEvents[0];

    // useEffect(() => {
    //   console.log(upcomingEvents[0]);
    //   console.log(nextEvent);
    // }, []);

    return(
        <div>
          {nextEvent && Object.keys(nextEvent).length > 0 ? (
            <Card variant="outlined" sx={{ maxWidth: 555,  display: 'flex', marginBottom: '0', maxHeight: 270 }}>
            <Typography variant="h5" sx={{ paddingLeft: 2, paddingTop: 1, marginBottom: '0'}}>
                Next Event
            </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', pl: 1 }}>
                  <CardMedia
                    component="img"
                    sx={{width: 145, marginLeft: '15px', borderRadius: '7px', marginBottom: '0'}}
                    image={require('../Login/loginPic.png')}
                  />
                  <CardContent orientation="horizontal" sx={{ flex: '1 0 auto', textAlign: 'left'}}>
                  <div className="card-title"><strong>{nextEvent.name}</strong></div>
                    <div className="card1-text">
                      <div className="card-subtitle">{nextEvent.startTime}</div>
                      <div className="card-subtitle">{nextEvent.endTime}</div>
                      <div className="card-subtitle">{nextEvent.location}</div>
                    </div>
                    <Grid container justifyContent='flex-end' style={{ marginBottom: '0' }}>
                        <Button className='create-qr-code' size="medium" variant='contained' justify="flex-end" style={{ marginRight: '10px',  backgroundColor: '#5f5395', borderColor: '#968dbf', '&:hover': {
                        borderColor: '#5f5395', color: '#7566b4'  }  }} onClick={() => setModalOpen(true)}>Generate QR Code</Button>
                      </Grid>
                  </CardContent>
                </Box>
            </Card>
          ) : (
            <Typography variant="h6" sx={{ paddingLeft: 2, paddingTop: 1, marginBottom: '0' }}>
              No upcoming events
            </Typography>
          )}
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