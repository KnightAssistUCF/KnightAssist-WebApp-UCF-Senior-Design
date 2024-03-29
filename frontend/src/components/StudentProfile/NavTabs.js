import React from 'react';
import { styled } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import StudentInfo from './StudentInfo';
import RecentEvents from './RecentEvents';
import FavoriteOrganizations from './FavoriteOrganizations';

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
      case 1:
		return 	<RecentEvents setOpen={props.setOpen} setEventID={props.setEventID}/>					
	  case 2:
		return <FavoriteOrganizations/>
	  default:
        return null;
    }
  };

  return (
    <Box >
      <Box>
	 	<AntTabs value={value} onChange={handleChange} aria-label="ant example">
			<AntTab label="Info"/>
			<AntTab label="Recent Events"/>
			<AntTab label="Favorite Orgs"/>
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
