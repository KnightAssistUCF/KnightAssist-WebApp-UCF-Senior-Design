import React, { useState, useEffect, useContext } from 'react';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Logo from '../Logo';
import Chip from '@mui/material/Chip';
import { buildPath } from '../../path';
import Pagination from '@mui/material/Pagination';
import Header from '../StudentHome/StudentHeader';
import { List, ListItem, ListItemText, Divider } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';

function StudentHistory()
{
	const [eventHistories, setEventHistories] = useState([]);
	const [shownHistories, setShownHistories] = useState();
    const [numPages, setNumPages] = useState(0);  
    const [page, setPage] = useState(1);

	// Max number of event histories per page
	const [amtPerPage, setAmtPerPage] = useState(5);

    function changePage(e, value){
        setPage(value);

		const histories = eventHistories.slice(amtPerPage * (value - 1), amtPerPage * (value - 1) + amtPerPage);
		setShownHistories(histories.map((history, i) => 	
			<div>
				{(i == 0) ? <Divider sx={{width: "100%", background: "black"}}/> : ""}
				<ListItem>
					<ListItemText primary={<span style={{ whiteSpace: 'pre-wrap' }}>
											{"Event Attended: " + history.name}
										  </span>} 						
 								secondary={<span style={{ whiteSpace: 'pre-wrap' }}>
									{"Check In: " + history.checkIn[0] + " at " + history.checkIn[1] 
								 	+ "\nCheck Out: " + history.checkOut[0] + " at " + history.checkOut[1] + "\nHours Accumulated: +" + history.hours}
								 		</span>}
					/>
				</ListItem>				
				<Divider sx={{background: "black"}}/>
			</div>
		))
	}

	async function getHistory(){        
        let url = buildPath(`api/historyOfEvents_User?studentId=${localStorage.getItem("ID")}`);

        let response = await fetch(url, {
            method: "GET",
            headers: {"Content-Type": "application/json"},
        });
    
        let res = JSON.parse(await response.text());
		res = res.concat(res);
		res = res.concat(res);
		res = res.concat(res);
		

        setEventHistories(res);
		setNumPages(Math.ceil(res.length / amtPerPage));

		const histories = res.slice(0, amtPerPage);

		console.log(histories);

		setShownHistories(histories.map((history, i) => 	
			<div>
				{(i == 0) ? <Divider sx={{width: "100%", background: "black"}}/> : ""}
				<ListItem>
					<ListItemText primary={<span style={{ whiteSpace: 'pre-wrap' }}>
											{"Event Attended: " + history.name}
										  </span>} 						
 								secondary={<span style={{ whiteSpace: 'pre-wrap' }}>
									{"Check In: " + history.checkIn[0] + " at " + history.checkIn[1] 
								 	+ "\nCheck Out: " + history.checkOut[0] + " at " + history.checkOut[1] + "\nHours Accumulated: +" + history.hours}
								 		</span>}
					/>
				</ListItem>
				<Divider sx={{background: "black"}}/>
			</div>
		));
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
		</div>
      </div>
    );
};

export default StudentHistory;
