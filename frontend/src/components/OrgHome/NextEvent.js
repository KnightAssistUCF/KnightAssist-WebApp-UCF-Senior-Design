import {useState, useEffect} from 'react';
import {Typography, Dialog, DialogTitle, DialogActions, Box, CardMedia, CardContent, Grid, Button, Card} from '@mui/material';
import { buildPath } from '../../path';
import QRCodeModal from '../OrgEvents/QRCodeModal';

function NextEvent({upcomingEvents})
{
    const [modalOpen, setModalOpen] = useState(false);
	const [eventID, setEventID] = useState(undefined);
    const [eventPic, setEventPic] = useState(null);
	const [openQRModal, setOpenQRModal] = useState(false);
	const [checkType, setCheckType] = useState(undefined);

	const [generateCheckIn, setGenerateCheckIn] = useState(false);
	const [generateCheckOut, setGenerateCheckOut] = useState(false);

	// Can show the check in button if the event has not
	// ended and it is the same day or the event has started
	function canShowCheckIn(start, end){
		let startDay = String(start);
        startDay = startDay.substring(0, startDay.indexOf("T"));

        let today = new Date().toISOString();
        today = today.substring(0, today.indexOf("T"));
		
		// It is before the day the event starts
		if(startDay.localeCompare(today) > 0) return false;
		
		// It is before the event ends
		return new Date().toISOString().localeCompare(end) < 0;
	}

	// During the period of the event
	function canShowCheckOut(start, end){
		const date = new Date().toISOString();
		return date.localeCompare(start) > 0 && date.localeCompare(end) < 0;
	}

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
		let url = buildPath(`api/retrieveImage?typeOfImage=1&id=${eventID}`);

		let response = await fetch(url, {
			method: "GET",
			headers: {"Content-Type": "application/json"},
		});

		let pic = JSON.parse(await response.text());

		setEventPic(pic.url);
      } catch (error) {
        console.error('Error fetching image:', error);
      }
    }
    
  
    useEffect(() => {
		if(eventID)
    		getUpcomingEventPic();
    }, [eventID]);

	useEffect(() => {
		if(upcomingEvents){
			setEventID(upcomingEvents._id);
			setGenerateCheckIn(canShowCheckIn(upcomingEvents.startTime, upcomingEvents.endTime));
			setGenerateCheckOut(canShowCheckOut(upcomingEvents.startTime, upcomingEvents.endTime));
		}
	}, [upcomingEvents]);

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
                    sx={{width: 145, height: 160, marginLeft: '15px', borderRadius: '7px', marginBottom: '0'}}
                    image={eventPic}
                  />
                  <CardContent orientation="horizontal" sx={{ flex: '1 0 auto', textAlign: 'left'}}>
                  <div className="card-title"><strong>{truncateText(nextEvent.name, 25)}</strong></div>
                    <div className="card1-text">
                      <div className="card-subtitle">{formatDate(nextEvent.startTime)}</div>
                      <div className="card-subtitle">{formatDate(nextEvent.endTime)}</div>
                      <div className="card-subtitle">{truncateText(nextEvent.location, 45)}</div>
                    </div>
                    <Grid container justifyContent='flex-end' style={{ marginBottom: '0' }}>
						<Button disabled={!generateCheckIn} sx={{ mt: 1, mr: 1, width: 165, borderRadius: 8, color: "white", backgroundColor: "#5f5395", "&:hover": {backgroundColor: "#7566b4"}}} variant="contained" onClick={() => {setCheckType("In"); setOpenQRModal(true);}}>Generate Check-In Code</Button>
						<Button disabled={!generateCheckOut} sx={{ mt: 1, width: 165, borderRadius: 8, color: "white", backgroundColor: "#5f5395", "&:hover": {backgroundColor: "#7566b4"}}} variant="contained" onClick={() => {setCheckType("Out"); setOpenQRModal(true);}}>Generate Check-Out Code</Button>
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
			<QRCodeModal eventID={eventID} open={openQRModal} setOpen={setOpenQRModal} checkType={checkType} setCheckType={setCheckType}/>
        </div>

    );






};

export default NextEvent;