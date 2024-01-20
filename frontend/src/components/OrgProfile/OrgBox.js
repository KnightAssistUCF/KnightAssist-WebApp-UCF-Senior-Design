import { useState, useEffect, useRef } from 'react';
import Header from '../OrgEvents/Header';
import './OrgProfile.css';
import OrgTopBar from '../OrgHome/OrgTopBar';
import Card from '@mui/material/Card';
import { Button, Typography, CardContent, Avatar, TextField, Dialog, DialogContent, DialogTitle, DialogContentText, DialogActions, Grid, Chip } from '@mui/material';
import { buildPath } from '../../path';
import NavTabs from './NavTabs';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { Facebook, Instagram, LinkedIn, Star, StarOutline } from '@mui/icons-material';
import { RiTwitterXFill } from 'react-icons/ri';

function OrgBox(props) {

	const [picName, setPicName] = useState(null);
	const [role, setRole] = useState(null);
	const [favorited, setFavorited] = useState(false);

	const [newOrgName, setNewOrgName] = useState("");
	const [newFB, setNewFB] = useState("");
	const [newX, setNewX] = useState("");
	const [newIG, setNewIG] = useState("");
	const [newLIn, setNewLIn] = useState("");
	const [newSelectedTags, setNewSelectedTags] = useState([]);

	// For modal purposes if they cancel
	const [tempFB, setTempFB] = useState("");
	const [tempX, setTempX] = useState("");
	const [tempIG, setTempIG] = useState("");
	const [tempLIn, setTempLIn] = useState("");
	const [tempSelectedTags, setTempSelectedTags] = useState([]);
	
	const [openSocialsModal, setOpenSocialsModal] = useState(false);
	const [openInterestsModal, setOpenInterestsModal] = useState(false);

	// State needed due to bug where tag names where undefined
	const [makeTags, setMakeTags] = useState([]);

	const [tags, setTags] = useState([]);
	const [tagNames, setTagNames] = useState([]);
	const [colors, setColors] = useState([]);

	const profilePicSelect = useRef(null);
	
	async function getProfilePic(){
		let id;

		if("viewingPageID" in sessionStorage && 
		    sessionStorage.getItem("ID") !== sessionStorage.getItem("viewingPageID")){
			id = sessionStorage.getItem("viewingPageID");
		}else{
			id = sessionStorage.getItem("ID");
		}

		const url = buildPath(`api/retrieveImage?entityType=organization&id=${id}&profilePicOrBackGround=0`);

		const response = await fetch(url, {
			method: "GET",
			headers: {"Content-Type": "application/json"},
		});

		let pic = await response.blob();

		setPicName(pic);
	}

	function handleClick(idx){
		if(colors[idx] !== "default"){
			tempSelectedTags.splice(tempSelectedTags.indexOf(tagNames[idx]), 1);
			colors[idx] = "default"; 
		}else{
			if(tempSelectedTags.length < 10){
				tempSelectedTags.push(tagNames[idx]);
				console.log(tempSelectedTags);
				colors[idx] = "#5f5395";
			}
		}

		setTempSelectedTags(tempSelectedTags);

		getAllTags();
    }

	async function getAllTags(){
		let url = buildPath(`api/getAllAvailableTags`);

		let response = await fetch(url, {
			method: "GET",
			headers: {"Content-Type": "application/json"},
		});
	
		let res = JSON.parse(await response.text());

		setTags(
			res.map((name, idx) => {
				return (
					<Chip
						label={name}
						className='tagChip'
						onClick={() => handleClick(idx)}
						sx={{backgroundColor: colors[idx], 
							"&:hover": {
							backgroundColor: (colors[idx] === "default") ? "default" : "purple"
						}}}
					/>
				);
			})
		)
    }

	// Will add API call
	async function favoriteOrg(set){
		const organizationID = sessionStorage.getItem("viewingPageID");
		const userID = sessionStorage.getItem("ID");
		let url = buildPath(`api/searchForOrgInUserFavorites?userID=${userID}&organizationID=${organizationID}`);

		try {
			let response = await fetch(url, {
				method: "GET",
				headers: {"Content-Type": "application/json"},
			});

			let res = JSON.parse(await response.text());

			const json = {
				organizationID: organizationID,
				userID: userID
			};

			console.log(res);
		
			setFavorited(res.favoriteStatus === 0);
	
			if(set){
				// Org is not a favorite of the user, add it
				if(res.favoriteStatus === 1){
					url = buildPath(`api/addFavoriteOrg`);
						
					response = await fetch(url, {
						body: JSON.stringify(json),
						method: "POST",
						headers: {"Content-Type": "application/json"},
					});
					
					res = await response.text();
	
					console.log(res);
			
					setFavorited(true);
				}else{// Remove as favorite
					url = buildPath(`api/removeFavoriteOrg`);
						
					response = await fetch(url, {
						body: JSON.stringify(json),
						method: "DELETE",
						headers: {"Content-Type": "application/json"},
					});
					
					res = await response.text();
	
					console.log(res);
			
					setFavorited(false);
				}
			}

		} catch(e) {
			console.log("error");
		}


	}

	// If user closes edit social modal without saving
	function resetSocials(){
		setTempFB(newFB);
		setTempX(newX);
		setTempIG(newIG);
		setTempLIn(newLIn);
		setOpenSocialsModal(false);
	}

	function saveSocials(){
		setNewFB(tempFB);
		setNewX(tempX);
		setNewIG(tempIG);
		setNewLIn(tempLIn);
		setOpenSocialsModal(false);
	}

	function validateImgSelection(fileSelect){
		// No files selected
		if(fileSelect.current.files.length === 0) return false;
		
		const file = fileSelect.current.files[0].name;
		console.log(file)

		const fileType = file.substring(file.lastIndexOf(".") + 1);

		return fileType === "png" || fileType === "gif" || fileType === "jpg" || fileType === "jpeg";
	}

	function ProfilePic(){
		return (
			<div>
				<Avatar
					src={(picName !== null) ? URL.createObjectURL(picName) : "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"}
					sx={{ width: 100, height: 100, marginBottom: "16px", marginLeft: "-12%"}} 
					className={(props.editMode) ? "hoverImage" : ""}
					onClick={(props.editMode) ? () => document.getElementById("profilepic").click() : null}
				/>
				<input ref={profilePicSelect} id="profilepic" type="file" accept="image/png, image/gif, image/jpg image/jpeg" style={{display:"none"}} onChange={() => {if(validateImgSelection(profilePicSelect)){setPicName(profilePicSelect.current.files[0]);}}}/>
			</div>
		)
	}

	function OrgName(){
		return (
			(props.editMode === false)
				?
					<div className='orgName'>{props.org.name}</div>
				:
					<TextField className='orgNameEdit' variant="standard" label={"Organization Name"} required={false} value={newOrgName} onChange={(e) => setNewOrgName(e.target.value)}/>
		)
	}

	function EditSaveProfileBtn(){
		return (
		   <div>
			  {(props.editMode === false)
			  	?
					<button className='editBtn btn btn-primary' onClick={() => props.setEditMode(true)}>Edit Profile</button>
				:
					<button className='editBtn btn btn-primary' onClick={() => props.setEditMode(false)}>Save Profile</button>
			  }
		   </div>
		)
	}
	
	function Favorite(){
		return (
			<div>
				<button className="favBtn" onClick={() => favoriteOrg(true)}>{(favorited) ? <Star className='favorited'/> : <StarOutline className='notFavorited'/>}</button>
			</div>
		)
	}

	function SocialMedia(){
		const socials = props.org.contact;
		return (
			(socials && socials.socialMedia) ?
				<div className='profileSocials'>
					{(socials.socialMedia.facebook) ? <a className='social' href={socials.socialMedia.facebook} target='_blank'><Facebook/></a> : ""}
					{(socials.socialMedia.twitter) ? <a className='social' href={socials.socialMedia.twitter} target='_blank'><RiTwitterXFill/></a> : ""}
					{(socials.socialMedia.instagram) ? <a className='social' href={socials.socialMedia.instagram} target='_blank'><Instagram/></a> : ""}
					{(socials.socialMedia.linkedin) ? <a className='social' href={socials.socialMedia.linkedin} target='_blank'><LinkedIn/></a> : ""}
				</div> 

				: ""
		)
	} 

	function EditSocials(){
		return (
		   <div>
				<button className='editSocialsBtn btn btn-primary' onClick={() => setOpenSocialsModal(true)}>Edit Socials</button>
		   </div>
		)
	}

	function EditInterests(){
		return (
		   <div>
				<button className='editInterestsBtn btn btn-primary' onClick={() => setOpenInterestsModal(true)}>Edit Tags</button>
		   </div>
		)
	}

	function Tag(props){
        return (
			<Card className='tag'>
				<div className='addSpace'>
					{props.tag}
				</div>
			</Card>
        )
    }

	function Interests(){
		return (
			<div className='interests'>
				<div className='interestsName'>Interests</div>
				<div className='tags'>
					{props.org.categoryTags.map(t => <Tag tag={t}/>)}
				</div>
			</div>
		)
	}
	
	function resetInterests(){
		setTempSelectedTags(newSelectedTags.slice(0)); 


		for(let i = 0; i < 50; i++){
			if(!newSelectedTags.includes(tagNames[i])){
				colors[i] = "default"; 
			}else{
				colors[i] = "#5f5395";
			}
		}

		setColors(colors);

		setOpenInterestsModal(false);
		console.log(colors);
	}

	async function getColors(){
		let url = buildPath(`api/getAllAvailableTags`);

		let response = await fetch(url, {
			method: "GET",
			headers: {"Content-Type": "application/json"},
		});
	
		let allTags = JSON.parse(await response.text());

		setTagNames(allTags);

		const tagColors = [];

		for(let i = 0; i < 50; i++){
			if(!props.org.categoryTags.includes(allTags[i])){
				tagColors.push("default"); 
			}else{
				tagColors.push("#5f5395");
			}
		}

		setNewSelectedTags(props.org.categoryTags.slice());
		setTempSelectedTags(props.org.categoryTags.slice());

		return tagColors;
	}

	useEffect(() => {
		setRole(sessionStorage.getItem("role"));
		getProfilePic();
		if(sessionStorage.getItem("role") === "volunteer")
			favoriteOrg(false);
	}, []);

	useEffect(() => {
		async function colorsAndTags(){
			setColors(await getColors());
			setMakeTags(true);
		}

		if(props.editMode){
			setNewOrgName(props.org.name);
			colorsAndTags();
		}

	}, [props.editMode])

	useEffect(() => {
		getAllTags();
	}, [openInterestsModal])

	useEffect(() => {
		if(props.editMode){
			getAllTags();
		}
	}, [makeTags])

	return (
		<div className='spartan orgBox'>
			<div className='items'>
				{(props.org !== null)
					?
						<div>
							{ProfilePic()}
							{OrgName()}
							
							{(role === "organization" && props.org._id === sessionStorage.getItem("ID")) 
								? EditSaveProfileBtn() 
								: ((role === "volunteer") ? Favorite() : "")
							}
							{(!props.editMode) ? SocialMedia() : EditSocials()}	
							{(props.org.categoryTags.length > 0)
								?
									((!props.editMode) ? Interests() : EditInterests())
								: 
									""
							}
						</div>
					: 
						""
				}

				<Dialog open={openSocialsModal} onClose={() => {resetSocials(); setOpenSocialsModal(false)}}>
					<DialogContent className='spartan feedbackModal'>
						<Grid container justifyContent="center" alignItems="center" layout={'row'}>
							<Grid item>
								<DialogTitle className='dialogTitle'>Edit Social Links</DialogTitle>
							</Grid>
						</Grid>
						<Grid container justifyContent="center" alignItems="center" layout={'row'} className='socials'>
							<Grid item sx={{marginRight: "50px"}}>
								<TextField variant="standard" label={<Facebook/>} required={false} value={tempFB} onChange={(e) => setTempFB(e.target.value)}/>
							</Grid>
							<Grid item>
									<TextField variant="standard" label={<RiTwitterXFill/>} required={false} value={tempX} onChange={(e) => setTempX(e.target.value)}/>
							</Grid>
						</Grid>
						<Grid container justifyContent="center" alignItems="center" marginBottom={"50px"} layout={'row'}>
							<Grid item sx={{marginRight: "50px"}}>
								<TextField variant="standard" label={<Instagram/>} required={false} value={tempIG} onChange={(e) => setTempIG(e.target.value)}/>
							</Grid>
							<Grid item>
								<TextField variant="standard" label={<LinkedIn/>} required={false} value={tempLIn} onChange={(e) => setTempLIn(e.target.value)}/>
							</Grid>
							<Button sx={{ mt: 8, mb: -2, width: 175, backgroundColor: "#5f5395", "&:hover": {backgroundColor: "#7566b4"}}} variant="contained" onClick={() => saveSocials()}>Save</Button>
						</Grid>
					</DialogContent>
				</Dialog>

				<Dialog open={openInterestsModal} onClose={() => {resetInterests();}}>
					<DialogContent className='spartan tagModal'>
						<Grid container justifyContent="center" alignItems="center" layout={'row'}>
							<DialogTitle className='dialogTitle'>Edit Tags</DialogTitle>
							<div className='tagSection'>
								{tags}
							</div>
							<Button sx={{ mt: 8, width: 175, backgroundColor: "#5f5395", "&:hover": {backgroundColor: "#7566b4"}}} variant="contained" onClick={() => {setNewSelectedTags(tempSelectedTags.slice(0)); setOpenInterestsModal(false);}}>Save</Button>
						</Grid>
					</DialogContent>
				</Dialog>
			</div>
		</div>
	);
}

export default OrgBox;
