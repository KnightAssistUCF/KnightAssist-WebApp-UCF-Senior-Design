import { useState, useEffect, useRef } from 'react';
import Header from '../OrgEvents/Header';
import './OrgProfile.css';
import OrgTopBar from '../OrgHome/OrgTopBar';
import Card from '@mui/material/Card';
import { Button, Typography, CardContent, Avatar, TextField } from '@mui/material';
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
	
	const [openSocialsModal, setOpenSocialsModa] = useState(false);
	const [openInterestsModal, setOpenInterestsModal] = useState(false);

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
				<button className='editSocialsBtn btn btn-primary' onClick={() => setOpenSocialsModa(true)}>Edit Socials</button>
		   </div>
		)
	}

	function EditInterests(){
		return (
		   <div>
				<button className='editInterestsBtn btn btn-primary' onClick={() => setOpenSocialsModa(true)}>Edit Socials</button>
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

	useEffect(() => {
		setRole(sessionStorage.getItem("role"));
		if(props.org !== null){
			setNewOrgName(props.org.name);
		}
		getProfilePic();
		if(sessionStorage.getItem("role") === "volunteer")
			favoriteOrg(false);
	}, []);

	return (
		<div className='orgBox'>
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
			</div>
		</div>
	);
}

export default OrgBox;
