import React, { useState } from "react";
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import UserPool from "../UserPool";
import bootstrap from 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onSubmit = (event) => {
        event.preventDefault();

        const user = new CognitoUser({
            Username: email,
            Pool: UserPool
        });

        const authDetails = new AuthenticationDetails({
            Username: email,
            Password: password
        });

        user.authenticateUser(authDetails, {
            onSuccess: data => {
                console.log("onSuccess:", data);
            },
            onFailure: err => {
                console.error("onFailure:", err);
            },
            newPasswordRequired: data => {
                console.log("newPasswordRequired:", data);
            }
        });
    };

    return (
      <div style={{display: "flex",}}>
        <form onSubmit={onSubmit} style={{width: "410px", padding: "15px", backgroundColor: "#f5f5f5", borderRadius: "8px", boxShadow: "2px 2px 8px #888888"}}>
            <h1 style={{margin: "0"}}>Login</h1>
            <div className="row" style={{paddingTop: "10px"}}>
                <label className="col-3" htmlFor="email">Email: </label>
                <div className="col-9">
                  <input type="email" id="email" value={email} onChange={(event) => setEmail(event.target.value)} />
                </div>
            </div>
            <div className="row" style={{paddingTop: "10px"}}>
                <label className="col-3" htmlFor="password">Password: </label>
                <div className="col-9">
                  <input type="password" id="password" value={password} onChange={(event) => setPassword(event.target.value)} />
                </div>
            </div>
            <div style={{paddingTop: "10px"}}>
              <button type="submit">Login</button>
            </div>
        </form>
      </div>
    );
};

export default Login;