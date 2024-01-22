import React, { useState, useEffect } from 'react';
import StudentHeader from '../StudentHome/StudentHeader';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Settings.css'
import Header from '../OrgEvents/Header';
import OrgTopBar from '../OrgHome/OrgTopBar';
import { Box, CardContent, FormControl, FormControlLabel, IconButton, Input, InputAdornment, Radio, RadioGroup, TextField } from '@mui/material';
import { Card } from 'react-bootstrap';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import clsx from 'clsx';

function Security(props){
	const [newPassword, setNewPassword] = useState("");
	const [checkPassword, setCheckPassword] = useState("");

	const [showCurPWD, setShowCurPWD] = useState(false);
	const [showNewPWD, setShowNewPWD] = useState(false);
	const [showCheckPWD, setShowCheckPWD] = useState(false);

	function iconClick(type){
		if(type === 0) setShowCurPWD(!showCurPWD);
		else if(type === 1) setShowNewPWD(!showNewPWD);
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

	function CurrentPassword(){
		return (
			<div>
				<div className='subHeaderTxt'>Current Password</div>
				{PasswordForm({show: showCurPWD, password: props.curPassword, disabled: true, type: 0})}
			</div>
		)
	}

	function NewPassword(){
		return (
			<div>
				<div className='subHeaderTxt'>New Password</div>
				{PasswordForm({show: showNewPWD, password: newPassword, disabled: false, type: 1, onChange: (e) => setNewPassword(e.target.value)})}
			</div>
		)
	}


	function CheckPassword(){
		return (
			<div>
				<div className='subHeaderTxt'>Confirm New Password</div>
				{PasswordForm({show: showCheckPWD, password: checkPassword, disabled: false, type: 2, onChange: (e) => setCheckPassword(e.target.value)})}
			</div>
		)
	}

	function AccountVisibility(){
		return (
			<div>
				<div className='subHeaderTxt'>Account Visibility</div>
				<FormControl className='spartan settingsItem'>
					<RadioGroup defaultValue={props.visible}>
						<FormControlLabel value="public" control={<Radio />} label="Public" onClick={() => {props.setVisible("public")}}/>
						<FormControlLabel value="private" control={<Radio />} label="Private"  onClick={() => {props.setVisible("private")}}/>
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
			<div className='visibilitySpace'>
				<AccountVisibility/>
			</div>
		</div>
	);
};

export default Security;