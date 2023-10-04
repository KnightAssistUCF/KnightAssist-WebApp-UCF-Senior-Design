import React from "react";

function LoginBox(){

    function Email(){
        return (
            <div class="input-group mb-3">
                <input type="text" className="emailBox form-control" placeholder="Email"></input>
            </div>
        )
    }

    function Password(){
        return (
            <div class="input-group mb-3">
                <input type="password" className="passwordBox form-control" placeholder="Password"></input>
            </div>
        )
    }

    function Login(){
        return (
            <div className="center">
                <button type="button" className="loginButton btn btn-info">Login</button>
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
            <Email/>
            <Password/>
            <Login/>
            <div className="textUnderSubmit center">
                <ForgotPassowrd/>
                <Register/>
            </div>
        </div>
    )
}

export default LoginBox; 