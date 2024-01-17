import { useState, useEffect } from 'react';
import Header from '../OrgEvents/Header';
import StudentHeader from '../StudentHome/StudentHeader'
import './OrgProfile.css';
import OrgTopBar from '../OrgHome/OrgTopBar';
import Card from '@mui/material/Card';
import { Button, Typography, CardContent, CardMedia } from '@mui/material';
import { buildPath } from '../../path';
import NavTabs from './NavTabs';
import OrgBox from './OrgBox';

function OrgProfile() {
	const [org, setOrg] = useState(null);
	const [bgFile, setBGFile] = useState(null);

	async function getOrgInfo(){
        let organizationID;
		
		if("viewingPageID" in sessionStorage && 
		   sessionStorage.getItem("ID") !== sessionStorage.getItem("viewingPageID")){
			organizationID = sessionStorage.getItem("viewingPageID");
		}else{
			organizationID = sessionStorage.getItem("ID");
		}
        
        let url = buildPath(`api/organizationSearch?organizationID=${organizationID}`);

        let response = await fetch(url, {
            method: "GET",
            headers: {"Content-Type": "application/json"},
        });
    
        let res = JSON.parse(await response.text());

		console.log(res);
		
		setOrg(res);

		url = buildPath(`api/retrieveImage?entityType=organization&id=${organizationID}&profilePicOrBackGround=1`);

		response = await fetch(url, {
			method: "GET",
			headers: {"Content-Type": "application/json"},
		});

		let background = await response.blob();

		setBGFile(background);
	}

	function BackgroundBanner(){
		return (
				<CardMedia
					className='orgBannerFiller'
					component="img"
					image={(bgFile !== null) ? URL.createObjectURL(bgFile) : ""}
				/>				
		)
	}

	useEffect(() => {
		getOrgInfo();
	
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div>
			{/* <OrgTopBar /> */}
			{(sessionStorage.getItem("role") === "organization") ? <Header /> : <StudentHeader/>}
			<div className='orgProfilePage spartan'>
				{/* <div className='orgProfileTitle'>Organization Profile</div> */}
				{(org !== null)
					?	
					<div>
						<BackgroundBanner/>
						<OrgBox org={org}/>
						<div className='navTabs'>
							<NavTabs org={org}/>
						</div>
					</div>
					: ""
				}
			</div>
		
		</div>
	);
}

export default OrgProfile;
