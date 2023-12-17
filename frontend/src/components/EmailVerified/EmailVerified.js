import React, { useState, useEffect } from 'react';
import './EmailVerified.css';
import { BiMailSend  } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Logo from '../Logo';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { buildPath } from "../../path";
import PreLoginNavBar from '../../PreLogin/PreLoginNavBar';
import useStyles from '../../PreLogin/PreLoginStyles';

function EmailVerified() {
  const navigate = useNavigate();
  const [verificationCode, setVerificationCode] = useState('');
  const [message, setMessage] = useState('');




  async function submitVerifyCode() {
    const url = buildPath("api/validateEmailTokenInput_student");
    // get STUDENT email
    var email = "anisharanjan55@gmail.com";

    const json = {
      userEmail: email,
      tokenEnteredByUser: verificationCode
    };

    console.log(json);

    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(json),
        headers: {"Content-Type": "application/json"},
      });

      let res = JSON.parse(await response.text());
      console.log(res);
      console.log(response);
      if(res.success) {
        setMessage("Correct code");
      } else if(!res.success) {
        setMessage("*Incorrect verification code, please enter again");
      } else {
        setMessage("*Error occured");
      }

    } catch(e) {
      console.log("oopsies");
      setMessage("*Error occured, email not found");
    }

  }

return (
        <div id='emailVerified'>
          <PreLoginNavBar />
          <div className="CardContainer">
            <Card variant="outlined" className="Card">
              <Box sx={{ margin: '20px' }}>
                <div className="emailTitle">Student Email Successfully Verified</div>
                <div className="emailContent">Thanks for signing up! Please enter the confirmation code from your email to verify your account.</div>
                <BiMailSend  className='verifyIcon'></BiMailSend >
              </Box>
              <TextField id="outlined-basic" label="Verification Code" variant="outlined" value={verificationCode} onChange={(event) => setVerificationCode(event.target.value)} />
              <Button className="submitBtn" variant="contained" color="primary" onClick={submitVerifyCode}>
                Submit
              </Button>
              <div className="message">{message}</div>
            </Card>
          </div>
        </div>
      );
    }

export default EmailVerified;
