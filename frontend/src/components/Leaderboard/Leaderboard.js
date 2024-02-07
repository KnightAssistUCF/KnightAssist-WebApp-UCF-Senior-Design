import { useState, useEffect, useRef } from 'react';
import Header from '../OrgEvents/Header';
import StudentHeader from '../StudentHome/StudentHeader'
import './Leaderboard.css';
import { buildPath } from '../../path';
import OrgTopBar from '../OrgHome/OrgTopBar';
import StudentTopBar from '../TopBar/StudentTopBar';

function Leaderboard() {
	const [role, setRole] = useState("");

	function Title(){
		return(
		  <div className='yourEvents spartan'>
			 <h1>Leaderboard</h1>
		  </div>
		)
	}

	useEffect(() => {
		setRole(sessionStorage.getItem("role"));
	}, []);

    return(
		<div className='spartan'>
		  {(role === "volunteer") ? <StudentHeader/> : <Header/>}
		  {(role === "volunteer") ? <StudentTopBar/> : <OrgTopBar/>}
		  <div className='moveEverything'>
			  <Title/>
		  </div>
		</div>
	  );
}

export default Leaderboard;
