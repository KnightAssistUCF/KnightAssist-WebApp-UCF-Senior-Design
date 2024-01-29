import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import PreLoginNavBar from '../../PreLogin/PreLoginNavBar';
import { Typography, Box } from '@mui/material';
import Footer from '../Footer';
import KA_Logo from '../../KA_Logo.png';
import Container from '@mui/material/Container';
import LoginBox from './LoginComponents';
import './Login.css';

const defaultTheme = createTheme();

function Login(props)
{
    return(
    <>
      <ThemeProvider theme={defaultTheme}>
        <PreLoginNavBar />
        <Box
          sx={{
            flexGrow: 1,
            justifyContent: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            minHeight: '100vh',
            marginTop: '-60px',
          }}
        >
          <Container component="main" maxWidth="xs" sx={{ mb: 4, marginTop: 12 }}>
            <Paper variant="outlined" sx={{ my: { xs: 2, md: 4 }, p: { xs: 2, md: 3 }, boxShadow: '0 0 10px rgba(100, 100, 100, 0.2)', width: '100%' }}>
          <Box
            sx={{
              marginTop: 3,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Box
              component="img"
              sx={{
                maxHeight: 80,
                display: { xs: 'none', md: 'flex' },
                mr: 1
              }}
              alt="KnightAssist Logo"
              src={KA_Logo}
            />
            <Typography component="h1" variant="h5" sx={{ marginTop: 2, color: 'black' }}>
              Welcome back!
            </Typography>
            <LoginBox setRole={props.setRole}/>
          </Box>
        </Paper>
      </Container>
      </Box>
      <Footer />
    </ThemeProvider>
    </>
    );
};

export default Login;
