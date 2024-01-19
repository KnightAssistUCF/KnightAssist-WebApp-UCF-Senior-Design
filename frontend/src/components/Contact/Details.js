import * as React from 'react';
import Lottie from "lottie-react";
import animationData from './contactPageAnimation';
import useStyles from '../../PreLogin/PreLoginStyles';
import './Contact.css';
import { CiLocationOn, CiMail, CiPhone } from 'react-icons/ci';

function Details() {
	const classes = useStyles();

	function Location(){
		return (
			<div className='contactUsInfo'>
				<CiLocationOn/> 4000 Central Florida Blvd. Orlando, FL 32816
			</div>
		)
	}

	function Phone(){
		return (
			<div className='contactUsInfo'>
				<CiPhone/> (321) 415-2583
			</div>
		)
	}

	function Email(){
		return (
			<div className='contactUsInfo'>
				<CiMail/> knightassist33@gmail.com
			</div>
		)
	}

	return (
		<div className='details'>
			<Lottie className="imageContactUs" style={{ position: 'relative' }} animationData={animationData} />
			<div className='infos'>
				<Location/>
				<Phone/>
				<Email/>
			</div>
		</div>
	);
}
export default Details;