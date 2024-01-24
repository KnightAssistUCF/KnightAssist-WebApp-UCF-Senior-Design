import LoginBox from './LoginComponents';
import PageTitle from '../PageTitle';
import LoginPic from './loginPic';
import LoginPic2 from './loginPic2';
import Carousel from 'react-bootstrap/Carousel';
import './Login.css';

import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import PreLoginNavBar from '../../PreLogin/PreLoginNavBar';
import { Grid, Typography, Button, Box } from '@mui/material';
import Footer from '../Footer';
import KA_Logo from '../../KA_Logo.png';
import Container from '@mui/material/Container';

const defaultTheme = createTheme();

function Login(props)
{
    return(
    <>
    <ThemeProvider theme={defaultTheme} sx={{bgcolor: '#F5D6BA'}}>
      <PreLoginNavBar />
      <Container component="main" maxWidth="xs" sx={{ minHeight: '100vh', marginTop: 20}}>
        <Paper variant="outlined" sx={{my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 }, boxShadow: '0 0 10px rgba(100, 100, 100, 0.2)' }}>
          <CssBaseline />
          <Box
            sx={{
              marginTop: 5,
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
              {/*<Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
        </Grid>*/}
      <Footer />
    </ThemeProvider>
    </>
      /*<div>
        <LoginSlideshow/>
        <div className="contentHalf">
          <div>
            <PageTitle mainStyle="titleLogo" logoStyle="logo" titleStyle="title center"/>
            <LoginBox setRole={props.setRole}/>
          </div>
        </div> 
      </div>*/
    );
};

export default Login;
