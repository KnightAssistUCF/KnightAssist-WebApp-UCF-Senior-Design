import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function SearchSwitch(props)
{
    function setSearchType(e){
	if(e.target.value === "events")
	    props.setSearchType("events");
	else
	    props.setSearchType("organizations");
    }

    return(
      <div className='searchSwitch'>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
	    <InputLabel id="demo-simple-select-standard-label">Search Type</InputLabel>
	    <Select
		labelId="demo-simple-select-standard-label"
		id="demo-simple-select-standard"
		label="Age"
		defaultValue="events"
		onChange={(e) => setSearchType(e)}
	    >
	    <MenuItem value="events">Events</MenuItem>
	    <MenuItem value="organizations">Organizations</MenuItem>
	    </Select>
	    </FormControl>
      </div>
    );
};

export default SearchSwitch;
