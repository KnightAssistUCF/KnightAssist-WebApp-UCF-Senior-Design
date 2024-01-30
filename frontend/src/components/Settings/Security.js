import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Settings.css'
import { Box, CardContent, FormControl, FormControlLabel, IconButton, Input, InputAdornment, Radio, RadioGroup, TextField } from '@mui/material';
import { Card } from 'react-bootstrap';
import { Visibility, VisibilityOff } from '@mui/icons-material';

function Security(props){
	const [showNewPWD, setShowNewPWD] = useState(false);
	const [showCheckPWD, setShowCheckPWD] = useState(false);

	function iconClick(type){
		if(type === 1) setShowNewPWD(!showNewPWD);
		else setShowCheckPWD(!showCheckPWD);
	}

	function Header(){
		return (
			<div className='headerTxt'>
				Security
			</div>
		)
	}

	function PasswordForm(params){
		return (		
			<FormControl className='spartan settingsItem'>
				<Input
					sx={"input::-ms-reveal,input::-ms-clear { display: none;}"}
					type={params.show ? 'text' : 'password'}
					value={params.password}
					disabled={params.disabled}
					onChange={params.onChange}
					endAdornment={
						<InputAdornment position="end">
							<IconButton onClick={() => iconClick(params.type)}>
								{params.show ? <Visibility /> : <VisibilityOff />}
							</IconButton>
						</InputAdornment>
					}
				/>
			</FormControl>
		)
	}

	function NewPassword(){
		return (
			<div>
				<div className='subHeaderTxt'>New Password</div>
				{PasswordForm({show: showNewPWD, password: props.newPassword, disabled: false, type: 1, onChange: (e) => props.setNewPassword(e.target.value)})}
			</div>
		)
	}


	function CheckPassword(){
		return (
			<div>
				<div className='subHeaderTxt'>Confirm New Password</div>
				{PasswordForm({show: showCheckPWD, password: props.passwordCheck, disabled: false, type: 2, onChange: (e) => props.setPasswordCheck(e.target.value)})}
			</div>
		)
	}

	function EmailSetting(){
		return (
			<div>
				<div className='subHeaderTxt'>Receive Email Notifications</div>
				<FormControl className='spartan settingsItem'>
					<RadioGroup defaultValue={(props.getEmails === true) ? "Yes" : "No"}>
						<FormControlLabel value="Yes" control={<Radio />} label="Yes" onClick={() => {props.setGetEmails(true)}}/>
						<FormControlLabel value="No" control={<Radio />} label="No"  onClick={() => {props.setGetEmails(false)}}/>
					</RadioGroup>
				</FormControl>
			</div>
		)
	}

	return(
		<div className='securitySection'>
			<Header/>
			<div className='securitySubSection'>
				{NewPassword()}
			</div>
			<div className='securitySubSection'> 
				{CheckPassword()}
			</div>
			<div className='getEmailSpace'>
				<EmailSetting/>
			</div>
		</div>
	);
};

export default Security;