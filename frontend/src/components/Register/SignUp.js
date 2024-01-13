import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import React, {useState} from "react";
import VolunteerForm from './VolunteerForm';
import OrganizationForm from './OrganizationForm';
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from '@mui/lab/TabPanel';
import { buildPath } from '../../path';

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: '#4E878C',
    },
    secondary: {
      main: '#593959',
      contrastText: '#FFFFFF'
    },
  },
});

// ... (import statements)

export default function SignUp() {
  const [value, setValue] = React.useState("1");
  const [formData, setFormData] = React.useState({});
  const [volFirstName, setVolFirstName] = useState("");
  const [volLastName, setVolLastName] = useState("");
  const [volEmail, setVolEmail] = useState("");
  const [volPass, setVolPass] = useState("");
  const [volConfirmPass, setVolConfirmPass] = useState("");
  const [orgName, setOrgName] = useState("");
  const [orgEmail, setOrgEmail] = useState("");
  const [orgPass, setOrgPass] = useState("");
  const [orgConfirmPassword, setOrgConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const [OrgformData, setOrgFormData] = React.useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleFormSubmit = (data) => {
    console.log("I am here!");
    console.log(data);
    setFormData(data);
  };

  // async function doStudentRegister() {

  //   var url = buildPath("api/userSignUp");

  //   const json = {
  //       organizationEmail: email,
  //       tokenEnteredByOrg: verificationCode
  //   };

  //   console.log(json);

  //   try {
  //       const response = await fetch(url, {
  //       method: "POST",
  //       body: JSON.stringify(json),
  //       headers: {"Content-Type": "application/json"},
  //     });

  //     let res = JSON.parse(await response.text());
  //     console.log(res);
  //     console.log(response);
  //     if(res.success) {
  //       setMessage("Correct code, please login");
  //     } else if(!res.success) {
  //       setMessage("*Incorrect verification code, please enter again");
  //     } else {
  //       setMessage("*Error occured");
  //     }

  //   } catch(e) {
  //     console.log("oopsies");
  //     setMessage("*Error occured, email not found");
  //   }

  // }

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  const handleVolunteerSignUp = async () => {
    console.log("here in this function");
    var url = buildPath("api/userSignUp");

    if (!isValidEmail(volEmail)) {
      setMessage("Invalid email address");
    } else {
      var json = {
        firstName: volFirstName,
        lastName: volLastName,
        email: volEmail,
        password: volPass,
        totalVolunteerHours: 0
      };

      console.log(json);

      try {
        const response = await fetch(url, {
          method: "POST",
          body: JSON.stringify(json),
          headers: {"Content-Type": "application/json"},
        });
          // let res = JSON.parse(await response.text());
          // console.log(res);
          console.log(response.status);
          if(response.status === 409 ) {
            setMessage("User already exists");
          }
      } catch(e) {
        console.log("volunteer registration api failed");
      }
    }


  };


  const handleSubmit = (userType) => {
    setMessage("");
    console.log(userType)
    if(userType == "volunteer") {
      console.log(volFirstName);
      console.log(volLastName);
      console.log(volEmail);
      console.log(volPass);
      console.log(volConfirmPass);

      handleVolunteerSignUp();


    } else if(userType == "organization") {
      console.log(orgName);
      console.log(orgEmail);
      console.log(orgPass);
      console.log(orgConfirmPassword);
    }
    // console.log(formData); // Access the form data directly
    // console.log(OrgformData.name);


  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Typography component="h1" variant="h5" sx={{ paddingBottom: 2 }}>
          Create an Account
        </Typography>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} centered indicatorColor="secondary" textColor="secondary">
              <Tab label="Volunteer" value="1" />
              <Tab label="Organization" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1"><VolunteerForm setName={setVolFirstName} name={volFirstName} volLastName={volLastName} setVolLastName={setVolLastName} volEmail={volEmail} setVolEmail={setVolEmail} volPass={volPass} setVolPass={setVolPass} volConfirmPass={volConfirmPass} setVolConfirmPass={setVolConfirmPass} onSubmit={handleFormSubmit} /></TabPanel>
          <TabPanel value="2"><OrganizationForm orgName={orgName} setOrgName={setOrgName} orgEmail={orgEmail} setOrgEmail={setOrgEmail} orgPass={orgPass} setOrgPass={setOrgPass} orgConfirmPassword={orgConfirmPassword} setOrgConfirmPassword={setOrgConfirmPassword} onSubmit={handleFormSubmit} /></TabPanel>
        </TabContext>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{
            mt: 3,
            mb: 2,
            bgcolor: '#3E283E',
            textColor: '#FFFFFF',
            ":hover": { bgcolor: '#593959' },
          }}
          onClick={() => handleSubmit(value === "1" ? "volunteer" : "organization")}
        >
          Sign Up
        </Button>
        {message}
        <Grid container justifyContent="center">
          <Grid item>
            <Link href="#" variant="body2" sx={{ color: '#4E878C' }}>
              Already have an account? Sign in
            </Link>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
}

