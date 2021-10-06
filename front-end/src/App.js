import logo from './logo5.jpg';
import MTable from './components/MTable'
import React from 'react';
import './App.css';
import Navbar from './components';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './components/metamask';
const {default: UserForm} = require('./components/UserForm')





function App() {
  

  return (
    
    <div className="Navbar">
      <Router>
      <Navbar />
      <Route path="/startcampaign" component={UserForm} />
    </Router>

    <div className="Campaigns">
    <MTable />
    </div>
      
      
    </div>
  );
}

export default App;
