import React from 'react';
import { styled } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import StudentInfo from './StudentInfo';

const BioTabContent = (props) => (
  <div>
    {/* Content for Bio tab */}
    <StudentInfo user={props.user} editMode={props.editMode} editInfo={props.editInfo}/>
  </div>
);

export default function CustomizedTabs(props) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const getTabContent = (tabValue) => {
    switch (tabValue) {
      case 0:
        return <BioTabContent user={props.user} editMode={props.editMode} editInfo={props.editInfo}/>;
      default:
        return null;
    }
  };

  return (
    <Box >
      <Box sx={{ bgcolor: '#fff' }}>
        <Box sx={{ p: 3 }}>
          {getTabContent(value)}
        </Box>
      </Box>
      <Box>
        {/* Additional content outside the tabs */}
        <Box sx={{ p: 3 }} />
      </Box>
    </Box>
  );
}
