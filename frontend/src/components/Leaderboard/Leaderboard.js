import { useState, useEffect, useRef } from 'react';
import Header from '../OrgEvents/Header';
import StudentHeader from '../StudentHome/StudentHeader'
import './Leaderboard.css';
import { buildPath } from '../../path';
import OrgTopBar from '../OrgHome/OrgTopBar';
import StudentTopBar from '../TopBar/StudentTopBar';
import { CoPresentOutlined } from '@mui/icons-material';

function Leaderboard() {
	const [role, setRole] = useState(sessionStorage.getItem("role"));
	const [studentData, setStudentDate] = useState(undefined);

	async function getStudentData(){
		let url;

		if(role === "volunteer"){
			url = buildPath(`api/allStudentsRanking`);
		}else{
			//url = buildPath(`api/perOrgLeaderboard?orgId=${sessionStorage.getItem('ID')}`);
			url = buildPath(`api/perOrgLeaderboard?orgId=6530608eae2eedf04961794e`); // For testing now, will remove once done
		}

		let response = await fetch(url, {
			method: "GET",
			headers: {"Content-Type": "application/json",
			"Authorization": `Bearer ${sessionStorage.getItem("token")}`
			}        
		});
	
		let res = JSON.parse(await response.text());

		console.log(res.data);
		setStudentDate(res.data);
	}

	function Title(){
		return(
		  <div className='lbTitle yourEvents spartan'>
			 <h1>Leaderboard</h1>
		  </div>
		)
	}

	useEffect(() => {
		setRole(sessionStorage.getItem("role"));
		getStudentData();
	}, []);

    return(
		<div className='spartan'>
		  {(role === "volunteer") ? <StudentHeader/> : <Header/>}
		  {(role === "volunteer") ? <StudentTopBar/> : <OrgTopBar/>}
		  <div className='moveEverything'>
		      <Title/>
			  <div className='rankDisplay'>
			  	{(studentData) ? studentData.map((student, i) => <div>{i + " " + student.firstName}</div>) : null}
			  </div>
		  </div>
		</div>
	  );
}

export default Leaderboard;
