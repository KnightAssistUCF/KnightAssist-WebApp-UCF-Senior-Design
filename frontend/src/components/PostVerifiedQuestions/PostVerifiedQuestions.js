import React, { useState, useEffect, useRef } from 'react';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Logo from '../Logo';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import { buildPath } from '../../path';
import 'bootstrap/dist/css/bootstrap.min.css';
import './PostVerifiedQuestions.css'

function PostVerifiedQuestions()
{
    //const [isVolunteerView, setIsVolunteerView] = useState(true);
    const [hourlyGoal, setHourlyGoal] = useState(0);
    const [tagNames, setTagNames] = useState([]);
    const [tags, setTags] = useState([]);
    const [colors, setColors] = useState(makeColorsArray());
    const [selectedTags, setSelectedTags] = useState([]);
	const [picName, setPicName] = useState(null);
	const [picFile, setPicFile] = useState(null);
	const [bgName, setBGName] = useState(null);
	const [bgFile, setBGFile] = useState(null);


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

    async function submit(){
		console.log(selectedTags);
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

	function ProfilePicture(){
		return (
			<div className='profilePicSelect'>
				<Grid container justify="center" alignItems="center" marginBottom={"50px"}>
					<Avatar
						src={(picName !== null) ? URL.createObjectURL(picName) : "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"}
						className="picStyle"
					/>
					<label for="profilePic" className="selectPPic btn btn-primary">Select Profie Picture</label>
					<input ref={profilePicSelect} id="profilePic" type="file" accept="image/png, image/gif, image/jpg image/jpeg" style={{display:"none"}} onChange={() => {if(validateImgSelection(profilePicSelect)){setPicName(profilePicSelect.current.files[0]); setPicFile(profilePicSelect.current.files[0])}}}/>
				</Grid>
			</div>
		)
	}

	function BackgroundPic(){
		return (
			<div className='profilePicSelect'>
				<Grid container justify="center" alignItems="center" marginBottom={"50px"}>
					<Avatar
						src={(bgName !== null) ? URL.createObjectURL(bgName) : "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"}
						className="picStyle"
					/>
					<label for="background" className="selectPPic btn btn-primary">Select Background</label>
					<input ref={backgroundSelect} id="background" type="file" accept="image/png, image/gif, image/jpg image/jpeg" style={{display:"none"}} onChange={() => {if(validateImgSelection(backgroundSelect)){setBGName(backgroundSelect.current.files[0]); setBGFile(backgroundSelect.current.files[0])}}}/>
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

    useEffect(()=>{
        if(localStorage.getItem("role") === "volunteer"){
			setRole("volunteer");
		}else{
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
      <div id='homePage'>
		<Header/>
		{ProfilePicture()}
		{(role === "organization") ? BackgroundPic() : ""}
		<SemesterGoal/>
		<AllTags/>
		<button type="button" class="submitBtn btn btn-primary" onClick={() => submit()}>Submit</button>
      </div>
    );
};

export default PostVerifiedQuestions;
