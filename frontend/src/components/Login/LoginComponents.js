import React, { useState } from "react";

function LoginComponents(){

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function test(){
        console.log(email, password);
    }

    function Email(){
        return (
            <div className="input-group mb-3">
                <input type="text" className="emailBox form-control" placeholder="Email" onChange={(d) => setEmail(d.target.value)} value={email}></input>
            </div>
        )
    }

    function Password(){
        return (
            <div className="input-group mb-3">
                <input type="password" className="passwordBox form-control" placeholder="Password" onChange={(d) => setPassword(d.target.value)} value={password}></input>
            </div>
        )
    }

    function Login(){
        return (
            <div className="center">
                <button type="button" className="loginButton btn btn-info" onClick={() => test()}>Login</button>
            </div>
        )
    }

    function ForgotPassowrd(){
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
        <div className="loginBox">
            {Email()}
            {Password()}
            <Login/>
            <div className="textUnderSubmit center">
                <ForgotPassowrd/>
                <Register/>
            </div>
        </div>
    )
}

export default LoginComponents; 