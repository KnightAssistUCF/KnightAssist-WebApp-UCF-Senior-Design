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
import { BsSearch } from 'react-icons/bs';
import Search from './Search';

function Leaderboard() {
	const [role, setRole] = useState(sessionStorage.getItem("role"));
	const [studentData, setStudentData] = useState(undefined);
	const [yourData, setYourData] = useState(undefined);
	const [searchID, setSearchID] = useState(undefined);

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

		let i = 0;

		for(let student of res.data){
			url = buildPath(`api/retrieveImage?entityType=student&id=${student._id}&profilePicOrBackGround=0`);
	
			response = await fetch(url, {
				method: "GET",
				headers: {"Content-Type": "application/json"},
			});
	
			let pic = await response.blob();
	
			data.push([student, pic])

			// It is your rank
			if(role === "volunteer" && student._id === sessionStorage.getItem("ID")){
				setYourData({rank: i + 1, data: student, pic: pic});
			}

			i++;
		}

		setStudentData(data);
	}

	function Title(){
		return(
		  <div className='lbTitle spartan'>
			 <h1>Leaderboard</h1>
		  </div>
		)
	}

	function YourRank(){

		const student = yourData.data;
		const place = yourData.rank;
		const pic = yourData.pic;

		return (
			<Grid container justifyContent="center" alignItems="center">
				<Card className={"rankCard purpleCard"} variant="outlined">
					<CardContent>
						<Avatar className='rankAvatar rankNumber rankItem' style={{border: '0.1px solid black'}}>{place}</Avatar>
						<Avatar className='rankAvatar rankItem rankPic' style={{border: '0.1px solid black'}} src={(pic) ? URL.createObjectURL(pic) : "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"} />
						<Typography
							variant="body2"
							color="textSecondary"
							component="p"
							className='rankItem rankName'
							style={{ color: 'black'}}
						>
							<b>{student.firstName + " " + student.lastName}</b>
						</Typography>
						<Typography
							variant="body2"
							color="textSecondary"
							component="p"
							className='removeIfShort rankItem rankEvents'
							style={{ color: 'black'}}
						>
							{student.eventsHistory.length} Events
						</Typography>
						<Typography
							variant="body2"
							color="textSecondary"
							component="p"
							className='removeIfShort rankItem'
							style={{ color: 'black'}}
						>
							{student.totalVolunteerHours} Hours
						</Typography>
					</CardContent>
				</Card>
			</Grid>
		)
	}

	function SearchRank(){
		
		let student, pic, place;
		let i = 0;

		for(let curStudent of studentData){

			// It is the student that was searched for
			if(curStudent[0]._id === searchID){
				student = curStudent[0];
				pic = curStudent[1];
				place = i + 1;
			}

			i++;
		}
		

		return (
			<Grid container justifyContent="center" alignItems="center">
				<Card className={"rankCard purpleCard"} variant="outlined">
					<CardContent>
						<Avatar className='rankAvatar rankNumber rankItem' style={{border: '0.1px solid black'}}>{place}</Avatar>
						<Avatar className='rankAvatar rankItem rankPic' style={{border: '0.1px solid black'}} src={(pic) ? URL.createObjectURL(pic) : "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"} />
						<Typography
							variant="body2"
							color="textSecondary"
							component="p"
							className='rankItem rankName'
							style={{ color: 'black'}}
						>
							<b>{student.firstName + " " + student.lastName}</b>
						</Typography>
						<Typography
							variant="body2"
							color="textSecondary"
							component="p"
							className='removeIfShort rankItem rankEvents'
							style={{ color: 'black'}}
						>
							{student.eventsHistory.length} Events
						</Typography>
						<Typography
							variant="body2"
							color="textSecondary"
							component="p"
							className='removeIfShort rankItem'
							style={{ color: 'black'}}
						>
							{student.totalVolunteerHours} Hours
						</Typography>
					</CardContent>
				</Card>
			</Grid>
		)
	}

	function RankCard(props){
		const student = props.student;
		const pic = props.pic;
		const place = props.i;
		
		let color = " grayCard";

		if(place === 1) color = " goldCard";
		if(place === 2) color = " silverCard";
		if(place === 3) color = " bronzeCard";

		let name = student.firstName + " " + student.lastName + "";

		if(name.length >= 30){
			name = name.substring(0, 30) + "..."
		}

		return (
			<Grid container justifyContent="center" alignItems="center">
				<Card className={"rankCard" + color} variant="outlined">
					<CardContent>
						<Avatar className='rankAvatar rankNumber rankItem' style={{border: '0.1px solid black'}}>{place}</Avatar>
						<Avatar className='rankAvatar rankItem rankPic' style={{border: '0.1px solid black'}} src={(pic) ? URL.createObjectURL(pic) : "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"} />
						<Typography
							variant="body2"
							color="textSecondary"
							component="p"
							className='rankItem rankName'
							style={{ color: 'black'}}
						>
							<b>{name}</b>
						</Typography>
						<Typography
							variant="body2"
							color="textSecondary"
							component="p"
							className='removeIfShort rankItem rankEvents'
							style={{ color: 'black'}}
						>
							{student.eventsHistory.length} Events
						</Typography>
						<Typography
							variant="body2"
							color="textSecondary"
							component="p"
							className='removeIfShort rankItem'
							style={{ color: 'black'}}
						>
							{student.totalVolunteerHours} Hours
						</Typography>
					</CardContent>
				</Card>
			</Grid>
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
				{(role === "volunteer" && yourData) ? <div className='lbHeader'>Your Rank</div> : null}
				{(role === "volunteer" && yourData) ? <YourRank/> : null}
				{(role === "organization" && studentData) ? <Search studentData={studentData} searchID={searchID} setSearchID={setSearchID}/> : null}
				{(role === "organization" && searchID) ? <SearchRank/> : null}
				{(studentData) ? <div className='lbHeader'>Top 10</div> : null}
			  	{(studentData) ? studentData.slice(0, 10).map((student, i) => <RankCard student={student[0]} pic={student[1]} i={i + 1}/>) : null}
			  </div>
		  </div>
		</div>
	  );
}

export default Leaderboard;
