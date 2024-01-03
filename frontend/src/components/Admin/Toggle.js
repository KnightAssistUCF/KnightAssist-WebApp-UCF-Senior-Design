import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import OrganizationTable from './OrgTable';
import StudentTable from './StudentTable';

export default function ColorToggleButton({ onToggleChange }) {
    const [alignment, setAlignment] = React.useState('student');

    const handleChange = (event, newAlignment) => {
        setAlignment(newAlignment);
        onToggleChange(newAlignment);
    };

  return (
    <div>
        <ToggleButtonGroup
        color="primary"
        value={alignment}
        exclusive
        size='small'
        onChange={handleChange}
        aria-label="Table"
        sx={{ paddingLeft: '30px' }}
        >
        <ToggleButton value="student">Student</ToggleButton>
        <ToggleButton value="organization">Organization</ToggleButton>
        </ToggleButtonGroup>
    </div>
  );
}
