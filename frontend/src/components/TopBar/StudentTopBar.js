import React from 'react';
import Logo from '../Logo';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useNavigate } from 'react-router-dom';

function StudentTopBar()
{
    const settings = ['Profile', 'Logout'];
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

	const navigate = useNavigate();

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

	const handleOpenUserMenu = (event) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};


	function handleButtonClick(setting){
		if(setting === "Profile"){
			sessionStorage.removeItem("viewingPageID");
			if(window.location.href.substring(window.location.href.lastIndexOf("#")) === "#/studentprofile"){
				window.location.reload();
			}else{		
				window.location.href = "#/studentprofile";
			}
		}else{
			sessionStorage.clear();
			navigate('/'); 
		}
	}

   return(
      <div className="StudentTopBar">
    <AppBar variant='outlined'  position="static" sx={{ backgroundColor: '#ffffff' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: 'right' }}>




          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>

          </Box>
          <Box sx={{ flexGrow: 0, mr: 3 }}>
                <Tooltip title="Notifications">
                <IconButton onClick={handleOpenNavMenu} sx={{ p: 0 }}>
                    <Badge badgeContent={3} color="error">
                    <NotificationsIcon />
                    </Badge>
                </IconButton>
                </Tooltip>
            </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Account">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={"First" + " " +"Last"} src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={() => handleButtonClick(setting)}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
      </div>
   );
};

export default StudentTopBar;
