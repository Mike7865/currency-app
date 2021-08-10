import React from 'react';
import "./Navbar.css";
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return <nav className="nav">
    <div className="navItems">
      <div className="navItem">
        <NavLink to="/currencyconverter" className="navItemLink" activeClassName="itemLinkActive">Currency Converter</NavLink>
      </div>   
    </div>
  </nav>
}

export default Navbar;