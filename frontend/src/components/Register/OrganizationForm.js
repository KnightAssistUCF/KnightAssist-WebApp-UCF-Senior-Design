import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import React from "react";
import { Box } from '@mui/material';

export default function OrganizationForm(props) {
  const { onSubmit } = props;

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    onSubmit({
      orgName: data.get('orgName'),
      email: data.get('email'),
      password: data.get('password'),
    });
  }

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   props.setOrgFormData((prevData) => ({
  //     ...prevData,
  //     [name]: value,
  //   }));
  // };

  return ( 
    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }} >
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12}>
          <TextField
            autoComplete="given-name"
            name="orgName"
            required
            fullWidth
            id="orgName"
            label="Organization Name"
            value={props.orgName}
            onChange={(e) => props.setOrgName(e.target.value)}
            autoFocus
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={props.orgEmail}
            onChange={(e) => props.setOrgEmail(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="new-password"
            value={props.orgPass}
            onChange={(e) => props.setOrgPass(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            name="confirm password"
            label="Confirm Password"
            type="password"
            id="password"
            autoComplete="new-password"
            value={props.orgConfirmPassword}
            onChange={(e) => props.setOrgConfirmPassword(e.target.value)}
          />
        </Grid>
      </Grid>
    </Box>
  );
}