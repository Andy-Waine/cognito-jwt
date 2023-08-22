import React, { useState } from "react";
import { CognitoJwtVerifier } from "aws-jwt-verify";
import bootstrap from 'bootstrap/dist/css/bootstrap.min.css';

const WebTokenVerif = () => {
  let url = new URL(window.location);

  // Verifier that expects valid access tokens:
  const verifier = CognitoJwtVerifier.create({
    userPoolId: "us-west-2_vMll0b3wG",
    tokenUse: "access",
    clientId: "v9ob7dgk1kv9m9i2g3c9pim06",
  });

  const parseHash = (hashstring) => {
    const o = {}
    hashstring = hashstring.substring(1)
    console.log("Full hash string: " + hashstring)
    let parts = hashstring.split("&")
    if (parts.length > 0) {
      parts.forEach((part) => {
        let keyval = part.split('=') 
        console.log("Key of keyval is " + keyval[0] + " and val is " + keyval[1])
        if (
          keyval[0] == "id_token" ||
          keyval[0] == "access_token"
          ) {
            o[keyval[0]] = {}
            let jwtparts = keyval[1].split(".")
            o[keyval[0]].header = window.atob(jwtparts[0])
            o[keyval[0]].payload = window.atob(jwtparts[1])
            o[keyval[0]].signature = jwtparts[2]
          } else {
            o[keyval[0]] = keyval[1]
          }
        if (keyval[0] == "access_token") {
          const formattedJWT = keyval[1];

          console.log("Formatted JWT: ", formattedJWT)
          try {
            const payload = verifier.verify(formattedJWT).then (payload => {
              if (payload.username) {
                document.getElementById("validationStatus").innerHTML = "Success | Validated by AWS Cognito"
                console.log("Token is valid. Payload:", payload);
              } else {
                document.getElementById("validationStatus").innerHTML = "Failure | Deemed Invalid by AWS Cognito"
                console.log("Token is not a valid entry!");
              }
            }).catch (err => {
              console.log("Token is not a valid entry! Error: ", err);
            })
            console.log("Token is valid. Payload:", payload);
          } catch {
            console.log("Token not valid!");
          }
        }
      })
    }
    return o
  }

  let keyvals = parseHash(url.hash);

  var footstring = ""
  if (keyvals.id_token) {
    footstring = "ID payload: " + keyvals.id_token.payload
  } else {
    footstring = "No ID token found"
    setTimeout(() => {
      document.getElementById("validationStatus").innerHTML = "Failure | No JWT Provided by AWS Cognito"
    }, 10);
  }

  return (
    <div style={{display: "flex", justifyContent:"center"}} className="row">
      <div className="row">
        <form style={{width: "410px", padding: "15px", backgroundColor: "#f5f5f5", borderRadius: "8px", boxShadow: "2px 2px 8px #888888"}}>
            <h1 style={{margin: "0"}}>Login</h1>
            <div className="row" style={{paddingTop: "10px"}}>
              <b>Clicking the 'Login' button below will take you to an external login.</b>
            </div>
            <div style={{paddingTop: "10px"}}>
              <button type="submit"><a href="https://awainetest.auth.us-west-2.amazoncognito.com/oauth2/authorize?client_id=v9ob7dgk1kv9m9i2g3c9pim06&response_type=token&scope=email+openid&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2F">Login</a></button>
            </div>
        </form>
      </div>
      <div className="row" style={{paddingTop: "25px"}}>
        <div style={{width: "410px", padding: "15px", backgroundColor: "#f5f5f5", borderRadius: "8px", boxShadow: "2px 2px 8px #888888", wordWrap: "break-word"}}>
          <h1 style={{margin: "0"}}>JWT</h1>
          <div className="row" style={{paddingTop: "10px"}}>
            <b>Status: </b><span id="validationStatus"></span>
          </div>
        </div>
      </div>
      <div className="row" style={{paddingTop: "25px"}}>
        <div style={{width: "610px", padding: "15px", backgroundColor: "#f5f5f5", borderRadius: "8px", boxShadow: "2px 2px 8px #888888", wordWrap: "break-word"}}>
          <h1 style={{margin: "0"}}>ID Payload</h1>
          <div className="row" style={{paddingTop: "10px"}}>
            <b>{ footstring }</b>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebTokenVerif;