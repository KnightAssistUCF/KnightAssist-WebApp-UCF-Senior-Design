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
		const url = buildPath(`api/retrieveImage?entityType=organization&id=${sessionStorage.getItem("ID")}&profilePicOrBackGround=0`);

		const response = await fetch(url, {
			method: "GET",
			headers: {"Content-Type": "application/json"},
		});

		let pic = await response.blob();

		setPicName(pic);
	}

	// Will add API call
	async function favoriteOrg(){
		setFavorited(!favorited);
	}

	useEffect(() => {
		setRole(sessionStorage.getItem("role"));
		getProfilePic();
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
				<button className="favBtn" onClick={() => favoriteOrg()}>{(favorited) ? <Star className='favorited'/> : <StarOutline className='notFavorited'/>}</button>
			</div>
		)
	}

	function SocialMedia(){
		return (
			<div className='profileSocials'>
				<a className='social' href={props.org.contact.socialMedia.facebook}><Facebook/></a>
				<a className='social' href={props.org.contact.socialMedia.twitter}><RiTwitterXFill/></a>
				<a className='social' href={props.org.contact.socialMedia.instagram}><Instagram/></a>
				<a className='social' href={props.org.contact.socialMedia.linkedin}><LinkedIn/></a>
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
