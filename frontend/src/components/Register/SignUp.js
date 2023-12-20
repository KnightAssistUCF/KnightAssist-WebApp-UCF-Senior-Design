import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import React from "react";
import VolunteerForm from './VolunteerForm';
import OrganizationForm from './OrganizationForm';
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from '@mui/lab/TabPanel';

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: '#4E878C',
    },
    secondary: {
      main: '#593959',
      contrastText: '#FFFFFF'
    },
  },
});

export default function SignUp() {
  const [value, setValue] = React.useState("1");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
          <Typography component="h1" variant="h5" sx={{paddingBottom: 2}}>Create an Account</Typography>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChange} centered indicatorColor="secondary" textColor="secondary">
                <Tab label="Volunteer" value="1" />
                <Tab label="Organization" value="2" />
              </TabList>
            </Box>
            <TabPanel value="1"><VolunteerForm /></TabPanel>
            <TabPanel value="2"><OrganizationForm /></TabPanel>
          </TabContext>

          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2, bgcolor: '#3E283E', textColor: '#FFFFFF', ":hover": {bgcolor: '#593959'} }} onClick={handleSubmit} >
              Sign Up
          </Button>

          <Grid container justifyContent="center">
              <Grid item>
                <Link href="#" variant="body2" sx={{ color: '#4E878C'}}>
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
      </Container>
    </ThemeProvider>
  );
}
