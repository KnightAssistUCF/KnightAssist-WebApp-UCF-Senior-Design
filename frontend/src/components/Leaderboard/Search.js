import * as React from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import { useState, useEffect } from 'react';
import { buildPath } from '../../path';
import { Avatar } from '@mui/material';

function Search(props) {

    const [label, setLabel] = useState("Search For Student Ranks");
    const [options, setOptions] = useState(undefined);

	const [searchTerm, setSearchTerm] = useState("");

	function getOptions(){
		console.log(props.studentData)
		const tmp = [];

		for(let student of props.studentData){
			tmp.push({label:student[0].firstName + " " + student[0].lastName, id: student[0]._id});
		}

		setOptions(tmp);
	}

	function handleClick(id){
        props.setSearchID(id);
		setSearchTerm("");

		// Need to call this again to prevent issue where 
		// same student can't be searched consecutively
		getOptions();
    }

    useEffect(()=>{
        if(props.studentData){
			getOptions();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
    },[props.studentData]);

    return (
      <div>
			<Autocomplete 
				className={"studentSearch" + ((!props.searchID) ? " extraSearchSpace" : " ifSearched")} 
				sx={{ width: 300 }}
				freeSolo
				autoHighlight={true}
				disableClearable
				disabled={!props.studentData}
				onChange={(e, value) => {handleClick(value.id)}}
				options={options}
				renderInput={(params) => (
					<TextField
						{...params}
						label={label}
						InputProps={{
						...params.InputProps,
						type: 'search',
						}}
					/>
				)}
			/>
			{(props.searchID) ? <button type="button" class="undoBtn addEventBtn btn btn-primary" onClick={() => props.setSearchID(undefined)}>Undo Search</button> : ""}
      </div>

    );  
}

export default Search;
