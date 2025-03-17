import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import '../../assets/css/Header.css';

function Header() {
  return (
    <header className="header">
      <ul className="nav-list">
        <li>
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            HOME
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/reservation"
            end
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            RESERVATION
          </NavLink>
        </li>
      </ul>

      <div className="logo-container">
        <img
          src={logo}
          alt="Pizza Logo"
          className="logo-image"
        />
      </div>

      <ul className="nav-list">
        <li>
          <NavLink
            to="/menu"
            end
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            MENU
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/about"
            end
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            ABOUT US
          </NavLink>
        </li>
      </ul>
    </header>
  );
}

export default Header;
