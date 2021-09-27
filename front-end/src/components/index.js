import React from 'react'
import './metamask';
import {Nav, NavLink, Bars, NavMenu, NavBtn, NavBtnLink } from './navBarElements'
import {BrowserRouter as Router, Route} from 'react-router-dom';
import OnboardingButton from './metamask'
//rafce + enter creates a template

const Navbar = () => {
    
    return (
        <>
        <Nav>
            <NavLink to="/" >
                <img src="" alt=""/>
            </NavLink>
            <Bars />
            <NavMenu> 
                <NavLink to="/about" activeStyle>
                    About
                </NavLink>
                <NavLink to="/startcampaign" activeStyle>
                    Start Campaign
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
