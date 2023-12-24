import React from 'react';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import ClearIcon from '@mui/icons-material/Clear';

function SearchBar(props) {
  const handleInputChange = (event) => {
    const newValue = event.target.value;
    props.setSearchTerm(newValue);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      props.searchAnnouncements(props.searchTerm);
    }
  };

  return (
    <div className="classes.root" variant="body1">
      <TextField
        placeholder="Search by Announcement Name"
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon style={{ cursor: 'pointer' }} />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <ClearIcon
                style={{ cursor: 'pointer' }}
                onClick={() => props.searchAnnouncements('')}
              />
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
}

export default SearchBar;
