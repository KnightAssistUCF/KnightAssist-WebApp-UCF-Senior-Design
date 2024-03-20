import React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function Filter(props) {
  return (
    <div>
      <FormControl fullWidth className="formControl" style={{minWidth: "140px", padding: "4px 8px", fontSize: "10px" }}>
        <InputLabel id="demo-simple-select-label" >Filter Organizations</InputLabel>
        <Select id="demo-simple-select-label"
          onChange={(event) => {
            const selectedValue = event.target.value;
			console.log(selectedValue);
            props.filterAnnouncements(selectedValue)
          }}
		  defaultValue={"favorited"}
        >
		  <MenuItem value={"favorited"}>Favorited</MenuItem>
          <MenuItem value={"all"}>All</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
