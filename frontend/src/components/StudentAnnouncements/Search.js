import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import { buildPath } from '../../path';
import ClearIcon from '@mui/icons-material/Clear';


const SearchBar = ({ favOrgs, onSearchResults   }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [announcementRes, setAnnouncementRes] = useState([]);

  const handleSearch = async () => {
    const searchResults = [];

    for (let org of favOrgs) {
      let url = buildPath(
        `api/searchForAnnouncement?organizationID=${org.organizationID}&title=${searchTerm}`
      );

      try {
        let response = await fetch(url, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });

        let res = JSON.parse(await response.text());
        searchResults.push(...res);
      } catch (e) {}
    }

    onSearchResults(searchResults);
  };


  async function getAnnouncementResults() {
    console.log(favOrgs, searchTerm);
    for(let org of favOrgs) {
      let url = buildPath(`api/searchForAnnouncement?organizationID=${org.organizationID}&title=${searchTerm}`);
      try {
        let response = await fetch(url, {
          method: "GET",
          headers: {"Content-Type": "application/json"},
        });
        
        let res = JSON.parse(await response.text());
        setAnnouncementRes(res);
        console.log("HEREEE");

      } catch(e) {
      
      }

    }
    
  }


  useEffect(() => {
    console.log(announcementRes);
  }, [announcementRes]);

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
  onKeyPress={handleKeyPress}
  sx={{ width: '25ch' }}
  InputProps={{
    startAdornment: (
      <InputAdornment position="start">
        <SearchIcon style={{ cursor: 'pointer' }} onClick={handleSearch} />
      </InputAdornment>
    ),
    endAdornment: (
      <InputAdornment position="end">
        {searchTerm && (
          <IconButton
            edge="end"
            onClick={() => setSearchTerm('')}
            onMouseDown={(e) => e.preventDefault()}
            style={{ cursor: 'pointer' }}
          >
            <ClearIcon />
          </IconButton>
        )}
      </InputAdornment>
    ),
  }}
/>
    </div>
  );
};

export default SearchBar;