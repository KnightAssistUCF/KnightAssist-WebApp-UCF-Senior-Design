import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Logo from '../Logo';
import { styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import { buildPath } from '../../path';
import 'bootstrap/dist/css/bootstrap.min.css';
import './PostVerifiedQuestions.css'

function PostVerifiedQuestions()
{
    const [isVolunteerView, setIsVolunteerView] = useState(true);
    const [hourlyGoal, setHourlyGoal] = useState(0);
    const [tagNames, setTagNames] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);

    const ListItem = styled('li')(({ theme }) => ({
	margin: theme.spacing(0.5),
    }));

    function handleClick(){

    }

    function getAccountType(){
	
    }

    async function getAllTags(){
	let url = buildPath(`api/getAllAvailableTags`);

        let response = await fetch(url, {
            method: "GET",
            headers: {"Content-Type": "application/json"},
        });
    
        let res = JSON.parse(await response.text());

	setTagNames(
	    res.map((name, idx) => {
		return (
		    <Chip
			label={name}
			className='tagChip'
			onClick={() => handleClick(idx)}
		    />
		);
	    })
	)
    }

    async function submit(){

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
			autoFocus
			multiline={false}
			onChange={(e) => {e.currentTarget.value = e.target.value.replace(/[\D\s]/, ''); setHourlyGoal(e.target.value)}}
			value={hourlyGoal}
		    />
		</Grid>
	    </div>
	)
    }

    function AllTags(){
	return (
	    <div>
		<p className='tagQuestion'>Select up to 10 of the below interests:</p>
		<div className='allTags'>
		    {tagNames}
		</div>
	    </div>
	)
    }

    useEffect(()=>{
        getAccountType();
	getAllTags();
    },[])

    return(
      <div id='homePage'>
	<Header/>
	<SemesterGoal/>
	<AllTags/>
	<button type="button" class="submitBtn btn btn-primary" onClick={() => submit(true)}>Submit</button>
      </div>
    );
};

export default PostVerifiedQuestions;