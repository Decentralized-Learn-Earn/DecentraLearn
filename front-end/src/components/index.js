import React from 'react'
import {Nav, NavLink, Bars, NavMenu, NavBtn, NavBtnLink } from './navBarElements'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import OnboardingButton from './metamask'
import StartCampaign from './UserForm';
import logo from './logoNav.jpg';
import '../../src/App.css'

//rafce + enter creates a template

const Navbar = () => {
    
    return (
        <>
        <Nav>
            <NavLink to="/" >
            <img src={logo} alt="HTML5 Icon" width="130" height="90"></img>
            </NavLink>
            <Bars />
            <NavMenu> 
                <div>
                <a href="https://github.com/Decentralized-Learn-Earn/DecentraLearn">GitHub</a>
                </div>
               
                <NavLink to="/startcampaign" activeStyle>
                    Create Campaign 
                </NavLink>
                
                <NavLink to="/Donate" activeStyle>
                    Donate
                </NavLink>
            </NavMenu>
            <NavBtn>
                
                <Router>
        <OnboardingButton/>
      </Router>
            </NavBtn>
        </Nav>
            
        </>
    );
}

export default Navbar
