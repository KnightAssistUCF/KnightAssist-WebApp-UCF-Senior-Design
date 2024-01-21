import React, { useState, useEffect } from 'react';
import StudentHeader from '../StudentHome/StudentHeader';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Settings.css'
import Header from '../OrgEvents/Header';
import OrgTopBar from '../OrgHome/OrgTopBar';
import { Box, CardContent, Divider } from '@mui/material';
import { Card } from 'react-bootstrap';
import Customization from './Customization';
import Security from './Security';
import { buildPath } from '../../path.js';

function Settings(){
	const [role, setRole] = useState(undefined);

	const [appearenceMode, setAppearenceMode] = useState(undefined);
	const [fontType, setFontType] = useState(undefined);
	const [curPassword, setCurPassword] = useState(undefined);
	const [newPassword, setNewPassword] = useState("");
	const [passwordCheck, setPasswordCheck] = useState("");
	const [visibility, setVisibility] = useState(false);

	async function getPassword(){
		let url = buildPath(`api/organizationSearch?organizationID=${sessionStorage.getItem("ID")}`);

        let response = await fetch(url, {
            method: "GET",
            headers: {"Content-Type": "application/json"},
        });
    
        let res = JSON.parse(await response.text());

		setCurPassword(res.password);
	}

	useEffect(() => {
		setRole(sessionStorage.getItem("role"));

		if(!("appearenceMode" in sessionStorage)){
			setAppearenceMode("light");
		}else{
			setAppearenceMode(sessionStorage.getItem("appearenceMode"));
		}

		if(!("fontType" in sessionStorage)){
			setFontType("spartan");
		}else{
			setFontType(sessionStorage.getItem("fontType"));
		}

		getPassword();
	}, []);

	return(
		<div className='spartan grayBG'>
			<OrgTopBar/>
			{(role === "volunteer") ? <StudentHeader/> : <Header/>}
			<div className='moveEverything'>
				<Card className='contactCard'>
					<CardContent>
						<Customization appearenceMode={appearenceMode} setAppearenceMode={setAppearenceMode} fontType={fontType} setFontType={setFontType}/>
						<Divider sx={{background: "black"}}/>
						<Security curPassword={curPassword} setCurPassword={setCurPassword} newPassword={newPassword} setNewPassword={setNewPassword} passwordCheck={passwordCheck} setPasswordCheck={setPasswordCheck}/>
					</CardContent>   
				</Card>
			</div>
		</div>
	);
};

export default Settings;