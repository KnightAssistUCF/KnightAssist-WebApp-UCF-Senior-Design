import { useState, useEffect, useRef } from 'react';
import Header from '../OrgEvents/Header';
import StudentHeader from '../StudentHome/StudentHeader'
import './Leaderboard.css';
import { buildPath } from '../../path';
import OrgTopBar from '../OrgHome/OrgTopBar';
import StudentTopBar from '../TopBar/StudentTopBar';
import { CoPresentOutlined } from '@mui/icons-material';
import { Avatar, CardActionArea, CardContent, CircularProgress, Grid, Typography } from '@mui/material';
import { Card } from 'react-bootstrap';
import { BsSearch } from 'react-icons/bs';
import Search from './Search';

function Leaderboard() {
	const [role, setRole] = useState(sessionStorage.getItem("role"));
	const [top10Data, settop10Data] = useState(undefined);
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
			url = buildPath(`api/retrieveImage?typeOfImage=3&id=${student._id}`);
	
			response = await fetch(url, {
				method: "GET",
				headers: {"Content-Type": "application/json"},
			});
	
			let pic = JSON.parse(await response.text());
	
			data.push([student, pic.url])

			if(role === "volunteer" && student._id === sessionStorage.getItem("ID")){
				setYourData({rank: i + 1, data: student, pic: pic.url});
			}

			i++;
			
			// The top 10 can be displayed
			if(i == 10 || i == res.data.length){
				settop10Data(data.slice())
			}
		}

		setStudentData(data);
	}

	function loadStudentProfile(id){
		sessionStorage.setItem("viewingStudentPageID", id);
		window.location.href="/#/studentprofile";
	}

	function Title(){
		return(
		  <div className='lbTitle spartan'>
			 <b>Leaderboard</b>
		  </div>
		)
	}

	function YourRank(){

		const student = yourData.data;
		const place = yourData.rank;
		const pic = yourData.pic;

		let name = student.firstName + " " + student.lastName + "";

		if(name.length >= 30){
			name = name.substring(0, 30) + "..."
		}

		return (
			<Grid container justifyContent="center" alignItems="center">
				<Card className={"rankCard purpleCard"} variant="outlined">
					<CardContent>
						<Avatar className='rankAvatar rankNumber rankItem' style={{border: '0.1px solid black'}}>{place}</Avatar>
						<Avatar className='rankAvatar rankItem rankPic' style={{border: '0.1px solid black'}} src={(pic) ? pic : "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"} />
						<Typography
							variant="body2"
							color="textSecondary"
							component="p"
							className='rankItem rankName'
							style={{ color: 'black'}}
						>
							<p className="addHover" onClick={() => loadStudentProfile(student._id)}>
							 	<b>{name}</b>
                        	</p>						
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

		let name = student.firstName + " " + student.lastName + "";

		if(name.length >= 30){
			name = name.substring(0, 30) + "..."
		}

		return (
			<Grid container justifyContent="center" alignItems="center">
				<Card className={"rankCard purpleCard"} variant="outlined">
					<CardContent>
						<Avatar className='rankAvatar rankNumber rankItem' style={{border: '0.1px solid black'}}>{place}</Avatar>
						<Avatar className='rankAvatar rankItem rankPic' style={{border: '0.1px solid black'}} src={(pic) ? pic : "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"} />
						<Typography
							variant="body2"
							color="textSecondary"
							component="p"
							className='rankItem rankName'
							style={{ color: 'black'}}
						>
							<p className="addHover" onClick={() => loadStudentProfile(student._id)}>
							 	<b>{name}</b>
                        	</p>
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
						<Avatar className='rankAvatar rankItem rankPic' style={{border: '0.1px solid black'}} src={(pic) ? pic : "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"} />
						<Typography
							variant="body2"
							color="textSecondary"
							component="p"
							className='rankItem rankName'
							style={{ color: 'black'}}
						>
							<p className={role === "organization" ? "addHover" : ""} onClick={() => ((role === "organization") ? loadStudentProfile(student._id) : null)}>
							 	<b>{name}</b>
                        	</p>						
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
				{(role === "volunteer") ? (yourData ? <YourRank/> : <CircularProgress/>) : null}
				{(role === "organization") ? <Search studentData={studentData} searchID={searchID} setSearchID={setSearchID}/> : null}
				{(role === "organization" && searchID) ? <SearchRank/> : null}
				{(top10Data) ? <div className='lbHeader'>Top 10</div> : null}
			  	{(top10Data) ? top10Data.map((student, i) => <RankCard student={student[0]} pic={student[1]} i={i + 1}/>) : <div className='progessTop10'><CircularProgress/></div>}
			  </div>
		  </div>
		</div>
	  );
}

export default Leaderboard;
