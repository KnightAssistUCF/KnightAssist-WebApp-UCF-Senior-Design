import React, { useState } from 'react';
// import '../components/ContactUs/ContactUs.css';
import Grid from '@mui/material/Grid';

const ContactUsPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform actions with the form data (e.g., send it to a server)
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Message:', message);
    // Clear form fields after submission
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <Grid container spacing={2} columns={16}>
    <Grid item xs={8}>
      <Item>xs=8</Item>
    </Grid>
    <Grid item xs={8}>
      <Item>xs=8</Item>
    </Grid>
  </Grid>
  );
};

export default ContactUsPage;
