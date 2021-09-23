import React from 'react'

import {Nav, NavLink, Bars, NavMenu, NavBtn, NavBtnLink } from './navBarElements'
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
                <NavLink to="/connectwallet" activeStyle>
                    
                </NavLink>
            </NavMenu>
            <NavBtn>
                <NavBtnLink to="connectwallet">Connect Wallet</NavBtnLink>
            </NavBtn>
        </Nav>
            
        </>
    );
}

export default Navbar
