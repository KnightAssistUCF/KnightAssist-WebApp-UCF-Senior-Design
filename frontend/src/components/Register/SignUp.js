import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import React from "react";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import UserForm from './UserForm';
import OrganizationForm from './OrganizationForm';

const defaultTheme = createTheme();

const state =['User', 'Organization'];

function getForm(state) {
  switch (state) {
    case 0:
      return <UserForm />;
    case 1:
      return <OrganizationForm />;
    default:
      throw new Error('Unknown step');
  }
}

export default function SignUp() {
  const [activeState, setActiveState] = React.useState(0);
  const handleToggle = () => {
    if(activeState == 0){
      setActiveState(1);
    } else {
      setActiveState(0);
    }
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
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
          <Typography component="h1" variant="h5" sx={{paddingBottom: 2}}>Register as: </Typography>
          <ToggleButtonGroup value={state} exclusive onChange={handleToggle}>
            <ToggleButton value="User" aria-label="User Sign Up">User</ToggleButton>
            <ToggleButton value="Organization" aria-label="Org Sign Up">Org</ToggleButton>
          </ToggleButtonGroup>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }} >
            {getForm(activeState)}
          </Box>
          <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, bgcolor: '#3E283E' }}
            >
              Sign Up
            </Button>
          <Grid container justifyContent="center">
              <Grid item>
                <Link href="#" variant="body2" sx={{ color: '#4E878C'}}>
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
