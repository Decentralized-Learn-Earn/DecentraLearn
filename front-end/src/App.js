import logo from './logo5.jpg';
import MTable from './components/MTable'
import React from 'react';
import './App.css';
import Navbar from './components';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './components/metamask';
import './components/Quiz';
import Quiz from './components/Quiz';
import { NavLink } from './components/navBarElements';

const {default: UserForm} = require('./components/UserForm')





function App() {
  

  return (
    <Router>
    <div className="Navbar">
      
      <Navbar />
      <Switch>
      <Route path="/startcampaign" component={UserForm} />
     
      </Switch>

    <div className="Campaigns">
 
    <Quiz/>
    <MTable/>
    
    </div>
     
      
    
    
      
      
      
    </div>
    </Router>
  );
}

export default App;
