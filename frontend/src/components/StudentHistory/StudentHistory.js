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

    function changePage(e, value){
        setPage(value);
        //let content = <div className="cards d-flex flex-row cardWhite card-body">{events.slice(4 * (value - 1), 4 * (value - 1) + 4)}</div>
	
	}

	async function getHistory(){        
        let url = buildPath(`api/historyOfEvents_User?studentId=${localStorage.getItem("ID")}`);

        let response = await fetch(url, {
            method: "GET",
            headers: {"Content-Type": "application/json"},
        });
    
        let res = JSON.parse(await response.text());

        setEventHistories(res);

		const histories = res.slice(0, 4);

		console.log(histories);

		setShownHistories(histories.map(history => 	
			<div>
				<ListItem>
					<ListItemText primary={"Event Attended: " + history.name} secondary={"Hours Accumulated: +" + history.hours} />
				</ListItem>
			</div>
		))
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
