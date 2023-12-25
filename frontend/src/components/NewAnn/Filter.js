import React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function Filter(props) {
  return (
    <div>
      <FormControl variant="outlined" className="formControl">
        <InputLabel id="demo-simple-select-outlined-label">Filter</InputLabel>
        <Select
          onChange={(event) => {
            const selectedValue = event.target.value;
            if (selectedValue === "favorited") {
              props.filterByOrganization(selectedValue);
            } else {
              props.filterAnnouncements(selectedValue);
            }
          }}
        >
          <MenuItem value={""}>
            <em>All</em>
          </MenuItem>
          <MenuItem value={"New"}>New</MenuItem>
          <MenuItem value={"Favorited"}>Favorited</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
