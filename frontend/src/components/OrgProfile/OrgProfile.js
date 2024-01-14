import { useState, useEffect } from 'react';
import Header from '../OrgEvents/Header';
import './OrgProfile.css';
import OrgTopBar from '../OrgHome/OrgTopBar';
import Card from '@mui/material/Card';
import { Button, Typography, CardContent } from '@mui/material';
import { buildPath } from '../../path';
import NavTabs from './NavTabs';
import OrgBox from './OrgBox';

function OrgProfile() {
	const [org, setOrg] = useState(null);

	async function getOrgInfo(){
        const organizationID = sessionStorage.getItem("ID");
        
        let url = buildPath(`api/organizationSearch?organizationID=${organizationID}`);

        let response = await fetch(url, {
            method: "GET",
            headers: {"Content-Type": "application/json"},
        });
    
        let res = JSON.parse(await response.text());

		console.log(res);
		
		setOrg(res);
	}

	useEffect(() => {
		getOrgInfo();
	
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div>
			{/* <OrgTopBar /> */}
				<Header />
			<div className='orgProfilePage spartan'>
				{/* <div className='orgProfileTitle'>Organization Profile</div> */}
				<div className='orgBannerFiller'></div>
				<OrgBox org={org}/>
				<div className='navTabs'>
					<NavTabs/>
				</div>
			</div>
		
		</div>
	);
}

export default OrgProfile;
