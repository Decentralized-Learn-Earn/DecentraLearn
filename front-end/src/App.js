import logo from './logo5.jpg';

import React from 'react';
import './App.css';
import Navbar from './components';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './components/metamask';
const {onSubmit, onChange, form, error, default: StartCampaign} = require('./components/startCampaign')





function App() {
  

  return (
    
    <div className="Navbar">
      <Router>
      <Navbar />
      <Route path="/startcampaign" component={StartCampaign} />
    </Router>

    <div className="Wallet-connect">
      
    </div>
      
      <header className="App-header">
        
        <img src={logo} alt="HTML5 Icon" width="550" height="400"></img>
        
       
      </header>
    </div>
  );
}

export default App;
