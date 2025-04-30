// src/components/Header.js (hoặc tương tự)
import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../assets/images/logo.png';
import '../assets/css/Header.css';

function Header() {
  return (
    <header className="header">
      {/* Logo bên trái */}
      <div className="logo-container">
        <img
          src={logo}
          alt="Pizza Logo"
          className="logo-image"
        />
      </div>

      {/* Menu 4 mục ở giữa */}
      <ul className="nav-list center-list">
        <li>
          <NavLink to="/" end className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            HOME
          </NavLink>
        </li>
        <li>
          <NavLink to="/reservation" end className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            RESERVATION
          </NavLink>
        </li>
        <li>
          <NavLink to="/menu" end className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            MENU
          </NavLink>
        </li>
        <li>
          <NavLink to="/about" end className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            ABOUT US
          </NavLink>
        </li>
      </ul>

      {/* LOGIN bên phải */}
      <div className="login-container">
        <NavLink to="/login" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
          LOGIN
        </NavLink>
      </div>
    </header>
  );
}

export default Header;
