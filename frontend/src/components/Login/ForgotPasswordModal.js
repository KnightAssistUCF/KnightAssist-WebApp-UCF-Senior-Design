import { Modal } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CloseIcon from '@mui/icons-material/Close';
import './Login.css';
import { buildPath } from '../../path';
import {Button} from '@mui/material';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import { useState } from 'react';
import Logo from '../Logo';

function ForgotPassswordModal(props)
{
    const handleClose = () => {resetValues(); props.setOpen(false)}

	const [email, setEmail] = useState("");
	const [submitted, setSubmitted] = useState(false);
	const [error, setError] = useState(undefined);

	function resetValues(){
		setEmail("");
		setSubmitted(false);
		setError(undefined);
	}

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

	async function submit(){
		const json = {email: email};

        const url = buildPath("api/forgotPassword");

        try {
            const response = await fetch(url, {
                method: "POST",
                body: JSON.stringify(json),
                headers: {"Content-Type": "application/json"},
            });

            let res = JSON.parse(await response.text());
            
			console.log(res);

			// The API call was successful
			if("message" in res){
				setError(undefined);
				setSubmitted(true);
			}else{
				setError(res.error);
			}
		}catch(exception){
			console.log(exception);
		}
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
						<div className='forgotPWDInstructions'>{(!submitted) ? "Please enter your email to recieve your new password" : "Success! Check your email to collect your new password"}</div>
						{(!submitted) ? Email() : null}
						<Button sx={{ mt: 3, width: 175, backgroundColor: "#463e6c", "&:hover": {backgroundColor: "#5f5395"}}} variant="contained" onClick={() => {(!submitted) ? submit() : handleClose()}}>{(!submitted) ? "Submit" : "Ok!" }</Button>
						{(error != undefined) ? <Alert className="forgetPWDAlert" severity="error">{error}</Alert> : null}
	                </CardContent>   
                </Card>
            </div>
        </Modal>
    );
};

export default ForgotPassswordModal;