import { useState, useEffect, useRef } from 'react';
import Header from '../OrgEvents/Header';
import StudentHeader from '../StudentHome/StudentHeader'
import './StudentProfile.css';
import { buildPath } from '../../path';
import NavTabs from './NavTabs';
import FavoriteOrganizations from './FavoriteOrganizations';
import RecentEvents from './RecentEvents';
import EventModal from '../StudentExplore/EventModal';
import StudentBox from './StudentBox';
import OrgTopBar from '../OrgHome/OrgTopBar';
import StudentTopBar from '../TopBar/StudentTopBar';

function StudentProfile() {
	const [editMode, setEditMode] = useState(false);
	const [reset, setReset] = useState(false);

	const [user, setUser] = useState(undefined);

	const [eventID, setEventID] = useState(undefined);
	const [openModal, setOpenModal] = useState(false);

	const editInfo = useRef({});

	async function getStudentInfo(){
		let studentID;
		
		if("viewingStudentPageID" in sessionStorage && 
		   sessionStorage.getItem("ID") !== sessionStorage.getItem("viewingStudentPageID")){
			studentID = sessionStorage.getItem("viewingStudentPageID");
		}else{
			studentID = sessionStorage.getItem("ID");
		}
        
		let url = buildPath(`api/userSearch?userID=${studentID}`);

		let response = await fetch(url, {
			  method: "GET",
			  headers: {"Content-Type": "application/json",
				 "Authorization": `Bearer ${sessionStorage.getItem("token")}`
			  }
		});

		let res = JSON.parse(await response.text());

		setUser(res);
	}

	useEffect(() => {
		getStudentInfo();
	
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		getStudentInfo();
	
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [reset]);

	return (
		<div className='spartan'>
			{(sessionStorage.getItem("role") === "organization") ? <Header /> : <StudentHeader/>}
			{(sessionStorage.getItem("role") === "organization") ? <OrgTopBar title="Profile"/> : <StudentTopBar title="Profile"/>}
			<div className='orgProfilePage spartan'>
				{(user)
					?	
					<div>
						<StudentBox user={user} editMode={editMode} setEditMode={setEditMode} editInfo={editInfo} reset={reset} setReset={setReset}/>
						<div className='studentTabs'>
							<NavTabs user={user} editMode={editMode} editInfo={editInfo} setOpen={setOpenModal} setEventID={setEventID}/>
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
