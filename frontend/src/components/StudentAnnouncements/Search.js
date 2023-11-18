import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    // You can perform the search logic here
        onSearch(searchTerm);

  };

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div>
      <TextField
        label="Search Announcements"
        variant="outlined"
        size="small"
        value={searchTerm}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress} sx={{ width: '25ch' }}
        InputProps={{
            endAdornment: (
            <InputAdornment position="end">
                <SearchIcon onClick={handleSearch} style={{ cursor: 'pointer' }} />
            </InputAdornment>
            ),
        }}
      />
    </div>
  );
};

export default SearchBar;