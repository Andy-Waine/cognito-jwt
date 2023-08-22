import React from 'react';
import './App.css';
import Signup from './components/Signup';
import Login from './components/Login';
import WebTokenVerif from './components/WebTokenVerif';
import bootstrap from 'bootstrap/dist/css/bootstrap.min.css';
import { BorderRight } from '@material-ui/icons';

const App = () => {
  return (
    <div className="row">
      <div className="col-6" style={{borderRight: "1px solid lightgrey"}}>
        <div><b>User Pool:</b> awainetest</div>
        <b>ID:</b> us-west-2_vMll0b3wG
        <div style={{marginTop: "120px", marginLeft: "60px"}}>
          <h4>"Internal" Validation</h4>
          <Signup />
          <Login />
        </div>
      </div>
      <div className="col-6">
        <div><b>User Pool:</b> awainetest</div>
        <b>ID:</b> us-west-2_vMll0b3wG
        <div style={{marginTop: "120px", marginLeft: "40px"}}>
          <h4>External Validation</h4>
          <WebTokenVerif />
        </div>
      </div>
    </div>
  );
}

export default App;
