import React from 'react'
import {Nav, NavLink, Bars, NavMenu, NavBtn, NavBtnLink } from './navBarElements'
import {BrowserRouter as Router, Route} from 'react-router-dom';
import OnboardingButton from './metamask'
import StartCampaign from './UserForm';
import logo from './logoNav.jpg';
//rafce + enter creates a template

const Navbar = () => {
    
    return (
        <>
        <Nav>
            <NavLink to="/" >
            <img src={logo} alt="HTML5 Icon" width="100" height="60"></img>
            </NavLink>
            <Bars />
            <NavMenu> 
                <NavLink to="/about" activeStyle>
                    About
                </NavLink>
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
