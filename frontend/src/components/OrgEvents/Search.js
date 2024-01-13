import * as React from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import './OrgEvents';
import { useState, useEffect } from 'react';
import { buildPath } from '../../path';

function Search(props) {
  
    const [events, setEvents] = useState([]);
    const [orgs, setOrgs] = useState([]);
    const [label, setLabel] = useState("Search For Events");
    const [options, setOptions] = useState(events);

    function openOrgPage(email){
        console.log(email);
    }

    async function getAllEvents(flag){
        let organizationID = "6530608eae2eedf04961794e";
        let url = buildPath(`api/searchEvent?organizationID=${organizationID}`);

        let response = await fetch(url, {
          method: "GET",
          headers: {"Content-Type": "application/json"},
        });

        let res = JSON.parse(await response.text());

        const tmp = [];

        for(let event of res){
            tmp.push({label: (event.startTime.substring(0, event.startTime.indexOf("T")) + ": " + event.name), id: event._id});
        }

        setEvents(tmp);

        // Due to bug and since this function is only called
        // upon initialization
        if(flag === 1)
          setOptions(tmp);
        else
          if(props.searchType !== "organizations")
            setOptions(tmp);
    }

    async function getAllOrganization(){
        let url = buildPath('api/loadAllOrganizations');

        let response = await fetch(url, {
          method: "GET",
          headers: {"Content-Type": "application/json"},
        });

        let res = JSON.parse(await response.text());

        const tmp = [];

        for(let org of res){
            if("name" in org){
              tmp.push({label: org.name, id: org._id})
            }
        }
       
        setOrgs(tmp);
    }

	function handleClick(id){
        if(props.searchType === "events"){
            props.setEventID(id);
            props.setOpenEvent(true);
        }else{
			openOrgPage();
        }
    }

    useEffect(()=>{
        getAllEvents(1);
        getAllOrganization();
		// eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    useEffect(()=>{
        if(props.searchType === undefined) return;

        if(props.searchType === "events"){
          setLabel("Search For Events");
          setOptions(events);
        }else{
          setLabel("Search For Organizations");
          setOptions(orgs);
        }
		// eslint-disable-next-line react-hooks/exhaustive-deps
    },[props.searchType]);

    useEffect(()=>{
      getAllEvents(0);
      console.log(events);
	  // eslint-disable-next-line react-hooks/exhaustive-deps
    },[props.resetEventSearch])

    return (
      <div>
        <Stack className="orgSearch" spacing={2} sx={{ width: 300 }}>
          <Autocomplete 
            freeSolo
            disableClearable
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
        </Stack>
      </div>

    );  
}

export default Search;
