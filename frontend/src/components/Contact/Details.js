import * as React from 'react';
import { Grid, Typography, Button, Box } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Lottie from "lottie-react";
import PreLoginNavBar from '../../PreLogin/PreLoginNavBar';
import useStyles from '../../PreLogin/PreLoginStyles';
import Footer from '../Footer';
import './Contact.css';
import AIGeneratedImage from './AIGeneratedImage';

function Details() {
  const classes = useStyles();

  return (
	<div>
		<AIGeneratedImage/>
	</div>
  );
}
export default Details;