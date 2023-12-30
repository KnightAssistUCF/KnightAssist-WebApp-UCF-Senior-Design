import React, { useState, useEffect, useContext } from 'react';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Logo from '../Logo';
import Chip from '@mui/material/Chip';
import { buildPath } from '../../path';
import Pagination from '@mui/material/Pagination';
import Header from '../StudentHome/StudentHeader';
import Avatar from '@mui/material/Avatar';
import { List, ListItem, ListItemText, Divider } from '@mui/material';
import {Button} from '@mui/material';
import EventModal from './EventModal';
import 'bootstrap/dist/css/bootstrap.min.css';
import './StudentHistory.css'

function StudentHistory()
{

	const [eventHistories, setEventHistories] = useState([]);
	const [shownHistories, setShownHistories] = useState();
    const [numPages, setNumPages] = useState(0);  
    const [page, setPage] = useState(1);

	const [eventID, setEventID] = useState(undefined);
	const [openModal, setOpenModal] = useState(false);

	// Max number of event histories per page
	const [amtPerPage, setAmtPerPage] = useState(5);

	function setUpModal(id){
		setEventID(id);
		setOpenModal(true);
	}

    async function changePage(e, value){
        setPage(value);

		const histories = eventHistories.slice(amtPerPage * (value - 1), amtPerPage * (value - 1) + amtPerPage);
		
		for(let i = 0; i < histories.length; i++){
			const history = histories[i];

			const url = buildPath(`api/retrieveImage?entityType=event&id=${history.ID}`);

			const response = await fetch(url, {
				method: "GET",
				headers: {"Content-Type": "application/json"},
			});
	
			let pic =  await response.blob();

			histories[i] =  <div>
							{(i == 0) ? <Divider sx={{width: "100%", background: "black"}}/> : ""}
							<ListItem>
								<Grid container layout={'row'} className='listsItems'>
									<Grid item>
										<Avatar
											src={URL.createObjectURL(pic)}
											className="eventPic"
										/>
									</Grid>
									<Grid item sm={4}>
										<ListItemText className='historyDetails' primary={<span style={{ whiteSpace: 'pre-wrap' }}>
																{history.name + " (" + history.org + ")"}
															</span>} 						
													secondary={<span style={{ whiteSpace: 'pre-wrap' }}>
														{"Check In: " + history.checkIn[0] + " at " + history.checkIn[1] 
														+ "\nCheck Out: " + history.checkOut[0] + " at " + history.checkOut[1] + "\nHours Accumulated: +" + history.hours}
															</span>}
										/>
									</Grid>
									<Grid item>
										<Button sx={{ mt: 4, ml:6, width: 150, backgroundColor: "#5f5395", "&:hover": {backgroundColor: "#7566b4"}}} variant="contained" onClick={() => setUpModal(history.ID)}>Event Info</Button>
									</Grid>
								</Grid>
							</ListItem>
							<Divider sx={{background: "black"}}/>
						</div>
		}

		setShownHistories(histories);
	}

	async function getHistory(){ 
		try {
		   
			let url = buildPath(`api/historyOfEvents_User?studentId=${localStorage.getItem("ID")}`);

			let response = await fetch(url, {
				method: "GET",
				headers: {"Content-Type": "application/json"},
			});
		
			let res = JSON.parse(await response.text());

			// Sort by time if date is equal, date otherwise
			res.sort(function(a, b) {
				return Date.parse(a.checkIn[0] + " " + a.checkIn[1]) - Date.parse(b.checkIn[0] + " " + b.checkIn[1]);
			});

			setEventHistories(res);
			setNumPages(Math.ceil(res.length / amtPerPage));

			const histories = res.slice(0, amtPerPage);

			console.log(histories);

			for(let i = 0; i < histories.length; i++){
				const history = histories[i];

				url = buildPath(`api/retrieveImage?entityType=event&id=${history.ID}`);

				response = await fetch(url, {
					method: "GET",
					headers: {"Content-Type": "application/json"},
				});
		
				let pic =  await response.blob();

				histories[i] =  <div>
								{(i == 0) ? <Divider sx={{width: "100%", background: "black"}}/> : ""}
								<ListItem>
									<Grid container layout={'row'} className='listsItems'>
										<Grid item sm={1}>
											<Avatar
												src={URL.createObjectURL(pic)}
												className="eventPic"
											/>
										</Grid>
										<Grid item sm={4}>
											<ListItemText className='historyDetails' primary={<span style={{ whiteSpace: 'pre-wrap' }}>
																	{history.name + " (" + history.org + ")"}
																</span>} 						
														secondary={<span style={{ whiteSpace: 'pre-wrap' }}>
															{"Check In: " + history.checkIn[0] + " at " + history.checkIn[1] 
															+ "\nCheck Out: " + history.checkOut[0] + " at " + history.checkOut[1] + "\nHours Accumulated: +" + history.hours}
																</span>}
											/>
										</Grid>
										<Grid item>
											<Button sx={{ mt: 4, ml:6, width: 150, backgroundColor: "#5f5395", "&:hover": {backgroundColor: "#7566b4"}}} variant="contained" onClick={() => setUpModal(history.ID)}>Event Info</Button>
										</Grid>
									</Grid>
								</ListItem>
								<Divider sx={{background: "black"}}/>
							</div>
			}


			setShownHistories(histories);

		} catch (e) {
			console.log("failed");
		}  
	}

    function Title(){
		return(
		  <div className='yourEvents spartan'>
			 <h1>Your History</h1>
		  </div>
		)
	}

	useEffect(() => {
		getHistory();
	}, []);

    return(
      <div id='homePage'>
		<Header/>
		<div className='moveEverything'>
			<Title/>
			<List sx={{color: "black"}} component="nav" aria-label="mailbox folders">
				{shownHistories}
			</List>
            <Pagination className="pagination" page={page} count={numPages} onChange={changePage} color="secondary" />
			<EventModal eventID={eventID} setEventID={setEventID} open={openModal} setOpen={setOpenModal}/>
		</div>
      </div>
    );
};

export default StudentHistory;
