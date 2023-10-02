import React from "react";

function LoginBox(){

    function Username(){
        return (
            <div class="input-group mb-3">
                <input type="text" className="usernameBox form-control" placeholder="Username"></input>
            </div>
        )
    }

    function Password(){
        return (
            <div class="input-group mb-3">
                <input type="text" className="passwordBox form-control" placeholder="Password"></input>
            </div>
        )
    }

    function Submit(){
        return (
            <div className="center">
                <button type="button" className="submitButton btn btn-info">Submit</button>
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
            <Username/>
            <Password/>
            <Submit/>
            <div className="center">
                <ForgotPassowrd/>
                <Register/>
            </div>
        </div>
    )
}

export default LoginBox; 