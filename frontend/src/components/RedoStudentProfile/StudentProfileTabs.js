import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Account from './Account';
import RecentEvents from './RecentEvents';
import FavoritedOrganizations from './FavoritedOrganizations';

function StudentProfileTabs() {
    const [value, setValue] = useState("1");

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <TabContext value={value}> {/* Provide TabContext here */}
            <div style={{ display: 'flex' }}>
                <Box>
                    <TabList orientation='vertical' onChange={handleChange} aria-label="Student profile tabs">
                        <Tab label="Item One" value="1" />
                        <Tab label="Item Two" value="2" />
                        <Tab label="Item Three" value="3" />
                    </TabList>
                </Box>
                <div style={{ flex: 1 }}>
                    <TabPanel value="1"><Account/></TabPanel>
                    <TabPanel value="2"><RecentEvents/></TabPanel>
                    <TabPanel value="3"><FavoritedOrganizations/></TabPanel>
                </div>
            </div>
        </TabContext>
    );
}

export default StudentProfileTabs;
