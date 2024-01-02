import { Modal } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CloseIcon from '@mui/icons-material/Close';
import './Login.css';
import { buildPath } from '../../path';
import {Button} from '@mui/material';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import Logo from '../Logo';

function ForgotPassswordModal(props)
{
    const handleClose = () => {setEmail(""); props.setOpen(false)}

	const [email, setEmail] = useState("");

	function Email(){
		return (
			<TextField
				name="Email"
				className='forgotPWDEmail'
				sx={{
					input: {
					  background: "white",
					  borderRadius: "4px"
					}
				  }}
				fullWidth
				required
				multiline={false}
				onChange={(e) => setEmail(e.target.value)}
				value={email}
			/>
		)
	}

	function submit(){

	}

    return(
        <Modal sx={{display:'flex', alignItems:'center', justifyContent:'center', overflow:'scroll'}} open={props.open} onClose={handleClose}>
            <div className='center'>
                <Card className='forgotPasswordCard spartan'>
                    <CardContent>
                        <button className='closeAddEvent'>
                            <CloseIcon onClick={() => handleClose()}/>
                        </button>
                        <Logo theStyle="forgotPWDLogo"/>
                        <div className='forgotPWDName'> Forgot Password</div>
						<div className='forgotPWDInstructions'>Please enter your email to recieve a code with your new password</div>
						{Email()}
						<Button sx={{ mt: 3, width: 175, backgroundColor: "#463e6c", "&:hover": {backgroundColor: "#5f5395"}}} variant="contained" onClick={() => submit()}>Submit</Button>

	                </CardContent>   
                </Card>
            </div>
        </Modal>
    );
};

export default ForgotPassswordModal;