import React, { useState, useEffect } from 'react';
import StudentHeader from '../StudentHome/StudentHeader';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Settings.css'
import Header from '../OrgEvents/Header';
import OrgTopBar from '../OrgHome/OrgTopBar';
import { Box, CardContent } from '@mui/material';
import { Card } from 'react-bootstrap';
import Customization from './Customization';
import Security from './Security';

function Settings(props){
	const [role, setRole] = useState(sessionStorage.getItem("role"));

	return(
		<div className='grayBG'>
			<OrgTopBar/>
			{(role === "volunteer") ? <StudentHeader/> : <Header/>}
			<div className='moveEverything'>
				<Card className='contactCard spartan'>
					<CardContent>
						<Customization/>
						<Security/>
					</CardContent>   
				</Card>
			</div>
		</div>
	);
};

export default Settings;