import * as React from 'react';
import { useState } from 'react';
import { Grid, Typography, Button, Box, TextField } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Lottie from "lottie-react";
import PreLoginNavBar from '../../PreLogin/PreLoginNavBar';
import useStyles from '../../PreLogin/PreLoginStyles';
import Footer from '../Footer';
import './Contact.css';
import PageTitle from '../PageTitle';
import { Content } from '@radix-ui/react-tabs';
import { buildPath } from '../../path';

function UserInput() {
	const classes = useStyles();

	const [firstName, setFirstName] = useState(undefined);
	const [lastName, setLastName] = useState(undefined);
	const [email, setEmail] = useState(undefined);
	const [phone, setPhone] = useState(undefined);
	const [message, setMessage] = useState(undefined);

	const [hasSent, setHasSent] = useState(false);
	const [checkedOnce, setCheckedOnce] = useState(false);

	// To allow only letters for first and last name
	const regex = /[^a-z -]/gi;

	async function submit() {
		setCheckedOnce(true);

		if (firstName === undefined || lastName === undefined || email === undefined
			|| phone === undefined || message === undefined) {
			return;
		}


		const url = buildPath("api/contactUsFormSubmission");

		const json =
		{
			firstName: firstName,
			lastName: lastName,
			email: email,
			phone_number: phone,
			messageContent: message
		};

		try {
			const response = await fetch(url, {
				method: "POST",
				body: JSON.stringify(json),
				headers: { "Content-Type": "application/json" },
			});

			let res = await response.text();
			console.log(res);

			setHasSent(true);
			setCheckedOnce(false);
			setMessage("");
			setFirstName("");
			setLastName("");
			setEmail("");
			setPhone("");
			setTimeout(() => {
				setHasSent(false);
			}, 3000);
		} catch (e) {
			console.log(e)
		}
	}

	function WelcomeText() {
		return (
			<div className='welcomeText'>We are here for you! How can we help?</div>
		)
	}

	function SuccessMessage() {
		return (
			<div className='successText'>Message sent! A representative will be in touch within the hour!</div>
		)
	}

	function GridTextField(props) {
		return (
			<Grid item sx={(props.sx != null) ? props.sx : {}} xs={props.xs} sm={props.sm}>
				<TextField
					sx={{
						"& label": {
							color: 'purple',
							"&.Mui-focused": {
								color: 'purple'
							}
						}
					}}
					name={props.name}
					fullWidth
					required={props.required}
					label={props.label}
					multiline={props.multiline}
					minRows={props.minRows}
					maxRows={props.maxRows}
					onChange={props.onChange}
					disabled={hasSent}
					value={props.value}
					error={checkedOnce && (props.value === undefined || props.value.length === 0)}
				/>
			</Grid>
		)
	}

	return (
		<div className='userInput'>
			<PageTitle mainStyle="cardTitleLogo" logoStyle="logoSize" titleStyle="cardTitle center" />
			<WelcomeText />

			<Grid container spacing={2} marginBottom={"25px"}>
				{GridTextField({ xm: 12, sm: 6, name: "First Name", label: "First Name", required: true, multiline: false, value: firstName, onChange: (e) => { e.currentTarget.value = e.currentTarget.value.replace(regex, ""); setFirstName(e.target.value) } })}
				{GridTextField({ xm: 12, sm: 6, name: "Last Name", label: "Last Name", required: true, multiline: false, value: lastName, onChange: (e) => { e.currentTarget.value = e.currentTarget.value.replace(regex, ""); setLastName(e.target.value) } })}
				{GridTextField({ xm: 12, sm: 12, name: "Email", label: "Email", required: true, multiline: false, value: email, onChange: (e) => setEmail(e.target.value) })}
				{GridTextField({ xm: 12, sm: 12, name: "Phone Number", label: "Phone Number", required: true, multiline: false, value: phone, onChange: (e) => setPhone(e.target.value) })}
				{GridTextField({ xm: 12, sm: 12, name: "Message", label: "Message", required: true, multiline: true, minRows: 2, maxRows: 4, value: message, onChange: (e) => setMessage(e.target.value) })}
			</Grid>

			{(hasSent) ? <SuccessMessage /> : ""}
			<Button sx={{ mt: 3, mb: 4, width: "60%", height: "40px", backgroundColor: "#593959", "&:hover": { backgroundColor: "#7566b4" } }} disabled={hasSent} variant="contained" onClick={() => submit()}>Submit</Button>

		</div>
	);
}

export default UserInput;