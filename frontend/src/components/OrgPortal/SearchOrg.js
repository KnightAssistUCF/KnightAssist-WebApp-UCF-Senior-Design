import * as React from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import './OrgPortal.css';
import { useEffect } from 'react';
import { buildPath } from '../../path';

//TODO: Call API to search for organizations upon key click and set that to orgs
const orgs = [{label: "Knight Hacks", id: "kh@example.com"}, {label: "Hack@UCF", id: "hack@example.com"}]

function SearchOrg() {

  function openOrgPage(email){
      console.log(email);
  }

  async function getAllOrganization(){
      let url = buildPath('api/loadAllOrganizations');

      let response = await fetch(url, {
        method: "GET",
        headers: {"Content-Type": "application/json"},
      });

      let res = JSON.parse(await response.text());

      for(let org of res){
          if("organizationID" in org){
            orgs.push({label: org.name, id: org.organizationID})
          }
      }
  }

  useEffect(()=>{
      getAllOrganization();
  },[])

  return (
    <div>
      <Stack className="orgSearch" spacing={2} sx={{ width: 300 }}>
        <Autocomplete 
          freeSolo
          disableClearable
          onChange={(e, value) => openOrgPage(value.id)}
          options={orgs}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search For Organizations"
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

export default SearchOrg;
