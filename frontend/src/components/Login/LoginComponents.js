import React, { useEffect, useState } from "react";
import './Login.css';
import ForgotPasswordModal from "./ForgotPasswordModal";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import { AppSettingsAltRounded } from "@mui/icons-material";

function LoginComponents(props){

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isInvalid, setIsInvalid] = useState("");
	const [changeURL, setChangeURL] = useState(-1);
	const [firstLogin, setFirstLogin] = useState(undefined);
    const [showError, setShowError] = useState(false);

	// For bug fixing purposes so the user is sent to
	// the right route always
	const [loginClicked, setLoginClicked] = useState(false);

	const [openForgotPwd, setOpenForgotPwd] = useState(false);

    function buildPath(route) {
		if (process.env.NODE_ENV === 'production') {
			return 'https://knightassist-43ab3aeaada9.herokuapp.com/' + route;
		}
		else {        
			return 'http://localhost:8000/' + route;
		}
	}

	const handleKeyPress = async (event) => {
		if(event.key === 'Enter'){
			await doLogin();
		}
	}

    async function doLogin(){
        let json = {
                        email: email,
                        password: password
                     };

        console.log(json);

        let url = buildPath("api/Login");

        try {
            let response = await fetch(url, {
                method: "POST",
                body: JSON.stringify(json),
                headers: {"Content-Type": "application/json"},
            });
        
            let res = JSON.parse(await response.text());

            console.log(res);

            if(res.user?.role == "organization") {

				url = buildPath(`api/checkIfEmailWasVerified_Organization?email=${res.user.email}`);

				response = await fetch(url, {
					method: "GET",
					headers: {"Content-Type": "application/json"},
				});
			
				const verifyRes = JSON.parse(await response.text());

				if(verifyRes.emailVerifiedStatus){
					sessionStorage.setItem("token", res.token);
					sessionStorage.setItem("ID", res.user._id);
					sessionStorage.setItem("role", "organization");
					
					props.setRole("organization");
					console.log(res.user);
					setFirstLogin(res.user.firstTimeLogin);
					setChangeURL(changeURL * -1);
					setLoginClicked(true);

					setIsInvalid("");
				}else{
					setIsInvalid("is-invalid");
				}
            }else if(res.user?.role == "student") {
				url = buildPath(`api/checkIfEmailWasVerified_Volunteer?email=${res.user.email}`);

				response = await fetch(url, {
					method: "GET",
					headers: {"Content-Type": "application/json"},
				});
			
				const verifyRes = JSON.parse(await response.text());

				if(verifyRes.emailVerifiedStatus){
					sessionStorage.setItem("token", res.token);
					sessionStorage.setItem("ID", res.user._id);
					sessionStorage.setItem("role", "volunteer");
					
					props.setRole("volunteer");
					setFirstLogin(res.user.firstTimeLogin);
					setChangeURL(changeURL * -1);
					setLoginClicked(true);

					setIsInvalid("");
				}else{
					setIsInvalid("is-invalid");
				}
            }else{
				// user is an admin
                sessionStorage.setItem("token", res.token);
                sessionStorage.setItem("ID", res.adminUser._id);
                sessionStorage.setItem("role", "admin");
          
                props.setRole("admin");
                console.log(res.adminUser);
                setFirstLogin(res.adminUser.firstTimeLogin);
                setChangeURL((prevChangeURL) => prevChangeURL * -1);
                setLoginClicked(true);
          
                setIsInvalid("");
			}
        } catch (e) {
            console.log(e.toString());
			setShowError(true);
            setIsInvalid("is-invalid");
        }

        validInput();
    }

    function onRegister(){
        window.location.href="/#/register"
    }

    function Email(){
        return (
            <div className="input-group mb-3">
                <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    error={isInvalid}
                    value={email}
                    onChange={(d) => setEmail(d.target.value)}
                />
                {/*<input type="text" className={"emailBox form-control " + isInvalid} placeholder="Email" onChange={(d) => setEmail(d.target.value)} value={email}></input>*/}
            </div>
        )
    }

    function Password(){
        return (
            <div className="input-group mb-3">
                <TextField
                    required
                    fullWidth
                    id="password"
                    label="Password"
                    name="password"
                    type="password"
                    autoComplete="password"
                    error={isInvalid}
                    value={password}
                    onChange={(d) => setPassword(d.target.value)}
                />
                {/*<input type="password" className={"passwordBox form-control " + isInvalid} placeholder="Password" onChange={(d) => setPassword(d.target.value)} value={password}></input>*/}
            </div>
        )
    }

    function Login(){
        return (
            <div className="center">
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
                    onClick={() => doLogin()}
                    >
                    Login
                </Button>
                {/* <button type="button" className="loginButton btn btn-info" onClick={() => doLogin()}>Login</button> */}
            </div>
        )
    }

    function ForgotPassword(){
        return (   
        <>
            <Link variant="body2" sx={{ color: '#4E878C', cursor: 'pointer' }} onClick={() => setOpenForgotPwd(true)}> Forgot password? </Link>
            {/* <button className="forgotPWD" onClick={() => setOpenForgotPwd(true)}>forgot password</button> */}
        </>
        )
    }

    function validInput(){
        if(email === "" || password === "" || isInvalid === "is-invalid"){
            setShowError(true);
            return false;
        }

        return true;
    }

    function AlertMessage(){
        return (
            <div>
                {(showError) === true ? <Alert severity="error">Incorrect email/password</Alert> : null}
            </div>
        )
    }

	useEffect(() => {
		if(loginClicked){
			if(sessionStorage.getItem("role") === "organization"){
				if(firstLogin){
					window.location.href="/#/postverifyquestions"
				}else{
					window.location.href="/#/orghome"
				}
			}else if(sessionStorage.getItem("role") === "volunteer"){
				if(firstLogin){
					window.location.href="/#/postverifyquestions"
				}else{
					window.location.href="/#/studenthomepage";
				}
			}else{
				window.location.href="/#/adminhome"
			}
		}
		
		setLoginClicked(false);
		
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [changeURL])

    return (
        <div className="loginBox" onKeyPress={handleKeyPress}>
            {Email()}
            {Password()}
            <AlertMessage />
            <Login/>
            <div className="center">
                {ForgotPassword()}
                {/* {Register()} */}
            </div>
            {/*<Modal
                open={openForgotPwd}
                setOpen={setOpenForgotPwd}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                close={handleClose}
                <Box sx={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400,
                    bgcolor: 'background.paper', border: '2px solid #000', boxShadow: 24, p: 4,}}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Text in a modal
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                    </Typography>
                </Box>
            </Modal>*/}
			<ForgotPasswordModal open={openForgotPwd} setOpen={setOpenForgotPwd}/>
        </div>
    )
}

export default LoginComponents; 