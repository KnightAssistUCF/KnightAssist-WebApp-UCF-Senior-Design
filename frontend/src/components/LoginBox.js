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

    return (
        <div className="loginBox card">
            <div class="card-body">
                <Username/>
                <Password/>
                <Submit/>
            </div>
        </div>
    )
}

export default LoginBox; 