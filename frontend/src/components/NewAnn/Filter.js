import React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";


export default function Filter(props) {

  return (
    <div>
      <FormControl variant="outlined" className="formControl">
        <InputLabel id="demo-simple-select-outlined-label">
          Filter By Region
        </InputLabel>
        <Select
          onChange={(event) => {
            props.filterAnnouncements(event.target.value);
          }}
        >
          <MenuItem value={""}>
            <em>All</em>
          </MenuItem>
          <MenuItem value={"Africa"}>Africa</MenuItem>
          <MenuItem value={"Population"}>Population (0-9)</MenuItem>
          <MenuItem value={"Population-down"}>Population (9-0)</MenuItem>
          <MenuItem value={"Europe"}>Europe</MenuItem>
          <MenuItem value={"Oceania"}>Oceania</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
