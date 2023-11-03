import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material';
import { Grid, Typography, Button, Box } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import PreLoginNavBar from '../PreLoginNavBar';
import useStyles from '../PreLoginStyles';

function Landing() {
  const theme = createTheme({
    palette: {
      mode: "light",
    }
  });

  const classes = useStyles();

  return (
    <>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <PreLoginNavBar />
      <Box className={classes.heroBox}>
      <Grid container spacing={6} className={classes.gridContainer}>
        <Grid item xs={12} md={7}>
          <Typography variant="h3" fontWeight={700} className={classes.title}>
            Let's scale your business
          </Typography>
          <Typography variant="h6" className={classes.subtitle}>
            Hire professionals who will help your business make 10X your
            previous income. With over 5years experience in Marketing & Business
            strategy, we are your best client.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{ width: '200px', fontSize: '16px' }}
          >
            HIRE US
          </Button>
        </Grid>
      </Grid>
    </Box>
    </ThemeProvider>
    </>
  );
}

export default Landing;