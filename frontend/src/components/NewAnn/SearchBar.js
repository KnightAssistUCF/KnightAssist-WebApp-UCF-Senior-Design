import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import ClearIcon from '@mui/icons-material/Clear';

function SearchBar(props) {
  const { searchTerm, setSearchTerm, reverseSearchResults, searchAnnouncements } = props;
  const [loading, setLoading] = useState(false);

  const handleClear = () => {
    setSearchTerm('');
    // showAllUpdates();
  };
  
  const showAllUpdates = () => {
    props.setFilterTerm('');
    props.fetchAllUpdates();
  };

  const handleInputChange = (event) => {
    const newValue = event.target.value;

    // if (searchTerm !== '' && newValue === '') {
    //   reverseSearchResults();
    // }

    setSearchTerm(newValue);
  };

const handleKeyPress = (event) => {
  if (event.key === 'Enter') {
    console.log("searchTerm: "+searchTerm);
    setSearchTerm(searchTerm);
    var tempTerm = props.filterTerm;
    console.log(tempTerm);
    props.setFilterTerm(tempTerm);
    searchAnnouncements(searchTerm);
    if(searchTerm == '') {
      if(props.filterTerm == 'favorited') {
        console.log("surprise");
        console.log(props.finalFavUpdates);
        const flattenedAnnouncements = props.finalFavUpdates.flatMap(org => (
          org.update.map(announcement => ({
            organizationName: org.orgName,
            ...announcement,
          }))
        ));
        props.setSearchAnnouncement(flattenedAnnouncements);
      } else {
        console.log("here---------");
      }
      
    }
  }
};


  useEffect(() => {
    console.log('Search term updated:', searchTerm);
  }, [searchTerm]);

  return (
    <div className="classes.root" variant="body1">
      <TextField
        placeholder="Search by Announcement Name"
        value={searchTerm}
        onChange={handleInputChange}
        sx={{ width: '25ch' }}
        size='medium'
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
                onClick={handleClear} // Clear the search term
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

export default SearchBar;
