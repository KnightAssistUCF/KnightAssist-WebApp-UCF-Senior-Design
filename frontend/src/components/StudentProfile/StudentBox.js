import { useState, useEffect, useRef } from 'react';
import './StudentProfile';
import './StudentProfile.css';
import Card from '@mui/material/Card';
import { Button, Avatar, Dialog, DialogContent, DialogTitle, Grid, Chip } from '@mui/material';
import { buildPath } from '../../path';

function StudentBox(props) {

	const [picName, setPicName] = useState(undefined);
	const [role, setRole] = useState(null);
	const [newSelectedTags, setNewSelectedTags] = useState([]);

	const [openInterestsModal, setOpenInterestsModal] = useState(false);

	const [tempSelectedTags, setTempSelectedTags] = useState([]);

	// State needed due to bug where tag names where undefined
	const [makeTags, setMakeTags] = useState([]);

	const [tags, setTags] = useState([]);
	const [tagNames, setTagNames] = useState([]);
	const [colors, setColors] = useState([]);

	const profilePicSelect = useRef(null);

	async function submitEdits(){

		const editInfo = props.editInfo.current;

        const json = {
			id: sessionStorage.getItem("ID"),
            firstName: editInfo.firstName,
			lastName: editInfo.lastName,
			email: editInfo.email,
			semesterVolunteerHourGoal: Math.round(Number(editInfo.goal)),
			categoryTags: newSelectedTags
        };

        console.log(json);

        const url = buildPath("api/editUserProfile");

        try {
            const response = await fetch(url, {
                method: "POST",
                body: JSON.stringify(json),
				headers: {"Content-Type": "application/json",         
				"Authorization": `Bearer ${sessionStorage.getItem("token")}`}
			});

            let res = await response.text();
            console.log(res);

			let formData = new FormData();

			if(picName !== null && typeof picName.name === "string"){
				formData.append('profilePic', picName); 
				formData.append('entityType', 'student');
				formData.append('id', sessionStorage.getItem("ID"));
				formData.append('profilePicOrBackGround', '0');

				await fetch(buildPath(`api/storeImage`), {
					method: 'POST',
					body: formData
				})
				.then(response => response.json())
				.then(data => console.log(data))
				.catch(error => console.error('Error:', error));
			}

			props.setReset(!props.reset);
        }catch(err){
            console.log("An error has occurred: ", err);
        }
	}
	
	async function getProfilePic(){
		let id;

		if("viewingStudentPageID" in sessionStorage && 
		    sessionStorage.getItem("ID") !== sessionStorage.getItem("viewingStudentPageID")){
			id = sessionStorage.getItem("viewingStudentPageID");
		}else{
			id = sessionStorage.getItem("ID");
		}

		const url = buildPath(`api/retrieveImage?entityType=student&id=${id}&profilePicOrBackGround=0`);

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
					src={(picName) ? URL.createObjectURL(picName) : "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"}
					sx={{ width: 100, height: 100, marginBottom: "16px", marginLeft: "-12%"}} 
					className={(props.editMode) ? "hoverImage" : ""}
					onClick={(props.editMode) ? () => document.getElementById("profilepic").click() : null}
				/>
				<input ref={profilePicSelect} id="profilepic" type="file" accept="image/png, image/gif, image/jpg image/jpeg" style={{display:"none"}} onChange={() => {if(validateImgSelection(profilePicSelect)){setPicName(profilePicSelect.current.files[0]);}}}/>
			</div>
		)
	}

	function JoinDate(){
		// Parse the ISO date string
		const joinedDate = new Date(props.user.updatedAt);

		// Format the date using toLocaleDateString
		const formattedDate = joinedDate.toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
		});
		
		return (
			<div className='volunteerSince'>Volunteering since {formattedDate}</div>
		)
	}

	function EditSaveProfileBtn(){
		return (
		   <div>
			  {(props.editMode === false)
			  	?
					<button className='editBtn btn btn-primary' onClick={() => props.setEditMode(true)}>Edit Profile</button>
				:
					<button className='editBtn btn btn-primary' onClick={() => {submitEdits(); props.setEditMode(false);}}>Save Profile</button>
			  }
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
			<Card className='studentTag'>
				<div className='addSpace'>
					{props.tag}
				</div>
			</Card>
        )
    }

	function Interests(){
		return (
			<div className='studentInterests'>
				<div className='interestsName'>Interests</div>
				<div className='studentTags'>
					{props.user.categoryTags.map(t => <Tag tag={t}/>)}
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
			if(!props.user.categoryTags.includes(allTags[i])){
				tagColors.push("default"); 
			}else{
				tagColors.push("#5f5395");
			}
		}

		setNewSelectedTags(props.user.categoryTags.slice());
		setTempSelectedTags(props.user.categoryTags.slice());

		return tagColors;
	}

	useEffect(() => {
		setRole(sessionStorage.getItem("role"));
		getProfilePic();
	}, []);

	useEffect(() => {
		if(props.user){
			getProfilePic();
		}
	}, [props.user]);


	useEffect(() => {
		async function colorsAndTags(){
			setColors(await getColors());
			setMakeTags(true);
		}

		if(props.editMode){
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
		<div className='spartan studentBox'>
			<div className='items'>
				{(props.user)
					?
						<div>
							<ProfilePic/>
							{JoinDate()}
							
							{(role === "volunteer" && props.user._id === sessionStorage.getItem("ID")) 
								? EditSaveProfileBtn() 
								: ""
							}
							{(props.user.categoryTags.length > 0)
								?
									((!props.editMode) ? Interests() : EditInterests())
								: 
									""
							}
						</div>
					: 
						""
				}

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

export default StudentBox;
