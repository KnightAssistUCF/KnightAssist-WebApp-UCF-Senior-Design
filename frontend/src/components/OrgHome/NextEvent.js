import {useState, useEffect} from 'react';
import {Typography, Dialog, DialogTitle, DialogActions, Box, CardMedia, CardContent, Grid, Button, Card} from '@mui/material';
import { buildPath } from '../../path';

function NextEvent({upcomingEvents})
{
    const [modalOpen, setModalOpen] = useState(false);
    const [eventPic, setEventPic] = useState(null);

    const handleClose = () => {
      setModalOpen(false);
    };

    const nextEvent = upcomingEvents;

    const truncateText = (text, maxLength) => {
      if (text && text.length > maxLength) {
        return text.substring(0, maxLength) + " ...";
      }
      return text;
    };

    const formatDate = (dateString, includeTime = false) => {
      const isValidDate = !isNaN(new Date(dateString).getTime());
    
      if (isValidDate) {
        const options = {
          month: "long",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
        };
    
        const formattedDate = new Date(dateString).toLocaleDateString(
          undefined,
          options
        );
    
        return includeTime ? formattedDate : formattedDate.split(",")[0];
      } else {
        return dateString;
      }
    };


    async function getUpcomingEventPic() {
      try {
        let url = buildPath(`api/retrieveImage?typeofImage=1&id=${upcomingEvents._id}`);
        let response = await fetch(url, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });
    
        if (!response.ok) {
          throw new Error(`Failed to fetch image: ${response.statusText}`);
        }
    
        let pic = JSON.parse(await response.text());
        let picUrl = pic.url;
        console.log(picUrl);
        setEventPic(picUrl);
      } catch (error) {
        console.error('Error fetching image:', error);
      }
    }
    
  
    useEffect(() => {
      getUpcomingEventPic();
    }, []);
    

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
                    image={eventPic || require('../Login/loginPic.png')}
                  />
                  <CardContent orientation="horizontal" sx={{ flex: '1 0 auto', textAlign: 'left'}}>
                  <div className="card-title"><strong>{truncateText(nextEvent.name, 25)}</strong></div>
                    <div className="card1-text">
                      <div className="card-subtitle">{formatDate(nextEvent.startTime)}</div>
                      <div className="card-subtitle">{formatDate(nextEvent.endTime)}</div>
                      <div className="card-subtitle">{truncateText(nextEvent.location, 10)}</div>
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