import React from 'react';
import './Navbar.css';
import eklavya from './EKLAVYA.png';

function Navbar() {
  const menus = [
    { name: 'Home', id: 'home-section' },
    { name: 'About Us', id: 'aboutus-section' },
    { name: 'Services', id: 'services-section' },
    { name: 'Sign In', id: 'signin-section' } // This redirects to the login page
  ];

  // Function to handle smooth scrolling to the target section
  const handleScroll = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <div className="navbar">
      <div className="navbar-logo">
        <img src={eklavya} alt="Logo" />
      </div>
      <input type="checkbox" id="chkbox" />
      <label className="bar" htmlFor="chkbox">
        <i className="fa-solid fa-bars fa-2xl"></i>
      </label>
      <ul>
        {menus.map((menu) => (
          <li key={menu.name}>
            {menu.name === 'Sign In' ? (
              <a href="/login">{menu.name}</a> // Redirects to login page
            ) : (
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleScroll(menu.id); // Scrolls to the section with specified ID
                }}
              >
                {menu.name}
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Navbar;
