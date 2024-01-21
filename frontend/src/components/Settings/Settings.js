import React, { useState, useEffect } from 'react';
import StudentHeader from '../StudentHome/StudentHeader';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Settings.css'
import Header from '../OrgEvents/Header';
import OrgTopBar from '../OrgHome/OrgTopBar';
import { Box, Card, CardContent, Divider, Grid } from '@mui/material';
import {Button} from '@mui/material';
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
	const [visible, setVisible] = useState(false);

	async function getPassword(){
		let url = buildPath(`api/organizationSearch?organizationID=${sessionStorage.getItem("ID")}`);

        let response = await fetch(url, {
            method: "GET",
            headers: {"Content-Type": "application/json"},
        });
    
        let res = JSON.parse(await response.text());

		setCurPassword(res.password);
	}

	async function submit(){

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
				<Card className='settingsCard'>
					<CardContent>
						<Customization appearenceMode={appearenceMode} setAppearenceMode={setAppearenceMode} fontType={fontType} setFontType={setFontType}/>
						<Divider sx={{background: "black"}}/>
						<Security curPassword={curPassword} setCurPassword={setCurPassword} newPassword={newPassword} setNewPassword={setNewPassword} 
								  passwordCheck={passwordCheck} setPasswordCheck={setPasswordCheck} visible={visible} setVisible={setVisible}/>
                        <Grid container justifyContent="center" alignItems="center" marginBottom={"10px"}>
							<Button sx={{mt: 7, width: 175, backgroundColor: "#5f5395", "&:hover": {backgroundColor: "#7566b4"}}} variant="contained" onClick={() => submit()}>Save</Button>
						</Grid>
					</CardContent>   
				</Card>
			</div>
		</div>
	);
};

export default Settings;