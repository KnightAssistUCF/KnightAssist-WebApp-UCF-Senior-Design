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
          Filter
        </InputLabel>
        <Select
          onChange={(event) => {
            props.filterAnnouncements(event.target.value);
          }}
        >
          <MenuItem value={""}>
            <em>All</em>
          </MenuItem>
          <MenuItem value={"New"}>Favorited</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
