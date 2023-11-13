import React, { useState, useEffect } from 'react';
import './EmailVerified.css';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { BiCheckShield } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Logo from '../Logo';

function EmailVerified() {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(4);

  useEffect(() => {
    const redirectTimeout = setTimeout(() => {
        window.location.href = '/';
    }, countdown * 1000); 

    const countdownInterval = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    return () => {
      clearTimeout(redirectTimeout);
      clearInterval(countdownInterval);
    };
  }, [navigate, countdown]);

return (
        <div id='emailVerified'>
          <div className="CardContainer">
            <Card variant="outlined" className="Card">
              <Box sx={{ margin: '20px' }}>
                <div className="emailTitle">Email Successfully Verified</div>
                <BiCheckShield className='verifyIcon'></BiCheckShield>
                <div className="countdown">Redirecting to login in {countdown} seconds</div>
              </Box>
            </Card>
          </div>
        </div>
      );
    }

export default EmailVerified;
