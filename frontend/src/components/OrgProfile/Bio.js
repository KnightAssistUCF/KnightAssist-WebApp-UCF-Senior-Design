import { useState, useEffect } from 'react';
import Header from '../OrgEvents/Header';
import './OrgProfile.css';
import OrgTopBar from '../OrgHome/OrgTopBar';
import Card from '@mui/material/Card';
import { Button, Typography, CardContent, Box } from '@mui/material';
import { buildPath } from '../../path';
import NavTabs from './NavTabs';

function Bio(props) {
    const [expanded, setExpanded] = useState(props.org.description.length <= 600);

    const toggleExpanded = () => {
        setExpanded(!expanded);
    };

  return (
    <div>
        <div className='bio'>
            <div className='about'>
                {/* <div className='navSubTitle'>About</div> */}
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
                    <div className='navParagraphText'>{expanded ? props.org.description : `${props.org.description.slice(0, 600)}...`}</div>
                    {(props.org.description.length > 600)
						?
							!expanded && (
								<Button onClick={toggleExpanded} color='primary' sx={{ alignSelf: 'flex-end', marginTop: '8px', textTransform: 'none', marginTop: '2px' }}>
									See More
								</Button>
							)
						: ""
					}
					{(props.org.description.length > 600)
						?
							expanded && (
								<Button onClick={toggleExpanded} color='primary' sx={{ alignSelf: 'flex-end', marginTop: '8px', textTransform: 'none', marginTop: '2px' }} >
									See Less
								</Button>
							)
						: ""
					}
                </Box>
            </div>
        </div>
      
    </div>
  );
}

export default Bio;
