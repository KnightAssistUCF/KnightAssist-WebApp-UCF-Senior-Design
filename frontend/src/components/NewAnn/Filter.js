import React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function Filter(props) {
  return (
    <div>
      <FormControl fullWidth className="formControl" style={{ minWidth: "120px", marginLeft: "16px", padding: "4px 8px", fontSize: "10px" }}>
        <InputLabel id="demo-simple-select-label" >Filter</InputLabel>
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
            <em>None</em>
          </MenuItem>
          <MenuItem value={"Favorited"}>Favorited</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
