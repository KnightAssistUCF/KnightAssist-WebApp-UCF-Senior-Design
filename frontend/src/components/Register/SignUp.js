import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import React, {useState, useEffect} from "react";
import VolunteerForm from './VolunteerForm';
import OrganizationForm from './OrganizationForm';
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from '@mui/lab/TabPanel';
import { buildPath } from '../../path';
import Alert from '@mui/material/Alert';

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
  const [alertMessage, setAlertMessage] = useState("");
  const [isEmpty, setIsEmpty] = useState(false);
  const [volMessage, setVolMessage] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const setVolMessageField = (field, message) => {
    setVolMessage((prevState) => ({
      ...prevState,
      [field]: message,
    }));
  };
  const [orgMessage, setOrgMessage] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const setOrgMessageField = (field, message) => {
    setOrgMessage((prevState) => ({
      ...prevState,
      [field]: message,
    }));
  };
  const [isOrgError, setIsOrgError] = useState({
    name: false,
    email: false,
    password: false,
    confirmPassword: false
  });
  const setOrgErrorField = (field, message) => {
    setIsOrgError((prevState) => ({
      ...prevState,
      [field]: message,
    }));
  };
  const [isVolError, setIsVolError] = useState({
    firstName: false,
    lastName: false,
    email: false,
    password: false,
    confirmPassword: false
  });
  const setVolErrorField = (field, message) => {
    setIsVolError((prevState) => ({
      ...prevState,
      [field]: message,
    }));
  };


  const [OrgformData, setOrgFormData] = React.useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setAlertMessage("");
    // empty all input fields
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

  function validateFields(user) {
    if(user.includes("volunteer")) {
      if(volFirstName.trim() === '') {
        setVolMessageField("firstName", "first name empty");
        setVolErrorField("firstName", true);
      } else {
        setVolMessageField("firstName", "");
        setVolErrorField("firstName", false);
      }
      if(volLastName.trim() === '') {
        setVolMessageField("lastName", "last name empty");
        setVolErrorField("lastName", true);
      } else {
        setVolMessageField("lastName", "");
        setVolErrorField("lastName", false);
      }
      if(volEmail.trim() === '') {
        setVolMessageField("email", "email empty");
        setVolErrorField("email", true);
      } else {
        setVolMessageField("email", "");
        if (!isValidEmail(volEmail)) {
          setVolMessageField("email", "Invalid email");
          setVolErrorField("email", true);
        } else {
          setVolErrorField("email", false);
          setVolMessageField("email", "");
        }
      }
      if(volPass.trim() === '') {
        setVolMessageField("password", "password empty");
        setVolErrorField("password", true);
      } else {
        setVolMessageField("password", "");
        setVolErrorField("password", false);
      }
      if(volConfirmPass.trim() === '') {
        setVolMessageField("confirmPassword", "confirm password empty");
        setVolErrorField("confirmPassword", true);
      } else {
        setVolMessageField("confirmPassword", "");
        setVolErrorField("confirmPassword", false);
      }
      if(volConfirmPass.trim() != '' && volPass.trim() != '') {
        if(volPass != volConfirmPass) {
          console.log("passwords don't match");
        }
      }
    } if(user.includes("organization")) {
        if(orgName.trim() === '') {
          setOrgMessageField("name", "name empty");
          setOrgErrorField("name", true);
        } else {
          setOrgMessageField("name", "");
          setOrgErrorField("name", false);
        }
        if(orgEmail.trim() === '') {
          setOrgMessageField("email", "email empty");
          setOrgErrorField("email", true);
        } else {
          setOrgMessageField("email", "");
          setOrgErrorField("email", false);
        }
        if(orgPass.trim() === '') {
          setOrgMessageField("password", "password empty");
          setOrgErrorField("password", true);
        } else {
          setOrgMessageField("password", "");
          setOrgErrorField("password", false);
        }
        if(orgConfirmPassword.trim() === '') {
          setOrgMessageField("confirmPassword", "confirm password empty");
          setOrgErrorField("confirmPassword", true);
        } else {
          setOrgMessageField("confirmPassword", "");
          setOrgErrorField("confirmPassword", false);
        }
    }
  }
  useEffect(() => {
    console.log(volMessage);
  }, [volMessage]);

  const handleVolunteerSignUp = async () => {
    validateFields("volunteer");
    var url = buildPath("api/userSignUp");
  
    if (!isValidEmail(volEmail)) {
      // setMessage("Invalid email address");
      setVolErrorField("email", true);
    } else {
  
      var json = {
        firstName: volFirstName,
        lastName: volLastName,
        email: volEmail,
        password: volPass,
        totalVolunteerHours: 0,
      };

      console.log(json);

      try {
        const response = await fetch(url, {
          method: "POST",
          body: JSON.stringify(json),
          headers: { "Content-Type": "application/json" },
        });

        console.log(response.status);
        if (response.status === 409) {
          setAlertMessage("User already exists");
        } else if (response.status === 200) {
          setAlertMessage("Registered successfully, please verify your email");
        }
      } catch (e) {
        console.log("volunteer registration api failed");
      }
      
    };
  };
  

  const handleOrgSignUp = async () => {
    validateFields("organization");
    var url = buildPath("api/organizationSignUp");

    if (!isValidEmail(orgEmail)) {
      // setMessage("Invalid email address");
      setVolErrorField("email", true);
    } else {
      setVolErrorField("email", false);
      var json = {
        name: orgName,
        password: orgPass,
        email: orgEmail,
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
            setAlertMessage("Organization already exists");
          } else if(response.status === 200) {
            setAlertMessage("Registered successfully, please verify your email")
          }
      } catch(e) {
        console.log("org registration api failed");
      }
    }


  };


  const handleSubmit = (userType) => {
    setAlertMessage("");
    if(userType == "volunteer") {

      handleVolunteerSignUp();


    } else if(userType == "organization") {

      handleOrgSignUp();
    }
    // console.log(formData); // Access the form data directly
    // console.log(OrgformData.name);


  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Typography component="h1" variant="h5" sx={{ paddingBottom: 2 }}>
          Create An Account
        </Typography>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider'}}>
            <TabList onChange={handleChange} centered indicatorColor="secondary" textColor="secondary">
              <Tab label="Volunteer" value="1" />
              <Tab label="Organization" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1"><VolunteerForm isEmpty={isEmpty} volMessage={volMessage} isVolError={isVolError} setName={setVolFirstName} name={volFirstName} volLastName={volLastName} setVolLastName={setVolLastName} volEmail={volEmail} setVolEmail={setVolEmail} volPass={volPass} setVolPass={setVolPass} volConfirmPass={volConfirmPass} setVolConfirmPass={setVolConfirmPass} onSubmit={handleFormSubmit} /></TabPanel>
          <TabPanel value="2"><OrganizationForm orgName={orgName} orgMessage={orgMessage} isOrgError={isOrgError} setOrgName={setOrgName} orgEmail={orgEmail} setOrgEmail={setOrgEmail} orgPass={orgPass} setOrgPass={setOrgPass} orgConfirmPassword={orgConfirmPassword} setOrgConfirmPassword={setOrgConfirmPassword} onSubmit={handleFormSubmit} /></TabPanel>
        </TabContext>
        {(!(alertMessage.trim().length === 0) && (!alertMessage.includes("successfully"))) ? <Alert severity="error">{alertMessage}</Alert> : null}
        {((alertMessage != undefined) && (alertMessage.includes("successfully"))) ? <Alert severity="success">{alertMessage}</Alert> : null}
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
        <Grid container justifyContent="center">
          <Grid item>
            <Link href="#/login" variant="body2" sx={{ color: '#4E878C' }}>
              Already have an account? Sign in
            </Link>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
}

