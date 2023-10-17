import { Modal } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {CardActions} from '@mui/material';
import {Button} from '@mui/material';
import './OrgPortal.css';

function AddEventModal(props)
{
    const handleClose = () => props.setOpen(false);
    
    return(
        <Modal sx={{display:'flex',alignItems:'center',justifyContent:'center'}} open={props.open} onClose={handleClose}>
            <div className='center'>
                <Card className='addEventCard'>
                    <CardContent>
                        
                    </CardContent>   
                </Card>
            </div>
        </Modal>
    );
};

export default AddEventModal;
