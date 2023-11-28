import React, { useState, useEffect, useContext } from 'react';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Logo from '../Logo';
import { styled } from '@mui/material/styles';
import { withStyles } from "@material-ui/core/styles";
import Chip from '@mui/material/Chip';
import { buildPath } from '../../path';
import 'bootstrap/dist/css/bootstrap.min.css';
import './PostVerifiedQuestions.css'

function PostVerifiedQuestions()
{
    const [isVolunteerView, setIsVolunteerView] = useState(true);
    const [hourlyGoal, setHourlyGoal] = useState(0);
    const [tagNames, setTagNames] = useState([]);
    const [tags, setTags] = useState([]);
    const [colors, setColors] = useState(makeColorsArray());
    const [selectedTags, setSelectedTags] = useState([]);

    // State needed due to bug where tag names where undefined
    const [makeTags, setMakeTags] = useState([]);

    function handleClick(idx){
	if(colors[idx] != "default"){
	    selectedTags.splice(selectedTags.indexOf(tagNames[idx]), 1);
	    colors[idx] = "default"; 
	}else{
	    if(selectedTags.length < 10){
		selectedTags.push(tagNames[idx]);
		console.log(selectedTags);
		colors[idx] = "#5f5395";
	    }
	}

	getAllTags();
    }

    function makeColorsArray(){
	const colors = [];
	for(let i = 0; i < 50; i++)
	    colors.push("default");

	return colors;
    }

    function getAccountType(){
	
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
				backgroundColor: (colors[idx] == "default") ? "default" : "purple"
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
		    {tags}
		</div>
	    </div>
	)
    }

    useEffect(()=>{
        getAccountType();
	getTagNames();
    },[])

    
    useEffect(()=>{
	getAllTags();
    },[makeTags])


    return(
      <div id='homePage'>
	<Header/>
	<SemesterGoal/>
	<AllTags/>
	<button type="button" class="submitBtn btn btn-primary" onClick={() => submit()}>Submit</button>
      </div>
    );
};

export default PostVerifiedQuestions;