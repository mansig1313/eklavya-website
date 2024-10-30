import React from 'react';
import './Navbar.css';
import eklavya from './EKLAVYA.png'

function Navbar() {
  const menus = ['Home',  'About Us', 'Services', 'Sign In'];

  return (
    <div className="navbar">
      <div className="navbar-logo">
        <img src={eklavya} alt="Logo" />
      </div>
      <input type="checkbox" id='chkbox' /> 
      <label className="bar" htmlFor='chkbox'>
        <i className="fa-solid fa-bars fa-2xl"></i>
      </label>
      <ul>
        {menus.map((menu) => (
          <li key={menu}>
            <a href='#'>{menu}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Navbar;
