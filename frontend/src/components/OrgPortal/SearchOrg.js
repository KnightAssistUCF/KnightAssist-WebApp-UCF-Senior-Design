import * as React from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';

const orgs = ["Knight Hacks", "Hack@UCF", "Knights Build"]

//TODO: Call API to search for organizations upon key click and set that to orgs

function SearchOrg() {
  return (
    <div>
      <Stack className="orgSearch" spacing={2} sx={{ width: 300 }}>
        <Autocomplete
          freeSolo
          id="free-solo-2-demo"
          disableClearable
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
