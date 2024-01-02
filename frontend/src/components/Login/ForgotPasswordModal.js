import { Modal } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CloseIcon from '@mui/icons-material/Close';
import './Login.css';
import { buildPath } from '../../path';
import { useState } from 'react';

function ForgotPassswordModal(props)
{
    const handleClose = () => {setEmail(""); props.setOpen(false)}

	const [email, setEmail] = useState("");

    return(
        <Modal sx={{display:'flex', alignItems:'center', justifyContent:'center', overflow:'scroll'}} open={props.open} onClose={handleClose}>
            <div className='center'>
                <Card className='forgotPasswordCard spartan'>
                    <CardContent>
                        <button className='closeAddEvent'>
                            <CloseIcon onClick={() => handleClose()}/>
                        </button>
                        
                        <div className='checkName'>Forgot Password</div>
	                </CardContent>   
                </Card>
            </div>
        </Modal>
    );
};

export default ForgotPassswordModal;