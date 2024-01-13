import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import PreLoginNavBar from '../../PreLogin/PreLoginNavBar';
import { Grid, Typography, Button, Box } from '@mui/material';
import SignUp from './SignUp';
import Footer from '../Footer';

const defaultTheme = createTheme();

export default function Register() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    <>
    <CssBaseline />
    <ThemeProvider theme={defaultTheme}>
        <PreLoginNavBar />
        <Box sx={{ flexGrow: 1, paddingTop: 6, justifyContent: 'center'}}>
          <Container component="main" maxWidth="sm" sx={{ mb: 4, justifyContent: 'center', alignItems: 'center' }}>
             <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                <SignUp />
             </Paper>
          </Container>
        </Box>
        <Footer />
    </ThemeProvider></>
  );
}