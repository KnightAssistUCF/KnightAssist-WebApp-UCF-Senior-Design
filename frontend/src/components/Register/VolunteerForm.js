import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import React from "react";
import { Box } from '@mui/material';

export default function VolunteerForm(props) {
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
              value={props.volConfirmPass}
              onChange={(e) => props.setVolConfirmPass(e.target.value)}
            />
          </Grid>
        </Grid>
    </Box>
  );
}