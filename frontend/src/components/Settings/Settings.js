import React, { useState, useEffect } from 'react';
import StudentHeader from '../StudentHome/StudentHeader';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Settings.css'
import Header from '../OrgEvents/Header';
import OrgTopBar from '../OrgHome/OrgTopBar';
import { Box, Card, CardContent, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Grid } from '@mui/material';
import {Button} from '@mui/material';
import Alert from '@mui/material/Alert';
import Customization from './Customization';
import Security from './Security';
import { buildPath } from '../../path.js';
import StudentTopBar from '../TopBar/StudentTopBar';

function Settings(props){
	const [role, setRole] = useState(undefined);

	const [appearenceMode, setAppearenceMode] = useState(undefined);
	const [newPassword, setNewPassword] = useState("");
	const [passwordCheck, setPasswordCheck] = useState("");
	const [getEmails, setGetEmails] = useState(undefined);
	const [radioColor, setRadioColor] = useState("");
	const [bgColor, setBGColor] = useState("");
	
	const [showError, setShowError] = useState(false);
	const [errors, setErrors] = useState([]);

	const handleCloseDeleteAccount = () => {setOpenDeleteAccount(false);}
    const [openDeleteAccount, setOpenDeleteAccount] = useState(false);

	async function submit(){

		let url;
			
		if(role === "volunteer"){
			url = buildPath("api/editUserProfile");
		}else{
			url = buildPath("api/editOrganizationProfile");
		}

		const json = 
		{
			id: sessionStorage.getItem("ID"),
			appearenceMode: appearenceMode,
			receiveEmails: getEmails
		}

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

		props.setTheme(appearenceMode);
		sessionStorage.setItem("theme", appearenceMode);

		if(appearenceMode === "light"){
			setRadioColor("darkRadio");
			setBGColor("light");
		}else{
			setRadioColor("lightRadio");
			setBGColor("dark");
		}


		sessionStorage.setItem("receiveEmails", getEmails);

		// The user is not trying to reset their password
		if(newPassword !== ""){
			if(!validInput()) return;

			setErrors(false);
			setShowError(false);
	
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
	}

	async function deleteAccount(){
		let url;
		if(role === "volunteer"){
			url = buildPath("api/userDelete");
		}else{
			url = buildPath("api/organizationDelete");
		}

		const json = 
		{
			id: sessionStorage.getItem("ID"),
		}

		try{
			const response = await fetch(url, {
				method: "DELETE",
				body: JSON.stringify(json),
				headers: {"Content-Type": "application/json",         
				"Authorization": `Bearer ${sessionStorage.getItem("token")}`}
			});
	
			let res = await response.text();
			
			window.location.href = '#/';
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

		if(!("theme" in sessionStorage)){
			setAppearenceMode("light");
			setRadioColor("darkRadio");
		}else{
			setAppearenceMode(sessionStorage.getItem("theme"));
			if(sessionStorage.getItem("theme") === "light"){
				setRadioColor("darkRadio");
				setBGColor("light");
			}else{
				setRadioColor("lightRadio");
				setBGColor("dark");
			}
		}

		if(!("receiveEmails" in sessionStorage)){
			setGetEmails("true");
		}else{
			setGetEmails(sessionStorage.getItem("receiveEmails"));
		}
	}, []);

	return(
		<div className={'spartan ' + ((role === "volunteer") ? "settingsCardSpaceVol" : "settingsCardSpaceOrg ")  + bgColor} style={{minHeight: '100vh'}}>
			{(sessionStorage.getItem("role") === "volunteer") ? <StudentTopBar title="Settings"/> : <OrgTopBar title="Settings"/>}
			{(sessionStorage.getItem("role") === "volunteer") ? <StudentHeader/> : <Header/>}
			<div className='moveEverythingSettings'>
				<Card className={'settingsCard'}>
					<CardContent>
						<Customization appearenceMode={appearenceMode} setAppearenceMode={setAppearenceMode} radioColor={radioColor}/>
						<Security newPassword={newPassword} setNewPassword={setNewPassword} passwordCheck={passwordCheck} setPasswordCheck={setPasswordCheck} 
								  getEmails={getEmails} setGetEmails={setGetEmails} radioColor={radioColor}/>
						<Grid container justifyContent="center" alignItems="center" marginBottom={"10px"}>
							<Button sx={{mt: 4.5, width: 175, backgroundColor: "#CC0202", color: "white", "&:hover": {backgroundColor: "#FF2400"}}} variant="contained" onClick={() => setOpenDeleteAccount(true)}>Delete Account</Button>
						</Grid>
                        <Grid container justifyContent="center" alignItems="center" marginBottom={"10px"}>
							<Button sx={{mt: 7, width: 175, backgroundColor: "#5f5395", color: "white", "&:hover": {backgroundColor: "#7566b4"}}} variant="contained" onClick={() => submit()}>Save</Button>
						</Grid>
						<ErrorMessage/>
					</CardContent>   
				</Card>
				<Dialog
					open={openDeleteAccount}
					onClose={handleCloseDeleteAccount}
					aria-labelledby="alert-dialog-title"
					aria-describedby="alert-dialog-description"
					>
						<DialogTitle id="alert-dialog-title">
						{"Delete Account"}
						</DialogTitle>
						<DialogContent>
						<DialogContentText id="alert-dialog-description">
							This will permanently remove your account and volunteer history on KnightAssist. Are you sure you want to delete your account?
						</DialogContentText>
						</DialogContent>
						<DialogActions>
							<Button onClick={handleCloseDeleteAccount}>Undo</Button>
							<Button sx={{color:"red"}} onClick={() => deleteAccount()} autoFocus>Delete</Button>
						</DialogActions>
				</Dialog> 
			</div>
		</div>
	);
};

export default Settings;