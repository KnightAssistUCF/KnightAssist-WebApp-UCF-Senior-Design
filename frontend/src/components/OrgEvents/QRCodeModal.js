import { Modal } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import {Button} from '@mui/material';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Logo from '../Logo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Alert from '@mui/material/Alert';
import dayjs from 'dayjs';
import CloseIcon from '@mui/icons-material/Close';
import './OrgEvents';
import { buildPath } from '../../path';
import { useEffect, useState, useRef} from 'react';

function QRCodeModal(props)
{
    const handleClose = () => {resetValues(); props.setOpen(false)}

	const [eventName, setEventName] = useState(undefined);
	const [QRCodeLink, setQRCodeLink] = useState(undefined);

    function resetValues(){
        props.setCheckType(undefined);
		setEventName(undefined);
		setQRCodeLink(undefined);
    }
	
	async function setInfo(){
		let url = buildPath(`api/searchOneEvent?eventID=${props.eventID}`);

		let response = await fetch(url, {
			method: "GET",
			headers: {"Content-Type": "application/json"},
		});
	
		let res = JSON.parse(await response.text());

		let event = res[0];

		setEventName(event.name);

		if(props.checkType == "In"){
			url = buildPath(`api/generateQRCode_checkIn?eventID=${props.eventID}`);

			response = await fetch(url, {
				method: "GET",
				headers: {"Content-Type": "application/json"},
			});
		
			res = JSON.parse(await response.text());
	
			setQRCodeLink(res.QRCodeSrc);
		}else{
			url = buildPath(`api/generateQRCode_checkOut?eventID=${props.eventID}`);

			response = await fetch(url, {
				method: "GET",
				headers: {"Content-Type": "application/json"},
			});
		
			res = JSON.parse(await response.text());

			setQRCodeLink(res.QRCodeSrc);
		}
	}

    useEffect(()=>{
        if(props.checkType != undefined)
			setInfo();

		// eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.checkType]);

    return(
        <Modal sx={{display:'flex', alignItems:'center', justifyContent:'center', overflow:'scroll'}} open={props.open} onClose={handleClose}>
            <div className='center'>
                <Card className='qrCodeCard spartan'>
                    <CardContent>
                        <button className='closeAddEvent'>
                            <CloseIcon onClick={() => handleClose()}/>
                        </button>
                        
                        <div className='checkName'>Check {props.checkType}</div>
						<div className='qrCodeEvent'>Event: {eventName}</div>
						<div className='qrCodeInstructions'>Scan the following code with the KnightAssist mobile app:</div>

						<img className="qrCode" src={QRCodeLink}/>
                    </CardContent>   
                </Card>
            </div>
        </Modal>
    );
};

export default QRCodeModal;