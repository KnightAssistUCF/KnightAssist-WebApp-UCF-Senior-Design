import React, { useState, useEffect } from 'react';
import StudentHeader from '../StudentHome/StudentHeader';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Settings.css'
import Header from '../OrgEvents/Header';
import OrgTopBar from '../OrgHome/OrgTopBar';
import { Box, CardContent } from '@mui/material';
import { Card } from 'react-bootstrap';

function Security(props){

	function Header(){
		return (
			<div className='headerTxt'>
				Customization
			</div>
		)
	}

	return(
		<div>
			<Header/>
		</div>
	);
};

export default Security;