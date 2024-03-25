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


export default function SignUp() {
  const [value, setValue] = useState("1");
  const [formData, setFormData] = React.useState({});
  const [volFirstName, setVolFirstName] = useState("");
  const [volLastName, setVolLastName] = useState("");
  const [volEmail, setVolEmail] = useState("");
  const [volPass, setVolPass] = useState("");
  const [volConfirmPass, setVolConfirmPass] = useState("");
  const [volTermsAccepted, setVolTermsAccepted] = useState(false);
  const [orgName, setOrgName] = useState("");
  const [orgEmail, setOrgEmail] = useState("");
  const [orgPass, setOrgPass] = useState("");
  const [orgConfirmPassword, setOrgConfirmPassword] = useState("");
  const [orgTermsAccepted, setOrgTermsAccepted] = useState(false);
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

  const [terms, setTerms] = useState("");

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
    confirmPassword: false,
	terms: false
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
    confirmPassword: false,
	terms: false
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

  const handleKeyPress = async (event) => {
	if(event.key === 'Enter'){
		await handleSubmit(value === "1" ? "volunteer" : "organization")	
	}
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setAlertMessage("");
  };

  const handleFormSubmit = (data) => {
    console.log("I am here!");
    console.log(data);
    setFormData(data);
  };


  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function passwordStrengthChecker(userPassword) {
    const minLength = 8;
    // Regular expressions to check for different character types
    const hasUppercase = /[A-Z]/.test(userPassword);
    const hasLowercase = /[a-z]/.test(userPassword);
    const hasNumber = /[0-9]/.test(userPassword);
    const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(userPassword);

    // Check if all criteria are met
    const isPasswordWeak =
      userPassword.length >= minLength &&
      hasUppercase &&
      hasLowercase &&
      hasNumber &&
      hasSymbol;

    return isPasswordWeak;
  }

  function validateFields(user) {
    var isValid = true;
    if(user.includes("volunteer")) {
      if(volFirstName == '') {
        setVolMessageField("firstName", "First name field is empty");
        setVolErrorField("firstName", true);
        isValid = false;
      } else {
        setVolMessageField("firstName", "");
        setVolErrorField("firstName", false);
      }
      if(volLastName.trim() === '') {
        setVolMessageField("lastName", "Last name field is empty");
        setVolErrorField("lastName", true);
        isValid = false;
      } else {
        setVolMessageField("lastName", "");
        setVolErrorField("lastName", false);
      }
      if(volEmail.trim() === '') {
        setVolMessageField("email", "Email field is empty");
        setVolErrorField("email", true);
        isValid = false;
      } else {
        setVolMessageField("email", "");
        if (!isValidEmail(volEmail)) {
          setVolMessageField("email", "Invalid email");
          setVolErrorField("email", true);
          isValid = false;
        } else {
          setVolErrorField("email", false);
          setVolMessageField("email", "");
        }
      }
      if(volPass.trim() === '') {
        setVolMessageField("password", "Password field is empty");
        setVolErrorField("password", true);
        isValid = false;
      } else {
        
          setVolMessageField("password", "");
          setVolErrorField("password", false);
        
      }
      if(volConfirmPass.trim() === '') {
        setVolMessageField("confirmPassword", "Confirm password field is empty");
        setVolErrorField("confirmPassword", true);
        isValid = false;
      } else {
        setVolMessageField("confirmPassword", "");
        setVolErrorField("confirmPassword", false);
      }
	  if(!volTermsAccepted){
		isValid = false;
        setVolErrorField("terms", true);
	  }else{
		setVolErrorField("terms", false);
	  }
    } if(user.includes("organization")) {
        if(orgName.trim() === '') {
          setOrgMessageField("name", "Name field is empty");
          setOrgErrorField("name", true);
          isValid = false;
        } else {
          setOrgMessageField("name", "");
          setOrgErrorField("name", false);
        }
        if(orgEmail.trim() === '') {
          setOrgMessageField("email", "Email field is empty");
          setOrgErrorField("email", true);
          isValid = false;
        } else {
          setOrgMessageField("email", "");
          if (!isValidEmail(orgEmail)) {
            setOrgMessageField("email", "Invalid email");
            setOrgErrorField("email", true);
            isValid = false;
          } else {
            setOrgErrorField("email", false);
            setOrgMessageField("email", "");
          }
        }
        if(orgPass.trim() === '') {
          setOrgMessageField("password", "Password field is empty");
          setOrgErrorField("password", true);
          isValid = false;
        } else {
          setOrgMessageField("password", "");
          setOrgErrorField("password", false);
        }
        if(orgConfirmPassword.trim() === '') {
          setOrgMessageField("confirmPassword", "Confirm password field is empty");
          setOrgErrorField("confirmPassword", true);
          isValid = false;
        } else {
          setOrgMessageField("confirmPassword", "");
          setOrgErrorField("confirmPassword", false);
        }
		if(!orgTermsAccepted){
			isValid = false;
			setOrgErrorField("terms", true);
		}else{
			setOrgErrorField("terms", false);
		}
	}
    return isValid;
  }

  useEffect(() => {
    console.log(volMessage);
  }, [volMessage]);

  const handleVolunteerSignUp = async () => {
    var isEmpty = validateFields("volunteer");
    var url = buildPath("api/userSignUp");
    var isPasswordWeak = passwordStrengthChecker(volPass);
    console.log(isPasswordWeak);
  
    if (!isValidEmail(volEmail)) {
      // setMessage("Invalid email address");
      setVolErrorField("email", true);
    } else if(volPass != volConfirmPass) {
      setAlertMessage("Passwords do not match")
    } else if(!isEmpty) {
      setAlertMessage("Please fill out the empty fields")
    }else if(!isPasswordWeak) {
      setAlertMessage("Weak password. Password must:\n\n- Be at least 8 characters long\n- Include at least one uppercase letter\n- Include at least one lowercase letter\n- Include at least one number\n- Include at least one symbol");

    } else {
  
      var json = {
        firstName: volFirstName,
        lastName: volLastName,
        email: volEmail.toLowerCase(),
        password: volPass,
        totalVolunteerHours: 0,
      };

      console.log(json);
      console.log("attempting volunteer sign up");
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
    var isValid = validateFields("organization");
    var url = buildPath("api/organizationSignUp");
    var isPasswordWeak = passwordStrengthChecker(orgPass);

    if (!isValidEmail(orgEmail)) {
      // setMessage("Invalid email address");
      setVolErrorField("email", true);
    } else if(orgPass != orgConfirmPassword) {
      setAlertMessage("Passwords do not match")
    }else if(!isValid) {
      setAlertMessage("Please fill out the empty fields")
    }else if(!isPasswordWeak) {
      setAlertMessage("Weak password. Password must:\n\n- Be at least 8 characters long\n- Include at least one uppercase letter\n- Include at least one lowercase letter\n- Include at least one number\n- Include at least one symbol");
    }  else {
      setVolErrorField("email", false);
      var json = {
        name: orgName,
        password: orgPass,
        email: orgEmail.toLowerCase(),
      };

      console.log(json);
      console.log("attempting org sign up");
      try {
        const response = await fetch(url, {
          method: "POST",
          body: JSON.stringify(json),
          headers: {"Content-Type": "application/json"},
        });
          console.log(response.status);
          if(response.status === 409 ) {
            setAlertMessage("Organization already exists");
          } else if(response.status === 200) {
            setAlertMessage("Registered successfully, please verify your email")
          } else if(response.status === 503) {
            setAlertMessage("Failed to create organization")
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

  function TermsAndConditions(){
	return (
		<div>
			<p>
				<b>KnightAssist</b> is an <b>open-source</b> application available under Copyright (MIT License). The application in both its mobile and web versions uses data from both students and organizations at the <b>University of Central Florida (UCF)</b>. 
				The data collection starts from a voluntary registration on the platform by either student users or organization users considering that we <b>do not directly interact with the UCF databases</b> to obtain the information and data needed for the functioning of KnightAssist.
				The basic information we require upon sign up consists in the following:
			</p>
			<ul>
				<li>For users: first name, last name, username, email, password, alongside additional preference data.</li>
				<li>For organizations: organization name, username, email, password, alongside additional preference data.</li>
			</ul>
			<p>
				While most of the data we store and manipulate contains private information and IDs generated by us, we note that we <b>do
				not request data relevant to UCF including UCF ID, UCF NID, SSN, etc</b>. Regardless, the type of information we store still raises privacy concerns, which requires the encryption of
				this information to increase the security of the services our platform provides and insure the privacy of user and organization data. We implemented security measures 
				to have secure login, encrypted and safe data storage and account management. After conducting several tests, we can attest to the robustness of our approach to security 
				and privacy maintenance. Nevertheless, we are considering incorporating additional security measures including two-factor authentication, and even the usage of UCF’s SSO system if approval for that is granted.
			</p>
			<p>
				Considering the scope of our project, the intended goals from it, and the limitations that KnightAssist currently has, we are unable to allow users to fully customize 
				their accounts freely. We would have wanted to allow users from different backgrounds to use our application, however, we are <b>restricting access to UCF students, personnel, 
				and organizations</b>. Thus, by making this clear in our policies, licenses, and functionalities, we are ensuring that our data handling is efficient for UCF related entities. 
				Moreover, our development decisions were set to avoid any discrimination of any type, and our users can be of any gender and background. 
			</p>
			<p>
				We will explicitly include in our web and mobile apps privacy, ethics, and legal statements that the user will need to agree with. These will highlight the <b>data we collect, how it is used, what to expect from our application and services, 
				and we will prompt the user for their consent and retain it for our records</b>. Additionally, we will have routine evaluations to assess accounts using our app to control and survey any potential misuses of our app, and we <b>will ensure penalties for any 
				user or organization that will use KnightAssist for any unethical behaviors</b> that are essentially any behaviors that do not align with the purposes our app was built for initially. Moreover, we plan to provide admin accounts for any official UCF entity requesting to assess user and organization conduct through KnightAssist. 
			</p>
			<p>
				In summary, user and organization data will <b>not be used without permission</b>, and the data obtained will be stored and manipulated securely in our databases and processes. Information that we use for analysis, recommendation, and better user experiences will be <b>anonymized</b> to protect the 
				privacy of our users and retain their trust in us. Furthermore, as part of our mission and development we will allow users to <b>fully control the type and frequency of communications and notifications they receive</b>, and we will attempt to make our application as accessible as possible for the wider population of users.
			</p>
		</div>
	)
	}

	useEffect(() => {
		setTerms(TermsAndConditions());
	}, []);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs" onKeyPress={handleKeyPress}>
        <CssBaseline />
        <Typography component="h1" variant="h4" sx={{ paddingBottom: 2 }}>
          Create an Account
        </Typography>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider'}}>
            <TabList onChange={handleChange} centered indicatorColor="secondary" textColor="secondary">
              <Tab label="Volunteer" value="1" />
              <Tab label="Organization" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1"><VolunteerForm terms={terms} termsAccepted={volTermsAccepted} setTermsAccepted={setVolTermsAccepted} isEmpty={isEmpty} volMessage={volMessage} isVolError={isVolError} setName={setVolFirstName} name={volFirstName} volLastName={volLastName} setVolLastName={setVolLastName} volEmail={volEmail} setVolEmail={setVolEmail} volPass={volPass} setVolPass={setVolPass} volConfirmPass={volConfirmPass} setVolConfirmPass={setVolConfirmPass} onSubmit={handleFormSubmit} /></TabPanel>
          <TabPanel value="2"><OrganizationForm terms={terms} termsAccepted={orgTermsAccepted} setTermsAccepted={setOrgTermsAccepted} orgName={orgName} orgMessage={orgMessage} isOrgError={isOrgError} setOrgName={setOrgName} orgEmail={orgEmail} setOrgEmail={setOrgEmail} orgPass={orgPass} setOrgPass={setOrgPass} orgConfirmPassword={orgConfirmPassword} setOrgConfirmPassword={setOrgConfirmPassword} onSubmit={handleFormSubmit} /></TabPanel>
        </TabContext>
        {(!(alertMessage.trim().length === 0) && (!alertMessage.includes("successfully"))) ? <Box whiteSpace="pre-line" sx={{ textAlign: 'left' }}><Alert severity="error">{alertMessage}</Alert></Box> : null}
        {((alertMessage != undefined) && (alertMessage.includes("successfully"))) ? <Alert severity="success">{alertMessage}</Alert> : null}
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{
            maxWidth: 350,
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

