import React, { useState, useEffect } from 'react';
import StudentHeader from '../StudentHome/StudentHeader';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Settings.css'
import Header from '../OrgEvents/Header';
import OrgTopBar from '../OrgHome/OrgTopBar';
import { Box, Card, CardContent, Divider, Grid } from '@mui/material';
import {Button} from '@mui/material';
import Alert from '@mui/material/Alert';
import Customization from './Customization';
import Security from './Security';
import { buildPath } from '../../path.js';
import StudentTopBar from '../TopBar/StudentTopBar';

function Settings(){
	const [role, setRole] = useState(undefined);

	const [appearenceMode, setAppearenceMode] = useState(undefined);
	const [fontType, setFontType] = useState(undefined);
	const [newPassword, setNewPassword] = useState("");
	const [passwordCheck, setPasswordCheck] = useState("");
	const [getEmails, setGetEmails] = useState(undefined);
	
	const [showError, setShowError] = useState(false);
	const [errors, setErrors] = useState([]);

	async function submit(){
		if(!validInput()) return;

		setErrors(false);
		setShowError(false);

		let url;
		
		if(role === "volunteer"){
			url = buildPath("api/editUserProfile");
		}else{
			url = buildPath("api/editOrganizationProfile");
		}

		const json = 
		{
			id: sessionStorage.getItem("ID"),
			password: newPassword
		}

		console.log(json);

		try{
			const response = await fetch(url, {
				method: "POST",
				body: JSON.stringify(json),
				headers: {"Content-Type": "application/json",         
				"Authorization": `Bearer ${sessionStorage.getItem("token")}`}
			});
	
			let res = await response.text();
			console.log(res);
		}catch(e){
			console.log(e);
		}
	}

	function validInput(){
		const errs = [];

        if(newPassword.length < 8)
            errs.push("Password must be at least 8 characters");

		if(newPassword !== passwordCheck)
			errs.push("Passwords do not match");

		if(errs.length == 0) return true;
		
		setShowError(true);
		setErrors(errs);

        return false;
    }

	function ErrorMessage(){
        return (
            <div>
                {(showError) === true
                    ?
                        <div>
							{errors.map((err) => (
                            	<Alert severity="error">{err}</Alert>					
							))}
                        </div>
                    :
                        null
                }
            </div>
        )
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

		// Should be changed as a field for the org
		// if we implement private accounts
		if(!("getEmails" in sessionStorage)){
			setGetEmails(true);
		}else{
			setGetEmails(sessionStorage.getItem("getEmails"));
		}
	}, []);

	return(
		<div className='spartan grayBG'>
			{(role === "volunteer") ? <StudentTopBar/> : <OrgTopBar/>}
			{(role === "volunteer") ? <StudentHeader/> : <Header/>}
			<div className='moveEverything'>
				<Card className='settingsCard'>
					<CardContent>
						<Customization appearenceMode={appearenceMode} setAppearenceMode={setAppearenceMode} fontType={fontType} setFontType={setFontType}/>
						<Divider className='dividerSpace' sx={{background: "black"}}/>
						<Security newPassword={newPassword} setNewPassword={setNewPassword} passwordCheck={passwordCheck} setPasswordCheck={setPasswordCheck} 
								  getEmails={getEmails} setGetEmails={setGetEmails}/>
                        <Grid container justifyContent="center" alignItems="center" marginBottom={"10px"}>
							<Button sx={{mt: 7, width: 175, backgroundColor: "#5f5395", "&:hover": {backgroundColor: "#7566b4"}}} variant="contained" onClick={() => submit()}>Save</Button>
						</Grid>
						<ErrorMessage/>
					</CardContent>   
				</Card>
			</div>
		</div>
	);
};

export default Settings;