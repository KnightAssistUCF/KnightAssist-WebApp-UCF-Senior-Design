import * as React from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import { useState, useEffect } from 'react';
import { buildPath } from '../../path';
import './StudentExplore.css';

function Search(props) {
  
    const [events, setEvents] = useState([]);
    const [orgs, setOrgs] = useState([]);
    const [label, setLabel] = useState("Search For Events");
    const [options, setOptions] = useState(events);

	const [searchTerm, setSearchTerm] = useState("");

    // Gets org name from organizationID
    async function getOrgName(id){
        let url = buildPath(`api/organizationSearch?organizationID=${id}`);

        let response = await fetch(url, {
          method: "GET",
          headers: {"Content-Type": "application/json"},
        });

      try{
          let res = JSON.parse(await response.text());
          return res.name;
      }catch{
          return -1;
      }
    }

    async function getAllEvents(flag){
        let url = buildPath(`api/loadAllEventsAcrossOrgs`);

        let response = await fetch(url, {
          method: "GET",
          headers: {"Content-Type": "application/json"},
        });

        let res = JSON.parse(await response.text());

        const tmp = [];

        for(let event of res){
            if("name" in event && "startTime" in event){
                const orgName = await getOrgName(event.sponsoringOrganization);
                if(orgName !== -1)
                  tmp.push({label: ("(" + orgName + ") " + event.startTime.substring(0, event.startTime.indexOf("T")) + ": " + event.name), id: event._id});
            }
        }

        setEvents(tmp);

        // Due to bug and since this function is only called
        // upon initialization
        if(flag === 1){
          setOptions(tmp);
		  props.results.current = tmp;
		}else{
          if(props.searchType !== "organizations")
            setOptions(tmp);
		}
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

        }
    }

    useEffect(()=>{
        console.log("called");
        getAllEvents(1);
        getAllOrganization();
		// eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    useEffect(()=>{
        if(props.searchType === undefined) return;

        if(props.searchType === "events"){
          setLabel("Search For Events");
          setOptions(events);
		  const filtered = events.filter((opt) => opt.label.toLowerCase().includes(searchTerm.toLowerCase()));
		  props.results.current = filtered;
        }else{
          setLabel("Search For Organizations");
          setOptions(orgs);
		  const filtered = orgs.filter((opt) => opt.label.toLowerCase().includes(searchTerm.toLowerCase()));
		  props.results.current = filtered;
        }
		// eslint-disable-next-line react-hooks/exhaustive-deps
    },[props.searchType]);

    useEffect(()=>{
      getAllEvents(0);
      console.log(events);
	  // eslint-disable-next-line react-hooks/exhaustive-deps
    },[props.resetEventSearch]);

	useEffect(() => {
		const filtered = options.filter((opt) => opt.label.toLowerCase().includes(searchTerm.toLowerCase()));
		console.log(filtered);
		props.results.current = filtered;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchTerm]);
	
    return (
      <div>
        <Stack className="exploreSearch" spacing={2} sx={{ width: 300 }}>
		<Autocomplete 
            freeSolo
			autoHighlight={true}
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
				onChange={(e) => setSearchTerm(e.target.value)}
              />
            )}
          />
        </Stack>
      </div>

    );
}

export default Search;
