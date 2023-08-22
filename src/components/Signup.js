import React, { useState } from "react";
import UserPool from "../UserPool";
import bootstrap from 'bootstrap/dist/css/bootstrap.min.css';

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onSubmit = (event) => {
        event.preventDefault();

        UserPool.signUp(email, password, [], null, (err, data) => {
            if (err) console.error(err);
            console.log(data);
        });
    };

    return (
        <div style={{display: "flex", marginBottom: "20px"}}>
            <form onSubmit={onSubmit}  style={{width: "410px", padding: "15px", backgroundColor: "#f5f5f5", borderRadius: "8px", boxShadow: "2px 2px 8px #888888"}}>
                <h1 style={{margin: "0"}}>Sign Up</h1>
                <div className="row"  style={{paddingTop: "10px"}}>
                    <label className="col-3" htmlFor="email">Email: </label>
                    <div className="col-9">
                      <input type="email" id="email" value={email} onChange={(event) => setEmail(event.target.value)} />
                    </div>
                </div>
                <div className="row"  style={{paddingTop: "10px"}}>
                    <label className="col-3" htmlFor="password">Password: </label>
                    <div className="col-9">
                      <input type="password" id="password" value={password} onChange={(event) => setPassword(event.target.value)} />
                    </div>
                </div>
                <div style={{paddingTop: "10px"}}>
                    <button type="submit">Sign Up</button>
                </div>
            </form>
        </div>
    );
};

export default Signup;