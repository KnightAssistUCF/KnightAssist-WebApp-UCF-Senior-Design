import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import ClearIcon from '@mui/icons-material/Clear';

function OrgSearchBar(props) {

  const handleClear = (event) => {
    event.target.value = '';
    props.setQuery("");
    props.searchEvents("");
  };
  
  const showAllUpdates = () => {

  };

  const handleInputChange = (event) => {
    const newValue = event.target.value;
    props.setQuery(newValue);
    console.log(newValue);
    props.searchEvents(newValue);
  };

const handleKeyPress = (event) => {

};



  return (
    <div className="classes.root" variant="body1" style={{marginTop: '3.5px'}}>
      <TextField
        placeholder="Search"
        onChange={handleInputChange}
        value={props.query}
        sx={{ width: '36ch' }}
        size='small'
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon style={{ cursor: 'pointer' }} />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <ClearIcon
                onClick={handleClear}
                onMouseDown={(e) => e.preventDefault()}
                style={{ cursor: 'pointer' }}
              />
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
}

export default OrgSearchBar;
