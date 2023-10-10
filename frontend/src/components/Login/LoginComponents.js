import React, { useState } from "react";
import { buildPath } from "../../path";

function LoginComponents(){

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isInvalid, setIsInvalid] = useState("");

    async function doLogin(){
        const json = {
                        email: email,
                        password: password
                     };

        console.log(json);

        const url = buildPath("api/Login");

        try {
            const response = await fetch(url, {
                method: "POST",
                body: JSON.stringify(json),
                headers: {"Content-Type": "application/json"},
            });
        
            let res = await response.text();

            console.log(res);

            // The credentials matched an existing account
            if(res.includes("User logged in successfully ->")){
                setIsInvalid("");
            }else{
                setIsInvalid("is-invalid");
            }
            
        } catch (e) {
            console.log(e.toString());
            return;
        }
    }

    function sendToForgotPassword(){
        // Send router to forgot password page
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
                <input type="text" className={"passwordBox form-control " + isInvalid} placeholder="Email" onChange={(d) => setEmail(d.target.value)} value={email}></input>
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
            <button className="forgotPWD">forgot password</button>
        )
    }

    function Register(){
        return (
            <button className="register">register</button>
        )
    }

    return (
        <div className="foo loginBox">
            {Email()}
            {Password()}
            <Login/>
            <div className="textUnderSubmit center">
                <ForgotPassword/>
                <Register/>
            </div>
            <Copyright/>
        </div>
    )
}

export default LoginComponents; 