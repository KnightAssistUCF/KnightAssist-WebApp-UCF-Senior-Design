import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import React from "react";
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import { Box, Checkbox, Dialog, DialogContent, DialogContentText, FormControl, FormControlLabel, Typography } from '@mui/material';

export default function VolunteerForm(props) {
	const [openPolicyModal, setOpenPolicyModal] = useState(false);

  const handleSubmit = (event) => {
    console.log("I am here!");
    event.preventDefault();
    const data = new FormData(event.target);
    const formData = {
      firstName: data.get('firstName'),
      lastName: data.get('lastName'),
      email: data.get('email'),
      password: data.get('password'),
    };
    props.onSubmit(formData);
    
  }

  return (
    <Box component="form" noValidate sx={{ mt: 3 }} >
      <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                label="First Name"
                error={props.isVolError.firstName}
                helperText={props.volMessage.firstName}
                value={props.volName}
                onChange={(e) => props.setName(e.target.value)}
                autoFocus
            />
          </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
                value={props.volLastName}
                helperText={props.volMessage.lastName}
                error={props.isVolError.lastName}
                onChange={(e) => props.setVolLastName(e.target.value)}
              />
          </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Email Address"
                name="email"
                autoComplete="email"
                error={props.isVolError.email}
                helperText={props.volMessage.email}
                value={props.volEmail}
                onChange={(e) => props.setVolEmail(e.target.value)}
              />
          </Grid>
          <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                autoComplete="new-password"
                error={props.isVolError.password}
                helperText={props.volMessage.password}
                value={props.volPass}
                onChange={(e) => props.setVolPass(e.target.value)}
             />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="confirm password"
              label="Confirm Password"
              type="password"
              autoComplete="new-password"
              error={props.isVolError.confirmPassword}
              helperText={props.volMessage.confirmPassword}
              value={props.volConfirmPass}
              onChange={(e) => props.setVolConfirmPass(e.target.value)}
            />
          </Grid>
		  <Grid item xs={12}>
			<FormControl sx={{float: "left"}}>
				<Checkbox
					sx={{'& .MuiSvgIcon-root': { fontSize: 28 }, float: "left", color: (!props.isVolError.terms) ? '' : 'red', marginBottom: -3}}
					color='secondary'
					onClick={() => props.setTermsAccepted(!props.termsAccepted)}
				/>
			</FormControl>
			<div className='termsCheck'>Do you agree to the <a className="noSpacePP privatePolicy" onClick={() => setOpenPolicyModal(true)}>terms and conditions?</a></div>
		  </Grid>

		  <Dialog open={openPolicyModal} onClose={() => setOpenPolicyModal(false)}>
			<DialogContent className='feedbackModal'>
				<button className='closeAddEvent'>
                    <CloseIcon onClick={() => setOpenPolicyModal(false)}/>
                 </button>
				<DialogContentText className='contentWrap' style={{ color: 'black', fontSize: 25, marginBottom: 10, textAlign: 'center'}}>Terms & Conditions</DialogContentText>
				<DialogContentText className='contentWrap' style={{ color: 'black', marginTop: '10px', textAlign: 'justify' }}>
					{props.terms}
				</DialogContentText>
			</DialogContent>
		</Dialog>
        </Grid>
    </Box>
  );
}