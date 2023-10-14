import * as React from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';

//TODO: Call API to search for organizations upon key click and set that to orgs
const orgs = [{label: "Knight Hacks", id: "kh@example.com"}, {label: "Hack@UCF", id: "hack@example.com"}]

function SearchOrg() {

  function openOrgPage(email){
    console.log(email);
  }

  return (
    <div>
      <Stack className="orgSearch" spacing={2} sx={{ width: 300 }}>
        <Autocomplete 
          freeSolo
          id="free-solo-2-demo"
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
