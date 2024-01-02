import React, { useState } from "react";
import './Login.css';
import ForgotPasswordModal from "./ForgotPasswordModal";

function LoginComponents(){

    console.log("Test");

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isInvalid, setIsInvalid] = useState("");

	const [openForgotPwd, setOpenForgotPwd] = useState(false);

    function buildPath(route) {
		if (process.env.NODE_ENV === 'production') {
			return 'https://knightassist-43ab3aeaada9.herokuapp.com/' + route;
            
		}
		else {        
			return 'http://localhost:8000/' + route;
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

            if(res.user.role == "organization") {

				url = buildPath(`api/checkIfEmailWasVerified_Organization?email=${res.user.email}`);

				response = await fetch(url, {
					method: "GET",
					headers: {"Content-Type": "application/json"},
				});
			
				const verifyRes = JSON.parse(await response.text());

				if(verifyRes.emailVerifiedStatus){
					localStorage.setItem("token", res.token);
					localStorage.setItem("ID", res.user._id);
					
					window.location.href="/#/orghome"
					setIsInvalid("");
				}else{
					setIsInvalid("is-invalid");
				}
            }else if(res.user.role == "student") {
				url = buildPath(`api/checkIfEmailWasVerified_Volunteer?email=${res.user.email}`);

				response = await fetch(url, {
					method: "GET",
					headers: {"Content-Type": "application/json"},
				});
			
				const verifyRes = JSON.parse(await response.text());

				if(verifyRes.emailVerifiedStatus){
					localStorage.setItem("token", res.token);
					localStorage.setItem("ID", res.user._id);
					
					window.location.href="/#/studenthomepage"
					setIsInvalid("");
				}else{
					setIsInvalid("is-invalid");
				}
            }else{
				// user is an admin
			}
            
        } catch (e) {
            console.log(e.toString());
            setIsInvalid("is-invalid");
        }
    }

    function onRegister(){
        // Perhaps modal appears asking if you want to 
        // register as a volunteer or org
    }

    function Copyright(){
        return (
            <h5 className="center copyright">Copyright © 2023 by KnightAssist Senior Design Group.</h5>
        )
    }

    function Email(){
        return (
            <div className="input-group mb-3">
                <input type="text" className={"emailBox form-control " + isInvalid} placeholder="Email" onChange={(d) => setEmail(d.target.value)} value={email}></input>
            </div>
        )
    }

    function Password(){
        return (
            <div className="input-group mb-3">
                <input type="password" className={"passwordBox form-control " + isInvalid} placeholder="Password" onChange={(d) => setPassword(d.target.value)} value={password}></input>
            </div>
        )
    }

    function Login(){
        return (
            <div className="center">
                <button type="button" className="loginButton btn btn-info" onClick={() => doLogin()}>Login</button>
            </div>
        )
    }

    function ForgotPassword(){
        return (
            <button className="forgotPWD" onClick={() => setOpenForgotPwd(true)}>forgot password</button>
        )
    }

    function Register(){
        return (
            <button className="register" onClick={() => onRegister()}>register</button>
        )
    }

    return (
        <div className="loginBox">
            {Email()}
            {Password()}
            <Login/>
            <div className="center">
                {ForgotPassword()}
                {Register()}
            </div>
            <Copyright/>
			<ForgotPasswordModal open={openForgotPwd} setOpen={setOpenForgotPwd}/>
        </div>
    )
}

export default LoginComponents; 