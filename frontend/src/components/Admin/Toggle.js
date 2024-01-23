import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export default function ColorToggleButton({ onToggleChange }) {
    const [alignment, setAlignment] = React.useState('student');

    const handleChange = (event, newAlignment) => {
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
        <ToggleButton value="student" sx={{
                        color: 'gray',
                        '&.Mui-selected': { color: 'white', backgroundColor: '#00664D' },
                        '&:hover': { backgroundColor: '#FAFAFA' },
                        '&.Mui-selected:hover': { backgroundColor: '#00664D' },
                    }}>Student View</ToggleButton>
        <ToggleButton value="organization" sx={{
                        color: 'gray',
                        '&.Mui-selected': { color: 'white', backgroundColor: '#00664D' },
                        '&:hover': { backgroundColor: '#FAFAFA' },
                        '&.Mui-selected:hover': { backgroundColor: '#00664D' },
                    }}>Organization View</ToggleButton>
        </ToggleButtonGroup>
    </div>
  );
}
