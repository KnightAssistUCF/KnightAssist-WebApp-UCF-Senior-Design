import { useState, useEffect, useRef } from 'react';
import Header from '../OrgEvents/Header';
import StudentHeader from '../StudentHome/StudentHeader'
import './Leaderboard.css';
import { buildPath } from '../../path';
import OrgTopBar from '../OrgHome/OrgTopBar';
import StudentTopBar from '../TopBar/StudentTopBar';
import { CoPresentOutlined } from '@mui/icons-material';
import { Avatar, CardActionArea, CardContent, Grid, Typography } from '@mui/material';
import { Card } from 'react-bootstrap';

function Leaderboard() {
	const [role, setRole] = useState(sessionStorage.getItem("role"));
	const [studentData, setStudentData] = useState(undefined);

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

		const data = [];

		for(let student of res.data){
			url = buildPath(`api/retrieveImage?entityType=student&id=${student._id}&profilePicOrBackGround=0`);
	
			response = await fetch(url, {
				method: "GET",
				headers: {"Content-Type": "application/json"},
			});
	
			let pic = await response.blob();
	
			data.push([student, pic])
		}

		setStudentData(data);
	}

	function Title(){
		return(
		  <div className='lbTitle yourEvents spartan'>
			 <h1>Leaderboard</h1>
		  </div>
		)
	}

	function RankCard(props){
		const student = props.student;
		const pic = props.pic;

		return (
			<Card className="grayRank" variant="outlined">
				<CardActionArea>
					<CardContent className="content">
						<Avatar className='rankNumber rankItem'>{props.i}</Avatar>
						<Avatar className='rankItem' src={(pic) ? URL.createObjectURL(pic) : "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"} />
						<Typography
							variant="body2"
							color="textSecondary"
							component="p"
							className='rankItem'
							style={{ color: 'black'}}
						>
							{student.firstName + " " + student.lastName}
						</Typography>
						<Typography
							variant="body2"
							color="textSecondary"
							component="p"
							className='rankItem'
							style={{ color: 'black'}}
						>
							{student.totalVolunteerHours}
						</Typography>
					</CardContent>
				</CardActionArea>
			</Card>
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
			  	{(studentData) ? studentData.slice(0, 10).map((student, i) => <RankCard student={student[0]} pic={student[1]} i={i + 1}/>) : null}
			  </div>
		  </div>
		</div>
	  );
}

export default Leaderboard;
