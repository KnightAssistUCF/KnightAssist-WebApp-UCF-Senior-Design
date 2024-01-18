import { useState, useEffect } from 'react';
import Header from '../OrgEvents/Header';
import './OrgProfile.css';
import OrgTopBar from '../OrgHome/OrgTopBar';
import Card from '@mui/material/Card';
import { Button, Typography, CardContent, Avatar } from '@mui/material';
import { buildPath } from '../../path';
import NavTabs from './NavTabs';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { Facebook, Instagram, LinkedIn, Star, StarOutline } from '@mui/icons-material';
import { RiTwitterXFill } from 'react-icons/ri';

function OrgBox(props) {

	const [picName, setPicName] = useState(null);
	const [role, setRole] = useState(null);
	const [favorited, setFavorited] = useState(false);
	
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

	useEffect(() => {
		setRole(sessionStorage.getItem("role"));
		getProfilePic();
		if(sessionStorage.getItem("role") === "volunteer")
			favoriteOrg(false);
	}, []);

	function ProfilePic(){
		return (
			<Avatar
				src={(picName !== null) ? URL.createObjectURL(picName) : "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"}
				sx={{ width: 100, height: 100, marginBottom: "16px", marginLeft: "-12%"}} 
			/>
		)
	}

	function OrgName(){
		return (
			<div className='orgName'>{props.org.name}</div>
		)
	}

	function EditProfileBtn(){
		return (
		   <div>
			  <button className='editBtn btn btn-primary' onClick={null}>Edit Profile</button>
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

	return (
		<div className='orgBox'>
			<div className='items'>
				{(props.org !== null)
					?
						<div>
							{ProfilePic()}
							<OrgName/>
							
							{(role === "organization" && props.org._id === sessionStorage.getItem("ID")) 
								? EditProfileBtn() 
								: ((role === "volunteer") ? Favorite() : "")
							}
							{SocialMedia()}	
							{(props.org.categoryTags.length > 0)
								?
									Interests()
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
