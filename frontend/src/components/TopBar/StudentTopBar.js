import React, { useEffect, useState } from 'react';
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
import { buildPath } from '../../path';
import { useNavigate } from 'react-router-dom';
import { Divider, ListItem } from '@mui/material';

function StudentTopBar()
{
    const settings = ['Profile', 'Sign Out'];
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);

	const [picName, setPicName] = useState(null);

	const [notifications, setNotifcations] = useState(undefined);
	const [numUnreads, setNumUnreads] = useState(0);

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

	const [openNotifications, setOpenNotifications] = useState(null);

	const openNotificationMenu = (event) => {
	  setOpenNotifications(event.currentTarget);
	};


	async function getProfilePic(){
		let id = sessionStorage.getItem("ID");

		const url = buildPath(`api/retrieveImage?typeOfImage=3&id=${id}`);

		const response = await fetch(url, {
			method: "GET",
			headers: {"Content-Type": "application/json"},
		});

		let pic = JSON.parse(await response.text());

		setPicName(pic.url);
	}

	async function clickNoto(noto){
		const json = {
			userId: sessionStorage.getItem("ID"),
			message: noto.message
		};
	
		const url = buildPath(`api/markNotificationAsRead`);
	
		try {
			const response = await fetch(url, {
				method: "POST",
				body: JSON.stringify(json),
				headers: {"Content-Type": "application/json"},
			});
		
			let res = await response.text();
			
			console.log(res);

			if(noto.type_is === "event"){
				sessionStorage.setItem("notoEventId", noto.eventId);
				// Take them to the organizations page
				if(window.location.href.substring(window.location.href.lastIndexOf("#")) === "#/explore"){
					window.location.reload();
				}else{
					window.location.href = "#/explore";
				}
			}else{ // Is an announcement
				sessionStorage.setItem("updateSearchTerm", noto.orgName);
				if(window.location.href.substring(window.location.href.lastIndexOf("#")) === "#/studentannouncements"){
					window.location.reload();
				}else{
					window.location.href = "#/studentannouncements";
				}			
			}
		}catch(e){
			console.log(e);
		}
	}

	async function getNotifications(){
		let id = sessionStorage.getItem("ID");

		let url = buildPath(`api/pushNotifications?userId=${id}`);

		let response = await fetch(url, {
			method: "GET",
			headers: {"Content-Type": "application/json"},
		});

		let res = JSON.parse(await response.text());

		console.log(res);

		let unread = 0;

		// Pic urls of each org a noto is for
		const pics = [];

		if(res && res.notifications){
			for(let noto of res.notifications.new){
				if(!noto.read)
					unread++;

				id = noto.orgId;

				url = buildPath(`api/retrieveImage?typeOfImage=2&id=${id}`);
		
				response = await fetch(url, {
					method: "GET",
					headers: {"Content-Type": "application/json"},
				});
		
				let pic = JSON.parse(await response.text());
		
				pics.push(pic.url);
			}
			// Only show notifications from the past week
			setNotifcations(res.notifications.new.map((noto, i) => <div><MenuItem className='menuNoto' onClick={async () => await clickNoto(noto)}><div className='notoMessage'><Avatar className='orgNotoPic' style={{border: '0.1px solid black'}} src={pics[i]}/>{(!noto.read) ? <div className='unreadCircle'></div> : ""} 
													{(noto.message.length > 60) ? (noto.message.substring(0, 60) + "...") : noto.message}</div></MenuItem>
													{(i != res.notifications.new.length - 1) ? <Divider className='dividerSpaceNoto' sx={{background: "black"}}/>: null}</div>))
		}


		setNumUnreads(unread);
	}


	function handleButtonClick(setting){
		if(setting === "Profile"){
			sessionStorage.removeItem("viewingStudentPageID");
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

	useEffect(() => {
		getProfilePic();
		getNotifications();
	}, [])

    return(
      <div className="StudentTopBar">
		<AppBar variant='outlined'  position="static" sx={{ backgroundColor: '#ffffff' }}>
		<Container maxWidth="xl">
			<Toolbar disableGutters sx={{ justifyContent: 'right' }}>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>

          </Box>
          <Box sx={{ flexGrow: 0, mr: 3 }}>
                <IconButton onClick={handleOpenNavMenu} sx={{ p: 0 }}>
                    <Badge onClick={openNotificationMenu} badgeContent={(numUnreads > 0) ? numUnreads : null} color="error">
                    	<NotificationsIcon/>
                    </Badge>
					<Menu
						open={Boolean(openNotifications) && notifications}
						anchorEl={openNotifications}
						onClose={() => setOpenNotifications(null)}
					>
						{notifications}
					</Menu>
                </IconButton>
            </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Account">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={"First" + " " +"Last"} src={(picName !== null) ? picName : "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"} />
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
