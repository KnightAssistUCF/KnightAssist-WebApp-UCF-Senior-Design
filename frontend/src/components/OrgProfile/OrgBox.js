import { useState, useEffect } from 'react';
import Header from '../OrgEvents/Header';
import './OrgProfile.css';
import OrgTopBar from '../OrgHome/OrgTopBar';
import Card from '@mui/material/Card';
import { Button, Typography, CardContent, Avatar } from '@mui/material';
import { buildPath } from '../../path';
import NavTabs from './NavTabs';

function OrgBox(props) {

	const [picName, setPicName] = useState(null);

  
	async function getProfilePic(){
		const url = buildPath(`api/retrieveImage?entityType=organization&id=${sessionStorage.getItem("ID")}&profilePicOrBackGround=0`);

		const response = await fetch(url, {
			method: "GET",
			headers: {"Content-Type": "application/json"},
		});

		let pic = await response.blob();

		setPicName(pic);
	}

	useEffect(() => {
		getProfilePic();
	});

	function ProfilePic(){
		return (
			<Avatar
				src={(picName !== null) ? URL.createObjectURL(picName) : "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"}
				sx={{ width: 150, height: 150}} 
			/>
		)
	}

	function OrgName(){
		return (
			<div className='orgName'>{props.org.name}</div>
		)
	}

	return (
		<div className='orgBox'>
			<div className='items'>
				{ProfilePic()}
				
				<OrgName/>
			</div>
		</div>
	);
}

export default OrgBox;
