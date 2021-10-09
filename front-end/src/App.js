import logo from './logo5.jpg';
import MTable from './components/MTable'
import React from 'react';
import './App.css';
import Navbar from './components';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import './components/metamask';




const {default: UserForm} = require('./components/UserForm')
const {default: Quiz} = require('./components/Quiz')




function App() {
  

  return (
    <Router>
    <div className="Navbar">
      
      <Navbar />
      <Switch>
      
      
      </Switch>

    <div className="Campaigns">
    <Switch>
    <Route path="/uniswapbutton" component={Quiz} />
    <Route path="/startcampaign" component={UserForm} />
    </Switch>
    <MTable/>
    
    </div>
     
      
    
    
      
      
      
    </div>
    </Router>
  );
}

export default App;
