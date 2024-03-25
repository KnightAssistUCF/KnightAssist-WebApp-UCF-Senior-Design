import React, { useState, useEffect } from 'react';
import StudentHeader from '../StudentHome/StudentHeader';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Settings.css'
import Header from '../OrgEvents/Header';
import OrgTopBar from '../OrgHome/OrgTopBar';
import { Box, CardContent, MenuItem, Select, Switch, Typography, CardMedia } from '@mui/material';
import { Card } from 'react-bootstrap';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

function Customization(props){
	
	function Header(){
		return (
			<div className='headerTxt'>
				Customization
			</div>
		)
	}

	function Appearence(){

		return (
			<div>
				<div className='subHeaderTxt'>Appearance</div>
				<CssBaseline />
				<div style={{ alignItems: 'center' }}>
					<FormControl className='spartan settingsItem'>
						<RadioGroup defaultValue={props.appearenceMode}>
							<FormControlLabel value="light" control={<Radio className={props.radioColor}/>} label="Light" onClick={() => {props.setAppearenceMode("light")}}/>
							<FormControlLabel value="dark" control={<Radio className={props.radioColor}/>} label="Dark"  onClick={() => {props.setAppearenceMode("dark")}}/>
						</RadioGroup>
					</FormControl>
				</div>
			</div>
		)
	}

	return(
		<div className='customizationSection'>
			<Header/>
			<div className='settingsSubSection'>
				<Appearence/>
			</div>
		</div>
	);
};

export default Customization;