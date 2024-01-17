import React from 'react';
import { styled } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Bio from './Bio';
import Contact from './Contact';
import Calendar from './Scheduler';
import Ratings from './Ratings';

const AntTabs = styled(Tabs)({
//   borderBottom: '1px solid #e8e8e8',
  '& .MuiTabs-indicator': {
    backgroundColor: '#1890ff',
  },
});

const AntTab = styled((props) => <Tab disableRipple {...props} />)(({ theme }) => ({
  textTransform: 'none',
  minWidth: 0,
  [theme.breakpoints.up('sm')]: {
    minWidth: 0,
  },
  fontWeight: theme.typography.fontWeightRegular,
  fontSize: '17px',
  marginRight: theme.spacing(1),
  color: 'rgba(0, 0, 0, 0.85)',
  fontFamily: [
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(','),
  '&:hover': {
    color: '#40a9ff',
    opacity: 1,
  },
  '&.Mui-selected': {
    color: '#1890ff',
    fontWeight: theme.typography.fontWeightMedium,
  },
  '&.Mui-focusVisible': {
    backgroundColor: '#d1eaff',
  },
}));

const BioTabContent = (props) => (
  <div>
    {/* Content for Bio tab */}
    <Bio org={props.org}/>
    <Contact org={props.org}/>
  </div>
);

const UpcomingEventsTabContent = (props) => (
  <div>
    {/* Content for Upcoming Events tab */}
    <Calendar org={props.org}/>
  </div>
);

const RatingsTabContent = (props) => (
  <div>
    {/* Content for Ratings tab */}
    <Ratings org={props.org}/>
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
        return <BioTabContent org={props.org}/>;
      case 1:
        return <UpcomingEventsTabContent org={props.org}/>;
      case 2:
        return <RatingsTabContent org={props.org}/>;
      default:
        return null;
    }
  };

  return (
    <Box >
      <Box sx={{ bgcolor: '#fff' }}>
        <AntTabs value={value} onChange={handleChange} aria-label="ant example">
		  <AntTab label="Bio" />
		  {(props.org._id !== sessionStorage.getItem("ID")) ? <AntTab label="Upcoming Events" /> : ""}
		  {(props.org._id !== sessionStorage.getItem("ID")) ? <AntTab label="Ratings" /> : ""}
        </AntTabs>
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
