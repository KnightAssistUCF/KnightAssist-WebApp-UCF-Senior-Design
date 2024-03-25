import React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function Filter(props) {
  return (
    <div>
      <FormControl fullWidth className="formControl" style={{minWidth: "140px", padding: "4px 8px", fontSize: "10px" }}>
        <InputLabel id="demo-simple-select-label">Filter</InputLabel>
        <Select id="demo-simple-select-label"
          onChange={(event) => {
            const selectedValue = event.target.value;
			props.filterFeedback(selectedValue)
          }}
		  value={props.filterTerm}
        >
	    <MenuItem value="all">All</MenuItem>
	    <MenuItem value="unread">Unread</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
