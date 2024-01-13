import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import KA_Logo from './../KA_Logo.png';

const pages = ['Home', 'About', 'Contact'];

function PreLoginNavBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleMenuItemClick = (page) => {
    console.log("clicked "+page);
    if (page === 'Home') {
      console.log('Redirecting to #/');
      window.location.href = '#/';
      window.location.href = '/#';
    } else if(page === 'About') {
      window.location.href = '#/about';
    }
    handleCloseNavMenu();
  };
  const handleOpenMenuItemClick = (page) => {
    console.log("clicked "+page);
    if (page === 'Home') {
      console.log('Redirecting to #/');
      window.location.href = '#/';
      window.location.href = '/#';
    } else if(page === 'About') {
      window.location.href = '#/about';
    }
  };

  const handleClick = () => {
    window.location.href = '#/login';
  };

  return (
    <AppBar position="fixed" sx={{ bgcolor: "#00241B" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* desktop view logo settings */}
          <Box
            component="img"
            sx={{
              maxHeight: 50,
              display: { xs: 'none', md: 'flex' },
              mr: 1
            }}
            alt="KnightAssist Logo"
            src={KA_Logo}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'sans-serif',
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
              ":hover": {color: '#F5D6BA'}
            }} >
            KnightAssist
          </Typography>

          {/* mobile view of menu tabs */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none'},
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={() => handleMenuItemClick(page)} sx={{":hover": { color: '#5B4E77'}}}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* mobile view logo settings */}
          <Box
            component="img"
            sx={{
            maxHeight: 50,
            display: { xs: 'flex', md: 'none' },
            mr: 1
            }}
            alt="KnightAssist Logo"
            src={KA_Logo}
        />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'sans-serif',
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
              ":hover": {color: '#F5D6BA'}
            }}
          >
            KnightAssist
          </Typography>

          {/* desktop view of menu tabs */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => handleOpenMenuItemClick(page)}
                sx={{ my: 2, color: 'white', display: 'block', ":hover": { color: '#F5D6BA', bgcolor: '#003D2E'}}}
              >
                {page}
              </Button>
            ))}
          </Box>

          {/* login button*/}
          <Button variant="contained" sx={{ bgcolor: '#593959', ":hover": {bgcolor: '#F5D6BA', color: 'black'}}} onClick={handleClick}>Login</Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default PreLoginNavBar;