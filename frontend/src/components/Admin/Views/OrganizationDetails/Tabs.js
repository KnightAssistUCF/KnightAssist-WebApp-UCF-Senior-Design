import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

function TabsOrg( {onTabChange} ) {
    const [value, setValue] = useState("About");

    const AntTabs = styled(Tabs)({
    //   borderBottom: '1px solid #e8e8e8',
      '& .MuiTabs-indicator': {
        backgroundColor: '#00522B',
      },
    });
    
    const AntTab = styled((props) => <Tab  {...props} />)(({ theme }) => ({
      textTransform: 'none',
      minWidth: 0,
      [theme.breakpoints.up('sm')]: {
        minWidth: 0,
      },
      fontWeight: theme.typography.fontWeightRegular,
      fontSize: '23px',
      marginRight: theme.spacing(1),
      color: '#000000',
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
        color: '#00522B',
        opacity: 1,
      },
      '&.Mui-selected': {
        color: '#00522B',
        fontWeight: theme.typography.fontWeightMedium,
      },
      '&.Mui-focusVisible': {
        backgroundColor: '#d1eaff',
      },
    }));

    const AboutTabContent = () => (
        <div>
          {/* <About/> */}
        </div>
    );

    const handleChange = (event, newValue) => {
        setValue(newValue);
        onTabChange(newValue);

    };

    // const getTabContent = (tabValue) => {
    //     switch (tabValue) {
    //       case 0:
    //         return <BioTabContent org={props.org} editMode={props.editMode} editInfo={props.editInfo}/>;
    //       case 1:
    //         return <UpcomingEventsTabContent org={props.org}/>;
    //       case 2:
    //         return <RatingsTabContent org={props.org}/>;
    //       default:
    //         return null;
    //     }
    //   };



    return (
        <div>
            <Box >
                <AntTabs value={value} onChange={handleChange} aria-label="ant example">
                    <AntTab value="About" label="About" />
                    <AntTab value="Events" label="Events" />
                </AntTabs>
            </Box>
        </div>
    );
}

export default TabsOrg;