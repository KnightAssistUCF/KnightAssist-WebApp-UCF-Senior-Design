import { useState, useEffect, useRef } from 'react';
import Header from '../OrgEvents/Header';
import StudentHeader from '../StudentHome/StudentHeader'
import './OrgProfile.css';
import OrgTopBar from '../OrgHome/OrgTopBar';
import Card from '@mui/material/Card';
import { Button, Typography, CardContent, CardMedia } from '@mui/material';
import { buildPath } from '../../path';
import NavTabs from './NavTabs';
import OrgBox from './OrgBox';
import SearchResults from '../OrgEvents/SearchResults';
import FavoriteOrganizations from './FavoriteOrganizations';
import RecentEvents from './RecentEvents';
import EventModal from '../StudentHistory/EventModal';

function StudentProfile() {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [joinDate, setJoinDate] = useState("");
	const [currentHours, setCurrentHours] = useState(0);
	const [hourGoal, setHourGoal] = useState(0);
	const [email, setEmail] = useState("");
	const [tags, setTags] = useState([]);
	const [bgFile, setBGFile] = useState(null);
	const [editMode, setEditMode] = useState(false);
	const [reset, setReset] = useState(false);

	const [user, setUser] = useState(undefined);

	const [eventID, setEventID] = useState(undefined);
	const [openModal, setOpenModal] = useState(false);

	const editInfo = useRef({});
	const backgroundSelect = useRef(null);

	async function getOrgInfo(){
		let url = buildPath(`api/userSearch?userID=${sessionStorage.getItem("ID")}`);

		let response = await fetch(url, {
			  method: "GET",
			  headers: {"Content-Type": "application/json",
				 "Authorization": `Bearer ${sessionStorage.getItem("token")}`
			  }
		});

		let res = JSON.parse(await response.text());

		console.log(sessionStorage.getItem("ID"))

		setUser(res);
		
		setFirstName(res.firstName);
		setLastName(res.lastName);
		setJoinDate(res.updatedAt);
		setCurrentHours(res.totalVolunteerHours);
		setHourGoal(res.semesterVolunteerHourGoal);
		setEmail(res.email);
		setTags(res.categoryTags);

		url = buildPath(`api/retrieveImage?entityType=student&id=${sessionStorage.getItem("ID")}&profilePicOrBackGround=0`);

		response = await fetch(url, {
			method: "GET",
			headers: {"Content-Type": "application/json"},
		});

		let background = await response.blob();

		setBGFile(background);
	}

	useEffect(() => {
		getOrgInfo();
	
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	function validateImgSelection(fileSelect){
		// No files selected
		if(fileSelect.current.files.length === 0) return false;
		
		const file = fileSelect.current.files[0].name;
		console.log(file)

		const fileType = file.substring(file.lastIndexOf(".") + 1);

		return fileType === "png" || fileType === "gif" || fileType === "jpg" || fileType === "jpeg";
	}


	function BackgroundBanner(){
		return (
			<div>
				<CardMedia
					component="img"
					image={(bgFile !== null) ? URL.createObjectURL(bgFile) : ""}
					className={'orgBannerFiller' + ((editMode) ? " hoverImage" : "")}
					onClick={(editMode) ? () => document.getElementById("background").click() : null}
				/>				
				<input ref={backgroundSelect} id="background" type="file" accept="image/png, image/gif, image/jpg image/jpeg" style={{display:"none"}} onChange={() => {if(validateImgSelection(backgroundSelect)){setBGFile(backgroundSelect.current.files[0]); editInfo.current.background = backgroundSelect.current.files[0];}}}/>
			</div>
		)
	}

	return (
		<div className='spartan'>
			{(sessionStorage.getItem("role") === "organization") ? <Header /> : <StudentHeader/>}
			<div className='orgProfilePage spartan'>
				{(user !== null)
					?	
					<div>
						<BackgroundBanner/>
						<OrgBox user={user} editMode={editMode} setEditMode={setEditMode} editInfo={editInfo} reset={reset} setReset={setReset}/>
						<div className='navTabs'>
							<NavTabs user={user} editMode={editMode} editInfo={editInfo}/>
						</div>
						<div className='cardSections'>
							<FavoriteOrganizations/>
							<RecentEvents setOpen={setOpenModal} setEventID={setEventID}/>					
						</div>
						<EventModal eventID={eventID} setEventID={setEventID} open={openModal} setOpen={setOpenModal}/>
					</div>
					: ""
				}
			</div>
		
		</div>
	);
}

export default StudentProfile;
