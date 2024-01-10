import React, { useState, useEffect, useRef } from 'react';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Logo from '../Logo';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import { buildPath } from '../../path';
import 'bootstrap/dist/css/bootstrap.min.css';
import './PostVerifiedQuestions.css'
import { Facebook, Instagram, LinkedIn, Phone, PhoneAndroid, X } from '@mui/icons-material';
import { RiTwitterXFill } from 'react-icons/ri';
import { BiGlobeAlt, BiWorld } from 'react-icons/bi';
import { CardMedia } from '@mui/material';

function PostVerifiedQuestions()
{
    //const [isVolunteerView, setIsVolunteerView] = useState(true);
    const [hourlyGoal, setHourlyGoal] = useState(0);
    const [tagNames, setTagNames] = useState([]);
    const [tags, setTags] = useState([]);
    const [colors, setColors] = useState(makeColorsArray());
    const [selectedTags, setSelectedTags] = useState([]);
	const [description, setDescription] = useState("");
	const [picName, setPicName] = useState(null);
	const [picFile, setPicFile] = useState(null);
	const [bgName, setBGName] = useState(null);
	const [bgFile, setBGFile] = useState(null);
	const [phone, setPhone] = useState("");
	const [website, setWebsite] = useState("");
	const [fb, setFB] = useState("");
	const [x, setX] = useState("");
	const [ig, setIG] = useState("");
	const [lIn, setlIn] = useState("");


	const [role, setRole] = useState(undefined);

    // State needed due to bug where tag names where undefined
    const [makeTags, setMakeTags] = useState([]);

	const backgroundSelect = useRef(null);
	const profilePicSelect = useRef(null);

	function handleClick(idx){
		if(colors[idx] !== "default"){
			selectedTags.splice(selectedTags.indexOf(tagNames[idx]), 1);
			colors[idx] = "default"; 
		}else{
			if(selectedTags.length < 10){
			selectedTags.push(tagNames[idx]);
			console.log(selectedTags);
			colors[idx] = "#5f5395";
			}
		}

		setSelectedTags(selectedTags);

		getAllTags();
    }

    function makeColorsArray(){
		const colors = [];
		for(let i = 0; i < 50; i++)
			colors.push("default");

		return colors;
    }

    async function getTagNames(){
		let url = buildPath(`api/getAllAvailableTags`);

		let response = await fetch(url, {
			method: "GET",
			headers: {"Content-Type": "application/json"},
		});
	
		let res = JSON.parse(await response.text());

		setTagNames(res);

		setMakeTags(true);
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

	async function submitVolunteer(){
		try{
			// Store picture
			if(picFile !== null && typeof picFile.name === "string"){
				let formData = new FormData();
				formData.append('profilePic', picFile); 
				formData.append('entityType', 'organization');
				formData.append('id', sessionStorage.getItem("ID"));
				formData.append('profilePicOrBackGround', '0');

				// Store the picture selected to be associated with the event
				await fetch(buildPath(`api/storeImage`), {
					method: 'POST',
					body: formData
				})
				.then(response => response.json())
				.then(data => console.log(data))
				.catch(error => console.error('Error:', error));
			}

			const json = 
			{
				id: sessionStorage.getItem("ID"),
				semesterVolunteerHourGoal: hourlyGoal,
				categoryTags: selectedTags,
			}

			const url = buildPath("api/editUserProfile");

            const response = await fetch(url, {
                method: "POST",
                body: JSON.stringify(json),
                headers: {"Content-Type": "application/json",         
				"Authorization": `Bearer ${sessionStorage.getItem("token")}`}
            });

            let res = await response.text();
            console.log(res);

			window.location.href="/#/studenthomepage"
		}catch(e){
			console.log(e);
		}
	}

	async function submitOrganization(){
		try{
			// Store pictures
			if(bgFile !== null && typeof bgFile.name === "string"){
				let formData = new FormData();
				formData.append('profilePic', bgFile); 
				formData.append('entityType', 'organization');
				formData.append('id', sessionStorage.getItem("ID"));
				formData.append('profilePicOrBackGround', '0');

				await fetch(buildPath(`api/storeImage`), {
					method: 'POST',
					body: formData
				})
				.then(response => response.json())
				.then(data => console.log(data))
				.catch(error => console.error('Error:', error));

				formData = new FormData();
				formData.append('profilePic', bgFile); 
				formData.append('entityType', 'organization');
				formData.append('id', sessionStorage.getItem("ID"));
				formData.append('profilePicOrBackGround', '1');
				
				await fetch(buildPath(`api/storeImage`), {
					method: 'POST',
					body: formData
				})
				.then(response => response.json())
				.then(data => console.log(data))
				.catch(error => console.error('Error:', error));
			}

			const json = 
			{
				id: sessionStorage.getItem("ID"),
				description: description,
				contact: {
					phone: phone,
					website: website,
					socialMedia:{
						facebook: fb,
						twitter: x,
						instagram: ig,
						linkedin: lIn
					}
				},
				categoryTags: selectedTags
			}

			const url = buildPath("api/editOrganizationProfile");

			const response = await fetch(url, {
				method: "POST",
				body: JSON.stringify(json),
				headers: {"Content-Type": "application/json",         
						"Authorization": `Bearer ${sessionStorage.getItem("token")}`
			},
				
			});

			let res = await response.text();
			console.log(res);

			window.location.href="/#/orghome"
		}catch(e){
			console.log(e);
		}
	}

    async function submit(){
		if(role === "volunteer"){
			submitVolunteer();
		}else{
			submitOrganization();
		}
    }

    function Header(){
		return(
			<div className='header'>
				Additional Questions <Logo theStyle="logoStyle"/>
			</div>
		);
    }

    function SemesterGoal(){
		return (
			<div className='semesterGoal'>
				<Grid container justify="center" alignItems="center" marginBottom={"50px"}>
					<p className='goalQuestion'>What is your semester-wide hourly volunteer goal?</p>
					<TextField
					name={"Hourly Goal"}
					required
					label={"Hourly Goal"}
					multiline={false}
					onChange={(e) => {e.currentTarget.value = e.target.value.replace(/[\D\s]/, ''); setHourlyGoal(e.target.value)}}
					value={hourlyGoal}
					/>
				</Grid>
			</div>
		)
    }

	function validateImgSelection(fileSelect){
		// No files selected
		if(fileSelect.current.files.length === 0) return false;
		
		const file = fileSelect.current.files[0].name;
		console.log(file)

		const fileType = file.substring(file.lastIndexOf(".") + 1);

		return fileType === "png" || fileType === "gif" || fileType === "jpg" || fileType === "jpeg";
	}

	function Pictures(){
		return (
			<div className='profilePicSelect'>
				<Grid container justify="center" alignItems="center" marginBottom={"50px"}>
					{(role === "organization") ? 
						<CardMedia
							component="img"
							className='bgStyle'
							image={(bgName !== null) ? URL.createObjectURL(bgName) : "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"}
							onClick={() => document.getElementById("background").click()}
						/>
						: ""
					}
					<Avatar
						src={(picName !== null) ? URL.createObjectURL(picName) : "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"}
						className={"picStyle " + ((role === "organization") ? "orgPicStyle" : "")}
						sx={{borderStyle: "solid", borderColor: "white"}}
						onClick={() => document.getElementById("profilePic").click()}
					/>
					<label for="profilePic" className="selectPPic btn btn-primary">Select Profile Picture</label>
					<input ref={profilePicSelect} id="profilePic" type="file" accept="image/png, image/gif, image/jpg image/jpeg" style={{display:"none"}} onChange={() => {if(validateImgSelection(profilePicSelect)){setPicName(profilePicSelect.current.files[0]); setPicFile(profilePicSelect.current.files[0])}}}/>
					{(role === "organization") ? 
						<div>
							<label for="background" className="selectPPic btn btn-primary">Select Background</label>
							<input ref={backgroundSelect} id="background" type="file" accept="image/png, image/gif, image/jpg image/jpeg" style={{display:"none"}} onChange={() => {if(validateImgSelection(backgroundSelect)){setBGName(backgroundSelect.current.files[0]); setBGFile(backgroundSelect.current.files[0])}}}/>
						</div>
						: ""
					}
				</Grid>
			</div>
		)
	}

	function Description(){
		return (
			<div className='descriptionArea'>
				<p className='tagQuestion'>Describe Your Organziation:</p>
                <TextField
                    label="Description"
					className='descriptionBox'
                    multiline
                    minRows={5}
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                />
			</div>
		)
	}

	function Contact(){
		return (
			<div>
				<p className='tagQuestion'>Phone & Website:</p>
				<Grid container justifyContent="center" alignItems="center" layout={'row'} className='socials'>
					<Grid item sx={{marginRight: "50px"}}>
						<TextField variant="standard" label={<PhoneAndroid/>} required={false} value={phone} onChange={(e) => setPhone(e.target.value)}/>
					</Grid>
					<Grid item>
						<TextField variant="standard" label={<BiWorld/>} required={false} value={website} onChange={(e) => setWebsite(e.target.value)}/>
					</Grid>
				</Grid>
			</div>
		)
	}

	function SocialMedia(){
		return (
			<div>
				<p className='tagQuestion'>Socials:</p>
				<Grid container justifyContent="center" alignItems="center" layout={'row'} className='socials'>
					<Grid item sx={{marginRight: "50px"}}>
						<TextField variant="standard" label={<Facebook/>} required={false} value={fb} onChange={(e) => setFB(e.target.value)}/>
					</Grid>
					<Grid item>
						<TextField variant="standard" label={<RiTwitterXFill/>} required={false} value={x} onChange={(e) => setX(e.target.value)}/>
					</Grid>
				</Grid>
				<Grid container justifyContent="center" alignItems="center" marginBottom={"50px"} layout={'row'} className='socials'>
					<Grid item sx={{marginRight: "50px"}}>
						<TextField variant="standard" label={<Instagram/>} required={false} value={ig} onChange={(e) => setIG(e.target.value)}/>
					</Grid>
					<Grid item>
						<TextField variant="standard" label={<LinkedIn/>} required={false} value={lIn} onChange={(e) => setlIn(e.target.value)}/>
					</Grid>
				</Grid>
			</div>
		)
	}

    function AllTags(){
		return (
			<div>
				<p className='tagQuestion'>Select up to 10 of the below interests:</p>
				<div className='allTags'>
					{tags}
				</div>
			</div>
		)
    }

	async function getDefaultPic(){
		const url = buildPath(`api/retrieveImage?entityType=organization&id=${sessionStorage.getItem("ID")}&profilePicOrBackGround=1`);

		const response = await fetch(url, {
			method: "GET",
			headers: {"Content-Type": "application/json"},
		});

		let defaultBG = await response.blob();

		setBGName(defaultBG);
		setBGFile(defaultBG)
	}

    useEffect(()=>{
        if(sessionStorage.getItem("role") === "volunteer"){
			setRole("volunteer");
		}else{
			getDefaultPic();
			setRole("organization");
		}

		getTagNames();
		// eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    
    useEffect(()=>{
		getAllTags();
		// eslint-disable-next-line react-hooks/exhaustive-deps
    },[makeTags])


    return(
      <div className='pvq'>
		<Header/>
		<p className='tagQuestion'>Picture{(role === "organization") ? "s" : ""}:</p>
		{Pictures()}
		{(role === "organization") ? Description() : ""}
		{(role === "organization") ? Contact() : ""}
		{(role === "organization") ? SocialMedia() : ""}
		{(role === "volunteer") ? <SemesterGoal/> : ""}
		<AllTags/>
		<button type="button" class="submitBtn btn btn-primary" onClick={() => submit()}>Submit</button>
      </div>
    );
};

export default PostVerifiedQuestions;
