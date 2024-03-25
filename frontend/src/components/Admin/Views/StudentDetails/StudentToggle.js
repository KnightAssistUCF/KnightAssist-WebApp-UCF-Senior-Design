import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export default function ColorToggleButton({ onToggleChange }) {
    const [alignment, setAlignment] = React.useState('past');

    const handleChange = (event, newAlignment) => {
        if (newAlignment === null) {
          return;
        }
        setAlignment(newAlignment);
        onToggleChange(newAlignment);
    };

  return (
    <div>
        <ToggleButtonGroup
        color="success"
        value={alignment}
        exclusive
        size='small'
        onChange={handleChange}
        aria-label="Table"
        sx={{ paddingLeft: '30px' }}
        >
        <ToggleButton value="past" sx={{
                        color: 'gray',
                        '&.Mui-selected': { color: 'white', backgroundColor: '#00664D' },
                        '&:hover': { backgroundColor: '#FAFAFA' },
                        '&.Mui-selected:hover': { backgroundColor: '#00664D' },
                    }}>Past Events</ToggleButton>
        <ToggleButton value="upcoming" sx={{
                        color: 'gray',
                        '&.Mui-selected': { color: 'white', backgroundColor: '#00664D' },
                        '&:hover': { backgroundColor: '#FAFAFA' },
                        '&.Mui-selected:hover': { backgroundColor: '#00664D' },
                    }}>Upcoming Events</ToggleButton>
        </ToggleButtonGroup>
    </div>
  );
}
